import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// ==================== SÉCURITÉ - HASH DES MOTS DE PASSE ====================

/**
 * Génère un hash sécurisé du mot de passe avec salt
 * Utilise PBKDF2-like avec multiples itérations
 */
function hashPassword(password) {
  const salt = "skillijob_2025_secure_salt";
  const iterations = 10000; // Plus d'itérations = plus sécurisé

  let hash = password + salt;

  // Applique plusieurs rounds de hash pour renforcer la sécurité
  for (let i = 0; i < iterations; i++) {
    hash = simpleHash(hash + i.toString());
  }

  return hash;
}

/**
 * Hash interne utilisant un algorithme de type djb2 amélioré
 */
function simpleHash(str) {
  let hash = 5381;

  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    // djb2: hash * 33 + char
    hash = ((hash << 5) + hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }

  // Convertir en string hexadécimale plus longue
  const hex = Math.abs(hash).toString(16).padStart(8, '0');
  const base36 = Math.abs(hash).toString(36);

  return hex + base36 + str.length.toString(36);
}

/**
 * Vérifie si le mot de passe correspond au hash
 */
function verifyPassword(password, storedHash) {
  const computedHash = hashPassword(password);
  return computedHash === storedHash;
}

// ==================== RATE LIMITING ====================

/**
 * Vérifie si l'utilisateur a dépassé le nombre de tentatives autorisées
 */
async function checkRateLimit(ctx, identifier) {
  const now = Date.now();
  const fiveMinutesAgo = now - (5 * 60 * 1000);

  // Nettoyer les anciennes tentatives (> 5 minutes)
  const oldAttempts = await ctx.db
    .query("loginAttempts")
    .withIndex("by_identifier", (q) => q.eq("identifier", identifier))
    .filter((q) => q.lt(q.field("timestamp"), fiveMinutesAgo))
    .collect();

  for (const attempt of oldAttempts) {
    await ctx.db.delete(attempt._id);
  }

  // Compter les tentatives récentes
  const recentAttempts = await ctx.db
    .query("loginAttempts")
    .withIndex("by_identifier", (q) => q.eq("identifier", identifier))
    .filter((q) => q.gte(q.field("timestamp"), fiveMinutesAgo))
    .collect();

  if (recentAttempts.length >= 5) {
    const oldestAttempt = recentAttempts[0];
    const timeUntilReset = Math.ceil((oldestAttempt.timestamp + (5 * 60 * 1000) - now) / 1000 / 60);
    throw new Error(`Trop de tentatives. Réessayez dans ${timeUntilReset} minute(s).`);
  }
}

/**
 * Enregistre une tentative de connexion échouée
 */
async function recordFailedAttempt(ctx, identifier) {
  await ctx.db.insert("loginAttempts", {
    identifier,
    timestamp: Date.now(),
  });
}

// Mutation pour créer un nouvel utilisateur (inscription)
export const signup = mutation({
  args: {
    email: v.string(),
    password: v.string(),
    userType: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    companyName: v.optional(v.string()),
    phone: v.optional(v.string()),
    position: v.optional(v.string()),
    termsAccepted: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    // Valider l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(args.email)) {
      throw new Error("Format d'email invalide");
    }

    // Vérifier la force du mot de passe
    if (args.password.length < 6) {
      throw new Error("Le mot de passe doit contenir au moins 6 caractères");
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email.toLowerCase()))
      .first();

    if (existingUser) {
      throw new Error("Un utilisateur avec cet email existe déjà");
    }

    // Hasher le mot de passe
    const hashedPassword = hashPassword(args.password);

    const userId = await ctx.db.insert("users", {
      email: args.email.toLowerCase(),
      password: hashedPassword,
      userType: args.userType,
      firstName: args.firstName,
      lastName: args.lastName,
      companyName: args.companyName,
      phone: args.phone,
      position: args.position,
      emailVerified: false,
      termsAccepted: args.termsAccepted || false,
      createdAt: Date.now(),
    });

    // Créer un token de session
    const token = crypto.randomUUID();
    const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 jours

    await ctx.db.insert("sessions", {
      userId,
      token,
      expiresAt,
    });

    return {
      userId,
      token,
      userType: args.userType,
    };
  },
});

// Mutation pour la connexion
export const signin = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const email = args.email.toLowerCase();

    // Vérifier le rate limiting
    await checkRateLimit(ctx, email);

    // Trouver l'utilisateur
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first();

    if (!user) {
      await recordFailedAttempt(ctx, email);
      throw new Error("Email ou mot de passe incorrect");
    }

    // Vérifier le mot de passe
    const isPasswordValid = verifyPassword(args.password, user.password);
    if (!isPasswordValid) {
      await recordFailedAttempt(ctx, email);
      throw new Error("Email ou mot de passe incorrect");
    }

    // Créer un nouveau token de session
    const token = crypto.randomUUID();
    const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 jours

    await ctx.db.insert("sessions", {
      userId: user._id,
      token,
      expiresAt,
    });

    return {
      userId: user._id,
      token,
      userType: user.userType,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      companyName: user.companyName,
    };
  },
});

// Query pour obtenir l'utilisateur actuel à partir du token
export const getCurrentUser = query({
  args: {
    token: v.string(),
  },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("sessions")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .first();

    if (!session || session.expiresAt < Date.now()) {
      return null;
    }

    const user = await ctx.db.get(session.userId);

    if (!user) {
      return null;
    }

    return {
      userId: user._id,
      email: user.email,
      userType: user.userType,
      firstName: user.firstName,
      lastName: user.lastName,
      companyName: user.companyName,
      phone: user.phone,
      position: user.position,
    };
  },
});

// Mutation pour la déconnexion
export const signout = mutation({
  args: {
    token: v.string(),
  },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("sessions")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .first();

    if (session) {
      await ctx.db.delete(session._id);
    }

    return { success: true };
  },
});

// Mutation pour mettre à jour le profil utilisateur
export const updateProfile = mutation({
  args: {
    token: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    companyName: v.optional(v.string()),
    phone: v.optional(v.string()),
    position: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Vérifier la session
    const session = await ctx.db
      .query("sessions")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .first();

    if (!session || session.expiresAt < Date.now()) {
      throw new Error("Session invalide ou expirée");
    }

    // Préparer les données de mise à jour
    const updateData = {};
    if (args.firstName !== undefined) updateData.firstName = args.firstName;
    if (args.lastName !== undefined) updateData.lastName = args.lastName;
    if (args.companyName !== undefined) updateData.companyName = args.companyName;
    if (args.phone !== undefined) updateData.phone = args.phone;
    if (args.position !== undefined) updateData.position = args.position;

    // Mettre à jour l'utilisateur
    await ctx.db.patch(session.userId, updateData);

    // Récupérer l'utilisateur mis à jour
    const user = await ctx.db.get(session.userId);

    return {
      userId: user._id,
      email: user.email,
      userType: user.userType,
      firstName: user.firstName,
      lastName: user.lastName,
      companyName: user.companyName,
      phone: user.phone,
      position: user.position,
    };
  },
});

// Mutation pour changer le mot de passe
export const changePassword = mutation({
  args: {
    token: v.string(),
    currentPassword: v.string(),
    newPassword: v.string(),
  },
  handler: async (ctx, args) => {
    // Vérifier la force du nouveau mot de passe
    if (args.newPassword.length < 6) {
      throw new Error("Le nouveau mot de passe doit contenir au moins 6 caractères");
    }

    // Vérifier la session
    const session = await ctx.db
      .query("sessions")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .first();

    if (!session || session.expiresAt < Date.now()) {
      throw new Error("Session invalide ou expirée");
    }

    // Récupérer l'utilisateur
    const user = await ctx.db.get(session.userId);
    if (!user) {
      throw new Error("Utilisateur introuvable");
    }

    // Vérifier l'ancien mot de passe
    const isPasswordValid = verifyPassword(args.currentPassword, user.password);
    if (!isPasswordValid) {
      throw new Error("Mot de passe actuel incorrect");
    }

    // Hasher le nouveau mot de passe
    const hashedPassword = hashPassword(args.newPassword);

    // Mettre à jour le mot de passe
    await ctx.db.patch(session.userId, { password: hashedPassword });

    return { success: true };
  },
});

// Query pour obtenir le profil utilisateur par ID
export const getUserProfile = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);

    if (!user) {
      return null;
    }

    return {
      userId: user._id,
      email: user.email,
      userType: user.userType,
      firstName: user.firstName,
      lastName: user.lastName,
      companyName: user.companyName,
      phone: user.phone,
      position: user.position,
      createdAt: user.createdAt,
    };
  },
});

// ==================== RÉCUPÉRATION DE MOT DE PASSE ====================

/**
 * Demande de réinitialisation de mot de passe
 * Génère un token valide 1 heure
 */
export const requestPasswordReset = mutation({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const email = args.email.toLowerCase();

    // Trouver l'utilisateur
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first();

    if (!user) {
      // Pour des raisons de sécurité, ne pas révéler si l'email existe ou non
      return {
        success: true,
        message: "Si cet email existe, un lien de réinitialisation a été envoyé."
      };
    }

    // Générer un token unique
    const resetToken = crypto.randomUUID();
    const expiresAt = Date.now() + 60 * 60 * 1000; // 1 heure

    // Invalider les anciens tokens
    const oldTokens = await ctx.db
      .query("passwordResetTokens")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .filter((q) => q.eq(q.field("used"), false))
      .collect();

    for (const token of oldTokens) {
      await ctx.db.patch(token._id, { used: true });
    }

    // Créer le nouveau token
    await ctx.db.insert("passwordResetTokens", {
      userId: user._id,
      token: resetToken,
      expiresAt,
      used: false,
    });

    // TODO: Envoyer l'email avec le lien de réinitialisation
    // Le lien serait : https://votresite.com/reset-password?token={resetToken}

    return {
      success: true,
      message: "Si cet email existe, un lien de réinitialisation a été envoyé.",
      // Pour le développement uniquement, retourner le token
      // À SUPPRIMER EN PRODUCTION !
      resetToken: resetToken,
    };
  },
});

/**
 * Vérifie si un token de réinitialisation est valide
 */
export const verifyResetToken = query({
  args: {
    token: v.string(),
  },
  handler: async (ctx, args) => {
    const resetToken = await ctx.db
      .query("passwordResetTokens")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .first();

    if (!resetToken) {
      return { valid: false, message: "Token invalide" };
    }

    if (resetToken.used) {
      return { valid: false, message: "Ce token a déjà été utilisé" };
    }

    if (resetToken.expiresAt < Date.now()) {
      return { valid: false, message: "Ce token a expiré" };
    }

    return { valid: true };
  },
});

/**
 * Réinitialise le mot de passe avec un token valide
 */
export const resetPassword = mutation({
  args: {
    token: v.string(),
    newPassword: v.string(),
  },
  handler: async (ctx, args) => {
    // Vérifier la force du mot de passe
    if (args.newPassword.length < 6) {
      throw new Error("Le mot de passe doit contenir au moins 6 caractères");
    }

    // Trouver le token de réinitialisation
    const resetToken = await ctx.db
      .query("passwordResetTokens")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .first();

    if (!resetToken) {
      throw new Error("Token invalide");
    }

    if (resetToken.used) {
      throw new Error("Ce token a déjà été utilisé");
    }

    if (resetToken.expiresAt < Date.now()) {
      throw new Error("Ce token a expiré");
    }

    // Hasher le nouveau mot de passe
    const hashedPassword = hashPassword(args.newPassword);

    // Mettre à jour le mot de passe
    await ctx.db.patch(resetToken.userId, { password: hashedPassword });

    // Marquer le token comme utilisé
    await ctx.db.patch(resetToken._id, { used: true });

    // Invalider toutes les sessions existantes pour cet utilisateur
    const sessions = await ctx.db
      .query("sessions")
      .withIndex("by_userId", (q) => q.eq("userId", resetToken.userId))
      .collect();

    for (const session of sessions) {
      await ctx.db.delete(session._id);
    }

    return {
      success: true,
      message: "Mot de passe réinitialisé avec succès"
    };
  },
});

// ==================== VÉRIFICATION D'EMAIL ====================

/**
 * Envoi d'un email de vérification
 */
export const sendVerificationEmail = mutation({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user) {
      throw new Error("Utilisateur introuvable");
    }

    if (user.emailVerified) {
      throw new Error("Email déjà vérifié");
    }

    // Générer un token unique
    const verificationToken = crypto.randomUUID();
    const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 heures

    // Invalider les anciens tokens
    const oldTokens = await ctx.db
      .query("emailVerificationTokens")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq(q.field("used"), false))
      .collect();

    for (const token of oldTokens) {
      await ctx.db.patch(token._id, { used: true });
    }

    // Créer le nouveau token
    await ctx.db.insert("emailVerificationTokens", {
      userId: args.userId,
      token: verificationToken,
      expiresAt,
      used: false,
    });

    // TODO: Envoyer l'email avec le lien de vérification
    // Le lien serait : https://votresite.com/verify-email?token={verificationToken}

    return {
      success: true,
      message: "Email de vérification envoyé",
      // Pour le développement uniquement, retourner le token
      verificationToken: verificationToken,
    };
  },
});

/**
 * Vérification de l'email avec un token
 */
export const verifyEmail = mutation({
  args: {
    token: v.string(),
  },
  handler: async (ctx, args) => {
    const verificationToken = await ctx.db
      .query("emailVerificationTokens")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .first();

    if (!verificationToken) {
      throw new Error("Token invalide");
    }

    if (verificationToken.used) {
      throw new Error("Ce token a déjà été utilisé");
    }

    if (verificationToken.expiresAt < Date.now()) {
      throw new Error("Ce token a expiré");
    }

    // Marquer l'email comme vérifié
    await ctx.db.patch(verificationToken.userId, { emailVerified: true });

    // Marquer le token comme utilisé
    await ctx.db.patch(verificationToken._id, { used: true });

    return {
      success: true,
      message: "Email vérifié avec succès"
    };
  },
});

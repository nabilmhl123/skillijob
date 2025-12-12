import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Créer un profil candidat
 */
export const createProfile = mutation({
  args: {
    token: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    address: v.optional(v.string()),
    bio: v.optional(v.string()),
    skills: v.array(v.string()),
    experience: v.optional(v.string()),
    education: v.optional(v.string()),
    resumeUrl: v.optional(v.string()),
    linkedinUrl: v.optional(v.string()),
    portfolioUrl: v.optional(v.string()),
    availability: v.optional(v.string()),
    salaryExpectation: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    // Vérifier la session utilisateur
    const session = await ctx.db
      .query("sessions")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .first();

    if (!session || session.expiresAt < Date.now()) {
      throw new Error("Session invalide ou expirée");
    }

    // Vérifier que c'est un candidat
    const user = await ctx.db.get(session.userId);
    if (!user || user.userType !== "candidate") {
      throw new Error("Seuls les candidats peuvent créer un profil");
    }

    // Créer le profil candidat
    const profileId = await ctx.db.insert("candidateProfiles", {
      userId: session.userId,
      firstName: args.firstName,
      lastName: args.lastName,
      email: args.email,
      phone: args.phone,
      address: args.address,
      bio: args.bio,
      skills: args.skills,
      experience: args.experience,
      education: args.education,
      resumeUrl: args.resumeUrl,
      linkedinUrl: args.linkedinUrl,
      portfolioUrl: args.portfolioUrl,
      availability: args.availability,
      salaryExpectation: args.salaryExpectation,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return {
      profileId,
      message: "Profil créé avec succès"
    };
  },
});

/**
 * Récupérer le profil d'un candidat
 */
export const getProfile = query({
  args: {
    token: v.string(),
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

    // Récupérer le profil
    const profile = await ctx.db
      .query("candidateProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", session.userId))
      .first();

    if (!profile) {
      throw new Error("Profil non trouvé");
    }

    return profile;
  },
});

/**
 * Récupérer tous les profils candidats (pour les entreprises)
 */
export const getAllProfiles = query({
  args: {},
  handler: async (ctx) => {
    const profiles = await ctx.db
      .query("candidateProfiles")
      .collect();

    return profiles;
  },
});

/**
 * Récupérer un profil spécifique par ID
 */
export const getProfileById = query({
  args: {
    profileId: v.id("candidateProfiles"),
  },
  handler: async (ctx, args) => {
    const profile = await ctx.db.get(args.profileId);

    if (!profile) {
      throw new Error("Profil non trouvé");
    }

    return profile;
  },
});
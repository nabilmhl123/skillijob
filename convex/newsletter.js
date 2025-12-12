import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Ajoute un email à la newsletter
 * Vérifie si l'email existe déjà pour éviter les doublons
 */
export const subscribe = mutation({
  args: {
    email: v.string(),
    source: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Valider le format de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(args.email)) {
      throw new Error("Format d'email invalide");
    }

    // Normaliser l'email (lowercase et trim)
    const normalizedEmail = args.email.toLowerCase().trim();

    // Vérifier si l'email existe déjà
    const existingSubscription = await ctx.db
      .query("newsletters")
      .withIndex("by_email", (q) => q.eq("email", normalizedEmail))
      .first();

    if (existingSubscription) {
      // Email déjà inscrit, on retourne l'ID existant
      return {
        id: existingSubscription._id,
        alreadySubscribed: true,
      };
    }

    // Créer la nouvelle inscription
    const subscriptionId = await ctx.db.insert("newsletters", {
      email: normalizedEmail,
      subscribedAt: Date.now(),
      source: args.source || "unknown",
    });

    return {
      id: subscriptionId,
      alreadySubscribed: false,
    };
  },
});

/**
 * Récupère tous les emails inscrits à la newsletter
 * (Pour l'admin uniquement)
 */
export const getAll = query({
  args: {},
  handler: async (ctx) => {
    const newsletters = await ctx.db
      .query("newsletters")
      .order("desc")
      .collect();

    return newsletters;
  },
});

/**
 * Compte le nombre total d'inscrits
 */
export const count = query({
  args: {},
  handler: async (ctx) => {
    const newsletters = await ctx.db.query("newsletters").collect();
    return newsletters.length;
  },
});

/**
 * Vérifie si un email est déjà inscrit
 */
export const checkSubscription = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const normalizedEmail = args.email.toLowerCase().trim();

    const subscription = await ctx.db
      .query("newsletters")
      .withIndex("by_email", (q) => q.eq("email", normalizedEmail))
      .first();

    return {
      isSubscribed: !!subscription,
      subscribedAt: subscription?.subscribedAt,
    };
  },
});

/**
 * Désinscrire un email de la newsletter
 */
export const unsubscribe = mutation({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const normalizedEmail = args.email.toLowerCase().trim();

    const subscription = await ctx.db
      .query("newsletters")
      .withIndex("by_email", (q) => q.eq("email", normalizedEmail))
      .first();

    if (!subscription) {
      throw new Error("Email non trouvé dans la newsletter");
    }

    await ctx.db.delete(subscription._id);

    return {
      success: true,
      message: "Email désinscrit avec succès",
    };
  },
});

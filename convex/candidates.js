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
    experienceLevel: v.optional(v.string()),
    education: v.optional(v.string()),
    educationLevel: v.optional(v.string()),
    educationType: v.optional(v.string()),
    languages: v.optional(v.array(v.object({
      language: v.string(),
      level: v.string()
    }))),
    certifications: v.optional(v.array(v.string())),
    tools: v.optional(v.array(v.string())),
    softSkills: v.optional(v.array(v.string())),
    resumeUrl: v.optional(v.string()),
    linkedinUrl: v.optional(v.string()),
    portfolioUrl: v.optional(v.string()),
    availability: v.optional(v.string()),
    contractType: v.optional(v.string()),
    remoteWork: v.optional(v.string()),
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
      experienceLevel: args.experienceLevel,
      education: args.education,
      educationLevel: args.educationLevel,
      educationType: args.educationType,
      languages: args.languages,
      certifications: args.certifications,
      tools: args.tools,
      softSkills: args.softSkills,
      resumeUrl: args.resumeUrl,
      linkedinUrl: args.linkedinUrl,
      portfolioUrl: args.portfolioUrl,
      availability: args.availability,
      contractType: args.contractType,
      remoteWork: args.remoteWork,
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
 * Rechercher et filtrer les profils candidats (pour les entreprises)
 */
export const searchProfiles = query({
  args: {
    searchTerm: v.optional(v.string()),
    experienceLevel: v.optional(v.string()),
    remoteWork: v.optional(v.string()),
    educationLevel: v.optional(v.string()),
    educationType: v.optional(v.string()),
    skills: v.optional(v.array(v.string())),
    languages: v.optional(v.array(v.string())),
    availability: v.optional(v.string()),
    contractType: v.optional(v.string()),
    softSkills: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const {
      searchTerm,
      experienceLevel,
      remoteWork,
      educationLevel,
      educationType,
      skills,
      languages,
      availability,
      contractType,
      softSkills
    } = args;

    let query = ctx.db.query("candidateProfiles");

    // Appliquer les filtres avancés
    if (experienceLevel && experienceLevel !== 'all') {
      query = query.filter((q) => q.eq(q.field("experienceLevel"), experienceLevel));
    }

    if (remoteWork && remoteWork !== 'all') {
      query = query.filter((q) => q.eq(q.field("remoteWork"), remoteWork));
    }

    if (educationLevel && educationLevel !== 'all') {
      query = query.filter((q) => q.eq(q.field("educationLevel"), educationLevel));
    }

    if (educationType && educationType !== 'all') {
      query = query.filter((q) => q.eq(q.field("educationType"), educationType));
    }

    if (availability && availability !== 'all') {
      query = query.filter((q) => q.eq(q.field("availability"), availability));
    }

    if (contractType && contractType !== 'all') {
      query = query.filter((q) => q.eq(q.field("contractType"), contractType));
    }

    // Filtrage par localisation déplacé côté client pour éviter les timeouts

    let profiles = await query.collect();

    // Appliquer les filtres sur arrays (skills, languages, softSkills) côté client
    if (skills && Array.isArray(skills) && skills.length > 0) {
      profiles = profiles.filter(profile =>
        profile.skills && Array.isArray(profile.skills) && skills.some(skill =>
          typeof skill === 'string' && profile.skills.some(profileSkill =>
            typeof profileSkill === 'string' && profileSkill.toLowerCase().includes(skill.toLowerCase())
          )
        )
      );
    }

    if (languages && Array.isArray(languages) && languages.length > 0) {
      profiles = profiles.filter(profile =>
        profile.languages && Array.isArray(profile.languages) && languages.some(lang =>
          typeof lang === 'string' && profile.languages.some(profileLang =>
            profileLang && typeof profileLang.language === 'string' && profileLang.language.toLowerCase().includes(lang.toLowerCase())
          )
        )
      );
    }

    if (softSkills && Array.isArray(softSkills) && softSkills.length > 0) {
      profiles = profiles.filter(profile =>
        profile.softSkills && Array.isArray(profile.softSkills) && softSkills.some(skill =>
          typeof skill === 'string' && profile.softSkills.some(profileSkill =>
            typeof profileSkill === 'string' && profileSkill.toLowerCase().includes(skill.toLowerCase())
          )
        )
      );
    }

    // Appliquer la recherche textuelle full-text
    if (searchTerm && typeof searchTerm === 'string' && searchTerm.trim() !== '') {
      const searchLower = String(searchTerm).toLowerCase().trim();
      profiles = profiles.filter(profile => {
        const searchableFields = [
          profile.firstName,
          profile.lastName,
          profile.bio,
          profile.experience,
          profile.education,
          ...(profile.skills || []),
          ...(profile.certifications || []),
          ...(profile.tools || []),
          ...(profile.languages ? profile.languages.map(l => l.language) : []),
          ...(profile.softSkills || []),
        ].filter(field => field !== undefined && field !== null);

        return searchableFields.some(field =>
          typeof field === 'string' && field.toLowerCase().includes(searchLower)
        );
      });
    }

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
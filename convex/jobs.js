import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Importer les fonctions de hash depuis auth.js
function hashPassword(password) {
  const salt = "skillijob_2025_secure_salt";
  const iterations = 10000;

  let hash = password + salt;

  for (let i = 0; i < iterations; i++) {
    hash = simpleHash(hash + i.toString());
  }

  return hash;
}

function simpleHash(str) {
  let hash = 5381;

  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) + hash) + char;
    hash = hash & hash;
  }

  const hex = Math.abs(hash).toString(16).padStart(8, '0');
  const base36 = Math.abs(hash).toString(36);

  return hex + base36 + str.length.toString(36);
}

/**
 * Créer une nouvelle offre d'emploi
 */
export const createJob = mutation({
  args: {
    token: v.string(),
    title: v.string(),
    description: v.string(),
    requirements: v.array(v.string()),
    location: v.string(),
    type: v.string(),
    salaryMin: v.optional(v.number()),
    salaryMax: v.optional(v.number()),
    benefits: v.array(v.string()),
    skills: v.array(v.string()),
    expiresAt: v.optional(v.number()),

    // Nouveaux champs ultra détaillés
    experienceLevel: v.optional(v.string()),
    languages: v.optional(v.array(v.object({
      language: v.string(),
      level: v.string()
    }))),
    remoteWork: v.optional(v.string()),
    department: v.optional(v.string()),
    industry: v.optional(v.string()),
    companySize: v.optional(v.string()),
    applicationProcess: v.optional(v.array(v.string())),
    contactEmail: v.optional(v.string()),
    contactPhone: v.optional(v.string()),
    applicationDeadline: v.optional(v.number()),
    startDate: v.optional(v.number()),
    contractDuration: v.optional(v.string()),
    workingHours: v.optional(v.string()),
    educationLevel: v.optional(v.string()),
    certifications: v.optional(v.array(v.string())),
    tools: v.optional(v.array(v.string())),
    softSkills: v.optional(v.array(v.string())),
    companyDescription: v.optional(v.string()),
    teamSize: v.optional(v.number()),
    officeAddress: v.optional(v.string()),
    parking: v.optional(v.boolean()),
    catering: v.optional(v.boolean()),
    trainingBudget: v.optional(v.boolean()),
    careerDevelopment: v.optional(v.boolean()),
    diversity: v.optional(v.boolean()),
    urgent: v.optional(v.boolean()),
    internalReference: v.optional(v.string()),
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

    // Vérifier que c'est une entreprise
    const user = await ctx.db.get(session.userId);
    if (!user || user.userType !== "company") {
      throw new Error("Seules les entreprises peuvent créer des offres");
    }

    // Créer l'offre d'emploi avec tous les champs
    const jobId = await ctx.db.insert("jobOffers", {
      companyId: session.userId,
      title: args.title,
      description: args.description,
      requirements: args.requirements,
      location: args.location,
      type: args.type,
      salaryMin: args.salaryMin,
      salaryMax: args.salaryMax,
      benefits: args.benefits,
      skills: args.skills,
      status: "draft", // Par défaut en brouillon
      createdAt: Date.now(),
      updatedAt: Date.now(),
      expiresAt: args.expiresAt,

      // Nouveaux champs avec valeurs par défaut
      experienceLevel: args.experienceLevel,
      languages: args.languages || [],
      remoteWork: args.remoteWork,
      department: args.department,
      industry: args.industry,
      companySize: args.companySize,
      applicationProcess: args.applicationProcess || [],
      contactEmail: args.contactEmail,
      contactPhone: args.contactPhone,
      applicationDeadline: args.applicationDeadline,
      startDate: args.startDate,
      contractDuration: args.contractDuration,
      workingHours: args.workingHours,
      educationLevel: args.educationLevel,
      certifications: args.certifications || [],
      tools: args.tools || [],
      softSkills: args.softSkills || [],
      companyDescription: args.companyDescription,
      teamSize: args.teamSize,
      officeAddress: args.officeAddress,
      parking: args.parking,
      catering: args.catering,
      trainingBudget: args.trainingBudget,
      careerDevelopment: args.careerDevelopment,
      diversity: args.diversity,
      urgent: args.urgent,
      internalReference: args.internalReference,
    });

    return {
      jobId,
      message: "Offre créée avec succès"
    };
  },
});

/**
 * Récupérer toutes les offres d'une entreprise
 */
export const getCompanyJobs = query({
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

    // Récupérer les offres de l'entreprise
    const jobs = await ctx.db
      .query("jobOffers")
      .withIndex("by_companyId", (q) => q.eq("companyId", session.userId))
      .order("desc")
      .collect();

    return jobs;
  },
});

/**
 * Récupérer une offre spécifique
 */
export const getJob = query({
  args: {
    jobId: v.id("jobOffers"),
  },
  handler: async (ctx, args) => {
    const job = await ctx.db.get(args.jobId);

    if (!job) {
      throw new Error("Offre introuvable");
    }

    return job;
  },
});

/**
 * Mettre à jour une offre d'emploi
 */
export const updateJob = mutation({
  args: {
    token: v.string(),
    jobId: v.id("jobOffers"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    requirements: v.optional(v.array(v.string())),
    location: v.optional(v.string()),
    type: v.optional(v.string()),
    salaryMin: v.optional(v.number()),
    salaryMax: v.optional(v.number()),
    benefits: v.optional(v.array(v.string())),
    skills: v.optional(v.array(v.string())),
    status: v.optional(v.string()),
    expiresAt: v.optional(v.number()),
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

    // Vérifier que l'offre appartient à l'entreprise
    const job = await ctx.db.get(args.jobId);
    if (!job || job.companyId !== session.userId) {
      throw new Error("Offre introuvable ou accès non autorisé");
    }

    // Préparer les données de mise à jour
    const updateData = {
      updatedAt: Date.now(),
    };

    if (args.title !== undefined) updateData.title = args.title;
    if (args.description !== undefined) updateData.description = args.description;
    if (args.requirements !== undefined) updateData.requirements = args.requirements;
    if (args.location !== undefined) updateData.location = args.location;
    if (args.type !== undefined) updateData.type = args.type;
    if (args.salaryMin !== undefined) updateData.salaryMin = args.salaryMin;
    if (args.salaryMax !== undefined) updateData.salaryMax = args.salaryMax;
    if (args.benefits !== undefined) updateData.benefits = args.benefits;
    if (args.skills !== undefined) updateData.skills = args.skills;
    if (args.status !== undefined) updateData.status = args.status;
    if (args.expiresAt !== undefined) updateData.expiresAt = args.expiresAt;

    // Mettre à jour l'offre
    await ctx.db.patch(args.jobId, updateData);

    return {
      jobId: args.jobId,
      message: "Offre mise à jour avec succès"
    };
  },
});

/**
 * Supprimer une offre d'emploi
 */
export const deleteJob = mutation({
  args: {
    token: v.string(),
    jobId: v.id("jobOffers"),
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

    // Vérifier que l'offre appartient à l'entreprise
    const job = await ctx.db.get(args.jobId);
    if (!job || job.companyId !== session.userId) {
      throw new Error("Offre introuvable ou accès non autorisé");
    }

    // Supprimer l'offre
    await ctx.db.delete(args.jobId);

    return {
      success: true,
      message: "Offre supprimée avec succès"
    };
  },
});

/**
 * Publier une offre (changer le statut à "published")
 */
export const publishJob = mutation({
  args: {
    token: v.string(),
    jobId: v.id("jobOffers"),
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

    // Vérifier que l'offre appartient à l'entreprise
    const job = await ctx.db.get(args.jobId);
    if (!job || job.companyId !== session.userId) {
      throw new Error("Offre introuvable ou accès non autorisé");
    }

    // Publier l'offre
    await ctx.db.patch(args.jobId, {
      status: "published",
      updatedAt: Date.now(),
    });

    return {
      jobId: args.jobId,
      message: "Offre publiée avec succès"
    };
  },
});

/**
 * Mettre une offre en brouillon
 */
export const draftJob = mutation({
  args: {
    token: v.string(),
    jobId: v.id("jobOffers"),
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

    // Vérifier que l'offre appartient à l'entreprise
    const job = await ctx.db.get(args.jobId);
    if (!job || job.companyId !== session.userId) {
      throw new Error("Offre introuvable ou accès non autorisé");
    }

    // Mettre en brouillon
    await ctx.db.patch(args.jobId, {
      status: "draft",
      updatedAt: Date.now(),
    });

    return {
      jobId: args.jobId,
      message: "Offre mise en brouillon"
    };
  },
});

/**
 * Récupérer les statistiques des offres d'une entreprise
 */
export const getJobStats = query({
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

    // Récupérer toutes les offres de l'entreprise
    const jobs = await ctx.db
      .query("jobOffers")
      .withIndex("by_companyId", (q) => q.eq("companyId", session.userId))
      .collect();

    // Calculer les statistiques
    const stats = {
      total: jobs.length,
      published: jobs.filter(job => job.status === "published").length,
      draft: jobs.filter(job => job.status === "draft").length,
      closed: jobs.filter(job => job.status === "closed").length,
    };

    return stats;
  },
});

/**
 * Récupérer les offres publiées (pour les candidats)
 */
export const getPublishedJobs = query({
  args: {},
  handler: async (ctx) => {
    const jobs = await ctx.db
      .query("jobOffers")
      .withIndex("by_status", (q) => q.eq("status", "published"))
      .order("desc")
      .collect();

    // Pour chaque offre, récupérer les informations de l'entreprise
    const jobsWithCompany = await Promise.all(
      jobs.map(async (job) => {
        const company = await ctx.db.get(job.companyId);
        return {
          ...job,
          companyName: company?.companyName || "Entreprise anonyme",
          companyLocation: "Non spécifié", // À étendre plus tard
        };
      })
    );

    return jobsWithCompany;
  },
});

/**
 * Fonction d'initialisation pour créer des données de test
 * À utiliser uniquement en développement
 */
export const initializeTestData = mutation({
  args: {},
  handler: async (ctx) => {
    // Créer un utilisateur entreprise de test
    const testUserId = await ctx.db.insert("users", {
      email: "test@company.com",
      password: hashPassword("test123"), // À remplacer par bcrypt en prod
      userType: "company",
      companyName: "TechCorp",
      firstName: "Jean",
      lastName: "Dupont",
      position: "CEO",
      emailVerified: true,
      termsAccepted: true,
      createdAt: Date.now(),
    });

    // Créer quelques offres de test
    const job1Id = await ctx.db.insert("jobOffers", {
      companyId: testUserId,
      title: "Développeur Full-Stack React/Node.js",
      description: "Nous recherchons un développeur full-stack expérimenté pour rejoindre notre équipe...",
      requirements: ["3+ ans d'expérience", "React", "Node.js", "MongoDB"],
      location: "Paris",
      type: "full-time",
      salaryMin: 45000,
      salaryMax: 55000,
      benefits: ["RTT", "Mutuelle", "Tickets restaurant"],
      skills: ["React", "Node.js", "TypeScript", "MongoDB"],
      status: "published",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 jours
    });

    const job2Id = await ctx.db.insert("jobOffers", {
      companyId: testUserId,
      title: "Designer UX/UI",
      description: "Poste de designer UX/UI pour notre équipe produit...",
      requirements: ["Portfolio", "Figma", "2+ ans d'expérience"],
      location: "Lyon",
      type: "full-time",
      salaryMin: 35000,
      salaryMax: 45000,
      benefits: ["Télétravail", "Formation"],
      skills: ["Figma", "Adobe XD", "Sketch", "Prototyping"],
      status: "published",
      createdAt: Date.now() - 86400000, // Hier
      updatedAt: Date.now() - 86400000,
      expiresAt: Date.now() + 20 * 24 * 60 * 60 * 1000, // 20 jours
    });

    return {
      message: "Données de test créées",
      testUserId,
      jobsCreated: [job1Id, job2Id]
    };
  },
});

/**
 * Enregistrer la consultation d'un profil candidat
 */
export const viewCandidateProfile = mutation({
  args: {
    token: v.string(),
    candidateId: v.id("candidateProfiles"),
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

    // Vérifier que c'est une entreprise
    const user = await ctx.db.get(session.userId);
    if (!user || user.userType !== "company") {
      throw new Error("Seules les entreprises peuvent consulter des profils");
    }

    // Vérifier que le candidat existe
    const candidate = await ctx.db.get(args.candidateId);
    if (!candidate) {
      throw new Error("Candidat introuvable");
    }

    // Vérifier si ce profil a déjà été consulté par cette entreprise
    const existingView = await ctx.db
      .query("profileViews")
      .withIndex("by_company_candidate", (q) =>
        q.eq("companyId", session.userId).eq("candidateId", args.candidateId)
      )
      .first();

    if (!existingView) {
      // Enregistrer la consultation
      await ctx.db.insert("profileViews", {
        companyId: session.userId,
        candidateId: args.candidateId,
        viewedAt: Date.now(),
      });
    }

    return {
      message: "Profil consulté avec succès"
    };
  },
});

/**
 * Débloquer un profil candidat (dépense des crédits)
 */
export const unlockCandidateProfile = mutation({
  args: {
    token: v.string(),
    candidateId: v.id("candidateProfiles"),
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

    // Vérifier que c'est une entreprise
    const user = await ctx.db.get(session.userId);
    if (!user || user.userType !== "company") {
      throw new Error("Seules les entreprises peuvent débloquer des profils");
    }

    // Vérifier que le candidat existe
    const candidate = await ctx.db.get(args.candidateId);
    if (!candidate) {
      throw new Error("Candidat introuvable");
    }

    // Vérifier les crédits de l'entreprise
    const companyCredits = await ctx.db
      .query("companyCredits")
      .withIndex("by_companyId", (q) => q.eq("companyId", session.userId))
      .first();

    if (!companyCredits || companyCredits.credits < 1) {
      throw new Error("Crédits insuffisants pour débloquer ce profil");
    }

    // Vérifier si ce profil est déjà débloqué
    const existingUnlock = await ctx.db
      .query("unlockedProfiles")
      .withIndex("by_company_candidate", (q) =>
        q.eq("companyId", session.userId).eq("candidateId", args.candidateId)
      )
      .first();

    if (existingUnlock) {
      throw new Error("Ce profil est déjà débloqué");
    }

    // Débloquer le profil et déduire les crédits
    await ctx.db.insert("unlockedProfiles", {
      companyId: session.userId,
      candidateId: args.candidateId,
      unlockedAt: Date.now(),
    });

    // Mettre à jour les crédits
    await ctx.db.patch(companyCredits._id, {
      credits: companyCredits.credits - 1,
      lastUpdated: Date.now(),
    });

    return {
      message: "Profil débloqué avec succès",
      remainingCredits: companyCredits.credits - 1
    };
  },
});

/**
 * Récupérer les statistiques de recrutement d'une entreprise
 */
export const getRecruitmentStats = query({
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

    // Vérifier que c'est une entreprise
    const user = await ctx.db.get(session.userId);
    if (!user || user.userType !== "company") {
      throw new Error("Accès non autorisé");
    }

    // Récupérer les statistiques
    const profileViews = await ctx.db
      .query("profileViews")
      .withIndex("by_companyId", (q) => q.eq("companyId", session.userId))
      .collect();

    const unlockedProfiles = await ctx.db
      .query("unlockedProfiles")
      .withIndex("by_companyId", (q) => q.eq("companyId", session.userId))
      .collect();

    const companyCredits = await ctx.db
      .query("companyCredits")
      .withIndex("by_companyId", (q) => q.eq("companyId", session.userId))
      .first();

    return {
      profilesViewed: profileViews.length,
      profilesUnlocked: unlockedProfiles.length,
      creditsRemaining: companyCredits ? companyCredits.credits : 0,
    };
  },
});

/**
 * Initialiser les crédits pour une entreprise (fonction d'administration)
 */
export const initializeCompanyCredits = mutation({
  args: {
    companyId: v.id("users"),
    initialCredits: v.number(),
  },
  handler: async (ctx, args) => {
    // Vérifier si l'entreprise a déjà des crédits
    const existingCredits = await ctx.db
      .query("companyCredits")
      .withIndex("by_companyId", (q) => q.eq("companyId", args.companyId))
      .first();

    if (existingCredits) {
      // Mettre à jour les crédits existants
      await ctx.db.patch(existingCredits._id, {
        credits: args.initialCredits,
        lastUpdated: Date.now(),
      });
    } else {
      // Créer une nouvelle entrée de crédits
      await ctx.db.insert("companyCredits", {
        companyId: args.companyId,
        credits: args.initialCredits,
        lastUpdated: Date.now(),
      });
    }

    return {
      message: "Crédits initialisés avec succès",
      credits: args.initialCredits
    };
  },
});
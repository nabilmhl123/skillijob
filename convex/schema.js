import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // ==================== AUTHENTIFICATION ====================

  users: defineTable({
    email: v.string(),
    password: v.string(),
    userType: v.string(), // 'candidate' ou 'company'
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    companyName: v.optional(v.string()),
    phone: v.optional(v.string()),
    position: v.optional(v.string()),
    emailVerified: v.optional(v.boolean()),
    termsAccepted: v.optional(v.boolean()),
    createdAt: v.number(),
  })
  .index("by_email", ["email"]),

  sessions: defineTable({
    userId: v.id("users"),
    token: v.string(),
    expiresAt: v.number(),
  })
    .index("by_token", ["token"])
    .index("by_userId", ["userId"]),

  // Tentatives de connexion pour le rate limiting
  loginAttempts: defineTable({
    identifier: v.string(), // email ou IP
    timestamp: v.number(),
  })
    .index("by_identifier", ["identifier"]),

  // Tokens de réinitialisation de mot de passe
  passwordResetTokens: defineTable({
    userId: v.id("users"),
    token: v.string(),
    expiresAt: v.number(),
    used: v.boolean(),
  })
  .index("by_token", ["token"])
  .index("by_userId", ["userId"]),

  // Tokens de vérification d'email
  emailVerificationTokens: defineTable({
    userId: v.id("users"),
    token: v.string(),
    expiresAt: v.number(),
    used: v.boolean(),
  })
  .index("by_token", ["token"])
  .index("by_userId", ["userId"]),

  // ==================== NEWSLETTER ====================

  newsletters: defineTable({
    email: v.string(),
    subscribedAt: v.number(),
    source: v.optional(v.string()), // 'popup', 'footer', etc.
  })
  .index("by_email", ["email"]),

  // ==================== CANDIDATES ====================

  candidateProfiles: defineTable({
    userId: v.id("users"),
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
    createdAt: v.number(),
    updatedAt: v.number(),
  })
  .index("by_userId", ["userId"]),

  educations: defineTable({
    candidateId: v.id("candidateProfiles"),
    institution: v.string(),
    degree: v.string(),
    field: v.string(),
    startDate: v.string(),
    endDate: v.optional(v.string()),
    description: v.optional(v.string()),
  })
  .index("by_candidateId", ["candidateId"]),

  experiences: defineTable({
    candidateId: v.id("candidateProfiles"),
    company: v.string(),
    position: v.string(),
    startDate: v.string(),
    endDate: v.optional(v.string()),
    description: v.string(),
    current: v.boolean(),
  })
  .index("by_candidateId", ["candidateId"]),

  certifications: defineTable({
    candidateId: v.id("candidateProfiles"),
    name: v.string(),
    issuer: v.string(),
    issueDate: v.string(),
    expiryDate: v.optional(v.string()),
    credentialId: v.optional(v.string()),
    credentialUrl: v.optional(v.string()),
  })
  .index("by_candidateId", ["candidateId"]),

  documents: defineTable({
    candidateId: v.id("candidateProfiles"),
    type: v.string(), // 'cv', 'diploma', 'certificate', etc.
    name: v.string(),
    url: v.string(),
    uploadedAt: v.number(),
  })
  .index("by_candidateId", ["candidateId"]),

  // ==================== COMPANIES ====================

  jobOffers: defineTable({
    companyId: v.id("users"),
    title: v.string(),
    description: v.string(),
    requirements: v.array(v.string()),
    location: v.string(),
    type: v.string(), // 'full-time', 'part-time', 'contract', etc.
    salaryMin: v.optional(v.number()),
    salaryMax: v.optional(v.number()),
    benefits: v.array(v.string()),
    skills: v.array(v.string()),
    status: v.string(), // 'draft', 'published', 'closed'

    // Nouveaux champs ultra détaillés
    experienceLevel: v.optional(v.string()), // 'junior', 'intermediate', 'senior', 'expert'
    languages: v.optional(v.array(v.object({
      language: v.string(),
      level: v.string() // 'basic', 'intermediate', 'fluent', 'native'
    }))),
    remoteWork: v.optional(v.string()), // 'no', 'partial', 'full'
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

    createdAt: v.number(),
    updatedAt: v.number(),
    expiresAt: v.optional(v.number()),
  })
  .index("by_companyId", ["companyId"])
  .index("by_status", ["status"])
  .index("by_experienceLevel", ["experienceLevel"])
  .index("by_remoteWork", ["remoteWork"])
  .index("by_department", ["department"]),

  // ==================== APPLICATIONS ====================

  applications: defineTable({
    jobId: v.id("jobOffers"),
    candidateId: v.id("candidateProfiles"),
    status: v.string(), // 'pending', 'reviewed', 'accepted', 'rejected'
    appliedAt: v.number(),
    coverLetter: v.optional(v.string()),
    resumeUrl: v.optional(v.string()),
  })
  .index("by_jobId", ["jobId"])
  .index("by_candidateId", ["candidateId"])
  .index("by_status", ["status"]),

  // ==================== MESSAGING ====================

  messages: defineTable({
    senderId: v.id("users"),
    receiverId: v.id("users"),
    content: v.string(),
    sentAt: v.number(),
    read: v.boolean(),
  })
  .index("by_sender", ["senderId"])
  .index("by_receiver", ["receiverId"])
  .index("by_conversation", ["senderId", "receiverId"]),

  // ==================== NOTIFICATIONS ====================

  notifications: defineTable({
    userId: v.id("users"),
    type: v.string(), // 'application', 'message', 'job_match', etc.
    title: v.string(),
    message: v.string(),
    read: v.boolean(),
    createdAt: v.number(),
    relatedId: v.optional(v.string()), // ID of related entity
  })
  .index("by_userId", ["userId"])
  .index("by_read", ["read"]),

  // ==================== JOB ALERTS ====================

  jobAlerts: defineTable({
    candidateId: v.id("candidateProfiles"),
    keywords: v.array(v.string()),
    location: v.optional(v.string()),
    salaryMin: v.optional(v.number()),
    jobTypes: v.array(v.string()),
    active: v.boolean(),
    createdAt: v.number(),
  })
  .index("by_candidateId", ["candidateId"]),

  // ==================== PROFILE VIEWS & CREDITS ====================

  profileViews: defineTable({
    companyId: v.id("users"),
    candidateId: v.id("candidateProfiles"),
    viewedAt: v.number(),
  })
  .index("by_companyId", ["companyId"])
  .index("by_candidateId", ["candidateId"])
  .index("by_company_candidate", ["companyId", "candidateId"]),

  unlockedProfiles: defineTable({
    companyId: v.id("users"),
    candidateId: v.id("candidateProfiles"),
    unlockedAt: v.number(),
  })
  .index("by_companyId", ["companyId"])
  .index("by_candidateId", ["candidateId"])
  .index("by_company_candidate", ["companyId", "candidateId"]),

  companyCredits: defineTable({
    companyId: v.id("users"),
    credits: v.number(),
    lastUpdated: v.number(),
  })
  .index("by_companyId", ["companyId"]),
});

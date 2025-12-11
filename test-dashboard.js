// Script de test pour les fonctionnalités du dashboard entreprise
import { ConvexHttpClient } from 'convex/browser';
import { api } from './convex/_generated/api.js';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config({ path: '.env.local' });

const convexUrl = process.env.VITE_CONVEX_URL;
if (!convexUrl) {
  console.error('❌ VITE_CONVEX_URL non trouvée dans .env.local');
  process.exit(1);
}

const client = new ConvexHttpClient(convexUrl);

let testCompanyEmail = '';
let testCandidateEmail = '';
let companyToken = '';
let candidateId = '';

async function createTestCompany() {
  try {
    console.log('🧪 Création d\'une entreprise de test...');
    const timestamp = Date.now();
    testCompanyEmail = `company${timestamp}@example.com`;
    const result = await client.mutation(api.auth.signup, {
      email: testCompanyEmail,
      password: 'password123',
      userType: 'company',
      companyName: 'TestCorp',
      firstName: 'Jane',
      lastName: 'Smith'
    });
    console.log('✅ Entreprise créée:', result);
    return result;
  } catch (error) {
    console.error('❌ Erreur création entreprise:', error.message);
    throw error;
  }
}

async function createTestCandidate() {
  try {
    console.log('🧪 Création d\'un candidat de test...');
    const timestamp = Date.now();
    testCandidateEmail = `candidate${timestamp}@example.com`;
    const result = await client.mutation(api.auth.signup, {
      email: testCandidateEmail,
      password: 'password123',
      userType: 'candidate',
      firstName: 'John',
      lastName: 'Doe'
    });
    console.log('✅ Candidat créé:', result);
    return result;
  } catch (error) {
    console.error('❌ Erreur création candidat:', error.message);
    throw error;
  }
}

async function signinAsCompany() {
  try {
    console.log('🧪 Connexion entreprise...');
    const result = await client.mutation(api.auth.signin, {
      email: testCompanyEmail,
      password: 'password123'
    });
    companyToken = result.token;
    console.log('✅ Connexion entreprise réussie');
    return result;
  } catch (error) {
    console.error('❌ Erreur connexion entreprise:', error.message);
    throw error;
  }
}

async function initializeCompanyCredits() {
  try {
    console.log('🧪 Initialisation des crédits...');
    // D'abord récupérer l'ID de l'entreprise
    const user = await client.query(api.auth.getCurrentUser, { token: companyToken });
    console.log('Utilisateur récupéré:', user);
    console.log('ID utilisateur:', user._id);
    const result = await client.mutation(api.jobs.initializeCompanyCredits, {
      companyId: user.userId,
      initialCredits: 10
    });
    console.log('✅ Crédits initialisés:', result);
    return result;
  } catch (error) {
    console.error('❌ Erreur initialisation crédits:', error.message);
    console.error('Détails:', error);
    throw error;
  }
}

async function createTestJob() {
  try {
    console.log('🧪 Création d\'une offre d\'emploi de test...');
    const result = await client.mutation(api.jobs.createJob, {
      token: companyToken,
      title: 'Développeur Full-Stack',
      description: 'Nous recherchons un développeur expérimenté...',
      requirements: ['React', 'Node.js', '3 ans d\'expérience'],
      location: 'Paris',
      type: 'full-time',
      salaryMin: 40000,
      salaryMax: 50000,
      benefits: ['RTT', 'Mutuelle'],
      skills: ['React', 'Node.js', 'JavaScript'],
      expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000
    });
    console.log('✅ Offre créée:', result);
    return result;
  } catch (error) {
    console.error('❌ Erreur création offre:', error.message);
    throw error;
  }
}

async function getCandidateProfile() {
  try {
    console.log('🧪 Récupération du profil candidat...');
    // Se connecter en tant que candidat pour créer un profil
    const candidateSignin = await client.mutation(api.auth.signin, {
      email: testCandidateEmail,
      password: 'password123'
    });

    // Créer un profil candidat basique
    const profileResult = await client.mutation(api.candidates.createProfile, {
      token: candidateSignin.token,
      firstName: 'John',
      lastName: 'Doe',
      email: testCandidateEmail,
      skills: ['React', 'Node.js'],
      experience: '3 ans',
      bio: 'Développeur passionné'
    });

    candidateId = profileResult.profileId;
    console.log('✅ Profil candidat créé:', profileResult);
    return profileResult;
  } catch (error) {
    console.error('❌ Erreur création profil candidat:', error.message);
    throw error;
  }
}

async function testViewProfile() {
  try {
    console.log('🧪 Test consultation de profil...');
    const result = await client.mutation(api.jobs.viewCandidateProfile, {
      token: companyToken,
      candidateId: candidateId
    });
    console.log('✅ Profil consulté:', result);
    return result;
  } catch (error) {
    console.error('❌ Erreur consultation profil:', error.message);
    throw error;
  }
}

async function testUnlockProfile() {
  try {
    console.log('🧪 Test déblocage de profil...');
    const result = await client.mutation(api.jobs.unlockCandidateProfile, {
      token: companyToken,
      candidateId: candidateId
    });
    console.log('✅ Profil débloqué:', result);
    return result;
  } catch (error) {
    console.error('❌ Erreur déblocage profil:', error.message);
    throw error;
  }
}

async function testGetRecruitmentStats() {
  try {
    console.log('🧪 Test récupération statistiques...');
    const result = await client.query(api.jobs.getRecruitmentStats, {
      token: companyToken
    });
    console.log('✅ Statistiques récupérées:', result);
    return result;
  } catch (error) {
    console.error('❌ Erreur récupération stats:', error.message);
    throw error;
  }
}

async function runTests() {
  try {
    console.log('🚀 Démarrage des tests du dashboard entreprise...\n');

    // Créer les utilisateurs de test
    await createTestCompany();
    await createTestCandidate();

    // Se connecter en tant qu'entreprise
    await signinAsCompany();

    // Initialiser les crédits
    await initializeCompanyCredits();

    // Créer une offre d'emploi
    await createTestJob();

    // Créer un profil candidat
    await getCandidateProfile();

    // Tester la consultation de profil
    await testViewProfile();

    // Tester le déblocage de profil
    await testUnlockProfile();

    // Vérifier les statistiques
    const stats = await testGetRecruitmentStats();

    // Vérifications finales
    console.log('\n📊 Vérification des résultats:');
    console.log(`- Profils consultés: ${stats.profilesViewed} (attendu: 1)`);
    console.log(`- Profils débloqués: ${stats.profilesUnlocked} (attendu: 1)`);
    console.log(`- Crédits restants: ${stats.creditsRemaining} (attendu: 9)`);

    if (stats.profilesViewed === 1 && stats.profilesUnlocked === 1 && stats.creditsRemaining === 9) {
      console.log('🎉 Tous les tests sont passés avec succès !');
    } else {
      console.log('⚠️ Certains tests ont échoué, vérifiez les valeurs ci-dessus.');
    }

  } catch (error) {
    console.error('💥 Échec des tests:', error);
    process.exit(1);
  }
}

runTests();
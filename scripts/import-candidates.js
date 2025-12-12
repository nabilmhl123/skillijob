// Script pour importer les candidats depuis candidates.json vers Convex
import { ConvexHttpClient } from 'convex/browser';
import { api } from './convex/_generated/api.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const convexUrl = process.env.VITE_CONVEX_URL;
if (!convexUrl) {
  console.error('❌ VITE_CONVEX_URL non trouvée dans .env.local');
  process.exit(1);
}

const client = new ConvexHttpClient(convexUrl);

async function importCandidates() {
  try {
    console.log('🚀 Démarrage de l\'importation des candidats...\n');

    // Lire le fichier JSON
    const candidatesPath = path.join(__dirname, 'src', 'data', 'candidates.json');
    const candidatesData = JSON.parse(fs.readFileSync(candidatesPath, 'utf8'));

    console.log(`📋 ${candidatesData.length} candidats trouvés dans le fichier JSON`);

    // Créer un utilisateur entreprise de test pour l'importation
    const timestamp = Date.now();
    const testCompanyEmail = `importer${timestamp}@example.com`;

    const companySignup = await client.mutation(api.auth.signup, {
      email: testCompanyEmail,
      password: 'password123',
      userType: 'company',
      companyName: 'ImportCompany',
      firstName: 'Import',
      lastName: 'Admin'
    });

    console.log('✅ Utilisateur entreprise créé pour l\'importation');

    // Se connecter
    const companySignin = await client.mutation(api.auth.signin, {
      email: testCompanyEmail,
      password: 'password123'
    });

    const companyToken = companySignin.token;

    // Importer chaque candidat
    for (const candidate of candidatesData) {
      try {
        // Créer un utilisateur candidat
        const candidateEmail = `candidate${candidate.id}_${timestamp}@example.com`;

        const candidateSignup = await client.mutation(api.auth.signup, {
          email: candidateEmail,
          password: 'password123',
          userType: 'candidate',
          firstName: candidate.name.split(' ')[0],
          lastName: candidate.name.split(' ').slice(1).join(' ')
        });

        // Se connecter en tant que candidat
        const candidateSignin = await client.mutation(api.auth.signin, {
          email: candidateEmail,
          password: 'password123'
        });

        // Créer le profil candidat
        const profileData = {
          token: candidateSignin.token,
          firstName: candidate.name.split(' ')[0],
          lastName: candidate.name.split(' ').slice(1).join(' '),
          email: candidateEmail,
          phone: `06 ${Math.floor(Math.random() * 90 + 10)} ${Math.floor(Math.random() * 90 + 10)} ${Math.floor(Math.random() * 90 + 10)} ${Math.floor(Math.random() * 90 + 10)}`,
          address: candidate.location,
          bio: `Professionnel expérimenté avec ${candidate.experience} d'expérience dans le domaine.`,
          skills: candidate.skills,
          experience: candidate.experience,
          education: candidate.education,
          availability: candidate.availability.toLowerCase(),
          linkedinUrl: `https://linkedin.com/in/${candidate.name.toLowerCase().replace(' ', '')}`,
          portfolioUrl: '',
          resumeUrl: ''
        };

        await client.mutation(api.candidates.createProfile, profileData);

        console.log(`✅ Candidat importé: ${candidate.name} - ${candidate.position}`);

      } catch (error) {
        console.error(`❌ Erreur lors de l'importation de ${candidate.name}:`, error.message);
      }
    }

    console.log('\n🎉 Importation terminée !');
    console.log('Vous pouvez maintenant voir tous les candidats dans le dashboard entreprise.');

  } catch (error) {
    console.error('💥 Erreur lors de l\'importation:', error);
    process.exit(1);
  }
}

importCandidates();
// Script de test pour les fonctions d'authentification
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

let testEmail = '';

async function testSignup() {
  try {
    console.log('🧪 Test d\'inscription...');
    const timestamp = Date.now();
    testEmail = `test${timestamp}@example.com`;
    const result = await client.mutation(api.auth.signup, {
      email: testEmail,
      password: 'password123',
      userType: 'candidate',
      firstName: 'John',
      lastName: 'Doe'
    });
    console.log('✅ Inscription réussie:', result);
    return result;
  } catch (error) {
    console.error('❌ Erreur inscription:', error.message);
    throw error;
  }
}

async function testSignin(email, password) {
  try {
    console.log('🧪 Test de connexion...');
    const result = await client.mutation(api.auth.signin, {
      email,
      password
    });
    console.log('✅ Connexion réussie:', result);
    return result;
  } catch (error) {
    console.error('❌ Erreur connexion:', error.message);
    throw error;
  }
}

async function testGetCurrentUser(token) {
  try {
    console.log('🧪 Test récupération utilisateur...');
    const result = await client.query(api.auth.getCurrentUser, { token });
    console.log('✅ Utilisateur récupéré:', result);
    return result;
  } catch (error) {
    console.error('❌ Erreur récupération:', error.message);
    throw error;
  }
}

async function testSignout(token) {
  try {
    console.log('🧪 Test de déconnexion...');
    const result = await client.mutation(api.auth.signout, { token });
    console.log('✅ Déconnexion réussie:', result);

    // Vérifier que le token n'est plus valide
    try {
      await client.query(api.auth.getCurrentUser, { token });
      console.error('❌ Token devrait être invalide après déconnexion');
    } catch (error) {
      console.log('✅ Token correctement invalidé après déconnexion');
    }

    return result;
  } catch (error) {
    console.error('❌ Erreur déconnexion:', error.message);
    throw error;
  }
}

async function runTests() {
  try {
    // Test inscription
    const signupResult = await testSignup();

    // Test connexion avec l'email généré
    const signinResult = await testSignin(testEmail, 'password123');

    // Test récupération utilisateur
    await testGetCurrentUser(signinResult.token);

    // Test déconnexion
    await testSignout(signinResult.token);

    console.log('🎉 Tous les tests sont passés !');
  } catch (error) {
    console.error('💥 Échec des tests:', error);
  }
}

runTests();
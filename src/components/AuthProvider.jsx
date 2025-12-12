import React, { createContext, useContext, useState, useEffect } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

// Contexte d'authentification
const AuthContext = createContext();

// Hook pour utiliser l'authentification
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Provider d'authentification
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken'));

  // Mutations Convex
  const signin = useMutation(api.auth.signin);
  const signup = useMutation(api.auth.signup);
  const signoutMutation = useMutation(api.auth.signout);
  const updateProfileMutation = useMutation(api.auth.updateProfile);
  const changePasswordMutation = useMutation(api.auth.changePassword);
  const getCurrentUser = useQuery(
    token ? api.auth.getCurrentUser : 'skip',
    token ? { token } : 'skip'
  );

  // Mettre à jour l'utilisateur quand on reçoit les données
  useEffect(() => {
    if (getCurrentUser && !getCurrentUser.error) {
      setUser(getCurrentUser);
    } else if (getCurrentUser?.error) {
      // Token invalide, se déconnecter
      logout();
    }
  }, [getCurrentUser]);

  // Fonction de connexion
  const login = async (email, password) => {
    try {
      const result = await signin({ email, password });
      setToken(result.token);
      localStorage.setItem('authToken', result.token);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Fonction d'inscription
  const register = async (userData) => {
    try {
      const result = await signup(userData);
      setToken(result.token);
      localStorage.setItem('authToken', result.token);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Fonction de déconnexion
  const logout = async () => {
    try {
      if (token) {
        await signoutMutation({ token });
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem('authToken');
    }
  };

  // Fonction de mise à jour du profil
  const updateProfile = async (data) => {
    if (!token) {
      throw new Error('Non authentifié');
    }
    return await updateProfileMutation({ token, ...data });
  };

  // Fonction de changement de mot de passe
  const changePassword = async (currentPassword, newPassword) => {
    if (!token) {
      throw new Error('Non authentifié');
    }
    return await changePasswordMutation({ token, currentPassword, newPassword });
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    currentUser: user,
    isAuthenticated: !!user,
    isLoading: token && !user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
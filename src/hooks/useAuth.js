import { useQuery, useMutation } from 'convex/react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../convex/_generated/api';
import { getAuthToken, logout as logoutUtil } from '../utils/auth';

export const useAuth = () => {
  const navigate = useNavigate();
  const token = getAuthToken();

  // Query pour obtenir l'utilisateur actuel
  const currentUser = useQuery(
    api.auth.getCurrentUser,
    token ? { token } : "skip"
  );

  // Mutations
  const signupMutation = useMutation(api.auth.signup);
  const signinMutation = useMutation(api.auth.signin);
  const signoutMutation = useMutation(api.auth.signout);
  const updateProfileMutation = useMutation(api.auth.updateProfile);
  const changePasswordMutation = useMutation(api.auth.changePassword);

  // Fonction de déconnexion
  const logout = async () => {
    if (token) {
      try {
        await signoutMutation({ token });
      } catch (error) {
        console.error('Erreur lors de la déconnexion:', error);
      }
    }
    logoutUtil();
    navigate('/login');
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

  return {
    currentUser,
    isAuthenticated: !!token && currentUser !== null,
    isLoading: token && currentUser === undefined,
    signup: signupMutation,
    signin: signinMutation,
    logout,
    updateProfile,
    changePassword,
  };
};

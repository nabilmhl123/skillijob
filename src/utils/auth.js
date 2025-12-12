// Utilitaires d'authentification

export const isAuthenticated = () => {
  const token = localStorage.getItem('authToken');
  return !!token;
};

export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

export const getUserType = () => {
  return localStorage.getItem('userType');
};

export const getUserId = () => {
  return localStorage.getItem('userId');
};

export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userId');
  localStorage.removeItem('userType');
};

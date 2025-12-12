import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { getAuthToken, logout } from '../utils/auth';

const ProtectedRoute = ({ children, allowedUserTypes = [] }) => {
  const navigate = useNavigate();
  const token = getAuthToken();

  // Récupérer l'utilisateur actuel
  const currentUser = useQuery(
    api.auth.getCurrentUser,
    token ? { token } : "skip"
  );

  useEffect(() => {
    // Si pas de token, rediriger vers la page de connexion
    if (!token) {
      navigate('/login');
      return;
    }

    // Si la query a été exécutée et retourne null, session invalide
    if (currentUser === null) {
      logout();
      navigate('/login');
      return;
    }

    // Si l'utilisateur est connecté mais n'a pas le bon type
    if (currentUser && allowedUserTypes.length > 0) {
      if (!allowedUserTypes.includes(currentUser.userType)) {
        // Rediriger vers le bon dashboard
        if (currentUser.userType === 'candidate') {
          navigate('/dashboard-candidat');
        } else {
          navigate('/dashboard-entreprise');
        }
      }
    }
  }, [token, currentUser, allowedUserTypes, navigate]);

  // Afficher un loader pendant la vérification
  if (!token) {
    return null;
  }

  if (currentUser === undefined) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px',
        color: '#666'
      }}>
        Chargement...
      </div>
    );
  }

  if (currentUser === null) {
    return null;
  }

  // Si tout est OK, afficher le contenu protégé
  return children;
};

export default ProtectedRoute;

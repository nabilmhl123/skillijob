import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMutation } from 'convex/react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../convex/_generated/api';
import Icons from '../components/shared/Icons';
import './LoginForm.css';

const LoginForm = () => {
  const [userType, setUserType] = useState('candidate'); // 'candidate' or 'company'
  const [authMode, setAuthMode] = useState('signin'); // 'signin' or 'signup'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    companyName: '',
    phone: '',
    position: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');

  const navigate = useNavigate();
  const signup = useMutation(api.auth.signup);
  const signin = useMutation(api.auth.signin);
  const requestPasswordReset = useMutation(api.auth.requestPasswordReset);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (authMode === 'signup') {
        // Validation pour l'inscription
        if (formData.password !== formData.confirmPassword) {
          setError('Les mots de passe ne correspondent pas');
          setLoading(false);
          return;
        }

        if (formData.password.length < 6) {
          setError('Le mot de passe doit contenir au moins 6 caractères');
          setLoading(false);
          return;
        }

        // Appel à la mutation signup
        const result = await signup({
          email: formData.email,
          password: formData.password,
          userType,
          firstName: formData.firstName || undefined,
          lastName: formData.lastName || undefined,
          companyName: formData.companyName || undefined,
          phone: formData.phone || undefined,
          position: formData.position || undefined,
          termsAccepted: true, // Assuming checkbox is checked since required
        });

        // Stocker le token dans localStorage
        localStorage.setItem('authToken', result.token);
        localStorage.setItem('userId', result.userId);
        localStorage.setItem('userType', result.userType);

        // Rediriger vers le dashboard approprié
        if (result.userType === 'candidate') {
          navigate('/dashboard-candidat');
        } else {
          navigate('/dashboard-entreprise');
        }
      } else {
        // Connexion
        const result = await signin({
          email: formData.email,
          password: formData.password,
        });

        // Stocker le token dans localStorage
        localStorage.setItem('authToken', result.token);
        localStorage.setItem('userId', result.userId);
        localStorage.setItem('userType', result.userType);

        // Rediriger vers le dashboard approprié
        if (result.userType === 'candidate') {
          navigate('/dashboard-candidat');
        } else {
          navigate('/dashboard-entreprise');
        }
      }
    } catch (err) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      companyName: '',
      phone: '',
      position: ''
    });
    setError('');
  };

  const switchAuthMode = () => {
    setAuthMode(authMode === 'signin' ? 'signup' : 'signin');
    resetForm();
  };

  const switchUserType = (type) => {
    setUserType(type);
    resetForm();
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setResetMessage('');
    setLoading(true);

    try {
      const result = await requestPasswordReset({ email: resetEmail });
      setResetMessage(result.message);
      if (result.resetToken) {
        console.log('Reset token (dev only):', result.resetToken);
      }
    } catch (err) {
      setResetMessage(err.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const candidateBenefits = [
    'Accédez à des milliers d\'offres d\'emploi',
    'Profil optimisé par nos experts RH',
    'Visibilité auprès de 500+ recruteurs',
    '100% gratuit pour les candidats'
  ];

  const companyBenefits = [
    'Accès à une base de talents qualifiés',
    'Profils vérifiés par nos experts',
    'Recrutement simplifié et efficace',
    'Support dédié à votre recrutement'
  ];

  const stats = [
    { value: '10k+', label: 'Candidats actifs' },
    { value: '500+', label: 'Entreprises partenaires' },
    { value: '95%', label: 'Taux de satisfaction' }
  ];

  return (
    <div className="auth-page-openai">
      {/* Brand Panel - Left Side */}
      <div className="brand-panel">
        <div className="brand-content">
          <div className="brand-logo">
            <img
              src="/logo-skillijob.png"
              alt="Skillijob"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'block';
              }}
            />
            <div className="brand-logo-text" style={{ display: 'none' }}>Skillijob</div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={userType}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="brand-info"
            >
              <h1 className="brand-title">
                {userType === 'candidate'
                  ? 'Trouvez votre prochain emploi'
                  : 'Recrutez les meilleurs talents'}
              </h1>

              <ul className="brand-benefits">
                {(userType === 'candidate' ? candidateBenefits : companyBenefits).map((benefit, index) => (
                  <li key={index}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="brand-stats">
                {stats.map((stat, index) => (
                  <div key={index} className="stat-box">
                    <div className="stat-value">{stat.value}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Form Panel - Right Side */}
      <div className="form-panel">
        <div className="form-container">
          {/* Header */}
          <div className="form-header">
            <h2>{authMode === 'signin' ? 'Connexion' : 'Inscription'}</h2>
            <p className="form-subtitle">
              {authMode === 'signin'
                ? 'Bienvenue ! Connectez-vous à votre espace'
                : 'Créez votre compte en quelques secondes'}
            </p>
          </div>

          {/* User Type Switch */}
          <div className="user-type-switch">
            <button
              type="button"
              className={`switch-btn ${userType === 'candidate' ? 'active' : ''}`}
              onClick={() => switchUserType('candidate')}
            >
              <Icons.User size={18} />
              Candidat
            </button>
            <button
              type="button"
              className={`switch-btn ${userType === 'company' ? 'active' : ''}`}
              onClick={() => switchUserType('company')}
            >
              <Icons.Briefcase size={18} />
              Entreprise
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div style={{
              padding: '12px',
              marginBottom: '16px',
              backgroundColor: '#fee',
              border: '1px solid #fcc',
              borderRadius: '8px',
              color: '#c33',
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}

          {/* Form */}
          <form className="auth-form" onSubmit={handleSubmit}>
            {/* Sign Up fields */}
            {authMode === 'signup' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {userType === 'candidate' ? (
                  <>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="firstName">Prénom *</label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          placeholder="Votre prénom"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="lastName">Nom *</label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          placeholder="Votre nom"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Téléphone</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="06 12 34 56 78"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="form-group">
                      <label htmlFor="companyName">Nom de l'entreprise *</label>
                      <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        required
                        placeholder="Nom de votre entreprise"
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="firstName">Prénom du contact *</label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          placeholder="Votre prénom"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="lastName">Nom du contact *</label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          placeholder="Votre nom"
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="position">Fonction *</label>
                        <input
                          type="text"
                          id="position"
                          name="position"
                          value={formData.position}
                          onChange={handleInputChange}
                          required
                          placeholder="Ex: Responsable RH"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="phone">Téléphone *</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          placeholder="01 23 45 67 89"
                        />
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            )}

            {/* Common fields */}
            <div className="form-group">
              <label htmlFor="email">Email {authMode === 'signup' && '*'}</label>
              <div className="input-with-icon">
                {/* <Icons.Mail size={20} className="input-icon" /> */}
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder={userType === 'candidate' ? 'votre.email@exemple.com' : 'contact@entreprise.com'}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Mot de passe {authMode === 'signup' && '*'}</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder="••••••••"
              />
            </div>

            {authMode === 'signup' && (
              <motion.div
                className="form-group"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label htmlFor="confirmPassword">Confirmer le mot de passe *</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  placeholder="••••••••"
                />
              </motion.div>
            )}

            {authMode === 'signin' && (
              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span>Se souvenir de moi</span>
                </label>
                <button type="button" className="forgot-link" onClick={() => setShowPasswordReset(true)}>Mot de passe oublié ?</button>
              </div>
            )}

            {authMode === 'signup' && (
              <div className="form-terms">
                <label className="checkbox-label">
                  <input type="checkbox" required />
                  <span>
                    J'accepte les <a href="#">conditions d'utilisation</a> et la{' '}
                    <a href="#">politique de confidentialité</a>
                  </span>
                </label>
              </div>
            )}

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? 'Chargement...' : (authMode === 'signin' ? 'Se connecter' : "S'inscrire")}
            </button>
          </form>

          {/* Divider */}
          <div className="auth-divider">
            <span>ou continuer avec</span>
          </div>

          {/* Social Auth */}
          <div className="social-auth">
            <button type="button" className="social-btn google-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button type="button" className="social-btn linkedin-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#0A66C2">
                <path d="M20.45 2H3.55C2.7 2 2 2.7 2 3.55v16.9C2 21.3 2.7 22 3.55 22h16.9c.85 0 1.55-.7 1.55-1.55V3.55C22 2.7 21.3 2 20.45 2zM8.45 18.95H5.5V9.7h2.95v9.25zM7 8.48c-.95 0-1.72-.78-1.72-1.73 0-.95.77-1.72 1.72-1.72.95 0 1.72.77 1.72 1.72 0 .95-.77 1.73-1.72 1.73zm11.95 10.47h-2.95v-4.5c0-1.07-.02-2.45-1.49-2.45-1.5 0-1.73 1.17-1.73 2.37v4.58h-2.95V9.7h2.83v1.26h.04c.39-.74 1.35-1.52 2.78-1.52 2.97 0 3.52 1.96 3.52 4.5v5.01z"/>
              </svg>
              LinkedIn
            </button>
          </div>

          {/* Switch Auth Mode */}
          <div className="form-footer">
            <p>
              {authMode === 'signin' ? "Pas encore de compte ?" : 'Déjà inscrit ?'}
              {' '}
              <button type="button" onClick={switchAuthMode} className="switch-mode-link">
                {authMode === 'signin' ? "Créer un compte" : 'Se connecter'}
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Password Reset Modal */}
      <AnimatePresence>
        {showPasswordReset && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPasswordReset(false)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>Réinitialiser le mot de passe</h3>
                <button
                  type="button"
                  className="modal-close"
                  onClick={() => setShowPasswordReset(false)}
                >
                  ×
                </button>
              </div>

              <form onSubmit={handlePasswordReset} className="modal-body">
                <p>Entrez votre adresse email pour recevoir un lien de réinitialisation.</p>

                <div className="form-group">
                  <label htmlFor="resetEmail">Email</label>
                  <input
                    type="email"
                    id="resetEmail"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    required
                    placeholder="votre.email@exemple.com"
                  />
                </div>

                {resetMessage && (
                  <div style={{
                    padding: '12px',
                    marginBottom: '16px',
                    backgroundColor: resetMessage.includes('succès') ? '#e6f7e6' : '#fee',
                    border: `1px solid ${resetMessage.includes('succès') ? '#cfc' : '#fcc'}`,
                    borderRadius: '8px',
                    color: resetMessage.includes('succès') ? '#363' : '#c33',
                    fontSize: '14px'
                  }}>
                    {resetMessage}
                  </div>
                )}

                <button type="submit" className="auth-submit-btn" disabled={loading}>
                  {loading ? 'Envoi...' : 'Envoyer le lien'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoginForm;

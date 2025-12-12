import { useState, useEffect } from 'react';
import { useAuth } from '../../components/AuthProvider';
import './ProfileSection.css';

const ProfileSection = () => {
  const { currentUser, updateProfile, changePassword } = useAuth();
  const [activeTab, setActiveTab] = useState('general');
  const [activeSubTab, setActiveSubTab] = useState('company');
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    phone: '',
    position: '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // États de validation
  const [validationErrors, setValidationErrors] = useState({});
  const [fieldTouched, setFieldTouched] = useState({});

  useEffect(() => {
    if (currentUser) {
      setProfileData({
        firstName: currentUser.firstName || '',
        lastName: currentUser.lastName || '',
        companyName: currentUser.companyName || '',
        phone: currentUser.phone || '',
        position: currentUser.position || '',
      });
    }
  }, [currentUser]);

  const validateField = (name, value) => {
    const errors = { ...validationErrors };

    switch (name) {
      case 'firstName':
        if (!value.trim()) {
          errors.firstName = 'Le prénom est requis';
        } else if (value.length < 2) {
          errors.firstName = 'Le prénom doit contenir au moins 2 caractères';
        } else {
          delete errors.firstName;
        }
        break;

      case 'lastName':
        if (!value.trim()) {
          errors.lastName = 'Le nom est requis';
        } else if (value.length < 2) {
          errors.lastName = 'Le nom doit contenir au moins 2 caractères';
        } else {
          delete errors.lastName;
        }
        break;

      case 'companyName':
        if (!value.trim()) {
          errors.companyName = 'Le nom de l\'entreprise est requis';
        } else if (value.length < 2) {
          errors.companyName = 'Le nom doit contenir au moins 2 caractères';
        } else {
          delete errors.companyName;
        }
        break;

      case 'position':
        if (!value.trim()) {
          errors.position = 'La fonction est requise';
        } else {
          delete errors.position;
        }
        break;

      case 'phone':
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        if (value && !phoneRegex.test(value)) {
          errors.phone = 'Format de téléphone invalide';
        } else {
          delete errors.phone;
        }
        break;

      default:
        break;
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });

    // Validation en temps réel
    if (fieldTouched[name]) {
      validateField(name, value);
    }
  };

  const handleProfileBlur = (e) => {
    const { name, value } = e.target;
    setFieldTouched({
      ...fieldTouched,
      [name]: true,
    });
    validateField(name, value);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });

    // Validation spéciale pour la confirmation
    if (name === 'confirmPassword' || name === 'newPassword') {
      const errors = { ...validationErrors };
      if (passwordData.newPassword && passwordData.confirmPassword &&
          passwordData.newPassword !== passwordData.confirmPassword) {
        errors.confirmPassword = 'Les mots de passe ne correspondent pas';
      } else {
        delete errors.confirmPassword;
      }
      setValidationErrors(errors);
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await updateProfile(profileData);
      setMessage({ type: 'success', text: '✅ Profil mis à jour avec succès !' });
      setIsEditing(false);
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: '❌ ' + error.message });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: '❌ Les nouveaux mots de passe ne correspondent pas' });
      setLoading(false);
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({ type: 'error', text: '❌ Le mot de passe doit contenir au moins 6 caractères' });
      setLoading(false);
      return;
    }

    try {
      await changePassword(passwordData.currentPassword, passwordData.newPassword);
      setMessage({ type: 'success', text: '✅ Mot de passe changé avec succès !' });
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: '❌ ' + error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Vérifier le type de fichier
      if (!file.type.startsWith('image/')) {
        setMessage({ type: 'error', text: '❌ Veuillez sélectionner une image valide' });
        return;
      }

      // Vérifier la taille (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setMessage({ type: 'error', text: '❌ L\'image ne doit pas dépasser 5MB' });
        return;
      }

      setProfileImage(file);

      // Créer un aperçu
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);

      setMessage({ type: 'success', text: '✅ Image sélectionnée avec succès' });
      setTimeout(() => setMessage({ type: '', text: '' }), 2000);
    }
  };

  const handleImageUpload = async () => {
    if (!profileImage) return;

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Ici on pourrait implémenter l'upload vers un service de stockage
      // Pour l'instant, on simule le succès
      setMessage({ type: 'success', text: '✅ Photo de profil mise à jour avec succès !' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: '❌ Erreur lors de l\'upload de l\'image' });
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return <div className="profile-loading">Chargement...</div>;
  }

  const isCandidate = currentUser.userType === 'candidate';

  return (
    <div className="profile-section">
      <div className="profile-header">
        <div className="profile-avatar">
          <div className="avatar-circle">
            {imagePreview ? (
              <img src={imagePreview} alt="Avatar" className="avatar-image" />
            ) : (
              currentUser.firstName?.[0]?.toUpperCase() || currentUser.email[0].toUpperCase()
            )}
          </div>
          <div className="avatar-upload">
            <label htmlFor="avatar-input" className="avatar-upload-btn">
              📷 Changer
            </label>
            <input
              id="avatar-input"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
            {profileImage && (
              <button
                className="avatar-save-btn"
                onClick={handleImageUpload}
                disabled={loading}
              >
                💾 Sauver
              </button>
            )}
          </div>
        </div>
        <div className="profile-header-info">
          <h2>
            {isCandidate
              ? `${currentUser.firstName || ''} ${currentUser.lastName || ''}`
              : currentUser.companyName || 'Entreprise'}
          </h2>
          <p className="profile-email">{currentUser.email}</p>
          <span className={`profile-badge ${isCandidate ? 'candidate' : 'company'}`}>
            {isCandidate ? '👤 Candidat' : '🏢 Entreprise'}
          </span>
        </div>
      </div>

      {message.text && (
        <div className={`profile-message ${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="profile-sidebar">
        <div className="sidebar-menu">
          {[
            {
              id: 'general',
              label: 'Général',
              icon: '🏢',
              subTabs: [
                { id: 'company', label: 'Entreprise', icon: '🏢' },
                { id: 'account', label: 'Mon profil', icon: '👤' }
              ]
            },
            {
              id: 'security',
              label: 'Sécurité',
              icon: '🔒',
              subTabs: [
                { id: 'password', label: 'Mot de passe', icon: '🔑' },
                { id: 'sessions', label: 'Sessions', icon: '🖥️' },
                { id: 'privacy', label: 'Confidentialité', icon: '🛡️' }
              ]
            },
            {
              id: 'team',
              label: 'Équipe',
              icon: '👥',
              subTabs: [
                { id: 'members', label: 'Membres', icon: '👥' },
                { id: 'roles', label: 'Rôles', icon: '⚙️' },
                { id: 'activity', label: 'Activité', icon: '📊' }
              ]
            },
            {
              id: 'offers',
              label: 'Offres',
              icon: '📄',
              subTabs: [
                { id: 'templates', label: 'Modèles', icon: '📝' },
                { id: 'settings', label: 'Paramètres', icon: '⚙️' }
              ]
            },
            {
              id: 'applications',
              label: 'Candidatures',
              icon: '📥',
              subTabs: [
                { id: 'pipeline', label: 'Pipeline', icon: '🔄' },
                { id: 'automation', label: 'Automatisations', icon: '🤖' },
                { id: 'filters', label: 'Filtres', icon: '🔍' }
              ]
            },
            {
              id: 'branding',
              label: 'Branding',
              icon: '💼',
              subTabs: [
                { id: 'company-page', label: 'Page entreprise', icon: '🏢' },
                { id: 'media', label: 'Médias', icon: '📸' },
                { id: 'testimonials', label: 'Témoignages', icon: '💬' }
              ]
            },
            {
              id: 'billing',
              label: 'Facturation',
              icon: '💳',
              subTabs: [
                { id: 'subscription', label: 'Abonnement', icon: '📅' },
                { id: 'invoices', label: 'Factures', icon: '📄' },
                { id: 'payment', label: 'Paiement', icon: '💳' }
              ]
            },
            {
              id: 'notifications',
              label: 'Notifications',
              icon: '🔔',
              subTabs: [
                { id: 'email', label: 'Email', icon: '📧' },
                { id: 'push', label: 'Push', icon: '📱' },
                { id: 'frequency', label: 'Fréquence', icon: '⏰' }
              ]
            },
            {
              id: 'integrations',
              label: 'Intégrations',
              icon: '🔗',
              subTabs: [
                { id: 'ats', label: 'ATS', icon: '💼' },
                { id: 'calendar', label: 'Calendrier', icon: '📅' },
                { id: 'api', label: 'API', icon: '🔧' }
              ]
            },
            {
              id: 'advanced',
              label: 'Avancé',
              icon: '⚙️',
              subTabs: [
                { id: 'gdpr', label: 'RGPD', icon: '🛡️' },
                { id: 'accessibility', label: 'Accessibilité', icon: '♿' },
                { id: 'preferences', label: 'Préférences', icon: '🎛️' }
              ]
            }
          ].map(category => (
            <div key={category.id} className="menu-category">
              <div className="category-header">
                <span className="category-icon">{category.icon}</span>
                <span className="category-label">{category.label}</span>
              </div>
              <div className="category-subtabs">
                {category.subTabs.map(subTab => (
                  <button
                    key={subTab.id}
                    className={`subtab-button ${activeTab === category.id && activeSubTab === subTab.id ? 'active' : ''}`}
                    onClick={() => {
                      setActiveTab(category.id);
                      setActiveSubTab(subTab.id);
                    }}
                  >
                    <span className="subtab-icon">{subTab.icon}</span>
                    <span className="subtab-label">{subTab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="profile-main-content">
        {/* GENERAL - Company Information */}
        {activeTab === 'general' && activeSubTab === 'company' && (
          <div className="profile-section-content">
            <div className="section-header">
              <h3>Informations de l'entreprise</h3>
              <p>Configurez l'identité publique de votre entreprise</p>
            </div>

            <div className="company-info-layout">
              {/* Branding Section */}
              <div className="branding-section">
                <div className="branding-header">
                  <h4>🎨 Identité visuelle</h4>
                  <p>Définissez l'image de marque de votre entreprise</p>
                </div>

                <div className="branding-grid">
                  {/* Logo Upload */}
                  <div className="media-upload-card">
                    <div className="upload-header">
                      <span className="upload-icon">🏷️</span>
                      <h5>Logo de l'entreprise</h5>
                    </div>
                    <div className="upload-area">
                      <div className="upload-placeholder">
                        <span className="placeholder-icon">📷</span>
                        <p>Cliquez pour ajouter un logo</p>
                        <small>JPG, PNG • Max 2MB</small>
                      </div>
                      <input type="file" accept="image/*" className="file-input" />
                    </div>
                    <div className="upload-actions">
                      <button className="upload-btn">📤 Importer</button>
                      <button className="remove-btn">🗑️ Supprimer</button>
                    </div>
                  </div>

                  {/* Banner Upload */}
                  <div className="media-upload-card banner-card">
                    <div className="upload-header">
                      <span className="upload-icon">🖼️</span>
                      <h5>Bannière / Image de couverture</h5>
                    </div>
                    <div className="upload-area banner-area">
                      <div className="upload-placeholder banner-placeholder">
                        <span className="placeholder-icon">🖼️</span>
                        <p>Ajouter une bannière</p>
                        <small>1200x400px recommandé • JPG, PNG • Max 5MB</small>
                      </div>
                      <input type="file" accept="image/*" className="file-input" />
                    </div>
                    <div className="upload-actions">
                      <button className="upload-btn">📤 Importer</button>
                      <button className="remove-btn">🗑️ Supprimer</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Details */}
              <div className="company-details-section">
                <div className="details-grid">
                  <div className="detail-card">
                    <h4>🏢 Informations générales</h4>
                    <div className="detail-fields">
                      <div className="field-group">
                        <label>Nom de l'entreprise *</label>
                        <input type="text" placeholder="Ex: TechCorp" className="primary-input" />
                      </div>
                      <div className="field-group">
                        <label>Slogan / Tagline</label>
                        <input type="text" placeholder="Ex: Innover ensemble" />
                      </div>
                      <div className="field-group">
                        <label>Secteur d'activité</label>
                        <select className="styled-select">
                          <option>Technologie</option>
                          <option>Finance</option>
                          <option>Santé</option>
                          <option>Commerce</option>
                          <option>Industrie</option>
                          <option>Éducation</option>
                          <option>Autre</option>
                        </select>
                      </div>
                      <div className="field-group">
                        <label>Taille de l'entreprise</label>
                        <select className="styled-select">
                          <option>1-10 employés</option>
                          <option>11-50 employés</option>
                          <option>51-200 employés</option>
                          <option>201-1000 employés</option>
                          <option>1000+ employés</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="detail-card">
                    <h4>📍 Localisation & Contact</h4>
                    <div className="detail-fields">
                      <div className="field-group">
                        <label>Adresse principale</label>
                        <input type="text" placeholder="123 Rue de la Paix, 75001 Paris" />
                      </div>
                      <div className="field-group">
                        <label>Adresse secondaire (optionnel)</label>
                        <input type="text" placeholder="456 Avenue des Champs, 75008 Paris" />
                      </div>
                      <div className="field-group">
                        <label>Site web</label>
                        <input type="url" placeholder="https://monentreprise.com" />
                      </div>
                      <div className="field-group">
                        <label>Téléphone entreprise</label>
                        <input type="tel" placeholder="+33 1 23 45 67 89" />
                      </div>
                    </div>
                  </div>

                  <div className="detail-card full-card">
                    <h4>📝 Présentation</h4>
                    <div className="detail-fields">
                      <div className="field-group">
                        <label>Description courte (accroche)</label>
                        <textarea rows="2" placeholder="Une phrase qui résume votre entreprise..."></textarea>
                      </div>
                      <div className="field-group">
                        <label>Description détaillée</label>
                        <textarea rows="6" placeholder="Présentez votre entreprise, ses valeurs, sa culture, ses objectifs..."></textarea>
                      </div>
                      <div className="field-group">
                        <label>Valeurs & Culture</label>
                        <textarea rows="3" placeholder="Innovation, Collaboration, Excellence..."></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button className="btn-save">💾 Enregistrer</button>
            </div>
          </div>
        )}

        {/* GENERAL - Account Profile */}
        {activeTab === 'general' && activeSubTab === 'account' && (
          <div>
            <h3>Mon profil</h3>
            <p>Gérez vos informations personnelles</p>

            <h4>Informations personnelles</h4>
            <p>Prénom: <input type="text" placeholder="Jean" /></p>
            <p>Nom: <input type="text" placeholder="Dupont" /></p>
            <p>Fonction: <input type="text" placeholder="Responsable RH" /></p>

            <h4>Contact</h4>
            <p>Email: <input type="email" placeholder="jean.dupont@entreprise.com" /></p>
            <p>Téléphone: <input type="tel" placeholder="+33 6 12 34 56 78" /></p>

            <h4>Préférences</h4>
            <p>Langue: <select><option>Français</option><option>English</option></select></p>
            <p>Fuseau horaire: <select><option>Europe/Paris</option><option>Europe/London</option></select></p>

            <p><button>Enregistrer</button></p>
          </div>
        )}

        {/* SECURITY - Password */}
        {activeTab === 'security' && activeSubTab === 'password' && (
          <div className="profile-section-content">
            <div className="section-header">
              <h3>Changer le mot de passe</h3>
              <p>Modifiez votre mot de passe pour sécuriser votre compte</p>
            </div>

            <div className="settings-grid">
              <div className="setting-card">
                <h4>🔒 Nouveau mot de passe</h4>
                <div className="setting-fields">
                  <div className="field-group">
                    <label>Mot de passe actuel *</label>
                    <input type="password" placeholder="••••••••" />
                  </div>
                  <div className="field-group">
                    <label>Nouveau mot de passe *</label>
                    <input type="password" placeholder="••••••••" />
                    <small>Minimum 8 caractères</small>
                  </div>
                  <div className="field-group">
                    <label>Confirmer le mot de passe *</label>
                    <input type="password" placeholder="••••••••" />
                  </div>
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button className="btn-save">🔒 Changer le mot de passe</button>
            </div>
          </div>
        )}

        {/* SECURITY - Sessions */}
        {activeTab === 'security' && activeSubTab === 'sessions' && (
          <div className="profile-section-content">
            <div className="section-header">
              <h3>Sessions actives</h3>
              <p>Gérez vos sessions connectées</p>
            </div>

            <div className="sessions-list">
              <div className="session-item current">
                <div className="session-info">
                  <div className="session-device">
                    <span className="device-icon">💻</span>
                    <div>
                      <strong>Chrome sur Windows</strong>
                      <p>Paris, France • Actif maintenant</p>
                    </div>
                  </div>
                </div>
                <span className="session-status">Session actuelle</span>
              </div>

              <div className="session-item">
                <div className="session-info">
                  <div className="session-device">
                    <span className="device-icon">📱</span>
                    <div>
                      <strong>iPhone</strong>
                      <p>Paris, France • Il y a 2 jours</p>
                    </div>
                  </div>
                </div>
                <button className="btn-revoke">Révoquer</button>
              </div>
            </div>
          </div>
        )}

        {/* SECURITY - Privacy */}
        {activeTab === 'security' && activeSubTab === 'privacy' && (
          <div className="profile-section-content">
            <div className="section-header">
              <h3>Confidentialité & RGPD</h3>
              <p>Contrôlez vos données personnelles</p>
            </div>

            <div className="settings-grid">
              <div className="setting-card">
                <h4>🛡️ Authentification à deux facteurs</h4>
                <div className="setting-fields">
                  <div className="toggle-setting">
                    <div>
                      <strong>2FA activé</strong>
                      <p>Renforcez la sécurité de votre compte</p>
                    </div>
                    <label className="toggle">
                      <input type="checkbox" />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="setting-card">
                <h4>📊 Historique de connexion</h4>
                <div className="setting-fields">
                  <p>Dernière connexion: Aujourd'hui à 10:30</p>
                  <button className="btn-secondary">Voir l'historique complet</button>
                </div>
              </div>

              <div className="setting-card danger">
                <h4>⚠️ Zone de danger</h4>
                <div className="setting-fields">
                  <button className="btn-danger">📥 Télécharger mes données</button>
                  <button className="btn-danger">🗑️ Supprimer mon compte</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TEAM - Members */}
        {activeTab === 'team' && activeSubTab === 'members' && (
          <div className="profile-section-content">
            <div className="section-header">
              <h3>Gestion de l'équipe</h3>
              <p>Invitez et gérez les membres de votre équipe</p>
            </div>

            <div className="team-actions">
              <button className="btn-primary">➕ Inviter un membre</button>
            </div>

            <div className="team-members">
              <div className="member-item">
                <div className="member-avatar">JD</div>
                <div className="member-info">
                  <strong>Jean Dupont</strong>
                  <p>jean.dupont@entreprise.com</p>
                  <span className="member-role">Admin</span>
                </div>
                <div className="member-actions">
                  <button className="btn-secondary">Modifier</button>
                  <button className="btn-danger">Retirer</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Placeholder for other sections */}
        {activeTab === 'team' && activeSubTab === 'roles' && (
          <div className="profile-section-content">
            <div className="section-header">
              <h3>Rôles et permissions</h3>
              <p>Configurez les rôles de votre équipe</p>
            </div>
            <div className="coming-soon">Fonctionnalité à venir</div>
          </div>
        )}

        {activeTab === 'team' && activeSubTab === 'activity' && (
          <div className="profile-section-content">
            <div className="section-header">
              <h3>Activité de l'équipe</h3>
              <p>Historique des actions de votre équipe</p>
            </div>
            <div className="coming-soon">Fonctionnalité à venir</div>
          </div>
        )}

        {activeTab === 'offers' && (
          <div className="profile-section-content">
            <div className="section-header">
              <h3>Modèles d'offres d'emploi</h3>
              <p>Créez et gérez vos modèles d'annonces</p>
            </div>
            <div className="coming-soon">Fonctionnalité à venir</div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="profile-section-content">
            <div className="section-header">
              <h3>Gestion des candidatures</h3>
              <p>Configurez votre processus de recrutement</p>
            </div>
            <div className="coming-soon">Fonctionnalité à venir</div>
          </div>
        )}

        {activeTab === 'branding' && (
          <div className="profile-section-content">
            <div className="section-header">
              <h3>Branding employeur</h3>
              <p>Présentez votre entreprise aux candidats</p>
            </div>
            <div className="coming-soon">Fonctionnalité à venir</div>
          </div>
        )}

        {activeTab === 'billing' && (
          <div className="profile-section-content">
            <div className="section-header">
              <h3>Facturation & Abonnements</h3>
              <p>Gérez vos paiements et abonnements</p>
            </div>
            <div className="coming-soon">Fonctionnalité à venir</div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="profile-section-content">
            <div className="section-header">
              <h3>Préférences de notifications</h3>
              <p>Configurez vos alertes et notifications</p>
            </div>
            <div className="coming-soon">Fonctionnalité à venir</div>
          </div>
        )}

        {activeTab === 'integrations' && (
          <div className="profile-section-content">
            <div className="section-header">
              <h3>Intégrations & API</h3>
              <p>Connectez vos outils externes</p>
            </div>
            <div className="coming-soon">Fonctionnalité à venir</div>
          </div>
        )}

        {activeTab === 'advanced' && (
          <div className="profile-section-content">
            <div className="section-header">
              <h3>Paramètres avancés</h3>
              <p>Configuration avancée de votre compte</p>
            </div>
            <div className="coming-soon">Fonctionnalité à venir</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSection;

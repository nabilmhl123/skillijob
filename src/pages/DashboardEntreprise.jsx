import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useAuth } from '../components/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Icons from '../components/shared/Icons';
import ProfileSection from '../components/dashboard/ProfileSection';
import './DashboardEntreprise.css';


// Dashboard entreprise avec données réelles de Convex

const DashboardEntreprise = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showJobModal, setShowJobModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { user, token } = useAuth();
  const navigate = useNavigate();

  // Données réelles depuis Convex
  const companyJobsQuery = useQuery(api.jobs.getCompanyJobs, { token });
  const companyJobs = companyJobsQuery || [];
  const jobStatsQuery = useQuery(api.jobs.getJobStats, { token });
  const jobStats = jobStatsQuery || {};
  const recruitmentStatsQuery = useQuery(api.jobs.getRecruitmentStats, { token });
  const recruitmentStats = recruitmentStatsQuery || {};
  const allCandidatesQuery = useQuery(api.candidates.getAllProfiles);
  const allCandidates = allCandidatesQuery || [];

  // Mutations pour la gestion des offres
  const deleteJobMutation = useMutation(api.jobs.deleteJob);

  // Fonction pour naviguer vers la publication d'offre
  const handlePublishOffer = () => {
    navigate('/publier-offre');
  };

  // Gestion des actions sur les offres
  const handleViewJob = (job) => {
    if (job) {
      setSelectedJob(job);
      setShowJobModal(true);
    }
  };

  const handleEditJob = (job) => {
    // Naviguer vers le formulaire avec les données de l'offre pour édition
    navigate('/publier-offre', {
      state: {
        editJob: job,
        isEditing: true
      }
    });
  };

  const handleDeleteJob = (job) => {
    if (job) {
      setSelectedJob(job);
      setShowDeleteModal(true);
    }
  };

  const confirmDeleteJob = async () => {
    if (selectedJob) {
      try {
        await deleteJobMutation({ token, jobId: selectedJob._id });
        setShowDeleteModal(false);
        setSelectedJob(null);
        // La liste se mettra à jour automatiquement grâce à la query
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        // TODO: Afficher une notification d'erreur
      }
    }
  };

  // Formater le salaire
  const formatSalary = (job) => {
    if (job.salaryMin && job.salaryMax) {
      return `${job.salaryMin}€ - ${job.salaryMax}€`;
    }
    return 'Non spécifié';
  };

  // Formater la date
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('fr-FR');
  };

  const menuItems = [
    { id: 'overview', icon: 'Target', label: 'Vue d\'ensemble', section: 'main' },
    { id: 'candidates', icon: 'Users', label: 'Candidats', section: 'main' },

    { id: 'publish-header', label: 'PUBLICATION', isHeader: true },
    { id: 'jobs', icon: 'Briefcase', label: 'Mes offres', section: 'main' },

    { id: 'profile-header', label: 'PROFIL', isHeader: true },
    { id: 'profile', icon: 'User', label: 'Mon profil', section: 'profile' },
    { id: 'settings', icon: 'Target', label: 'Paramètres', section: 'profile' },
  ];

  const IconComponent = ({ name, size = 20 }) => {
    const Icon = Icons[name];
    return Icon ? <Icon size={size} /> : null;
  };

  // Fonction pour rendre le contenu selon la section active
  const renderContent = () => {
    switch(activeTab) {
      case 'overview':
        return renderOverview();
      case 'jobs':
        return renderJobs();
      case 'candidates':
        return renderCandidates();
      case 'analytics':
        return renderAnalytics();
      case 'profile':
        return renderProfile();
      case 'settings':
        return renderSettings();
      default:
        return renderOverview();
    }
  };

  // Filtrage et recherche des candidats
  const filteredCandidates = allCandidates
    .filter(candidate => {
      const matchesSearch = searchTerm === '' ||
        candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (candidate.bio && candidate.bio.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (candidate.experience && candidate.experience.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (candidate.firstName && candidate.firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (candidate.lastName && candidate.lastName.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesFilter = filterBy === 'all' ||
        (filterBy === 'available' && candidate.availability === 'available') ||
        (filterBy === 'experienced' && candidate.experience && candidate.experience.includes('ans'));

      return matchesSearch && matchesFilter;
    });

  const renderOverview = () => (
    <>
      <section className="candidates-overview-section">

        {/* Barre de recherche et filtres */}
        <div className="search-filter-container">
          <div className="search-bar">
            <Icons.Search size={18} />
            <input
              type="text"
              className="search-input"
              placeholder="Rechercher par compétences, expérience..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="filter-select"
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
          >
            <option value="all">Tous les profils</option>
            <option value="available">Disponibles</option>
            <option value="experienced">Expérimentés (3+ ans)</option>
          </select>
        </div>

        {/* Grille des profils anonymisés */}
        <div className="candidates-grid">
          {filteredCandidates.length > 0 ? (
            filteredCandidates.map((candidate) => (
              <motion.div
                key={candidate._id}
                className="candidate-card"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {/* En-tête avec badge rond et label */}
                <div className="candidate-header">
                  <div className="candidate-avatar">
                    {candidate.firstName.charAt(0)}{candidate.lastName.charAt(0)}
                  </div>
                  <span className="candidate-label">Profil candidat</span>
                </div>

                {/* Informations principales */}
                <div className="candidate-info">
                  <div className="candidate-name">
                    {candidate.firstName} {candidate.lastName}
                  </div>

                  <div className="candidate-profile-text">
                    {candidate.bio && (
                      <p className="candidate-bio">
                        {candidate.bio.length > 80
                          ? candidate.bio.substring(0, 80) + '...'
                          : candidate.bio
                        }
                      </p>
                    )}

                    <p className="candidate-details-line">
                      📍 {candidate.address || 'Localisation non renseignée'} •
                      🎓 {candidate.experience || 'Expérience non spécifiée'} •
                      ⏱️ Disponibilité : {candidate.availability || '—'}
                    </p>
                  </div>
                </div>

                {/* Compétences */}
                {candidate.skills && candidate.skills.length > 0 && (
                  <div className="candidate-skills">
                    {candidate.skills.slice(0, 3).map((skill, index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))}
                    {candidate.skills.length > 3 && (
                      <span className="skill-more">+{candidate.skills.length - 3}</span>
                    )}
                  </div>
                )}

                {/* Pied de card */}
                <div className="candidate-footer">
                  <button
                    className="candidate-action-btn profile-btn"
                    onClick={() => {
                      setSelectedCandidate(candidate);
                      setShowProfileModal(true);
                    }}
                  >
                    Profil
                  </button>
                  <button
                    className="candidate-action-btn view-btn"
                    onClick={() => {
                      // Action neutre pour le moment
                      console.log('Voir candidat:', candidate.firstName, candidate.lastName);
                    }}
                  >
                    <Icons.Eye size={14} />
                    Voir
                  </button>
                  <span className="candidate-created-date">
                    Profil créé le {new Date(candidate.createdAt).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="no-candidates">
              <Icons.Users size={48} />
              <h3>Aucun profil trouvé</h3>
              <p>Ajustez vos critères de recherche ou revenez plus tard.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );

  const renderJobs = () => {
    try {
      return (
        <section className="jobs-section">
          <div className="section-header">
            <h2>Mes Offres d'Emploi</h2>
            <button className="primary-btn" onClick={handlePublishOffer}>
              <Icons.Plus size={16} />
              Nouvelle offre
            </button>
          </div>

          <div className="jobs-grid">
            {companyJobsQuery === undefined ? (
              <div className="loading-state">
                <Icons.Loader size={32} />
                <p>Chargement des offres...</p>
              </div>
            ) : companyJobs.length > 0 ? (
              companyJobs.map((job) => (
            <motion.div
              key={job._id}
              className="job-card"
              whileHover={{ y: -2 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="job-card-header">
                <div className="job-title-section">
                  <h3 className="job-title">{job?.title || 'Titre non disponible'}</h3>
                  <span className="status-badge status-green">
                    Publiée
                  </span>
                </div>
                <div className="job-department">{job?.department || 'Département non spécifié'}</div>
              </div>

              <div className="job-card-content">
                <div className="job-info">
                  <div className="job-meta">
                    <Icons.MapPin size={14} />
                    <span>{job?.location || 'Non spécifiée'}</span>
                  </div>
                  <div className="job-meta">
                    <Icons.Clock size={14} />
                    <span>{job?.createdAt ? formatDate(job.createdAt) : 'Date inconnue'}</span>
                  </div>
                </div>

                <div className="job-stats">
                  <div className="stat-item">
                    <span className="stat-label">Candidatures</span>
                    <span className="stat-value">0</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Vues</span>
                    <span className="stat-value">0</span>
                  </div>
                </div>
              </div>

              <div className="job-card-actions">
                <button
                  className="action-btn view-btn"
                  title="Voir les détails"
                  onClick={() => handleViewJob(job)}
                >
                  <Icons.Eye size={16} />
                  Voir
                </button>
                <button
                  className="action-btn edit-btn"
                  title="Modifier l'offre"
                  onClick={() => handleEditJob(job)}
                >
                  <Icons.Edit size={16} />
                  Modifier
                </button>
                <button
                  className="action-btn delete-btn"
                  title="Supprimer l'offre"
                  onClick={() => handleDeleteJob(job)}
                >
                  <Icons.X size={16} />
                  Supprimer
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="no-jobs">
            <div className="no-jobs-content">
              <Icons.Briefcase size={48} />
              <h3>Aucune offre publiée</h3>
              <p>Vous n'avez pas encore publié d'offres d'emploi.</p>
              <button
                className="create-first-job-btn"
                onClick={handlePublishOffer}
              >
                Créer ma première offre
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
      );
    } catch (error) {
      console.error('Erreur dans renderJobs:', error);
      return (
        <section className="jobs-section">
          <div className="section-header">
            <h2>Mes Offres d'Emploi</h2>
            <button className="primary-btn" onClick={handlePublishOffer}>
              <Icons.Plus size={16} />
              Nouvelle offre
            </button>
          </div>
          <div className="error-state">
            <Icons.AlertCircle size={48} />
            <h3>Erreur de chargement</h3>
            <p>Une erreur s'est produite lors du chargement des offres.</p>
            <button onClick={() => window.location.reload()} className="primary-btn">
              Recharger la page
            </button>
          </div>
        </section>
      );
    }
  };

  const renderCandidates = () => (
    <section className="candidates-section">
      <div className="section-header">
        <h2>Candidatures Reçues</h2>
      </div>
      <div className="coming-soon">
        <Icons.Users size={48} />
        <h2>Fonctionnalité à venir</h2>
        <p>La gestion des candidatures sera bientôt disponible.</p>
      </div>
    </section>
  );

  const renderAnalytics = () => (
    <section className="analytics-section">
      <div className="section-header">
        <h2>Statistiques</h2>
      </div>
      <div className="coming-soon">
        <Icons.BarChart size={48} />
        <h2>Analytics à venir</h2>
        <p>Les statistiques détaillées seront bientôt disponibles.</p>
      </div>
    </section>
  );

  const renderProfile = () => (
    <section className="profile-section">
      <ProfileSection />
    </section>
  );

  const renderSettings = () => (
    <section className="settings-section">
      <div className="section-header">
        <h2>Paramètres</h2>
      </div>
      <div className="coming-soon">
        <Icons.Target size={48} />
        <h2>Paramètres à venir</h2>
        <p>Les paramètres du compte seront bientôt disponibles.</p>
      </div>
    </section>
  );

  return (
    <div className="dashboard-crm">
      {/* SIDEBAR GAUCHE */}
      <aside className="crm-sidebar">
        {/* Logo Skillijob */}
        <div className="sidebar-logo">
          <div className="logo-image">
            <img src="/logo-skillijob.png" alt="Skillijob" />
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            if (item.isHeader) {
              return (
                <div key={item.id} className="nav-header">
                  {item.label}
                </div>
              );
            }
            return (
              <button
                key={item.id}
                className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => item.action ? item.action() : setActiveTab(item.id)}
              >
                <IconComponent name={item.icon} size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="crm-main">
        {/* HEADER AVEC STATISTIQUES ET PUBLICATION */}
        <header className="crm-header">
          <div className="header-content">
            <div className="header-stats">
              <div className="stat-item">
                <span className="stat-label">Offres publiées</span>
                <span className="stat-value">{jobStats?.total || 0}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Profils consultés</span>
                <span className="stat-value">{recruitmentStats?.profilesViewed || 0}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Profils débloqués</span>
                <span className="stat-value">{recruitmentStats?.profilesUnlocked || 0}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Crédits restants</span>
                <span className="stat-value">{recruitmentStats?.creditsRemaining || 0}</span>
              </div>
            </div>

            <div className="header-actions">
              <button
                className="nav-link-cta"
                onClick={handlePublishOffer}
              >
                Publier une offre
              </button>
            </div>
          </div>
        </header>

        {/* CONTENU PRINCIPAL */}
        <div className="crm-content">
          {renderContent()}
        </div>
      </main>

      {/* Modal Profil Candidat */}
      <AnimatePresence>
        {showProfileModal && selectedCandidate && (
          <motion.div
            className="profile-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowProfileModal(false)}
          >
            <motion.div
              className="profile-modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="profile-modal-header">
                <div className="profile-modal-avatar">
                  {selectedCandidate.firstName.charAt(0)}{selectedCandidate.lastName.charAt(0)}
                </div>
                <div className="profile-modal-info">
                  <h3>{selectedCandidate.firstName} {selectedCandidate.lastName}</h3>
                  <p>{selectedCandidate.experience || 'Expérience non spécifiée'}</p>
                </div>
                <button
                  className="profile-modal-close"
                  onClick={() => setShowProfileModal(false)}
                >
                  <Icons.X size={20} />
                </button>
              </div>

              <div className="profile-modal-content">
                <div className="profile-section">
                  <h4>Description</h4>
                  <p>{selectedCandidate.bio || 'Aucune description disponible.'}</p>
                </div>

                <div className="profile-section">
                  <h4>Compétences</h4>
                  <div className="profile-skills">
                    {selectedCandidate.skills && selectedCandidate.skills.length > 0 ? (
                      selectedCandidate.skills.map((skill, index) => (
                        <span key={index} className="profile-skill-tag">{skill}</span>
                      ))
                    ) : (
                      <p>Aucune compétence spécifiée.</p>
                    )}
                  </div>
                </div>

                <div className="profile-section">
                  <h4>Informations de contact</h4>
                  <div className="profile-contact-info">
                    <div className="contact-item">
                      <Icons.Mail size={16} />
                      <span>{selectedCandidate.email}</span>
                    </div>
                    {selectedCandidate.phone && (
                      <div className="contact-item">
                        <Icons.Phone size={16} />
                        <span>{selectedCandidate.phone}</span>
                      </div>
                    )}
                    {selectedCandidate.linkedinUrl && (
                      <div className="contact-item">
                        <Icons.ExternalLink size={16} />
                        <a href={selectedCandidate.linkedinUrl} target="_blank" rel="noopener noreferrer">
                          LinkedIn
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <div className="profile-section">
                  <h4>Informations supplémentaires</h4>
                  <div className="profile-details">
                    <div className="detail-item">
                      <strong>Localisation:</strong> {selectedCandidate.address || 'Non spécifiée'}
                    </div>
                    <div className="detail-item">
                      <strong>Éducation:</strong> {selectedCandidate.education || 'Non spécifiée'}
                    </div>
                    <div className="detail-item">
                      <strong>Disponibilité:</strong> {selectedCandidate.availability || 'Non spécifiée'}
                    </div>
                    <div className="detail-item">
                      <strong>Profil créé le:</strong> {new Date(selectedCandidate.createdAt).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Détails Offre */}
      <AnimatePresence>
        {showJobModal && selectedJob && (
          <motion.div
            className="profile-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowJobModal(false)}
          >
            <motion.div
              className="profile-modal job-modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="profile-modal-header">
                <div className="profile-modal-avatar job-avatar">
                  <Icons.Briefcase size={24} />
                </div>
                <div className="profile-modal-info">
                  <h3>{selectedJob.title}</h3>
                  <p>{selectedJob.department} • {selectedJob.location || 'Localisation non spécifiée'}</p>
                </div>
                <button
                  className="profile-modal-close"
                  onClick={() => setShowJobModal(false)}
                >
                  <Icons.X size={20} />
                </button>
              </div>

              <div className="profile-modal-content">
                <div className="profile-section">
                  <h4>Description du poste</h4>
                  <p>{selectedJob.description || 'Aucune description disponible.'}</p>
                </div>

                {selectedJob.requirements && selectedJob.requirements.length > 0 && (
                  <div className="profile-section">
                    <h4>Exigences</h4>
                    <ul>
                      {selectedJob.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedJob.skills && selectedJob.skills.length > 0 && (
                  <div className="profile-section">
                    <h4>Compétences requises</h4>
                    <div className="profile-skills">
                      {selectedJob.skills.map((skill, index) => (
                        <span key={index} className="profile-skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="profile-section">
                  <h4>Informations sur l'offre</h4>
                  <div className="profile-details">
                    <div className="detail-item">
                      <strong>Type de contrat:</strong> {selectedJob.type || 'Non spécifié'}
                    </div>
                    <div className="detail-item">
                      <strong>Secteur:</strong> {selectedJob.industry || 'Non spécifié'}
                    </div>
                    <div className="detail-item">
                      <strong>Niveau d'expérience:</strong> {selectedJob.experienceLevel || 'Non spécifié'}
                    </div>
                    {selectedJob.salaryMin && (
                      <div className="detail-item">
                        <strong>Salaire:</strong> {selectedJob.salaryMin}€ - {selectedJob.salaryMax}€ par an
                      </div>
                    )}
                    <div className="detail-item">
                      <strong>Statut:</strong>
                      <span className="status-badge status-green">
                        Publiée
                      </span>
                    </div>
                    <div className="detail-item">
                      <strong>Créée le:</strong> {new Date(selectedJob.createdAt).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                </div>

                <div className="modal-actions">
                  <button
                    className="action-btn edit-btn"
                    onClick={() => {
                      handleEditJob(selectedJob);
                      setShowJobModal(false);
                    }}
                  >
                    <Icons.Edit size={16} />
                    Modifier l'offre
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => {
                      handleDeleteJob(selectedJob);
                      setShowJobModal(false);
                    }}
                  >
                    <Icons.X size={16} />
                    Supprimer l'offre
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Confirmation Suppression */}
      <AnimatePresence>
        {showDeleteModal && selectedJob && (
          <motion.div
            className="profile-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDeleteModal(false)}
          >
            <motion.div
              className="profile-modal delete-modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="profile-modal-header">
                <div className="profile-modal-avatar delete-avatar">
                  <Icons.AlertCircle size={24} />
                </div>
                <div className="profile-modal-info">
                  <h3>Confirmer la suppression</h3>
                  <p>Êtes-vous sûr de vouloir supprimer cette offre ?</p>
                </div>
                <button
                  className="profile-modal-close"
                  onClick={() => setShowDeleteModal(false)}
                >
                  <Icons.X size={20} />
                </button>
              </div>

              <div className="profile-modal-content">
                <div className="delete-warning">
                  <p><strong>Offre :</strong> {selectedJob.title}</p>
                  <p>Cette action est irréversible. L'offre sera définitivement supprimée.</p>
                </div>

                <div className="modal-actions">
                  <button
                    className="action-btn cancel-btn"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Annuler
                  </button>
                  <button
                    className="action-btn delete-btn confirm-delete"
                    onClick={confirmDeleteJob}
                  >
                    <Icons.X size={16} />
                    Supprimer définitivement
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardEntreprise;

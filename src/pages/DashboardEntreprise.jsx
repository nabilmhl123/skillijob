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

  const { user, token } = useAuth();
  const navigate = useNavigate();

  // Données réelles depuis Convex
  const companyJobs = useQuery(api.jobs.getCompanyJobs, { token }) || [];
  const jobStats = useQuery(api.jobs.getJobStats, { token }) || {};
  const recruitmentStats = useQuery(api.jobs.getRecruitmentStats, { token }) || {};
  const allCandidates = useQuery(api.candidates.getAllProfiles) || [];

  // Fonction pour naviguer vers la publication d'offre
  const handlePublishOffer = () => {
    navigate('/publier-offre');
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
                <div className="candidate-header">
                  <div className="candidate-avatar">
                    {candidate.firstName.charAt(0)}{candidate.lastName.charAt(0)}
                  </div>
                  <div className="candidate-match">
                    <span className="match-label">Profil candidat</span>
                  </div>
                </div>

                <div className="candidate-info">
                  <div className="candidate-name">
                    {candidate.firstName} {candidate.lastName}
                  </div>
                  <div className="candidate-position">
                    {candidate.position || candidate.experience || 'Poste non spécifié'}
                  </div>
                  <div className="candidate-meta">
                    <span className="candidate-location">
                      <Icons.MapPin size={14} />
                      {candidate.address || 'Adresse non spécifiée'}
                    </span>
                    {candidate.availability && (
                      <span className="candidate-availability">
                        Disponibilité: {candidate.availability}
                      </span>
                    )}
                  </div>
                </div>

                {candidate.bio && (
                  <div className="candidate-description">
                    {candidate.bio.length > 100
                      ? candidate.bio.substring(0, 100) + '...'
                      : candidate.bio
                    }
                  </div>
                )}

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

                <div className="candidate-actions">
                  <button
                    className="candidate-action-btn profile-btn"
                    onClick={() => {
                      setSelectedCandidate(candidate);
                      setShowProfileModal(true);
                    }}
                  >
                    <Icons.User size={14} />
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
                </div>

                <div className="candidate-footer">
                  <span className="applied-date">
                    Profil créé {new Date(candidate.createdAt).toLocaleDateString('fr-FR')}
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

  const renderJobs = () => (
    <section className="jobs-section">
      <div className="section-header">
        <h2>Mes Offres d'Emploi</h2>
        <button className="primary-btn" onClick={handlePublishOffer}>
          <Icons.Plus size={16} />
          Nouvelle offre
        </button>
      </div>

      <div className="jobs-table-container">
        <table className="jobs-table">
          <thead>
            <tr>
              <th>Poste</th>
              <th>Statut</th>
              <th>Candidatures</th>
              <th>Vues</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {companyJobs.length > 0 ? (
              companyJobs.map((job) => (
                <tr key={job._id}>
                  <td className="job-title-cell">
                    <div className="job-title">{job.title}</div>
                    <div className="job-department">{job.department}</div>
                  </td>
                  <td>
                    <span className={`status-badge status-${job.status === 'published' ? 'green' : 'yellow'}`}>
                      {job.status === 'published' ? 'Publiée' : 'Brouillon'}
                    </span>
                  </td>
                  <td>0</td>
                  <td>0</td>
                  <td>{formatDate(job.createdAt)}</td>
                  <td>
                    <div className="job-actions">
                      <button className="action-btn view-btn">
                        <Icons.Eye size={14} />
                      </button>
                      <button className="action-btn edit-btn">
                        <Icons.Edit size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-jobs">
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
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );

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
                <span className="stat-label">Offres actives</span>
                <span className="stat-value">{jobStats.published || 0}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Profils consultés</span>
                <span className="stat-value">{recruitmentStats.profilesViewed || 0}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Profils débloqués</span>
                <span className="stat-value">{recruitmentStats.profilesUnlocked || 0}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Crédits restants</span>
                <span className="stat-value">{recruitmentStats.creditsRemaining || 0}</span>
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
    </div>
  );
};

export default DashboardEntreprise;

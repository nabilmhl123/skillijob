import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { getAuthToken } from '../utils/auth';
import Icons from '../components/shared/Icons';
import ProfileSection from '../components/dashboard/ProfileSection';
import './DashboardCandidat.css';

// Dashboard candidat avec données réelles de Convex

const DashboardCandidat = () => {
  const [activeTab, setActiveTab] = useState('jobs');
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeSection, setActiveSection] = useState('overview');

  const token = getAuthToken();

  // Données réelles depuis Convex
  const publishedJobs = useQuery(api.jobs.getPublishedJobs) || [];
  const jobOffers = publishedJobs;
  const myApplications = [];
  const applicationStats = null;
  const recommendations = publishedJobs.slice(0, 5); // Utiliser les offres publiées comme recommandations temporaires
  const experiences = [];
  const educations = [];

  // Fonction pour postuler à une offre
  const handleApplyToJob = async (jobOfferId) => {
    if (!token) {
      alert('Vous devez être connecté pour postuler');
      return;
    }

    // Fonctionnalité temporairement désactivée
    alert('Fonctionnalité de candidature à venir prochainement');
  };

  // Formater le salaire
  const formatSalary = (job) => {
    if (job.salaryMin && job.salaryMax) {
      return `${job.salaryMin}€ - ${job.salaryMax}€`;
    }
    return 'Non spécifié';
  };

  // Calculer les statistiques de progression du profil
  const calculateProfileProgress = () => {
    let totalFields = 0;
    let completedFields = 0;

    // Compter les expériences
    if (experiences && experiences.length > 0) {
      completedFields += 1;
    }
    totalFields += 1;

    // Compter les formations
    if (educations && educations.length > 0) {
      completedFields += 1;
    }
    totalFields += 1;

    return Math.round((completedFields / totalFields) * 100);
  };

  const profileProgress = calculateProfileProgress();
  const applicationsProgress = applicationStats ?
    Math.min(Math.round((applicationStats.total / 20) * 100), 100) : 0;
  const interviewProgress = applicationStats ?
    Math.min(Math.round((applicationStats.interview / 5) * 100), 100) : 0;

  const menuItems = [
    { id: 'overview', icon: 'Target', label: 'Vue d\'ensemble', section: 'main' },
    { id: 'profile', icon: 'User', label: 'Mon profil', section: 'main' },

    { id: 'search-header', label: 'RECHERCHE D\'EMPLOI', isHeader: true },
    { id: 'jobs', icon: 'Briefcase', label: 'Toutes les offres', section: 'search' },
    { id: 'recommended', icon: 'Target', label: 'Recommandées pour vous', section: 'search' },
    { id: 'saved', icon: 'FileText', label: 'Offres sauvegardées', section: 'search' },
    { id: 'alerts', icon: 'Zap', label: 'Alertes emploi', section: 'search' },

    { id: 'applications-header', label: 'MES CANDIDATURES', isHeader: true },
    { id: 'applications', icon: 'Package', label: 'Toutes les candidatures', section: 'applications' },
    { id: 'in-progress', icon: 'TrendingUp', label: 'En cours', section: 'applications' },
    { id: 'interviews', icon: 'MessageCircle', label: 'Entretiens', section: 'applications' },
    { id: 'offers-received', icon: 'Mail', label: 'Offres reçues', section: 'applications' },

    { id: 'profile-header', label: 'MON PROFIL', isHeader: true },
    { id: 'cv', icon: 'FileText', label: 'Mon CV', section: 'profile' },
    { id: 'documents', icon: 'File', label: 'Mes documents', section: 'profile' },
    { id: 'skills', icon: 'Target', label: 'Compétences', section: 'profile' },
    { id: 'preferences', icon: 'Target', label: 'Préférences', section: 'profile' },

    { id: 'communication-header', label: 'COMMUNICATION', isHeader: true },
    { id: 'messages', icon: 'Mail', label: 'Messages', section: 'communication' },
    { id: 'notifications', icon: 'Zap', label: 'Notifications', section: 'communication' },
  ];

  const IconComponent = ({ name, size = 20 }) => {
    const Icon = Icons[name];
    return Icon ? <Icon size={size} /> : null;
  };

  // Fonction pour rendre le contenu selon la section active
  const renderContent = () => {
    switch(activeSection) {
      case 'overview':
        return renderOverview();
      case 'profile':
        return renderProfile();
      case 'jobs':
        return renderJobs();
      case 'recommended':
        return renderRecommended();
      case 'saved':
        return renderSaved();
      case 'alerts':
        return renderAlerts();
      case 'applications':
        return renderApplications();
      case 'in-progress':
        return renderInProgress();
      case 'interviews':
        return renderInterviews();
      case 'offers-received':
        return renderOffersReceived();
      case 'cv':
        return renderCV();
      case 'documents':
        return renderDocuments();
      case 'skills':
        return renderSkills();
      case 'preferences':
        return renderPreferences();
      case 'messages':
        return renderMessages();
      case 'notifications':
        return renderNotifications();
      default:
        return renderOverview();
    }
  };

  const renderOverview = () => (
    <>
      <section className="opportunities-section">
        <div className="section-header">
          <h2>Offres d'Emploi Recommandées</h2>
          <div className="filter-pills">
            <button className={`pill ${activeFilter === 'all' ? 'active' : ''}`} onClick={() => setActiveFilter('all')}>Toutes</button>
            <button className={`pill ${activeFilter === 'cdi' ? 'active' : ''}`} onClick={() => setActiveFilter('cdi')}>CDI</button>
            <button className={`pill ${activeFilter === 'cdd' ? 'active' : ''}`} onClick={() => setActiveFilter('cdd')}>CDD</button>
            <button className={`pill ${activeFilter === 'remote' ? 'active' : ''}`} onClick={() => setActiveFilter('remote')}>Télétravail</button>
          </div>
        </div>
        <div className="opportunities-table">
          <table>
            <thead><tr><th>Entreprise</th><th>Poste</th><th>Localisation</th><th>Salaire</th><th>Type</th><th>Action</th></tr></thead>
            <tbody>
              {recommendations.length > 0 ? (
                recommendations.slice(0, 10).map((job) => (
                  <tr key={job._id}>
                    <td className="company-cell">
                      <div className="company-avatar"><Icons.Building size={18} /></div>
                      <span>{job.companyName}</span>
                    </td>
                    <td className="position-cell">{job.title}</td>
                    <td>{job.location}</td>
                    <td className="salary-cell">{formatSalary(job)}</td>
                    <td><span className="type-badge">{job.contractType}</span></td>
                    <td>
                      <button
                        className="action-btn"
                        onClick={() => handleApplyToJob(job._id)}
                      >
                        <Icons.Target size={16} />Postuler
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                    Aucune offre disponible pour le moment
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
      <section className="proposal-section">
        <div className="section-header">
          <h2>Ma Progression</h2>
          <button className="view-all-btn">Tout voir<Icons.ChevronDown size={16} /></button>
        </div>
        <div className="proposal-cards">
          <motion.div className="proposal-card" whileHover={{ y: -4 }}>
            <div className="card-header"><h3>Profil Optimisé</h3></div>
            <p className="card-description">
              {experiences.length > 0 && educations.length > 0
                ? 'Votre profil est bien rempli ! Ajoutez des compétences pour améliorer vos recommandations'
                : 'Complétez votre profil avec vos expériences et formations'}
            </p>
            <div className="progress-container">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${profileProgress}%` }}></div>
              </div>
              <span className="progress-label">{profileProgress}%</span>
            </div>
          </motion.div>

          <motion.div className="proposal-card" whileHover={{ y: -4 }}>
            <div className="card-header"><h3>Candidatures Actives</h3></div>
            <p className="card-description">
              {applicationStats
                ? `${applicationStats.total} candidatures envoyées - ${applicationStats.viewed + applicationStats.shortlisted} réponses`
                : 'Commencez à postuler aux offres qui vous intéressent'}
            </p>
            <div className="progress-container">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${applicationsProgress}%` }}></div>
              </div>
              <span className="progress-label">{applicationsProgress}%</span>
            </div>
          </motion.div>

          <motion.div className="proposal-card" whileHover={{ y: -4 }}>
            <div className="card-header"><h3>Entretiens à Venir</h3></div>
            <p className="card-description">
              {applicationStats && applicationStats.interview > 0
                ? `${applicationStats.interview} entretiens programmés`
                : 'Aucun entretien programmé pour le moment'}
            </p>
            <div className="progress-container">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${interviewProgress}%` }}></div>
              </div>
              <span className="progress-label">{interviewProgress}%</span>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );

  const renderProfile = () => (
    <section className="opportunities-section">
      <ProfileSection />
    </section>
  );

  const renderJobs = () => (
    <section className="opportunities-section">
      <div className="section-header">
        <h2>💼 Toutes les Offres d'Emploi</h2>
        <div className="filter-pills">
          <button className="pill active">Récentes</button>
          <button className="pill">Mieux payées</button>
          <button className="pill">À proximité</button>
        </div>
      </div>
      <div className="opportunities-table">
        <table>
          <thead><tr><th>Entreprise</th><th>Poste</th><th>Localisation</th><th>Salaire</th><th>Type</th><th>Action</th></tr></thead>
          <tbody>
            {jobOffers.length > 0 ? (
              jobOffers.map((job) => (
                <tr key={job._id}>
                  <td className="company-cell">
                    <div className="company-avatar"><Icons.Building size={18} /></div>
                    <span>{job.companyName}</span>
                  </td>
                  <td className="position-cell">{job.title}</td>
                  <td>{job.location}</td>
                  <td className="salary-cell">{formatSalary(job)}</td>
                  <td><span className="type-badge">{job.contractType}</span></td>
                  <td>
                    <button
                      className="action-btn"
                      onClick={() => handleApplyToJob(job._id)}
                    >
                      <Icons.Target size={16} />Postuler
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                  Aucune offre disponible pour le moment
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );

  const renderRecommended = () => (
    <section className="opportunities-section">
      <div className="section-header"><h2>🎯 Offres Recommandées pour Vous</h2></div>
      <div className="opportunities-table">
        <table>
          <thead><tr><th>Entreprise</th><th>Poste</th><th>Match</th><th>Salaire</th><th>Action</th></tr></thead>
          <tbody>
            {recommendations.length > 0 ? (
              recommendations.map((job) => (
                <tr key={job._id}>
                  <td className="company-cell">
                    <div className="company-avatar"><Icons.Building size={18} /></div>
                    <span>{job.companyName}</span>
                  </td>
                  <td className="position-cell">{job.title}</td>
                  <td><span className="status-badge status-green">{job.matchScore || 95}% match</span></td>
                  <td className="salary-cell">{formatSalary(job)}</td>
                  <td>
                    <button
                      className="action-btn"
                      onClick={() => handleApplyToJob(job._id)}
                    >
                      <Icons.Target size={16} />Postuler
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                  Complétez votre profil pour obtenir des recommandations personnalisées
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );

  const renderSaved = () => (
    <section className="opportunities-section">
      <div className="section-header"><h2>⭐ Offres Sauvegardées</h2></div>
      <div className="opportunities-table">
        <table>
          <thead><tr><th>Entreprise</th><th>Poste</th><th>Localisation</th><th>Salaire</th><th>Action</th></tr></thead>
          <tbody>
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                Fonctionnalité "Offres sauvegardées" à venir prochainement
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );

  const renderAlerts = () => (
    <section className="opportunities-section">
      <div className="section-header"><h2>⚡ Alertes Emploi</h2></div>
      <div className="dashboard-section">
        <div className="jobs-list">
          <div className="job-item">
            <div className="job-info">
              <h3>Aucune alerte active</h3>
              <p>Créez des alertes pour recevoir des offres par email</p>
            </div>
            <button className="action-btn">Créer une alerte</button>
          </div>
        </div>
      </div>
    </section>
  );

  const renderApplications = () => {
    const statusColors = {
      submitted: 'blue',
      viewed: 'yellow',
      shortlisted: 'green',
      interview: 'green',
      rejected: 'red',
      accepted: 'green'
    };

    const statusLabels = {
      submitted: 'Envoyée',
      viewed: 'Vue',
      shortlisted: 'Pré-sélectionné',
      interview: 'Entretien',
      rejected: 'Refusée',
      accepted: 'Acceptée'
    };

    return (
      <section className="opportunities-section">
        <div className="section-header"><h2>📦 Toutes Mes Candidatures</h2></div>
        {applicationStats && (
          <div className="stats-grid" style={{ marginBottom: '2rem' }}>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #6C00FF, #9D50FF)' }}>
                <Icons.Package size={24} />
              </div>
              <div className="stat-info">
                <h3>{applicationStats.total}</h3>
                <p>Candidatures envoyées</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #10B981, #34D399)' }}>
                <Icons.TrendingUp size={24} />
              </div>
              <div className="stat-info">
                <h3>{applicationStats.viewed + applicationStats.shortlisted}</h3>
                <p>Réponses positives</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #F59E0B, #FBBF24)' }}>
                <Icons.MessageCircle size={24} />
              </div>
              <div className="stat-info">
                <h3>{applicationStats.interview}</h3>
                <p>Entretiens programmés</p>
              </div>
            </div>
          </div>
        )}
        <div className="opportunities-table">
          <table>
            <thead><tr><th>Entreprise</th><th>Poste</th><th>Date</th><th>Statut</th></tr></thead>
            <tbody>
              {myApplications.length > 0 ? (
                myApplications.map((app) => (
                  <tr key={app._id}>
                    <td className="company-cell">
                      <div className="company-avatar"><Icons.Building size={18} /></div>
                      <span>{app.companyName}</span>
                    </td>
                    <td className="position-cell">{app.jobTitle}</td>
                    <td>{new Date(app.appliedAt).toLocaleDateString('fr-FR')}</td>
                    <td>
                      <span className={`status-badge status-${statusColors[app.status]}`}>
                        {statusLabels[app.status]}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                    Vous n'avez pas encore envoyé de candidature
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    );
  };

  const renderInProgress = () => {
    const inProgressApps = myApplications.filter(app =>
      ['viewed', 'shortlisted', 'interview'].includes(app.status)
    );

    const statusLabels = {
      viewed: 'Vue par le recruteur',
      shortlisted: 'Pré-sélectionné',
      interview: 'Entretien programmé'
    };

    return (
      <section className="opportunities-section">
        <div className="section-header"><h2>📈 Candidatures en Cours</h2></div>
        <div className="opportunities-table">
          <table>
            <thead><tr><th>Entreprise</th><th>Poste</th><th>Étape</th><th>Date de candidature</th></tr></thead>
            <tbody>
              {inProgressApps.length > 0 ? (
                inProgressApps.map((app) => (
                  <tr key={app._id}>
                    <td className="company-cell">
                      <div className="company-avatar"><Icons.Building size={18} /></div>
                      <span>{app.companyName}</span>
                    </td>
                    <td className="position-cell">{app.jobTitle}</td>
                    <td><span className="status-badge status-yellow">{statusLabels[app.status]}</span></td>
                    <td>{new Date(app.appliedAt).toLocaleDateString('fr-FR')}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                    Aucune candidature en cours
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    );
  };

  const renderInterviews = () => {
    const interviewApps = myApplications.filter(app => app.status === 'interview');

    return (
      <section className="opportunities-section">
        <div className="section-header"><h2>💬 Mes Entretiens</h2></div>
        <div className="opportunities-table">
          <table>
            <thead><tr><th>Entreprise</th><th>Poste</th><th>Localisation</th><th>Date de candidature</th></tr></thead>
            <tbody>
              {interviewApps.length > 0 ? (
                interviewApps.map((app) => (
                  <tr key={app._id}>
                    <td className="company-cell">
                      <div className="company-avatar"><Icons.Building size={18} /></div>
                      <span>{app.companyName}</span>
                    </td>
                    <td className="position-cell">{app.jobTitle}</td>
                    <td>{app.jobLocation}</td>
                    <td>{new Date(app.appliedAt).toLocaleDateString('fr-FR')}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                    Aucun entretien programmé
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    );
  };

  const renderOffersReceived = () => {
    const acceptedApps = myApplications.filter(app => app.status === 'accepted');

    return (
      <section className="opportunities-section">
        <div className="section-header"><h2>✉️ Offres d'Emploi Reçues</h2></div>
        <div className="opportunities-table">
          <table>
            <thead><tr><th>Entreprise</th><th>Poste</th><th>Salaire Proposé</th><th>Date</th></tr></thead>
            <tbody>
              {acceptedApps.length > 0 ? (
                acceptedApps.map((app) => (
                  <tr key={app._id}>
                    <td className="company-cell">
                      <div className="company-avatar"><Icons.Building size={18} /></div>
                      <span>{app.companyName}</span>
                    </td>
                    <td className="position-cell">{app.jobTitle}</td>
                    <td className="salary-cell">{app.salary}</td>
                    <td>{new Date(app.appliedAt).toLocaleDateString('fr-FR')}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                    Aucune offre d'emploi reçue pour le moment
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    );
  };

  const renderCV = () => (
    <section className="opportunities-section">
      <div className="section-header"><h2>📄 Mon CV</h2></div>
      <div className="dashboard-section">
        <h2>CV Actuel</h2>
        <div style={{ marginTop: '1.5rem' }}>
          <p>Vous n'avez pas encore créé de CV</p>
          <button className="action-btn" style={{ marginTop: '1.5rem' }}><Icons.FileText size={16} />Créer mon CV</button>
        </div>
      </div>
    </section>
  );

  const renderDocuments = () => (
    <section className="opportunities-section">
      <div className="section-header"><h2>📁 Mes Documents</h2></div>
      <div className="dashboard-section">
        <div className="jobs-list">
          <div className="job-item">
            <div className="job-info">
              <h3>Aucun document</h3>
              <p>Vous n'avez pas encore ajouté de documents</p>
            </div>
            <button className="action-btn"><Icons.FileText size={16} />Ajouter un document</button>
          </div>
        </div>
      </div>
    </section>
  );

  const renderSkills = () => (
    <section className="opportunities-section">
      <div className="section-header"><h2>🎯 Mes Compétences</h2></div>
      <div className="proposal-cards">
        <motion.div className="proposal-card">
          <h3>Aucune compétence ajoutée</h3>
          <p>Ajoutez vos compétences pour améliorer vos recommandations</p>
          <button className="action-btn" style={{ marginTop: '1rem' }}>Ajouter des compétences</button>
        </motion.div>
      </div>
    </section>
  );

  const renderPreferences = () => (
    <section className="opportunities-section">
      <div className="section-header"><h2>⚙️ Mes Préférences</h2></div>
      <div className="dashboard-section">
        <h2>Préférences de Recherche</h2>
        <div style={{ marginTop: '1.5rem' }}>
          <p>Vous n'avez pas encore défini vos préférences de recherche</p>
          <button className="action-btn" style={{ marginTop: '1rem' }}>Définir mes préférences</button>
        </div>
      </div>
    </section>
  );

  const renderMessages = () => (
    <section className="opportunities-section">
      <div className="section-header"><h2>✉️ Mes Messages</h2></div>
      <div className="dashboard-section">
        <div className="applications-list">
          <div className="application-item">
            <div className="candidate-info">
              <div className="candidate-avatar"><Icons.Mail size={20} /></div>
              <div>
                <h3>Aucun message</h3>
                <p className="position-name">Vous n'avez pas encore de messages</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const renderNotifications = () => (
    <section className="opportunities-section">
      <div className="section-header"><h2>🔔 Notifications</h2></div>
      <div className="dashboard-section">
        <div className="applications-list">
          <div className="application-item">
            <div className="candidate-info">
              <div className="candidate-avatar"><Icons.Zap size={20} /></div>
              <div>
                <h3>Aucune notification</h3>
                <p className="position-name">Vous n'avez pas de nouvelles notifications</p>
              </div>
            </div>
          </div>
        </div>
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
                className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => setActiveSection(item.id)}
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
        {/* HEADER AVEC NAVIGATION SKILLIJOB */}
        <header className="crm-header">
          <nav className="header-nav">
            <a href="/candidats" className="nav-link">
              Candidats
            </a>
            <a href="/tarifs" className="nav-link">
              Tarifs
            </a>
            <a href="/publier-offre" className="nav-link nav-link-cta">
              Publier une offre
            </a>
          </nav>
        </header>

        {/* CONTENU PRINCIPAL */}
        <div className="crm-content">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default DashboardCandidat;

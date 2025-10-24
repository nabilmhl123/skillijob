import { useState } from 'react';
import { motion } from 'framer-motion';
import Icons from '../components/shared/Icons';
import './DashboardCandidat.css';

const DashboardCandidat = () => {
  const [activeTab, setActiveTab] = useState('jobs');
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeSection, setActiveSection] = useState('overview');

  // Données fictives pour le tableau d'offres d'emploi
  const jobOffers = [
    {
      id: 1,
      company: 'Google France',
      position: 'Senior Software Engineer',
      location: 'Paris (Hybrid)',
      salary: '70K€ - 90K€',
      type: 'CDI',
      status: 'Nouveau',
      statusColor: 'blue'
    },
    {
      id: 2,
      company: 'Airbnb',
      position: 'Product Designer',
      location: 'Paris',
      salary: '55K€ - 70K€',
      type: 'CDI',
      status: 'En vue',
      statusColor: 'yellow'
    },
    {
      id: 3,
      company: 'BlaBlaCar',
      position: 'Data Scientist',
      location: 'Paris (Télétravail)',
      salary: '50K€ - 65K€',
      type: 'CDI',
      status: 'Intéressant',
      statusColor: 'green'
    },
    {
      id: 4,
      company: 'Doctolib',
      position: 'Frontend Developer React',
      location: 'Paris / Lyon',
      salary: '48K€ - 60K€',
      type: 'CDI',
      status: 'Nouveau',
      statusColor: 'blue'
    },
    {
      id: 5,
      company: 'Alan',
      position: 'Full Stack Engineer',
      location: 'Paris (Remote OK)',
      salary: '52K€ - 68K€',
      type: 'CDI',
      status: 'Nouveau',
      statusColor: 'blue'
    },
    {
      id: 6,
      company: 'Deezer',
      position: 'Mobile Developer iOS',
      location: 'Paris',
      salary: '50K€ - 65K€',
      type: 'CDI',
      status: 'En vue',
      statusColor: 'yellow'
    },
    {
      id: 7,
      company: 'Leboncoin',
      position: 'Backend Developer Node.js',
      location: 'Paris',
      salary: '48K€ - 62K€',
      type: 'CDI',
      status: 'Nouveau',
      statusColor: 'blue'
    },
    {
      id: 8,
      company: 'Dashlane',
      position: 'DevOps Engineer',
      location: 'Paris (Full Remote)',
      salary: '55K€ - 70K€',
      type: 'CDI',
      status: 'Intéressant',
      statusColor: 'green'
    },
    {
      id: 9,
      company: 'Contentsquare',
      position: 'Product Manager',
      location: 'Paris',
      salary: '60K€ - 75K€',
      type: 'CDI',
      status: 'En vue',
      statusColor: 'yellow'
    },
    {
      id: 10,
      company: 'Algolia',
      position: 'Solutions Architect',
      location: 'Paris (Hybrid)',
      salary: '65K€ - 80K€',
      type: 'CDI',
      status: 'Nouveau',
      statusColor: 'blue'
    },
  ];

  // Données pour les cartes de progression
  const progressCards = [
    {
      id: 1,
      title: 'Profil Optimisé',
      description: 'Complétez votre CV et ajoutez vos compétences React, Node.js, TypeScript',
      progress: 85
    },
    {
      id: 2,
      title: 'Candidatures Actives',
      description: '18 candidatures envoyées - 5 réponses positives',
      progress: 70
    },
    {
      id: 3,
      title: 'Entretiens à Venir',
      description: '4 entretiens programmés cette semaine chez Google, Airbnb, Alan',
      progress: 55
    }
  ];

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
          <h2>Offres d'Emploi Disponibles</h2>
          <div className="filter-pills">
            <button className={`pill ${activeFilter === 'all' ? 'active' : ''}`} onClick={() => setActiveFilter('all')}>Toutes</button>
            <button className={`pill ${activeFilter === 'cdi' ? 'active' : ''}`} onClick={() => setActiveFilter('cdi')}>CDI</button>
            <button className={`pill ${activeFilter === 'cdd' ? 'active' : ''}`} onClick={() => setActiveFilter('cdd')}>CDD</button>
            <button className={`pill ${activeFilter === 'remote' ? 'active' : ''}`} onClick={() => setActiveFilter('remote')}>Télétravail</button>
            <button className={`pill ${activeFilter === 'saved' ? 'active' : ''}`} onClick={() => setActiveFilter('saved')}>Sauvegardées</button>
          </div>
        </div>
        <div className="opportunities-table">
          <table>
            <thead><tr><th>Entreprise</th><th>Poste</th><th>Localisation</th><th>Salaire</th><th>Type</th><th>Action</th></tr></thead>
            <tbody>
              {jobOffers.map((job) => (
                <tr key={job.id}>
                  <td className="company-cell"><div className="company-avatar"><Icons.Building size={18} /></div><span>{job.company}</span></td>
                  <td className="position-cell">{job.position}</td>
                  <td>{job.location}</td>
                  <td className="salary-cell">{job.salary}</td>
                  <td><span className="type-badge">{job.type}</span></td>
                  <td><button className="action-btn"><Icons.Target size={16} />Postuler</button></td>
                </tr>
              ))}
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
          {progressCards.map((card) => (
            <motion.div key={card.id} className="proposal-card" whileHover={{ y: -4 }}>
              <div className="card-header"><h3>{card.title}</h3></div>
              <p className="card-description">{card.description}</p>
              <div className="progress-container">
                <div className="progress-bar"><div className="progress-fill" style={{ width: `${card.progress}%` }}></div></div>
                <span className="progress-label">{card.progress}%</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );

  const renderProfile = () => (
    <section className="opportunities-section">
      <div className="section-header"><h2>👤 Mon Profil</h2></div>
      <div className="dashboard-section">
        <h2>Informations Personnelles</h2>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div><strong>Nom:</strong> Jean Dupont</div>
          <div><strong>Email:</strong> jean.dupont@email.com</div>
          <div><strong>Téléphone:</strong> +33 6 12 34 56 78</div>
          <div><strong>Localisation:</strong> Paris, France</div>
          <div><strong>Expérience:</strong> 5 ans en développement Full Stack</div>
        </div>
      </div>
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
            {jobOffers.map((job) => (
              <tr key={job.id}>
                <td className="company-cell"><div className="company-avatar"><Icons.Building size={18} /></div><span>{job.company}</span></td>
                <td className="position-cell">{job.position}</td>
                <td>{job.location}</td>
                <td className="salary-cell">{job.salary}</td>
                <td><span className="type-badge">{job.type}</span></td>
                <td><button className="action-btn"><Icons.Target size={16} />Postuler</button></td>
              </tr>
            ))}
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
            {jobOffers.slice(0, 5).map((job) => (
              <tr key={job.id}>
                <td className="company-cell"><div className="company-avatar"><Icons.Building size={18} /></div><span>{job.company}</span></td>
                <td className="position-cell">{job.position}</td>
                <td><span className="status-badge status-green">95% match</span></td>
                <td className="salary-cell">{job.salary}</td>
                <td><button className="action-btn"><Icons.Target size={16} />Postuler</button></td>
              </tr>
            ))}
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
          <thead><tr><th>Entreprise</th><th>Poste</th><th>Date sauvegarde</th><th>Salaire</th><th>Action</th></tr></thead>
          <tbody>
            {jobOffers.slice(0, 3).map((job, i) => (
              <tr key={job.id}>
                <td className="company-cell"><div className="company-avatar"><Icons.Building size={18} /></div><span>{job.company}</span></td>
                <td className="position-cell">{job.position}</td>
                <td>{`${22 + i} Oct 2025`}</td>
                <td className="salary-cell">{job.salary}</td>
                <td><button className="action-btn"><Icons.Target size={16} />Postuler</button></td>
              </tr>
            ))}
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
          {['Développeur Full Stack - Paris - 50K€+', 'Designer UI/UX - Remote - 45K€+', 'Data Scientist - Paris - 55K€+'].map((a, i) => {
            const [titre, loc, sal] = a.split(' - ');
            return (
              <div key={i} className="job-item">
                <div className="job-info"><h3>{titre}</h3><div className="job-stats"><span>{loc}</span><span className="dot">•</span><span>{sal}</span></div></div>
                <span className="status status-actif">Active</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );

  const renderApplications = () => (
    <section className="opportunities-section">
      <div className="section-header"><h2>📦 Toutes Mes Candidatures</h2></div>
      <div className="stats-grid" style={{ marginBottom: '2rem' }}>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #6C00FF, #9D50FF)' }}><Icons.Package size={24} /></div>
          <div className="stat-info"><h3>18</h3><p>Candidatures envoyées</p></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #10B981, #34D399)' }}><Icons.TrendingUp size={24} /></div>
          <div className="stat-info"><h3>5</h3><p>Réponses positives</p></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #F59E0B, #FBBF24)' }}><Icons.MessageCircle size={24} /></div>
          <div className="stat-info"><h3>4</h3><p>Entretiens programmés</p></div>
        </div>
      </div>
      <div className="opportunities-table">
        <table>
          <thead><tr><th>Entreprise</th><th>Poste</th><th>Date</th><th>Statut</th></tr></thead>
          <tbody>
            {jobOffers.slice(0, 6).map((job, i) => (
              <tr key={job.id}>
                <td className="company-cell"><div className="company-avatar"><Icons.Building size={18} /></div><span>{job.company}</span></td>
                <td className="position-cell">{job.position}</td>
                <td>{`${20 + i} Oct 2025`}</td>
                <td><span className={`status-badge status-${['blue', 'yellow', 'green'][i % 3]}`}>{['En attente', 'Examinée', 'Entretien'][i % 3]}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );

  const renderInProgress = () => (
    <section className="opportunities-section">
      <div className="section-header"><h2>📈 Candidatures en Cours</h2></div>
      <div className="opportunities-table">
        <table>
          <thead><tr><th>Entreprise</th><th>Poste</th><th>Étape</th><th>Prochaine action</th></tr></thead>
          <tbody>
            {jobOffers.slice(0, 4).map((job, i) => (
              <tr key={job.id}>
                <td className="company-cell"><div className="company-avatar"><Icons.Building size={18} /></div><span>{job.company}</span></td>
                <td className="position-cell">{job.position}</td>
                <td><span className="status-badge status-yellow">{['Pré-sélection', 'Test technique', 'Entretien RH', 'Entretien final'][i % 4]}</span></td>
                <td>{['Attente retour', 'Faire le test', 'Rendez-vous 25 Oct', 'Rendez-vous 28 Oct'][i % 4]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );

  const renderInterviews = () => (
    <section className="opportunities-section">
      <div className="section-header"><h2>💬 Mes Entretiens</h2></div>
      <div className="dashboard-section">
        <div className="interviews-list">
          {['Google France - Senior Software Engineer - 25 Oct 2025 - 14:00', 'Airbnb - Product Designer - 26 Oct 2025 - 10:30', 'Alan - Full Stack Engineer - 27 Oct 2025 - 15:00', 'Contentsquare - Product Manager - 28 Oct 2025 - 11:00'].map((i, idx) => {
            const [comp, poste, date, time] = i.split(' - ');
            return (
              <div key={idx} className="interview-item">
                <div className="interview-icon"><Icons.MessageCircle size={24} /></div>
                <div className="interview-info"><h3>{comp}</h3><p>{poste}</p></div>
                <div className="interview-time"><p className="date">{date}</p><p className="time">{time}</p></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );

  const renderOffersReceived = () => (
    <section className="opportunities-section">
      <div className="section-header"><h2>✉️ Offres d'Emploi Reçues</h2></div>
      <div className="opportunities-table">
        <table>
          <thead><tr><th>Entreprise</th><th>Poste</th><th>Salaire Proposé</th><th>Date</th><th>Statut</th></tr></thead>
          <tbody>
            {['Google France - Senior Software Engineer - 85K€ - 22 Oct 2025 - En réflexion', 'Alan - Full Stack Engineer - 62K€ - 20 Oct 2025 - Acceptée'].map((o, i) => {
              const [comp, poste, sal, date, stat] = o.split(' - ');
              return (
                <tr key={i}>
                  <td className="company-cell"><div className="company-avatar"><Icons.Building size={18} /></div><span>{comp}</span></td>
                  <td className="position-cell">{poste}</td>
                  <td className="salary-cell">{sal}</td>
                  <td>{date}</td>
                  <td><span className={`status-badge status-${stat === 'Acceptée' ? 'green' : 'yellow'}`}>{stat}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );

  const renderCV = () => (
    <section className="opportunities-section">
      <div className="section-header"><h2>📄 Mon CV</h2></div>
      <div className="dashboard-section">
        <h2>CV Actuel</h2>
        <div style={{ marginTop: '1.5rem' }}>
          <p><strong>Dernière mise à jour:</strong> 15 Oct 2025</p>
          <p><strong>Visibilité:</strong> Public</p>
          <p><strong>Téléchargements:</strong> 23</p>
          <button className="action-btn" style={{ marginTop: '1.5rem' }}><Icons.FileText size={16} />Télécharger mon CV</button>
          <button className="action-btn" style={{ marginTop: '0.5rem', marginLeft: '1rem' }}><Icons.FileText size={16} />Modifier mon CV</button>
        </div>
      </div>
    </section>
  );

  const renderDocuments = () => (
    <section className="opportunities-section">
      <div className="section-header"><h2>📁 Mes Documents</h2></div>
      <div className="dashboard-section">
        <div className="jobs-list">
          {['CV_Jean_Dupont.pdf - 2.3 MB - 15 Oct 2025', 'Lettre_Motivation.pdf - 450 KB - 10 Oct 2025', 'Portfolio.pdf - 8.5 MB - 05 Oct 2025'].map((d, i) => {
            const [nom, taille, date] = d.split(' - ');
            return (
              <div key={i} className="job-item">
                <div className="job-info"><h3>{nom}</h3><div className="job-stats"><span>{taille}</span><span className="dot">•</span><span>{date}</span></div></div>
                <button className="action-btn"><Icons.FileText size={16} />Télécharger</button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );

  const renderSkills = () => (
    <section className="opportunities-section">
      <div className="section-header"><h2>🎯 Mes Compétences</h2></div>
      <div className="proposal-cards">
        <motion.div className="proposal-card"><h3>Frontend</h3><p>React, Vue.js, TypeScript, HTML/CSS, Tailwind</p><div className="progress-container"><div className="progress-bar"><div className="progress-fill" style={{ width: '90%' }}></div></div><span className="progress-label">90%</span></div></motion.div>
        <motion.div className="proposal-card"><h3>Backend</h3><p>Node.js, Python, PostgreSQL, MongoDB, REST APIs</p><div className="progress-container"><div className="progress-bar"><div className="progress-fill" style={{ width: '85%' }}></div></div><span className="progress-label">85%</span></div></motion.div>
        <motion.div className="proposal-card"><h3>DevOps</h3><p>Docker, CI/CD, AWS, Git, Linux</p><div className="progress-container"><div className="progress-bar"><div className="progress-fill" style={{ width: '75%' }}></div></div><span className="progress-label">75%</span></div></motion.div>
      </div>
    </section>
  );

  const renderPreferences = () => (
    <section className="opportunities-section">
      <div className="section-header"><h2>⚙️ Mes Préférences</h2></div>
      <div className="dashboard-section">
        <h2>Préférences de Recherche</h2>
        <div style={{ display: 'grid', gap: '1rem', marginTop: '1.5rem' }}>
          <div><strong>Type de poste:</strong> CDI, Télétravail</div>
          <div><strong>Salaire minimum:</strong> 50 000€</div>
          <div><strong>Localisation:</strong> Paris, Lyon, Remote</div>
          <div><strong>Disponibilité:</strong> Immédiate</div>
          <div><strong>Notifications:</strong> Email + SMS</div>
        </div>
      </div>
    </section>
  );

  const renderMessages = () => (
    <section className="opportunities-section">
      <div className="section-header"><h2>✉️ Mes Messages</h2></div>
      <div className="dashboard-section">
        <div className="applications-list">
          {['Google France - Invitation entretien - Il y a 2 heures', 'Airbnb - Demande d\'informations - Il y a 1 jour', 'Alan - Offre d\'emploi - Il y a 3 jours'].map((m, i) => {
            const [comp, sujet, date] = m.split(' - ');
            return (
              <div key={i} className="application-item">
                <div className="candidate-info"><div className="candidate-avatar"><Icons.Mail size={20} /></div><div><h3>{comp}</h3><p className="position-name">{sujet}</p></div></div>
                <div className="application-meta"><span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{date}</span></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );

  const renderNotifications = () => (
    <section className="opportunities-section">
      <div className="section-header"><h2>🔔 Notifications</h2></div>
      <div className="dashboard-section">
        <div className="applications-list">
          {['Nouvelle offre correspond à vos critères - Il y a 1 heure', 'Votre candidature chez Google a été vue - Il y a 3 heures', 'Rappel: Entretien demain chez Airbnb - Il y a 1 jour'].map((n, i) => (
            <div key={i} className="application-item">
              <div className="candidate-info"><div className="candidate-avatar"><Icons.Zap size={20} /></div><div><h3>{n.split(' - ')[0]}</h3><p className="position-name">{n.split(' - ')[1]}</p></div></div>
            </div>
          ))}
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

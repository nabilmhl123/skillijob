import { useState } from 'react';
import { motion } from 'framer-motion';
import Icons from '../components/shared/Icons';
import './DashboardEntreprise.css';

const DashboardEntreprise = () => {
  const [activeTab, setActiveTab] = useState('sales-hub');
  const [activeFilter, setActiveFilter] = useState('new');
  const [activeSection, setActiveSection] = useState('overview');

  // Données fictives pour le tableau d'opportunités
  const opportunities = [
    {
      id: 1,
      company: 'Sophie Martin',
      category: 'Développeur Full Stack React/Node.js',
      reviewDate: '24 Oct 2025',
      budget: '50K€ - 60K€',
      status: 'Reviewing',
      statusColor: 'blue'
    },
    {
      id: 2,
      company: 'Thomas Dubois',
      category: 'Designer UI/UX Senior',
      reviewDate: '23 Oct 2025',
      budget: '42K€ - 52K€',
      status: 'Pending',
      statusColor: 'yellow'
    },
    {
      id: 3,
      company: 'Marie Lefebvre',
      category: 'Chef de Projet Digital',
      reviewDate: '22 Oct 2025',
      budget: '55K€ - 65K€',
      status: 'Approved',
      statusColor: 'green'
    },
    {
      id: 4,
      company: 'Pierre Rousseau',
      category: 'Développeur Backend Python',
      reviewDate: '21 Oct 2025',
      budget: '48K€ - 58K€',
      status: 'Reviewing',
      statusColor: 'blue'
    },
    {
      id: 5,
      company: 'Camille Bernard',
      category: 'Data Scientist',
      reviewDate: '20 Oct 2025',
      budget: '52K€ - 62K€',
      status: 'Approved',
      statusColor: 'green'
    },
    {
      id: 6,
      company: 'Lucas Moreau',
      category: 'Développeur Frontend Vue.js',
      reviewDate: '19 Oct 2025',
      budget: '45K€ - 55K€',
      status: 'Pending',
      statusColor: 'yellow'
    },
    {
      id: 7,
      company: 'Emma Petit',
      category: 'Product Owner',
      reviewDate: '18 Oct 2025',
      budget: '50K€ - 60K€',
      status: 'Reviewing',
      statusColor: 'blue'
    },
    {
      id: 8,
      company: 'Alexandre Roux',
      category: 'DevOps Engineer',
      reviewDate: '17 Oct 2025',
      budget: '53K€ - 63K€',
      status: 'Approved',
      statusColor: 'green'
    },
  ];

  // Données pour les cartes de gestion
  const proposalCards = [
    {
      id: 1,
      title: 'Révision des CV',
      budget: '8 candidatures',
      description: 'Examiner les profils pour le poste Développeur Full Stack',
      progress: 65
    },
    {
      id: 2,
      title: 'Entretiens Programmés',
      budget: '12 entretiens',
      description: 'Planifier les entretiens de cette semaine',
      progress: 45
    },
    {
      id: 3,
      title: 'Offres à Envoyer',
      budget: '5 offres',
      description: 'Finaliser et envoyer les propositions d\'embauche',
      progress: 80
    }
  ];

  const menuItems = [
    { id: 'overview', icon: 'Target', label: 'Vue d\'ensemble', section: 'main' },
    { id: 'analytics', icon: 'BarChart', label: 'Analytiques', section: 'main' },

    { id: 'recruitment-header', label: 'RECRUTEMENT', isHeader: true },
    { id: 'candidates', icon: 'Users', label: 'Tous les candidats', section: 'recruitment' },
    { id: 'applications', icon: 'Package', label: 'Candidatures reçues', section: 'recruitment' },
    { id: 'pipeline', icon: 'TrendingUp', label: 'Pipeline de recrutement', section: 'recruitment' },
    { id: 'interviews', icon: 'MessageCircle', label: 'Entretiens', section: 'recruitment' },
    { id: 'offers-sent', icon: 'Mail', label: 'Offres envoyées', section: 'recruitment' },

    { id: 'jobs-header', label: 'OFFRES D\'EMPLOI', isHeader: true },
    { id: 'active-jobs', icon: 'Briefcase', label: 'Offres actives', section: 'jobs' },
    { id: 'draft-jobs', icon: 'FileText', label: 'Brouillons', section: 'jobs' },
    { id: 'archived-jobs', icon: 'File', label: 'Archivées', section: 'jobs' },
    { id: 'templates', icon: 'File', label: 'Modèles d\'offres', section: 'jobs' },

    { id: 'team-header', label: 'ÉQUIPE & ENTREPRISE', isHeader: true },
    { id: 'team', icon: 'Users', label: 'Membres de l\'équipe', section: 'team' },
    { id: 'company-profile', icon: 'Building', label: 'Profil entreprise', section: 'team' },
    { id: 'settings', icon: 'Target', label: 'Paramètres', section: 'team' },

    { id: 'finance-header', label: 'FACTURATION', isHeader: true },
    { id: 'invoices', icon: 'File', label: 'Factures', section: 'finance' },
    { id: 'subscription', icon: 'Package', label: 'Abonnement', section: 'finance' },
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
      case 'analytics':
        return renderAnalytics();
      case 'candidates':
        return renderCandidates();
      case 'applications':
        return renderApplications();
      case 'pipeline':
        return renderPipeline();
      case 'interviews':
        return renderInterviews();
      case 'offers-sent':
        return renderOffersSent();
      case 'active-jobs':
        return renderActiveJobs();
      case 'draft-jobs':
        return renderDraftJobs();
      case 'archived-jobs':
        return renderArchivedJobs();
      case 'templates':
        return renderTemplates();
      case 'team':
        return renderTeam();
      case 'company-profile':
        return renderCompanyProfile();
      case 'settings':
        return renderSettings();
      case 'invoices':
        return renderInvoices();
      case 'subscription':
        return renderSubscription();
      default:
        return renderOverview();
    }
  };

  const renderOverview = () => (
    <>
      <section className="opportunities-section">
        <div className="section-header">
          <h2>Opportunités Récentes</h2>
          <div className="filter-pills">
            <button className={`pill ${activeFilter === 'new' ? 'active' : ''}`} onClick={() => setActiveFilter('new')}>Nouveau</button>
            <button className={`pill ${activeFilter === 'close' ? 'active' : ''}`} onClick={() => setActiveFilter('close')}>Clôturé</button>
            <button className={`pill ${activeFilter === 'engage' ? 'active' : ''}`} onClick={() => setActiveFilter('engage')}>Engagé</button>
          </div>
        </div>
        <div className="opportunities-table">
          <table>
            <thead>
              <tr>
                <th>Entreprise</th>
                <th>Catégorie d'Offre</th>
                <th>Date de Révision</th>
                <th>Budget</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {opportunities.map((opp) => (
                <tr key={opp.id}>
                  <td className="company-cell">
                    <div className="company-avatar"><Icons.Building size={18} /></div>
                    <span>{opp.company}</span>
                  </td>
                  <td>{opp.category}</td>
                  <td>{opp.reviewDate}</td>
                  <td className="budget-cell">{opp.budget}</td>
                  <td><span className={`status-badge status-${opp.statusColor}`}>{opp.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="proposal-section">
        <div className="section-header">
          <h2>Tableau de Gestion des Propositions</h2>
          <button className="view-all-btn">Tout voir <Icons.ChevronDown size={16} /></button>
        </div>
        <div className="proposal-cards">
          {proposalCards.map((card) => (
            <motion.div key={card.id} className="proposal-card" whileHover={{ y: -4 }}>
              <div className="card-header">
                <h3>{card.title}</h3>
                <div className="card-budget">{card.budget}</div>
              </div>
              <p className="card-description">{card.description}</p>
              <div className="progress-container">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${card.progress}%` }}></div>
                </div>
                <span className="progress-label">{card.progress}%</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );

  const renderAnalytics = () => (
    <section className="opportunities-section">
      <div className="section-header"><h2>📊 Analytiques de Recrutement</h2></div>
      <div className="stats-grid" style={{ marginBottom: '2rem' }}>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #6C00FF, #9D50FF)' }}><Icons.Users size={24} /></div>
          <div className="stat-info"><h3>247</h3><p>Total Candidats</p></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #F59E0B, #FBBF24)' }}><Icons.TrendingUp size={24} /></div>
          <div className="stat-info"><h3>+32%</h3><p>Croissance ce mois</p></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #10B981, #34D399)' }}><Icons.Target size={24} /></div>
          <div className="stat-info"><h3>89%</h3><p>Taux de conversion</p></div>
        </div>
      </div>
      <div className="dashboard-section">
        <h2>Performance par Poste</h2>
        <div className="jobs-list">
          <div className="job-item">
            <div className="job-info"><h3>Développeur Full Stack</h3><div className="job-stats"><span>45 candidatures</span><span className="dot">•</span><span>12 entretiens</span></div></div>
            <span className="status status-actif">Très actif</span>
          </div>
          <div className="job-item">
            <div className="job-info"><h3>Designer UI/UX</h3><div className="job-stats"><span>32 candidatures</span><span className="dot">•</span><span>8 entretiens</span></div></div>
            <span className="status status-actif">Actif</span>
          </div>
        </div>
      </div>
    </section>
  );

  const renderCandidates = () => (
    <section className="opportunities-section">
      <div className="section-header">
        <h2>👥 Base de Candidats</h2>
        <div className="filter-pills">
          <button className="pill active">Tous</button>
          <button className="pill">Qualifiés</button>
          <button className="pill">Favoris</button>
        </div>
      </div>
      <div className="opportunities-table">
        <table>
          <thead><tr><th>Candidat</th><th>Poste visé</th><th>Expérience</th><th>Compétences</th><th>Statut</th></tr></thead>
          <tbody>
            {['Sophie Martin - Full Stack - 5 ans - React, Node.js', 'Thomas Dubois - UI/UX - 3 ans - Figma, Adobe XD', 'Marie Lefebvre - Chef de Projet - 7 ans - Agile, Scrum'].map((c, i) => {
              const [nom, poste, exp, comp] = c.split(' - ');
              return (
                <tr key={i}>
                  <td className="company-cell"><div className="company-avatar"><Icons.User size={18} /></div><span>{nom}</span></td>
                  <td>{poste}</td>
                  <td>{exp}</td>
                  <td>{comp}</td>
                  <td><span className="status-badge status-green">Actif</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );

  const renderApplications = () => (
    <section className="opportunities-section">
      <div className="section-header"><h2>📦 Candidatures Reçues</h2></div>
      <div className="opportunities-table">
        <table>
          <thead><tr><th>Candidat</th><th>Poste</th><th>Date</th><th>CV</th><th>Statut</th></tr></thead>
          <tbody>
            {opportunities.map((opp) => (
              <tr key={opp.id}>
                <td className="company-cell"><div className="company-avatar"><Icons.User size={18} /></div><span>{opp.company}</span></td>
                <td>{opp.category}</td>
                <td>{opp.reviewDate}</td>
                <td><button className="action-btn"><Icons.FileText size={16} />Voir CV</button></td>
                <td><span className={`status-badge status-${opp.statusColor}`}>{opp.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );

  const renderPipeline = () => (
    <section className="proposal-section">
      <div className="section-header"><h2>📈 Pipeline de Recrutement</h2></div>
      <div className="proposal-cards">
        <motion.div className="proposal-card"><h3>Nouveaux CV</h3><p>15 nouveaux profils à examiner</p><div className="progress-container"><div className="progress-bar"><div className="progress-fill" style={{ width: '35%' }}></div></div><span className="progress-label">35%</span></div></motion.div>
        <motion.div className="proposal-card"><h3>Pré-sélection</h3><p>8 candidats à contacter</p><div className="progress-container"><div className="progress-bar"><div className="progress-fill" style={{ width: '65%' }}></div></div><span className="progress-label">65%</span></div></motion.div>
        <motion.div className="proposal-card"><h3>Entretiens</h3><p>12 entretiens planifiés</p><div className="progress-container"><div className="progress-bar"><div className="progress-fill" style={{ width: '80%' }}></div></div><span className="progress-label">80%</span></div></motion.div>
      </div>
    </section>
  );

  const renderInterviews = () => (
    <section className="opportunities-section">
      <div className="section-header"><h2>💬 Entretiens Planifiés</h2></div>
      <div className="dashboard-section">
        <div className="interviews-list">
          {['Sophie Martin - Développeur Full Stack - 25 Oct 2025 - 14:00', 'Thomas Dubois - Designer UI/UX - 26 Oct 2025 - 10:30', 'Marie Lefebvre - Chef de Projet - 27 Oct 2025 - 15:00'].map((i, idx) => {
            const [nom, poste, date, time] = i.split(' - ');
            return (
              <div key={idx} className="interview-item">
                <div className="interview-icon"><Icons.MessageCircle size={24} /></div>
                <div className="interview-info"><h3>{nom}</h3><p>{poste}</p></div>
                <div className="interview-time"><p className="date">{date}</p><p className="time">{time}</p></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );

  const renderOffersSent = () => (
    <section className="opportunities-section">
      <div className="section-header"><h2>✉️ Offres d'Emploi Envoyées</h2></div>
      <div className="opportunities-table">
        <table>
          <thead><tr><th>Candidat</th><th>Poste</th><th>Salaire Proposé</th><th>Date Envoi</th><th>Statut</th></tr></thead>
          <tbody>
            {['Sophie Martin - Full Stack - 55K€ - 20 Oct 2025 - Acceptée', 'Pierre Rousseau - Backend Python - 52K€ - 22 Oct 2025 - En attente'].map((o, i) => {
              const [nom, poste, sal, date, stat] = o.split(' - ');
              return (
                <tr key={i}>
                  <td className="company-cell"><div className="company-avatar"><Icons.User size={18} /></div><span>{nom}</span></td>
                  <td>{poste}</td>
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

  const renderActiveJobs = () => (
    <section className="opportunities-section">
      <div className="section-header"><h2>💼 Offres d'Emploi Actives</h2></div>
      <div className="dashboard-section">
        <div className="jobs-list">
          {['Développeur Full Stack - 45 candidatures - 230 vues', 'Designer UI/UX - 32 candidatures - 180 vues', 'Chef de Projet - 28 candidatures - 150 vues'].map((j, i) => {
            const [titre, cand, vues] = j.split(' - ');
            return (
              <div key={i} className="job-item">
                <div className="job-info"><h3>{titre}</h3><div className="job-stats"><span>{cand}</span><span className="dot">•</span><span>{vues}</span></div></div>
                <span className="status status-actif">Actif</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );

  const renderDraftJobs = () => (
    <section className="opportunities-section">
      <div className="section-header"><h2>📝 Brouillons d'Offres</h2></div>
      <div className="dashboard-section">
        <div className="jobs-list">
          {['Product Owner - Brouillon créé le 20 Oct', 'Data Scientist - Brouillon créé le 18 Oct'].map((j, i) => {
            const [titre, info] = j.split(' - ');
            return (
              <div key={i} className="job-item">
                <div className="job-info"><h3>{titre}</h3><p>{info}</p></div>
                <button className="action-btn"><Icons.FileText size={16} />Continuer</button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );

  const renderArchivedJobs = () => (
    <section className="opportunities-section">
      <div className="section-header"><h2>📁 Offres Archivées</h2></div>
      <div className="coming-soon"><Icons.File size={64} /><h2>Offres archivées</h2><p>Aucune offre archivée pour le moment</p></div>
    </section>
  );

  const renderTemplates = () => (
    <section className="opportunities-section">
      <div className="section-header"><h2>📄 Modèles d'Offres</h2></div>
      <div className="proposal-cards">
        <motion.div className="proposal-card"><h3>Modèle Développeur</h3><p>Template pré-rempli pour postes tech</p><button className="action-btn" style={{ marginTop: '1rem' }}><Icons.FileText size={16} />Utiliser</button></motion.div>
        <motion.div className="proposal-card"><h3>Modèle Designer</h3><p>Template pré-rempli pour postes créatifs</p><button className="action-btn" style={{ marginTop: '1rem' }}><Icons.FileText size={16} />Utiliser</button></motion.div>
      </div>
    </section>
  );

  const renderTeam = () => (
    <section className="opportunities-section">
      <div className="section-header"><h2>👥 Membres de l'Équipe</h2></div>
      <div className="dashboard-section">
        <div className="applications-list">
          {['Jean Dupont - RH Manager - Administrateur', 'Marie Claire - Recruteur - Éditeur'].map((m, i) => {
            const [nom, role, perm] = m.split(' - ');
            return (
              <div key={i} className="application-item">
                <div className="candidate-info"><div className="candidate-avatar"><Icons.User size={20} /></div><div><h3>{nom}</h3><p className="position-name">{role}</p></div></div>
                <div className="application-meta"><span className="status-badge status-blue">{perm}</span></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );

  const renderCompanyProfile = () => (
    <section className="opportunities-section">
      <div className="section-header"><h2>🏢 Profil Entreprise</h2></div>
      <div className="dashboard-section">
        <h2>Informations de l'Entreprise</h2>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div><strong>Nom:</strong> Tech Corp</div>
          <div><strong>Secteur:</strong> Technologies de l'information</div>
          <div><strong>Taille:</strong> 50-200 employés</div>
          <div><strong>Localisation:</strong> Paris, France</div>
        </div>
      </div>
    </section>
  );

  const renderSettings = () => (
    <section className="opportunities-section">
      <div className="section-header"><h2>⚙️ Paramètres</h2></div>
      <div className="coming-soon"><Icons.Target size={64} /><h2>Paramètres</h2><p>Configuration du compte et préférences</p></div>
    </section>
  );

  const renderInvoices = () => (
    <section className="opportunities-section">
      <div className="section-header"><h2>📄 Factures</h2></div>
      <div className="opportunities-table">
        <table>
          <thead><tr><th>N° Facture</th><th>Date</th><th>Montant</th><th>Statut</th><th>Action</th></tr></thead>
          <tbody>
            {['INV-2025-001 - 01 Oct 2025 - 299€ - Payée', 'INV-2025-002 - 01 Sep 2025 - 299€ - Payée'].map((f, i) => {
              const [num, date, montant, stat] = f.split(' - ');
              return (
                <tr key={i}>
                  <td>{num}</td>
                  <td>{date}</td>
                  <td className="salary-cell">{montant}</td>
                  <td><span className="status-badge status-green">{stat}</span></td>
                  <td><button className="action-btn"><Icons.FileText size={16} />Télécharger</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );

  const renderSubscription = () => (
    <section className="opportunities-section">
      <div className="section-header"><h2>📦 Abonnement</h2></div>
      <div className="dashboard-section">
        <h2>Plan Actuel: Premium</h2>
        <div style={{ marginTop: '1.5rem' }}>
          <p><strong>Prix:</strong> 299€ / mois</p>
          <p><strong>Prochaine facturation:</strong> 01 Nov 2025</p>
          <p><strong>Offres actives:</strong> Illimitées</p>
          <button className="action-btn" style={{ marginTop: '1.5rem' }}><Icons.Package size={16} />Gérer l'abonnement</button>
        </div>
      </div>
    </section>
  );

  return (
    <div className="dashboard-crm">
      {/* SIDEBAR GAUCHE */}
      <aside className="crm-sidebar">
        {/* Logo Entreprise */}
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

export default DashboardEntreprise;

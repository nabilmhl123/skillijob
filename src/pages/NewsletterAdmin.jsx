import React, { useState } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import './NewsletterAdmin.css';

const NewsletterAdmin = () => {
  const newsletters = useQuery(api.newsletter.getAll);
  const count = useQuery(api.newsletter.count);
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrer les emails selon le terme de recherche
  const filteredNewsletters = newsletters?.filter((item) =>
    item.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleExport = () => {
    if (!newsletters || newsletters.length === 0) return;

    // Créer un CSV avec les emails
    const csvContent = [
      ['Email', 'Date d\'inscription', 'Source'].join(','),
      ...newsletters.map((item) =>
        [item.email, formatDate(item.subscribedAt), item.source || 'unknown'].join(',')
      ),
    ].join('\n');

    // Télécharger le fichier CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `newsletter-${Date.now()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!newsletters) {
    return (
      <div className="newsletter-admin">
        <div className="loading">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="newsletter-admin">
      <div className="newsletter-admin-header">
        <h1>Newsletter - Inscrits</h1>
        <div className="newsletter-stats">
          <div className="stat-card">
            <div className="stat-number">{count || 0}</div>
            <div className="stat-label">Total inscrits</div>
          </div>
        </div>
      </div>

      <div className="newsletter-actions">
        <div className="search-bar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input
            type="text"
            placeholder="Rechercher un email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="export-btn" onClick={handleExport}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Exporter CSV
        </button>
      </div>

      <div className="newsletter-table-container">
        <table className="newsletter-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Date d'inscription</th>
              <th>Source</th>
            </tr>
          </thead>
          <tbody>
            {filteredNewsletters && filteredNewsletters.length > 0 ? (
              filteredNewsletters.map((item) => (
                <tr key={item._id}>
                  <td className="email-cell">{item.email}</td>
                  <td>{formatDate(item.subscribedAt)}</td>
                  <td>
                    <span className={`source-badge source-${item.source}`}>
                      {item.source || 'unknown'}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="no-data">
                  {searchTerm ? 'Aucun résultat trouvé' : 'Aucun inscrit pour le moment'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewsletterAdmin;

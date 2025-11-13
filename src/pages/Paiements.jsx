import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../components/shared/Button';
import './Paiements.css';

const Paiements = () => {
  const navigate = useNavigate();
  const [acceptedCGV, setAcceptedCGV] = useState(false);
  const [isB2B, setIsB2B] = useState(false);

  const handleUnlockCredit = () => {
    if (acceptedCGV && isB2B) {
      // Redirection vers Stripe Checkout
      window.location.href = 'https://buy.stripe.com/5kQbJ16i57gP4nP6LZaAw07';
    }
  };

  const handleViewCandidates = () => {
    window.location.href = 'https://form.jotform.com/252922402753050';
  };

  return (
    <main className="paiements-page">
      {/* Hero Section avec dégradé violet */}
      <section className="paiements-hero">
        <div className="container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="delivery-badge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Livraison sous 24h après demande</span>
            </div>
            <h1>Débloquez 5 profils qualifiés en &lt; 24 h</h1>
            <p className="hero-subtitle">
              Sans commission • Accompagnement inclus
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section principale - Grid à 2 colonnes */}
      <section className="payment-content-section">
        <div className="container">
          <div className="payment-grid">
            {/* Colonne gauche - Détails du service */}
            <motion.div
              className="service-details"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2>Crédit de 5 profils qualifiés</h2>
              <p className="service-description">
                Recevez pour chaque profil débloqué : CV complet, coordonnées directes et compte-rendu RH détaillé.
                Les dossiers vous sont transmis sous 24h ouvrées après votre demande de déblocage.
              </p>

              <div className="service-features">
                <h3>Ce qui est inclus :</h3>
                <ul className="features-checklist">
                  <li>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span><strong>CV complet</strong> de chaque candidat</span>
                  </li>
                  <li>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span><strong>Coordonnées directes</strong> (téléphone + email)</span>
                  </li>
                  <li>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span><strong>Compte-rendu RH</strong> avec motivation, disponibilité, mobilité et prétentions</span>
                  </li>
                  <li>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span><strong>Livraison sous 24h</strong> après demande de déblocage</span>
                  </li>
                  <li>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span><strong>Recrédit automatique</strong> si profil non joignable ou non disponible</span>
                  </li>
                </ul>
              </div>

              {/* Badges de confiance */}
              <div className="trust-badges">
                <div className="trust-badge">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span>Profils RH vérifiés</span>
                </div>
                <div className="trust-badge">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                  <span>&lt; 24h</span>
                </div>
                <div className="trust-badge">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0110 0v4"/>
                  </svg>
                  <span>Paiement sécurisé Stripe</span>
                </div>
                <div className="trust-badge">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <span>Validité 60 jours</span>
                </div>
              </div>
            </motion.div>

            {/* Colonne droite - Carte de résumé */}
            <motion.div
              className="payment-summary-card"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="summary-header">
                <h3>Résumé</h3>
              </div>

              <div className="summary-content">
                <div className="summary-item">
                  <span className="item-name">Crédit 5 profils qualifiés</span>
                  <span className="item-price">990,00 € HT</span>
                </div>

                <div className="summary-divider"></div>

                <div className="summary-total">
                  <span className="total-label">Total HT</span>
                  <span className="total-amount">990,00 €</span>
                </div>

                <p className="vat-notice">
                  * TVA applicable selon votre régime fiscal. Facture automatique après paiement.
                </p>

                <div className="validity-info">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  <span>Crédit valable 60 jours • Déblocage à la demande</span>
                </div>

                {/* Checkboxes légales */}
                <div className="legal-checkboxes">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={acceptedCGV}
                      onChange={(e) => setAcceptedCGV(e.target.checked)}
                    />
                    <span>
                      J'accepte les{' '}
                      <a href="#cgv" className="legal-link">
                        Conditions Générales de Vente
                      </a>
                    </span>
                  </label>

                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={isB2B}
                      onChange={(e) => setIsB2B(e.target.checked)}
                    />
                    <span>Je confirme effectuer un achat professionnel (B2B)</span>
                  </label>
                </div>

                {/* Bouton de paiement */}
                <Button
                  variant="primary"
                  size="large"
                  onClick={handleUnlockCredit}
                  disabled={!acceptedCGV || !isB2B}
                  className="unlock-button"
                >
                  Je débloque mon crédit
                </Button>

                <p className="security-note">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0110 0v4"/>
                  </svg>
                  Paiement sécurisé • Stripe 3D Secure
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section CTA - Voir les candidats */}
      <section className="cta-section">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Découvrez nos candidats dès maintenant</h2>
            <p>Parcourez notre base de profils qualifiés avant de débloquer</p>
            <Button variant="secondary" size="large" onClick={handleViewCandidates}>
              Voir les candidats
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Section Garantie */}
      <section className="guarantee-section">
        <div className="container">
          <motion.div
            className="guarantee-box"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="guarantee-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <div className="guarantee-content">
              <h3>Notre engagement qualité</h3>
              <p>
                <strong>Profil non joignable ou non disponible = recrédit immédiat.</strong> Nous vérifions
                chaque candidat et garantissons la qualité de nos profils.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Paiements;

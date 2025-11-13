import React from 'react';
import { Link } from 'react-router-dom';
import LegalModals from '../shared/LegalModals';
import Icons from '../shared/Icons';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const openModal = (modalId) => (e) => {
    e.preventDefault();
    if (window.openLegalModal) {
      window.openLegalModal(modalId);
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Section */}
          <div className="footer-brand">
            <img
              src="/logo-skillijob.png"
              alt="Skillijob"
              width="100"
              height="100"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentNode.innerHTML = '<div class="footer-logo-text">Skillijob</div>';
              }}
            />
            <p>La plateforme qui connecte les talents avec les opportunités.</p>
          </div>

          {/* Navigation Section */}
          <nav className="footer-nav">
            <h4>Navigation</h4>
            <Link to="/">Accueil</Link>
            <Link to="/candidats">Candidats</Link>
            <Link to="/entreprises">Entreprises</Link>
          </nav>

          {/* Contact Section */}
          <div className="footer-contact">
            <h4>Contact</h4>
            <a href="tel:+33970196702" className="footer-link">
              <Icons.Phone size={16} style={{ marginRight: '8px' }} /> 09 70 19 67 02
            </a>
            <a href="mailto:contact@skillijob.fr" className="footer-link">
              <Icons.Mail size={16} style={{ marginRight: '8px' }} /> contact@skillijob.fr
            </a>
            <p><Icons.MapPin size={16} style={{ marginRight: '8px', display: 'inline-block', verticalAlign: 'middle' }} /> 60 rue François 1er, 75008 Paris</p>
          </div>

          {/* Social Media Section */}
          <div className="footer-socials">
            <h4>Suivez-nous</h4>
            <div className="social-links">
              <a
                href="https://www.instagram.com/skillijob/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" className="social-icon">
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-5 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm5.3-1.3a.9.9 0 1 1-1.8 0 .9.9 0 0 1 1.8 0z"/>
                </svg>
              </a>

              <a
                href="https://www.tiktok.com/@skillijob"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="TikTok"
              >
                <svg viewBox="0 0 24 24" className="social-icon">
                  <path d="M21 8.5a7.5 7.5 0 0 1-5.2-2.1v7.58a6.47 6.47 0 1 1-6.47-6.47c.39 0 .77.04 1.13.12v2.34a3.98 3.98 0 1 0 2.71 3.79V2h2.36c.19 1.07.73 2.06 1.53 2.86A5.1 5.1 0 0 0 21 6.19z"/>
                </svg>
              </a>

              <a
                href="https://www.linkedin.com/company/skillijob/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" className="social-icon">
                  <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5zM3.5 9h3v12h-3V9zm7 0h2.87v1.64h.04c.4-.76 1.38-1.56 2.85-1.56 3.05 0 3.62 2.01 3.62 4.63V21h-3v-6.17c0-1.47-.03-3.36-2.05-3.36-2.05 0-2.36 1.6-2.36 3.25V21h-3V9z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <span>© {currentYear} Skillijob. Tous droits réservés.</span>
          <div className="footer-legal">
            <a href="#" onClick={openModal('mentions')}>Mentions légales</a>
            <span>•</span>
            <a href="#" onClick={openModal('confidentialite')}>Politique de confidentialité</a>
            <span>•</span>
            <a href="#" onClick={openModal('cookies')}>Cookies</a>
            <span>•</span>
            <a href="#" onClick={openModal('cgv')}>CGV</a>
          </div>
        </div>
      </div>

      {/* Modales légales */}
      <LegalModals />
    </footer>
  );
};

export default Footer;

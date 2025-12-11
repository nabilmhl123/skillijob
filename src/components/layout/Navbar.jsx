import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../shared/Button';
import Icons from '../shared/Icons';
import { useAuth } from '../../hooks/useAuth';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, isAuthenticated, logout } = useAuth();

  // Détection du scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermer le menu mobile lors du changement de route
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = async () => {
    await logout();
    setIsUserMenuOpen(false);
  };

  const goToDashboard = () => {
    if (currentUser) {
      if (currentUser.userType === 'candidate') {
        navigate('/dashboard-candidat');
      } else {
        navigate('/dashboard-entreprise');
      }
    }
    setIsUserMenuOpen(false);
  };

  // Fermer le menu utilisateur quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserMenuOpen && !event.target.closest('.user-menu-container')) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isUserMenuOpen]);

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container">
        <div className="navbar-content">
          {/* Logo */}
          <Link to="/" className="navbar-brand">
            <img
              src="/logo-skillijob.png"
              alt="Skillijob"
              className="navbar-logo"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentNode.innerHTML = '<span class="logo-text">Skillijob</span>';
              }}
            />
          </Link>

          {/* Desktop Menu */}
          <div className="navbar-menu desktop-menu">
            <Link
              to="/candidats"
              className={`navbar-link ${location.pathname === '/candidats' ? 'active' : ''}`}
            >
              Candidats
            </Link>
            <Link
              to="/entreprises"
              className={`navbar-link ${location.pathname === '/entreprises' ? 'active' : ''}`}
            >
              Entreprises
            </Link>

            {isAuthenticated && currentUser ? (
              <div className="user-menu-container">
                <button
                  className="navbar-link navbar-link-space user-menu-trigger"
                  onClick={toggleUserMenu}
                >
                  <div className="user-avatar">
                    {currentUser.firstName?.[0]?.toUpperCase() || currentUser.email[0].toUpperCase()}
                  </div>
                  <span className="user-name">
                    {currentUser.firstName || currentUser.companyName || 'Mon compte'}
                  </span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      className="user-dropdown"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="user-dropdown-header">
                        <div className="user-avatar-large">
                          {currentUser.firstName?.[0]?.toUpperCase() || currentUser.email[0].toUpperCase()}
                        </div>
                        <div className="user-info">
                          <div className="user-info-name">
                            {currentUser.userType === 'candidate'
                              ? `${currentUser.firstName || ''} ${currentUser.lastName || ''}`
                              : currentUser.companyName || 'Entreprise'}
                          </div>
                          <div className="user-info-email">{currentUser.email}</div>
                          <div className="user-info-badge">
                            {currentUser.userType === 'candidate' ? '👤 Candidat' : '🏢 Entreprise'}
                          </div>
                        </div>
                      </div>

                      <div className="user-dropdown-divider"></div>

                      <button className="user-dropdown-item" onClick={goToDashboard}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="3" width="7" height="7"></rect>
                          <rect x="14" y="3" width="7" height="7"></rect>
                          <rect x="14" y="14" width="7" height="7"></rect>
                          <rect x="3" y="14" width="7" height="7"></rect>
                        </svg>
                        Tableau de bord
                      </button>

                      <Link to="/profile" className="user-dropdown-item" onClick={() => setIsUserMenuOpen(false)}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        Mon profil
                      </Link>

                      <div className="user-dropdown-divider"></div>

                      <button className="user-dropdown-item logout-item" onClick={handleLogout}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                          <polyline points="16 17 21 12 16 7"></polyline>
                          <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                        Déconnexion
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                className={`navbar-link navbar-link-space ${location.pathname === '/login' ? 'active' : ''}`}
              >
                <svg className="space-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Mon espace
              </Link>
            )}

            <Button
              variant="yellow"
              size="small"
              href="tel:+33970196702"
              icon={<Icons.Phone size={16} />}
            >
              09 70 19 67 02
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`navbar-toggle ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="navbar-menu mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                to="/candidats"
                className={`navbar-link ${location.pathname === '/candidats' ? 'active' : ''}`}
              >
                Candidats
              </Link>
              <Link
                to="/entreprises"
                className={`navbar-link ${location.pathname === '/entreprises' ? 'active' : ''}`}
              >
                Entreprises
              </Link>
              <Link
                to="/login"
                className={`navbar-link navbar-link-space ${location.pathname === '/login' ? 'active' : ''}`}
              >
                <svg className="space-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Mon espace
              </Link>
              <Button
                variant="yellow"
                size="medium"
                href="tel:+33970196702"
                icon={<Icons.Phone size={16} />}
                className="mobile-cta"
              >
                09 70 19 67 02
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;

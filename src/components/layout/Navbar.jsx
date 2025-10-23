import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../shared/Button';
import Icons from '../shared/Icons';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

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

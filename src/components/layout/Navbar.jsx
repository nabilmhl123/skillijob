import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../shared/Button';
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
            <Button
              variant="secondary"
              size="small"
              href="tel:+33970196702"
              icon="📞"
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
              <Button
                variant="secondary"
                size="medium"
                href="tel:+33970196702"
                icon="📞"
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

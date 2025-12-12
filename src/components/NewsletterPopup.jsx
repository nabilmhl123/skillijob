import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import './NewsletterPopup.css';

const NewsletterPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const subscribeToNewsletter = useMutation(api.newsletter.subscribe);

  useEffect(() => {
    // Vérifier si le popup a déjà été fermé dans cette session
    const popupClosed = sessionStorage.getItem('newsletterPopupClosed');

    if (!popupClosed) {
      // Afficher le popup après 2 secondes
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('newsletterPopupClosed', 'true');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Enregistrer l'email dans Convex
      const result = await subscribeToNewsletter({
        email: email,
        source: 'popup',
      });

      console.log('Newsletter subscription result:', result);

      if (result.alreadySubscribed) {
        console.log('Email already subscribed');
      }

      setIsSubmitted(true);

      // Fermer le popup après 2 secondes
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (err) {
      console.error('Newsletter subscription error:', err);
      setError(err.message || 'Une erreur est survenue. Veuillez réessayer.');
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="newsletter-popup-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="newsletter-popup-card"
            initial={{ scale: 0.8, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 50, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="newsletter-popup-close"
              onClick={handleClose}
              aria-label="Fermer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {!isSubmitted ? (
              <>
                <div className="newsletter-popup-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>

                <h2 className="newsletter-popup-title">
                  Restez informé !
                </h2>

                <p className="newsletter-popup-subtitle">
                  Inscrivez-vous à notre newsletter pour recevoir les dernières opportunités d'emploi et conseils carrière.
                </p>

                <form onSubmit={handleSubmit} className="newsletter-popup-form">
                  <div className="newsletter-input-wrapper">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="newsletter-input-icon">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre@email.fr"
                      required
                      className="newsletter-input"
                    />
                  </div>

                  <button type="submit" className="newsletter-submit-btn" disabled={isLoading}>
                    {isLoading ? 'Inscription...' : "S'abonner"}
                    {!isLoading && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    )}
                  </button>
                </form>

                {error && (
                  <p className="newsletter-popup-error" style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                    {error}
                  </p>
                )}

                <p className="newsletter-popup-privacy">
                  🔒 Vos données sont sécurisées. Pas de spam.
                </p>
              </>
            ) : (
              <motion.div
                className="newsletter-popup-success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="success-icon">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h3>Merci !</h3>
                <p>Vous êtes maintenant inscrit à notre newsletter.</p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewsletterPopup;

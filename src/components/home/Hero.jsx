import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../shared/Button';
import './Hero.css';
import heroImage from '../../assets/images/Image Home Page Skillijob  (3).png';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  return (
    <section className="hero">
      <div className="container">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Hero Text */}
          <div className="hero-text">
            <motion.h1 variants={itemVariants}>
              Trouvez<br />
              Recrutez<br />
              Connectez
            </motion.h1>

            <motion.p className="hero-subtitle" variants={itemVariants}>
              Candidats, accédez à des offres réelles. Entreprises, découvrez des profils
              disponibles. Choisissez votre espace et démarrez gratuitement.
            </motion.p>

            <motion.p className="hero-proof" variants={itemVariants}>
              <span className="proof-item">✓ +100 entreprises partenaires</span>
              <span className="proof-item">✓ +3 000 profils candidats</span>
              <span className="proof-item">✓ 95% de satisfaction</span>
            </motion.p>

            <motion.div className="hero-buttons" variants={itemVariants}>
              <Button
                variant="primary"
                size="large"
                href="/candidats"
              >
                Je suis un candidat
              </Button>
              <Button
                variant="secondary"
                size="large"
                href="/entreprises"
              >
                Je suis une entreprise
              </Button>
            </motion.div>
          </div>

          {/* Hero Image */}
          <motion.div
            className="hero-image"
            variants={itemVariants}
          >
            <div className="image-container">
              <img
                src={heroImage}
                alt="Skillijob - Plateforme de recrutement"
                className="hero-img"
                onError={(e) => {
                  e.target.parentNode.innerHTML = `
                    <div class="image-placeholder">
                      <div class="placeholder-content">
                        <span>🚀</span>
                        <p>Votre succès commence ici</p>
                      </div>
                    </div>
                  `;
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Effet de fond animé */}
      <div className="hero-background">
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>
        <div className="bg-shape shape-3"></div>
      </div>
    </section>
  );
};

export default Hero;

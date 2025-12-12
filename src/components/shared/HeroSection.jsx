import React from 'react';
import { motion } from 'framer-motion';
import Button from './Button';
import Icons from './Icons';
import './HeroSection.css';

const HeroSection = ({
  title,
  subtitle,
  badges = [],
  buttons = [],
  note,
  image,
  imageAlt = "Hero image",
  variant = "default" // "default", "centered"
}) => {
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
    <section className="hero-section">
      <div className="container">
        <motion.div
          className={`hero-section-content ${variant === 'centered' && !image ? 'centered' : ''}`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Hero Text */}
          <motion.div className="hero-section-text" variants={itemVariants}>
            <h1>{title}</h1>

            <p className="hero-section-subtitle">{subtitle}</p>

            {badges.length > 0 && (
              <div className="hero-badges">
                {badges.map((badge, index) => (
                  <span key={index} className="badge">{badge}</span>
                ))}
              </div>
            )}

            {buttons.length > 0 && (
              <div className="hero-section-buttons">
                {buttons.map((button, index) => (
                  <Button
                    key={index}
                    variant={button.variant || 'primary'}
                    size={button.size || 'large'}
                    href={button.href}
                    external={button.external}
                    onClick={button.onClick}
                    icon={button.icon}
                  >
                    {button.text}
                  </Button>
                ))}
              </div>
            )}

            {note && (
              <p className="hero-section-note">{note}</p>
            )}
          </motion.div>

          {/* Hero Image */}
          {image && (
            <motion.div
              className="hero-section-image"
              variants={itemVariants}
            >
              <div className="image-wrapper">
                <img
                  src={image}
                  alt={imageAlt}
                  className="hero-img"
                  onError={(e) => {
                    const placeholder = document.createElement('div');
                    placeholder.className = 'image-placeholder';
                    placeholder.innerHTML = `
                      <div class="placeholder-content">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 16px;">
                          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
                          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
                          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
                        </svg>
                        <p>Votre succès commence ici</p>
                      </div>
                    `;
                    e.target.parentNode.replaceChild(placeholder, e.target);
                  }}
                />
              </div>
            </motion.div>
          )}
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

export default HeroSection;

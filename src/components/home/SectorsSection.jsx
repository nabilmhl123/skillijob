import React from 'react';
import { motion } from 'framer-motion';
import './SectorsSection.css';

const SectorsSection = () => {
  const sectors = [
    {
      name: 'Industrie',
      description: 'Production & Manufacturing',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80',
      icon: '🏭'
    },
    {
      name: 'Logistique',
      description: 'Supply Chain & Entrepôt',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
      icon: '📦'
    },
    {
      name: 'Transport',
      description: 'Routier & Livraison',
      image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80',
      icon: '🚚'
    },
    {
      name: 'Tertiaire',
      description: 'Services & Bureau',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      icon: '💼'
    },
    {
      name: 'BTP',
      description: 'Construction & Bâtiment',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80',
      icon: '🏗️'
    },
    {
      name: 'Santé',
      description: 'Médical & Soins',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
      icon: '⚕️'
    },
    {
      name: 'Restauration',
      description: 'Hôtellerie & Service',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
      icon: '🍽️'
    },
    {
      name: 'Automobile',
      description: 'Mécanique & Carrosserie',
      image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80',
      icon: '🚗'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

  return (
    <section className="sectors-section section">
      <div className="container">
        <motion.div
          className="sectors-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Présent dans 8 secteurs d'activité</h2>
          <p className="sectors-subtitle">
            Nous accompagnons les entreprises et talents dans tous les domaines clés de l'économie française
          </p>
        </motion.div>

        <motion.div
          className="sectors-banner-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {sectors.map((sector, index) => (
            <motion.div
              key={index}
              className="sector-banner"
              variants={itemVariants}
              whileHover={{
                y: -5,
                transition: { duration: 0.3 }
              }}
            >
              <div className="sector-banner-image">
                <img src={sector.image} alt={sector.name} loading="lazy" />
                <div className="sector-banner-overlay"></div>
              </div>
              <div className="sector-banner-content">
                {/* <span className="sector-banner-icon">{sector.icon}</span> */}
                <h3 className="sector-banner-title">{sector.name}</h3>
                <p className="sector-banner-description">{sector.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SectorsSection;

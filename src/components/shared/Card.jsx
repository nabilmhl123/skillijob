import React from 'react';
import { motion } from 'framer-motion';
import './Card.css';

const Card = ({
  children,
  variant = 'default',
  hover = true,
  className = '',
  gradient = false,
  onClick,
  ...props
}) => {
  const baseClass = 'card';
  const variantClass = `card-${variant}`;
  const hoverClass = hover ? 'card-hover' : '';
  const gradientClass = gradient ? 'card-gradient' : '';
  const clickableClass = onClick ? 'card-clickable' : '';

  const classes = `${baseClass} ${variantClass} ${hoverClass} ${gradientClass} ${clickableClass} ${className}`.trim();

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
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
    <motion.div
      className={classes}
      onClick={onClick}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      whileHover={hover ? { y: -8, transition: { duration: 0.3 } } : {}}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Sous-composants pour une meilleure structure
Card.Header = ({ children, className = '' }) => (
  <div className={`card-header ${className}`}>{children}</div>
);

Card.Body = ({ children, className = '' }) => (
  <div className={`card-body ${className}`}>{children}</div>
);

Card.Footer = ({ children, className = '' }) => (
  <div className={`card-footer ${className}`}>{children}</div>
);

Card.Label = ({ children, className = '' }) => (
  <span className={`card-label ${className}`}>{children}</span>
);

export default Card;

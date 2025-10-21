import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Button.css';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  onClick,
  href,
  className = '',
  disabled = false,
  icon,
  ...props
}) => {
  const baseClass = 'btn';
  const variantClass = `btn-${variant}`;
  const sizeClass = `btn-${size}`;
  const classes = `${baseClass} ${variantClass} ${sizeClass} ${className}`.trim();

  const content = (
    <>
      {icon && <span className="btn-icon">{icon}</span>}
      <span>{children}</span>
    </>
  );

  // Si c'est un lien
  if (href && !disabled) {
    // Lien externe (commence par http ou mailto: ou tel:)
    const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');

    if (isExternal) {
      return (
        <motion.a
          href={href}
          className={classes}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
          {...props}
        >
          {content}
        </motion.a>
      );
    }

    // Lien interne (utilise React Router Link)
    return (
      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
        style={{ display: 'inline-block' }}
      >
        <Link to={href} className={classes} {...props}>
          {content}
        </Link>
      </motion.div>
    );
  }

  // Si c'est un bouton
  return (
    <motion.button
      className={classes}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02, y: disabled ? 0 : -2 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {content}
    </motion.button>
  );
};

export default Button;

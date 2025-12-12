import React, { useState } from 'react';
import './PartnerLogo.css';

const PartnerLogo = ({ name, color, domain }) => {
  const [imageError, setImageError] = useState(false);

  // Extraire les initiales du nom de l'entreprise (fallback)
  const getInitials = (companyName) => {
    const words = companyName.split(' ');
    if (words.length === 1) {
      return companyName.substring(0, 2).toUpperCase();
    }
    return words.map(word => word[0]).join('').toUpperCase().substring(0, 2);
  };

  const initials = getInitials(name);

  // Utiliser l'API Clearbit pour obtenir le logo de l'entreprise
  const logoUrl = `https://logo.clearbit.com/${domain}`;

  // Si l'image échoue, afficher les initiales SVG
  if (imageError) {
    return (
      <div className="partner-logo partner-logo-fallback" style={{ backgroundColor: `${color}15` }}>
        <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`gradient-${name}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: color, stopOpacity: 0.2 }} />
              <stop offset="100%" style={{ stopColor: color, stopOpacity: 0.05 }} />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="46" fill={`url(#gradient-${name})`} />
          <circle cx="50" cy="50" r="45" fill="none" stroke={color} strokeWidth="2" opacity="0.3" />
          <text
            x="50"
            y="50"
            textAnchor="middle"
            dominantBaseline="central"
            fill={color}
            fontSize="32"
            fontWeight="700"
            fontFamily="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
            letterSpacing="1"
          >
            {initials}
          </text>
        </svg>
      </div>
    );
  }

  return (
    <div className="partner-logo">
      <img
        src={logoUrl}
        alt={`${name} logo`}
        className="partner-logo-img"
        onError={() => setImageError(true)}
      />
    </div>
  );
};

export default PartnerLogo;

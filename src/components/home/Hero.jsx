import React from 'react';
import HeroSection from '../shared/HeroSection';
import heroImage from '../../assets/images/Image Home Page Skillijob  (3).png';

const Hero = () => {
  const badges = [
    '✓ +100 entreprises partenaires',
    '✓ +3 000 profils candidats',
    '✓ 95% de satisfaction'
  ];

  const buttons = [
    {
      text: 'Vous êtes un candidat',
      variant: 'primary',
      size: 'large',
      href: '/candidats'
    },
    {
      text: 'Vous êtes une entreprise',
      variant: 'yellow',
      size: 'large',
      href: '/entreprises'
    }
  ];

  return (
    <HeroSection
      title="Trouvez • Recrutez • Connectez"
      subtitle="Candidats, accédez à des offres réelles. Entreprises, découvrez des profils disponibles. Choisissez votre espace et démarrez gratuitement."
      badges={badges}
      buttons={buttons}
      // image={heroImage}
      imageAlt="Skillijob - Plateforme de recrutement"
    />
  );
};

export default Hero;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/shared/Button';
import PartnerLogo from '../components/shared/PartnerLogo';
import candidatImage from '../assets/images/image_candidat.png';
import './Candidates.css';

const Candidates = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const partners = [
    { name: 'Manpower', color: '#0050A0', domain: 'manpower.fr' },
    { name: 'Randstad', color: '#003DA5', domain: 'randstad.fr' },
    { name: 'Adecco', color: '#E30613', domain: 'adecco.fr' },
    { name: 'France Travail', color: '#FFC845', domain: 'francetravail.fr' },
    { name: 'Indeed', color: '#2164F3', domain: 'indeed.com' },
    { name: 'Monster', color: '#6E46AE', domain: 'monster.fr' },
    { name: 'LinkedIn', color: '#0A66C2', domain: 'linkedin.com' },
    { name: 'APEC', color: '#00A0DC', domain: 'apec.fr' }
  ];

  // Dupliquer les partenaires pour un défilement infini
  const duplicatedPartners = [...partners, ...partners, ...partners];

  const testimonials = [
    {
      name: 'Marc D.',
      role: 'Opérateur logistique',
      text: 'J\'ai déposé mon CV un lundi matin, et dès le mercredi j\'avais deux recruteurs qui me contactaient pour des postes en logistique près de chez moi. Le processus est vraiment simplifié.',
      rating: 5,
      date: '12 janvier 2025',
      verified: true
    },
    {
      name: 'Sarah L.',
      role: 'Assistante administrative',
      text: 'Après 6 mois de recherche infructueuse, Skillijob a refait mon CV et en 3 semaines j\'ai signé un CDI. L\'accompagnement RH fait vraiment la différence.',
      rating: 5,
      date: '8 janvier 2025',
      verified: true
    },
    {
      name: 'Julie M.',
      role: 'Aide-soignante',
      text: 'Enfin une plateforme qui propose des offres adaptées à mes contraintes horaires et de mobilité. J\'ai trouvé un poste à 10 minutes de chez moi.',
      rating: 5,
      date: '5 janvier 2025',
      verified: true
    },
    {
      name: 'Thomas P.',
      role: 'Commercial BtoB',
      text: 'Visible auprès de 500 recruteurs, ça change tout. En 10 jours, trois agences m\'ont appelé directement. Gain de temps énorme par rapport aux candidatures classiques.',
      rating: 5,
      date: '2 janvier 2025',
      verified: true
    },
    {
      name: 'Karim B.',
      role: 'Technicien de maintenance industrielle',
      text: 'Mon profil a été valorisé professionnellement et j\'ai reçu 4 propositions concrètes en une semaine. Je recommande vivement pour les profils techniques.',
      rating: 5,
      date: '28 décembre 2024',
      verified: true
    },
    {
      name: 'Céline R.',
      role: 'Gestionnaire de stock',
      text: 'Première fois que je trouve une plateforme sérieuse et efficace. Embauche en CDI après seulement 2 semaines d\'inscription. Merci à toute l\'équipe !',
      rating: 5,
      date: '20 décembre 2024',
      verified: true
    },
    {
      name: 'Alexandre M.',
      role: 'Chauffeur-livreur SPL',
      text: 'Interface simple, démarche rapide. J\'ai déposé mon permis et mes dispos, une semaine après j\'avais 3 propositions en livraison. Parfait pour les profils transport.',
      rating: 5,
      date: '15 décembre 2024',
      verified: true
    },
    {
      name: 'Nadia K.',
      role: 'Secrétaire médicale',
      text: 'L\'accompagnement RH est gratuit et vraiment qualitatif. Mon CV a été optimisé, mon profil mis en avant. J\'ai décroché un poste dans une clinique privée en 3 semaines.',
      rating: 5,
      date: '10 décembre 2024',
      verified: true
    }
  ];

  const faqs = [
    {
      question: '1) Est‑ce gratuit pour les candidats ?',
      answer: 'Oui, 100 % gratuit. Skillijob est financé par les entreprises partenaires.'
    },
    {
      question: '2) Que se passe‑t‑il après le dépôt ?',
      answer: 'Nous optimisons votre profil, puis un expert RH le vérifie avant diffusion anonyme.'
    },
    {
      question: '3) Puis‑je préciser mon projet ?',
      answer: 'Oui : mobilité, disponibilités, type de contrat (CDI, CDD, intérim, alternance), préférences métier.'
    },
    {
      question: '4) Mon profil est‑il anonyme ?',
      answer: 'Oui. Seules vos compétences sont visibles. Vos coordonnées ne sont partagées qu\'aux recruteurs intéressés.'
    }
  ];

  return (
    <main className="candidates-page">
      {/* Hero Section */}
      <section className="candidates-hero">
        <div className="container">
          <div className="hero-grid">
            {/* Hero Text Content */}
            <motion.div
              className="hero-text-content"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1>On fait matcher votre profil avec les bonnes entreprises.</h1>
              <p className="hero-subtitle">
                Déposez votre CV gratuitement. Notre équipe RH optimise votre profil et vous met en relation avec des recruteurs qui recherchent vraiment vos compétences.
              </p>
              <div className="hero-badges">
                <span className="badge">✓ 100% Gratuit</span>
                <span className="badge">✓ Profil Optimisé</span>
              </div>
              <div className="hero-ctas">
                <Button variant="primary" size="large">
                  Déposer mon CV
                </Button>
                <Button variant="secondary" size="large" href="tel:+33970196702">
                  📞 09 70 19 67 02
                </Button>
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              className="hero-image-content"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img src={candidatImage} alt="Candidat Skillijob" className="hero-candidat-image" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="section partners-section">
        <div className="container">
          <div className="partners-header">
            <h2 className="section-title">Nos partenaires</h2>
            <p className="section-subtitle">
              Des acteurs nationaux qui nous accompagnent sur l'emploi.
            </p>
          </div>

          {/* Carousel infini */}
          <div className="partners-carousel-wrapper">
            <div className="partners-carousel-container">
              <motion.div
                className="partners-carousel-track"
                animate={{ x: [0, -100 * partners.length] }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 30,
                    ease: "linear"
                  }
                }}
              >
                {duplicatedPartners.map((partner, index) => (
                  <div key={index} className="partners-carousel-slide">
                    <div className="partner-card">
                      <PartnerLogo name={partner.name} color={partner.color} domain={partner.domain} />
                      <div className="partner-name" style={{ color: partner.color }}>
                        {partner.name}
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Skillijob Section */}
      <section className="section why-section">
        <div className="container">
          <div className="why-content">
            <h2 className="why-main-title">Skillijob, une nouvelle façon de trouver un emploi.</h2>
            <div className="why-tagline">
              <span>Simple.</span>
              <span>Rapide.</span>
              <span>Efficace.</span>
            </div>
            <p className="why-intro">
              On ne vous fait pas courir après les annonces : on vous met en relation avec des entreprises qui recherchent réellement votre profil.
            </p>
          </div>

          <div className="features-cards-pro">
            <div className="feature-card-pro">
              <h3>Un seul dépôt</h3>
              <p>Un seul dépôt suffit. Notre équipe RH qualifie votre dossier et propose des postes adaptés.</p>
            </div>

            <div className="feature-card-pro">
              <h3>Offres réelles</h3>
              <p>Fini les annonces périmées. Les entreprises sur Skillijob recrutent vraiment.</p>
            </div>

            <div className="feature-card-pro">
              <h3>Contact direct</h3>
              <p>Profil visible auprès de 500 recruteurs partenaires. Contact direct pour entretien.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works - Purple Section */}
      <section className="section how-it-works purple-section">
        <div className="container">
          <div className="steps-header">
            <h2 className="steps-main-title">Comment ça marche ?</h2>
            <p className="steps-intro">
              Un parcours simple en 3 étapes — sans candidatures à répétition.
            </p>
          </div>

          <div className="steps-timeline">
            <div className="step-timeline-item">
              <div className="step-timeline-number">1</div>
              <div className="step-timeline-content">
                <h3>Déposez votre CV</h3>
                <p>Nous valorisons gratuitement votre parcours pour générer un profil attractif.</p>
              </div>
            </div>

            <div className="step-timeline-item">
              <div className="step-timeline-number">2</div>
              <div className="step-timeline-content">
                <h3>Validation RH</h3>
                <p>Profil vérifié et complété pour maximiser votre visibilité.</p>
              </div>
            </div>

            <div className="step-timeline-item">
              <div className="step-timeline-number">3</div>
              <div className="step-timeline-content">
                <h3>Soyez contacté</h3>
                <p>Visible auprès de 500 recruteurs partenaires. Ils vous contactent directement.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Trustpilot Style Carousel */}
      <section className="section testimonials-section">
        <div className="container">
          <div className="testimonials-header-trustpilot">
            <div className="rating-badge">
              <div className="stars-display">
                <span className="star filled">★</span>
                <span className="star filled">★</span>
                <span className="star filled">★</span>
                <span className="star filled">★</span>
                <span className="star filled">★</span>
              </div>
              <span className="rating-score">5.0</span>
            </div>
            <h2 className="testimonials-title-trustpilot">Témoignages certifiés</h2>
            <p className="testimonials-desc-trustpilot">
              Basé sur {testimonials.length} avis vérifiés de candidats ayant utilisé Skillijob.
            </p>
          </div>

          <div className="testimonials-carousel-container">
            <div className="testimonials-carousel-wrapper">
              <motion.div
                className="testimonials-carousel-track"
                animate={{ x: `-${currentTestimonial * (100 / 3)}%` }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="testimonial-trustpilot-card">
                    <div className="trustpilot-card-header">
                      <div className="user-info">
                        <div className="user-avatar">{testimonial.name.charAt(0)}</div>
                        <div className="user-details">
                          <span className="user-name">{testimonial.name}</span>
                          <span className="user-role">{testimonial.role}</span>
                        </div>
                      </div>
                      <div className="review-stars">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i} className="star-icon">★</span>
                        ))}
                      </div>
                    </div>
                    <p className="review-text">{testimonial.text}</p>
                    <div className="review-footer">
                      <span className="review-date">{testimonial.date}</span>
                      {testimonial.verified && <span className="verified-badge">✓ Vérifié</span>}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            <div className="carousel-dots-trustpilot">
              {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, index) => (
                <button
                  key={index}
                  className={`dot-trustpilot ${index === Math.floor(currentTestimonial / 3) ? 'active' : ''}`}
                  onClick={() => setCurrentTestimonial(index * 3)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section faq-section">
        <div className="container">
          <div className="faq-header">
            <h2 className="faq-main-title">Questions fréquentes des candidats</h2>
            <p className="faq-subtitle">
              Tout ce que vous devez savoir avant de déposer votre CV sur Skillijob.
            </p>
          </div>

          <div className="faq-carousel-wrapper">
            <div className="faq-carousel-container">
              <motion.div
                className="faq-carousel-track"
                animate={{ x: [0, -100 * faqs.length] }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 40,
                    ease: "linear"
                  }
                }}
              >
                {[...faqs, ...faqs, ...faqs].map((faq, index) => (
                  <div key={index} className="faq-carousel-item">
                    <div className="faq-item">
                      <h3 className="faq-question-new">{faq.question}</h3>
                      <p className="faq-answer-new">{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="section cta-final purple-section">
        <div className="container">
          <div className="cta-box">
            <h2>Prêt à booster votre recherche d'emploi ?</h2>
            <p>Valorisez votre profil dès aujourd'hui et soyez contacté rapidement par des recruteurs.</p>
            <div className="cta-buttons">
              <Button variant="primary" size="large">
                Déposer mon CV gratuitement
              </Button>
              <Button variant="secondary" size="large" href="tel:+33970196702">
                📞 09 70 19 67 02
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Candidates;

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSection from '../components/shared/HeroSection';
import Button from '../components/shared/Button';
import PartnerLogo from '../components/shared/PartnerLogo';
import Icons from '../components/shared/Icons';
import CandidateForm from '../components/forms/CandidateForm';
import candidatImage from '../assets/images/image_candidat.png';
import franceTravailLogo from '../assets/images/francetravail.jpg';
import './Candidates.css';

const Candidates = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const partners = [
    { name: '', color: '#0050A0', domain: 'unml.info' },
    { name: '', color: '#003DA5', domain: 'bpifrance.fr' },
    { name: '', color: '#E30613', domain: 'bge.asso.fr' },
    { name: '', color: '#FFC845', domain: 'francetravail.fr', logo: franceTravailLogo },
    { name: '', color: '#2164F3', domain: 'indeed.com' },
    { name: '', color: '#6E46AE', domain: 'monster.fr' },
    { name: '', color: '#0A66C2', domain: 'linkedin.com' },
    { name: '', color: '#00A0DC', domain: 'apec.fr' }
  ];

  // Dupliquer les partenaires pour un défilement infini
  const duplicatedPartners = [...partners, ...partners, ...partners];

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

  const heroBadges = ['✓ 100% Gratuit', '✓ Profil Optimisé'];
  const heroButtons = [
    {
      text: 'Déposer mon CV',
      variant: 'primary',
      size: 'large',
      href: 'https://form.jotform.com/252881502955059',
      external: true
    },
    {
      text: '09 70 19 67 02',
      variant: 'yellow',
      size: 'large',
      href: 'tel:+33970196702',
      icon: <Icons.Phone size={18} />
    }
  ];

  return (
    <main className="candidates-page">
      {/* Hero Section */}
      <HeroSection
        title="On fait matcher votre profil avec les bonnes entreprises."
        subtitle="Déposez votre CV gratuitement. Notre équipe RH optimise votre profil et vous met en relation avec des recruteurs qui recherchent vraiment vos compétences."
        badges={heroBadges}
        buttons={heroButtons}
        // image={candidatImage}
        imageAlt="Candidat Skillijob"
      />

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
                animate={{ x: [0, -(280 * partners.length)] }}
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
                      {partner.logo ? (
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className="partner-logo-image"
                          style={{ maxHeight: '120px', maxWidth: '240px', objectFit: 'contain' }}
                        />
                      ) : (
                        <PartnerLogo name={partner.name} color={partner.color} domain={partner.domain} />
                      )}
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
          <div className="why-layout-grid">
            <div className="why-content-left">
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

            <div className="why-features-right">
              <div className="feature-card-compact">
                <div className="feature-icon">1</div>
                <div className="feature-content">
                  <h3>Un seul dépôt</h3>
                  <p>Un seul dépôt suffit. Notre équipe RH qualifie votre dossier et propose des postes adaptés.</p>
                </div>
              </div>

              <div className="feature-card-compact">
                <div className="feature-icon">2</div>
                <div className="feature-content">
                  <h3>Offres réelles</h3>
                  <p>Fini les annonces périmées. Les entreprises sur Skillijob recrutent vraiment.</p>
                </div>
              </div>

              <div className="feature-card-compact">
                <div className="feature-icon">3</div>
                <div className="feature-content">
                  <h3>Contact direct</h3>
                  <p>Profil visible auprès de 500 recruteurs partenaires. Contact direct pour entretien.</p>
                </div>
              </div>
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

          <div className="steps-cta">
            <Button variant="primary" size="large" href="https://form.jotform.com/252881502955059" external>
              Déposer mon CV
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section testimonials-candidates-section">
        <div className="container">
          <div className="testimonials-candidates-header">
            <h2 className="testimonials-candidates-title">Ils ont trouvé grâce à Skillijob</h2>
            <p className="testimonials-candidates-subtitle">Des candidats accompagnés, valorisés et recrutés plus vite.</p>
          </div>

          <div className="testimonials-candidates-carousel">
            <div className="testimonials-candidates-track">
              {/* Premier set de témoignages */}
              <div className="testimonial-candidate-card">
                <div className="testimonial-candidate-stars">★★★★★</div>
                <p className="testimonial-candidate-text">
                  "Contacté en 48h pour deux entretiens. Simple et efficace."
                </p>
                <div className="testimonial-candidate-author">
                  <span className="author-name">David</span>
                  <span className="author-role">Chauffeur PL</span>
                </div>
              </div>

              <div className="testimonial-candidate-card">
                <div className="testimonial-candidate-stars">★★★★★</div>
                <p className="testimonial-candidate-text">
                  "CV retravaillé, meilleurs retours. J'ai signé en 3 semaines."
                </p>
                <div className="testimonial-candidate-author">
                  <span className="author-name">Lucas</span>
                  <span className="author-role">Technicien maintenance</span>
                </div>
              </div>

              <div className="testimonial-candidate-card">
                <div className="testimonial-candidate-stars">★★★★★</div>
                <p className="testimonial-candidate-text">
                  "Enfin des offres proches, adaptées à mes horaires."
                </p>
                <div className="testimonial-candidate-author">
                  <span className="author-name">Sonia</span>
                  <span className="author-role">Cariste</span>
                </div>
              </div>

              <div className="testimonial-candidate-card">
                <div className="testimonial-candidate-stars">★★★★★</div>
                <p className="testimonial-candidate-text">
                  "Visible sur 500 entreprises, c'est hyper rassurant !"
                </p>
                <div className="testimonial-candidate-author">
                  <span className="author-name">Marie</span>
                  <span className="author-role">Aide-soignante</span>
                </div>
              </div>

              <div className="testimonial-candidate-card">
                <div className="testimonial-candidate-stars">★★★★★</div>
                <p className="testimonial-candidate-text">
                  "Pas de candidatures à répéter. Mon profil fait le job."
                </p>
                <div className="testimonial-candidate-author">
                  <span className="author-name">Karim</span>
                  <span className="author-role">Agent de sécurité</span>
                </div>
              </div>

              <div className="testimonial-candidate-card">
                <div className="testimonial-candidate-stars">★★★★★</div>
                <p className="testimonial-candidate-text">
                  "Super accompagnement RH. Mon CV a été transformé !"
                </p>
                <div className="testimonial-candidate-author">
                  <span className="author-name">Pauline</span>
                  <span className="author-role">Secrétaire médicale</span>
                </div>
              </div>

              <div className="testimonial-candidate-card">
                <div className="testimonial-candidate-stars">★★★★★</div>
                <p className="testimonial-candidate-text">
                  "J'ai trouvé un CDI près de chez moi en 2 semaines."
                </p>
                <div className="testimonial-candidate-author">
                  <span className="author-name">Thomas</span>
                  <span className="author-role">Mécanicien auto</span>
                </div>
              </div>

              <div className="testimonial-candidate-card">
                <div className="testimonial-candidate-stars">★★★★★</div>
                <p className="testimonial-candidate-text">
                  "Gratuit et efficace. Merci Skillijob !"
                </p>
                <div className="testimonial-candidate-author">
                  <span className="author-name">Amina</span>
                  <span className="author-role">Vendeuse en prêt-à-porter</span>
                </div>
              </div>

              {/* Duplication pour défilement infini */}
              <div className="testimonial-candidate-card">
                <div className="testimonial-candidate-stars">★★★★★</div>
                <p className="testimonial-candidate-text">
                  "Contacté en 48h pour deux entretiens. Simple et efficace."
                </p>
                <div className="testimonial-candidate-author">
                  <span className="author-name">David</span>
                  <span className="author-role">Chauffeur PL</span>
                </div>
              </div>

              <div className="testimonial-candidate-card">
                <div className="testimonial-candidate-stars">★★★★★</div>
                <p className="testimonial-candidate-text">
                  "CV retravaillé, meilleurs retours. J'ai signé en 3 semaines."
                </p>
                <div className="testimonial-candidate-author">
                  <span className="author-name">Lucas</span>
                  <span className="author-role">Technicien maintenance</span>
                </div>
              </div>

              <div className="testimonial-candidate-card">
                <div className="testimonial-candidate-stars">★★★★★</div>
                <p className="testimonial-candidate-text">
                  "Enfin des offres proches, adaptées à mes horaires."
                </p>
                <div className="testimonial-candidate-author">
                  <span className="author-name">Sonia</span>
                  <span className="author-role">Cariste</span>
                </div>
              </div>

              <div className="testimonial-candidate-card">
                <div className="testimonial-candidate-stars">★★★★★</div>
                <p className="testimonial-candidate-text">
                  "Visible sur 500 entreprises, c'est hyper rassurant !"
                </p>
                <div className="testimonial-candidate-author">
                  <span className="author-name">Marie</span>
                  <span className="author-role">Aide-soignante</span>
                </div>
              </div>

              <div className="testimonial-candidate-card">
                <div className="testimonial-candidate-stars">★★★★★</div>
                <p className="testimonial-candidate-text">
                  "Pas de candidatures à répéter. Mon profil fait le job."
                </p>
                <div className="testimonial-candidate-author">
                  <span className="author-name">Karim</span>
                  <span className="author-role">Agent de sécurité</span>
                </div>
              </div>

              <div className="testimonial-candidate-card">
                <div className="testimonial-candidate-stars">★★★★★</div>
                <p className="testimonial-candidate-text">
                  "Super accompagnement RH. Mon CV a été transformé !"
                </p>
                <div className="testimonial-candidate-author">
                  <span className="author-name">Pauline</span>
                  <span className="author-role">Secrétaire médicale</span>
                </div>
              </div>

              <div className="testimonial-candidate-card">
                <div className="testimonial-candidate-stars">★★★★★</div>
                <p className="testimonial-candidate-text">
                  "J'ai trouvé un CDI près de chez moi en 2 semaines."
                </p>
                <div className="testimonial-candidate-author">
                  <span className="author-name">Thomas</span>
                  <span className="author-role">Mécanicien auto</span>
                </div>
              </div>

              <div className="testimonial-candidate-card">
                <div className="testimonial-candidate-stars">★★★★★</div>
                <p className="testimonial-candidate-text">
                  "Gratuit et efficace. Merci Skillijob !"
                </p>
                <div className="testimonial-candidate-author">
                  <span className="author-name">Amina</span>
                  <span className="author-role">Vendeuse en prêt-à-porter</span>
                </div>
              </div>
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

          <div className="faq-list-simple">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item-simple">
                <h3 className="faq-question-simple">{faq.question}</h3>
                <p className="faq-answer-simple">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="faq-cta">
            <Link to="/faq" className="faq-link-button">
              Voir toutes les questions
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Final - Modal Style */}
      <section className="cta-section-modern">
        <div className="container">
          <div className="cta-modal-wrapper">
            <div className="cta-modal-card">
              <div className="cta-modal-header">
                <h2 className="cta-modal-title">
                  Prêt à booster votre recherche d'emploi ?
                </h2>
                <p className="cta-modal-subtitle">
                  100% Gratuit • Profil Optimisé • Visibilité auprès de 500+ recruteurs
                </p>
              </div>

              <div className="cta-modal-actions">
                <div className="cta-action-card cta-action-card-highlight">
                  <div className="cta-highlight-badge">Recommandé</div>
                  <h3 className="cta-action-title">Déposer mon CV</h3>
                  <p className="cta-action-desc">Notre équipe RH optimise votre profil et vous met en relation avec les meilleurs recruteurs</p>
                  <Button variant="primary" size="large" href="https://form.jotform.com/252881502955059" external>
                    Déposer mon CV
                  </Button>
                </div>

                <div className="cta-action-card">
                  <h3 className="cta-action-title">Nous appeler</h3>
                  <p className="cta-action-desc">Parlez directement avec un conseiller RH pour optimiser votre recherche d'emploi</p>
                  <Button variant="yellow" size="large" href="tel:+33970196702" icon={<Icons.Phone size={18} />}>
                    09 70 19 67 02
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Candidate Form Modal */}
      <AnimatePresence>
        {isFormOpen && <CandidateForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />}
      </AnimatePresence>
    </main>
  );
};

export default Candidates;

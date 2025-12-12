import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/shared/Button';
import PartnerLogo from '../components/shared/PartnerLogo';
import HeroSection from '../components/shared/HeroSection';
import PricingSection from '../components/pricing/PricingSection';
import candidatImage from '../assets/images/image_candidat.png';
import franceTravailLogo from '../assets/images/francetravail.jpg';
import './CompaniesNew.css';

const CompaniesNew = () => {
  const [activeModal, setActiveModal] = useState(null);

  // Partners data - Same as Candidates.jsx
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

  // Problems data
  const problems = [
    'Avez cherchez en urgence à recruter dans un métier en tension',
    'Avez testé des cabinets de recrutement trop chers, ou de l\'intérim inefficace',
    'Avez déjà posté des annonces, sans résultat',
    'Avez des validations internes lentes, managers débordés',
    'Vous n\'avez pas le temps de trier et qualifier des CV non qualifiés',
    'Avez un mauvais matching : localisation / salaires / horaires'
  ];

  // Benefits data
  const benefits = [
    {
      title: 'Gagnez du temps dès le départ',
      description: 'Vous accédez directement à des profils disponibles, déjà qualifiés. Nos clients économisent en moyenne 8 à 12 heures par recrutement.',
      stat: '8-12h',
      statLabel: 'économisées par recrutement'
    },
    {
      title: 'Payez pour du concret, pas pour du flou',
      description: 'Vous choisissez les profils. Vous décidez qui rencontrer. Jusqu\'à 4 000 € d\'économies par rapport à un cabinet classique.',
      stat: '4000€',
      statLabel: 'd\'économies vs cabinet classique'
    },
    {
      title: 'Accédez à un vivier actif et ciblé',
      description: 'Tous nos candidats sont appelés, validés et disponibles. Plus de 3 000 profils qualifiés dans les secteurs en tension.',
      stat: '3000+',
      statLabel: 'profils qualifiés'
    },
    {
      title: 'Recrutez rapidement, sereinement',
      description: 'Vous êtes accompagné à chaque étape, jusqu\'à l\'entretien. 80 % de nos clients recrutent en moins de 3 semaines.',
      stat: '80%',
      statLabel: 'recrutent en moins de 3 semaines'
    }
  ];

  // Steps data
  const steps = [
    {
      number: '1',
      title: 'Vous consultez notre vivier de profils disponibles dans votre secteur',
      description: 'Filtrez par métier/zone et pré-sélectionnez vos profils.'
    },
    {
      number: '2',
      title: 'Vous débloquez uniquement ceux qui vous intéressent',
      description: 'Validation en ligne → dossiers complets < 24h (CV, coordonnées, compte-rendu RH).'
    },
    {
      number: '3',
      title: 'Vous les contactez directement pour organiser vos entretiens',
      description: 'Vous contactez directement les candidats ; nous collectons leurs dispos si besoin.'
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      quote: "5 profils reçus en moins de 24h, 3 entretiens planifiés la semaine suivante. Simple et efficace.",
      name: "Mélanie G.",
      role: "DRH",
      company: "Industrie"
    },
    {
      quote: "On a arrêté de trier des CV. On contacte directement des candidats disponibles et motivés.",
      name: "Hugo P.",
      role: "Responsable Exploitation",
      company: "Logistique"
    },
    {
      quote: "Zéro commission à l'embauche, budget maîtrisé. On recommande sans hésiter.",
      name: "Sonia L.",
      role: "Dirigeante",
      company: "BTP"
    },
    {
      quote: "Le compte‑rendu RH nous fait gagner un temps fou. On fait directement les bons entretiens.",
      name: "Yann C.",
      role: "Responsable Recrutement",
      company: "Tertiaire"
    }
  ];

  const heroBadges = ['✓ Recrutement accéléré', '✓ Gain de temps réel'];
  const heroButtons = [
    {
      text: 'Voir les candidats',
      variant: 'primary',
      size: 'large',
      href: 'https://form.jotform.com/252922402753050',
      external: true
    },
    {
      text: 'Déposer une offre d\'emploi',
      variant: 'yellow',
      size: 'large',
      href: 'https://04bhw4ay.rcld.app/dashboard/#/nc/form/42ed82b6-a0b5-40ee-b688-e3a90268657d',
      external: true
    }
  ];

  return (
    <div className="companies-new-page">
      {/* Hero Section */}
      <HeroSection
        title="Recruter en moins de 30 jours."
        subtitle="Contactez 5 profils prêts à l'entretien. Vous n'avez plus qu'à choisir."
        badges={heroBadges}
        buttons={heroButtons}
        note="Accès immédiat à l'Espace Candidats • Envoi < 24h après déblocage"
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

      {/* Why Section - Problems - Glass Cards */}
      <section
        aria-labelledby="why-title"
        className="problems-section"
        id="pourquoi"
      >
        <div className="container">
          <h2 className="section-title problems-title" id="why-title">
            Trop de temps perdu, Trop peu de bons profils!
          </h2>
          <p className="section-sub problems-subtitle">
            Si vous êtes ici, c'est probablement parce que vous :
          </p>
          <div className="problems-grid">
            {problems.map((problem, idx) => (
              <div key={idx} className="problem-card">
                <p>{problem}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section aria-labelledby="benefits-title" id="avantages" className="benefits-section">
        <div className="container">
          <h2 className="section-title" id="benefits-title">
            Skillijob, c'est une <strong>nouvelle façon de recruter</strong>.
          </h2>
          <div className="benefits-tagline">
            <span>Simple.</span>
            <span>Rapide.</span>
            <span>Efficace.</span>
          </div>
          <p className="section-sub">
            On ne vous envoie pas des CV. On vous met en relation avec des candidats <strong>disponibles, déjà qualifiés</strong> par notre équipe.
          </p>

          <div className="benefits-grid">
            <div className="benefit-card">
              <h3>Gagnez du temps dès le départ</h3>
              <p className="section-sub">
                Vous accédez directement à des profils disponibles, déjà qualifiés. Nos clients économisent en moyenne <strong>8 à 12 heures</strong> par recrutement.
              </p>
            </div>

            <div className="benefit-card">
              <h3>Payez pour du concret, pas pour du flou</h3>
              <p className="section-sub">
                Vous choisissez les profils. Vous décidez qui rencontrer. Jusqu'à <strong>4 000 €</strong> d'économies par rapport à un cabinet classique.
              </p>
            </div>

            <div className="benefit-card">
              <h3>Accédez à un vivier actif et ciblé</h3>
              <p className="section-sub">
                Tous nos candidats sont appelés, validés et disponibles. Plus de <strong>3 000 profils qualifiés</strong> dans les secteurs en tension.
              </p>
            </div>

            <div className="benefit-card">
              <h3>Recrutez rapidement, sereinement</h3>
              <p className="section-sub">
                Vous êtes accompagné à chaque étape, jusqu'à l'entretien. <strong>80 %</strong> de nos clients recrutent en <strong>moins de 3 semaines</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section aria-labelledby="how-title" id="how" className="how-section-main">
        <div className="container">
          <h2 className="section-title" id="how-title">
            Comment ça marche ?
          </h2>
          <p className="section-sub">
            Un parcours simple en 3 étapes — sans friction.
          </p>

          <div className="steps-grid">
            {steps.map((step, idx) => (
              <div key={idx} className="step-card">
                <div className="step-num">{step.number}</div>
                <div className="kpi">{step.title}</div>
                <p className="section-sub">{step.description}</p>
              </div>
            ))}
          </div>

          {/* Timeline Roadmap intégrée */}
          <div className="timeline-wrapper">
            <div className="timeline-container">

              <div className="milestone" data-position="top">
                <div className="milestone-content">
                  <h3 className="milestone-title">CONSULTER</h3>
                  {/* <p className="milestone-desc">Créez votre compte entreprise en quelques clics</p> */}
                </div>
                <div className="milestone-circle">
                  <span>01</span>
                </div>
              </div>

              <div className="milestone" data-position="bottom">
                <div className="milestone-circle">
                  <span>02</span>
                </div>
                <div className="milestone-content">
                  <h3 className="milestone-title">DÉBLOQUER</h3>
                  {/* <p className="milestone-desc">Parcourez +3000 profils qualifiés dans votre secteur</p> */}
                </div>
              </div>

              <div className="milestone" data-position="top">
                <div className="milestone-content">
                  <h3 className="milestone-title">CONTACTER</h3>
                  {/* <p className="milestone-desc">Choisissez 5 candidats correspondant à vos besoins</p> */}
                </div>
                <div className="milestone-circle">
                  <span>03</span>
                </div>
              </div>

              <div className="milestone" data-position="bottom">
                <div className="milestone-circle">
                  <span>04</span>
                </div>
                <div className="milestone-content">
                  <h3 className="milestone-title">RENCONTRER</h3>
                  {/* <p className="milestone-desc">Contactez directement vos candidats préqualifiés</p> */}
                </div>
              </div>

              <div className="milestone" data-position="top">
                <div className="milestone-content">
                  <h3 className="milestone-title">RECRUTER</h3>
                  {/* <p className="milestone-desc">Embauchez en moins de 30 jours garanti</p> */}
                </div>
                <div className="milestone-circle">
                  <span>05</span>
                </div>
              </div>

            </div>
          </div>

          <div className="cta" style={{ marginTop: '2.5rem', justifyContent: 'center' }}>
            <Button variant="primary" size="large" href="https://form.jotform.com/252922402753050" external>
              Voir les candidats
            </Button>
            <Button variant="yellow" size="large" href="/paiements">
              Obtenir mes 5 profils qualifiés
            </Button>
          </div>
        </div>
      </section>

      {/* Guarantees Section */}
      <section className="guarantees-main-section">
        <div className="container">
          <h2 className="guarantees-main-title">Garanties puissantes</h2>

          <div className="guarantees-row">
            <article className="guarantee-card">
              <svg className="card-shape-svg" viewBox="0 0 300 350" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <clipPath id="octagon-clip">
                    <polygon points="90,10 210,10 290,90 290,210 210,290 90,290 10,210 10,90" />
                  </clipPath>
                </defs>
                <polygon
                  points="90,10 210,10 290,90 290,210 210,290 90,290 10,210 10,90"
                  fill="white"
                  stroke="#6C00FF"
                  strokeWidth="6"
                />
              </svg>
              <div className="card-content">
                <h4 className="card-title">Garantie de résultat</h4>
                <p className="card-text">
                  Nous garantissons le nombre de candidats prévus dans le délai convenu, ou nous continuons sans frais.
                </p>
                <div className="card-check">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
              </div>
            </article>

            <article className="guarantee-card">
              <svg className="card-shape-svg" viewBox="0 0 300 350" preserveAspectRatio="xMidYMid meet">
                <polygon
                  points="90,10 210,10 290,90 290,210 210,290 90,290 10,210 10,90"
                  fill="white"
                  stroke="#6C00FF"
                  strokeWidth="6"
                />
              </svg>
              <div className="card-content">
                <h4 className="card-title">Garantie remplacement</h4>
                <p className="card-text">
                  Si un candidat ne convient pas ou ne se présente pas, nous le remplaçons gratuitement sous 48h.
                </p>
                <div className="card-check">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
              </div>
            </article>

            <article className="guarantee-card">
              <svg className="card-shape-svg" viewBox="0 0 300 350" preserveAspectRatio="xMidYMid meet">
                <polygon
                  points="90,10 210,10 290,90 290,210 210,290 90,290 10,210 10,90"
                  fill="white"
                  stroke="#6C00FF"
                  strokeWidth="6"
                />
              </svg>
              <div className="card-content">
                <h4 className="card-title">Garantie qualité</h4>
                <p className="card-text">
                  Chaque profil est pré-qualifié par nos équipes RH : expérience validée, disponibilité confirmée.
                </p>
                <div className="card-check">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
              </div>
            </article>
          </div>

          <div className="highlights">
            <h3 className="highlights-title">En clair, Skillijob c'est :</h3>
            <div className="highlights-row">
              <div className="highlight-item">
                <div className="icon-wrapper">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#6C00FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path>
                    <path d="M12 18V6"></path>
                  </svg>
                </div>
                <p className="kpi-small">Jusqu'à</p>
                <p className="kpi-large">4 000 €*</p>
                <p className="kpi-desc">d'Économies par recrutement vs cabinet classique</p>
              </div>

              <div className="highlight-item">
                <div className="icon-wrapper">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#6B3BFF" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <p className="kpi-small">Jusqu'à</p>
                <p className="kpi-large">50 H</p>
                <p className="kpi-desc">de gain de temps sur le processus de recrutement</p>
              </div>

              <div className="highlight-item">
                <div className="icon-wrapper">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#6B3BFF" strokeWidth="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="8.5" cy="7" r="4"></circle>
                    <polyline points="17 11 19 13 23 9"></polyline>
                  </svg>
                </div>
                <p className="kpi-small">Plus de</p>
                <p className="kpi-large">3 000</p>
                <p className="kpi-desc">profils qualifiés disponibles dans nos secteurs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection />

      {/* About Section */}
      <section aria-labelledby="about-title" className="about-section" id="apropos">
        <div className="container">
          <div className="about-grid">
            <div className="about-content">
              <h2 className="section-title" id="about-title" style={{ textAlign: 'left', color: '#fff', WebkitTextFillColor: '#fff' }}>
                À propos
              </h2>
              <p style={{ color: '#EAF0F6', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                Skillijob est né sur le terrain, au contact des équipes qui vivent les vraies galères du recrutement : chefs d'équipe, opérateurs, RH, techniciens, dirigeants de PME. Nous avons construit notre modèle avec eux, pour eux : profils validés, accès immédiat, mise en relation rapide.
              </p>
              <ul className="values">
                <li><strong>Obsession opérationnelle :</strong> efficacité, simplicité, résultat.</li>
                <li><strong>Métiers en tension :</strong> Industrie, Logistique, BTP, Transport, Tertiaire…</li>
                <li><strong>Process humain + digital :</strong> préqualification RH obligatoire, données à jour.</li>
              </ul>
            </div>
            <div className="about-stats">
              <div className="facts">
                <span className="tag">20+ ans d’expérience terrain cumulée</span>
                <div className="facts-grid">
                  <div className="fact">
                    <strong>3000+</strong>
                    <span>Profils activés</span>
                  </div>
                  <div className="fact">
                    <strong>8</strong>
                    <span>Secteurs couverts</span>
                  </div>
                  <div className="fact">
                    <strong>{'<'}24h</strong>
                    <span>Après déblocage</span>
                  </div>
                  <div className="fact">
                    <strong>98%</strong>
                    <span>de Satisfaction</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Modal Style */}
      <section className="cta-section-modern">
        <div className="container">
          <div className="cta-modal-wrapper">
            <div className="cta-modal-card">
              <div className="cta-modal-header">
                <h2 className="cta-modal-title">
                  Prêt à accélérer vos recrutements ?
                </h2>
                <p className="cta-modal-subtitle">
                  Aucun engagement • Accès immédiat à l'Espace Candidats • Profils vérifiés RH
                </p>
              </div>

              <div className="cta-modal-actions">
                <div className="cta-action-card">
                  <h3 className="cta-action-title">Explorer les candidats</h3>
                  <p className="cta-action-desc">Parcourez notre vivier de profils qualifiés gratuitement</p>
                  <Button variant="primary" size="large" href="https://form.jotform.com/252922402753050" external>
                    Voir les candidats
                  </Button>
                </div>

                <div className="cta-action-card cta-action-card-highlight">
                  <div className="cta-highlight-badge">Recommandé</div>
                  <h3 className="cta-action-title">Débloquer des profils</h3>
                  <p className="cta-action-desc">Accédez instantanément à 5 candidats prêts à l'entretien</p>
                  <Button variant="yellow" size="large" href="/paiements">
                    Obtenir mes 5 profils qualifiés
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CompaniesNew;

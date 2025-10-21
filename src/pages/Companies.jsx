import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/shared/Button';
import Card from '../components/shared/Card';
import './Companies.css';

const Companies = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      stars: 5,
      quote: "5 profils reçus en moins de 24h, 3 entretiens planifiés la semaine suivante. Simple et efficace.",
      name: "Mélanie G.",
      role: "DRH • Industrie"
    },
    {
      stars: 5,
      quote: "On a arrêté de trier des CV. On contacte directement des candidats disponibles et motivés.",
      name: "Hugo P.",
      role: "Responsable Exploitation • Logistique"
    },
    {
      stars: 5,
      quote: "Zéro commission à l'embauche, budget maîtrisé. On recommande sans hésiter.",
      name: "Sonia L.",
      role: "Dirigeante • BTP"
    },
    {
      stars: 5,
      quote: "Le compte-rendu RH nous fait gagner un temps fou. On fait directement les bons entretiens.",
      name: "Yann C.",
      role: "Responsable Recrutement • Tertiaire"
    }
  ];

  // Duplicate testimonials for infinite scroll effect
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  const problems = [
    "Cherchez en urgence à recruter dans un métier en tension",
    "Avez testé des cabinets de recrutement trop chers, ou de l'intérim inefficace",
    "Avez déjà posté des annonces, sans résultat",
    "Validations internes lentes, managers débordés",
    "Vous n'avez pas le temps de trier et qualifier des CV non qualifiés",
    "Mauvais matching : localisation / salaires / horaires"
  ];

  const benefits = [
    {
      icon: "⚡",
      title: "Gagnez du temps dès le départ",
      description: "Vous accédez directement à des profils disponibles, déjà qualifiés.",
      stat: "Nos clients économisent en moyenne 8 à 12 heures par recrutement."
    },
    {
      icon: "💰",
      title: "Payez pour du concret, pas pour du flou",
      description: "Vous choisissez les profils. Vous décidez qui rencontrer.",
      stat: "Jusqu'à 4 000 € d'économies par rapport à un cabinet classique."
    },
    {
      icon: "🎯",
      title: "Accédez à un vivier actif et ciblé",
      description: "Tous nos candidats sont appelés, validés et disponibles.",
      stat: "Plus de 3 000 profils qualifiés dans les secteurs en tension."
    },
    {
      icon: "✅",
      title: "Recrutez rapidement, sereinement",
      description: "Vous êtes accompagné à chaque étape, jusqu'à l'entretien.",
      stat: "80 % de nos clients recrutent en moins de 3 semaines."
    }
  ];

  const steps = [
    {
      number: "1",
      title: "Vous consultez notre vivier de profils disponibles dans votre secteur",
      description: "Filtrez par métier/zone et pré-sélectionnez vos profils."
    },
    {
      number: "2",
      title: "Vous débloquez uniquement ceux qui vous intéressent",
      description: "Validation en ligne → dossiers complets < 24h (CV, coordonnées, compte-rendu RH)."
    },
    {
      number: "3",
      title: "Vous les contactez directement pour organiser vos entretiens",
      description: "Vous contactez directement les candidats ; nous collectons leurs dispos si besoin."
    }
  ];

  const offerFeatures = [
    "5 entretiens garantis avec des profils que vous choisissez vous-même",
    "Accès immédiat à notre base de candidats disponibles et qualifiés",
    "Déblocage instantané : CV complet, coordonnées, compte-rendu RH",
    "Garantie remplacement si un candidat ne se présente pas",
    "Sourcing renforcé : dès réception de votre fiche de poste, notre équipe recherche activement des profils ciblés pour vos besoins"
  ];

  const faqs = [
    {
      question: "Puis‑je voir les candidats avant de payer ?",
      answer: "Oui. L'Espace Candidats est gratuit et immédiat. Vous ne payez qu'au moment de débloquer vos 5 dossiers (crédit 60 jours)."
    },
    {
      question: "Que contient un dossier 'débloqué' ?",
      answer: "CV complet, coordonnées, compte‑rendu RH (motivation, disponibilité, mobilité, prétentions, points forts)."
    },
    {
      question: "En combien de temps recevons‑nous les dossiers ?",
      answer: "Moins de 24h ouvrées après votre demande de déblocage."
    },
    {
      question: "Comment sélectionner les 5 profils à débloquer ?",
      answer: "Depuis l'Espace Candidats : filtrez, pré‑sélectionnez, envoyez les références — nous livrons les dossiers complets."
    }
  ];

  return (
    <main className="companies-page">
      {/* Hero Section */}
      <section className="companies-hero">
        <div className="container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="hero-badges-top">
              <span className="badge">Recrutement accéléré</span>
              <span className="badge">Gain de temps réel</span>
            </div>
            <h1>Recruter en moins de 30 jours.</h1>
            <p className="hero-subtitle">
              Contactez 5 profils prêts à l'entretien. Vous n'avez plus qu'à choisir.
            </p>
            <div className="hero-buttons">
              <Button variant="primary" size="large" href="/candidats">
                Voir les candidats
              </Button>
              <Button variant="secondary" size="large">
                Obtenir mes 5 profils qualifiés
              </Button>
            </div>
            <p className="hero-note">
              Accès immédiat à l'Espace Candidats • Envoi &lt; 24h après déblocage
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Section (Problems) */}
      <section className="section why-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Trop de temps perdu, Trop peu de bons profils!</h2>
            <p className="section-subtitle">Si vous êtes ici, c'est probablement parce que vous :</p>
          </div>
          <div className="problems-grid">
            {problems.map((problem, index) => (
              <motion.div
                key={index}
                className="problem-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <p>{problem}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section benefits-section">
        <div className="container">
          <div className="section-header centered">
            <h2 className="section-title">Skillijob, c'est une nouvelle façon de recruter.</h2>
            <p className="section-tagline">Simple. Rapide. Efficace.</p>
            <p className="section-description">
              On ne vous envoie pas des CV. On vous met en relation avec des candidats disponibles,
              déjà qualifiés par notre équipe.
            </p>
          </div>
          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <Card key={index}>
                <div className="benefit-icon">{benefit.icon}</div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
                <p className="benefit-stat">{benefit.stat}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section how-it-works">
        <div className="container">
          <div className="section-header centered">
            <h2 className="section-title">Comment ça marche ?</h2>
            <p className="section-subtitle">Un parcours simple en 3 étapes — sans friction.</p>
          </div>
          <div className="steps-container">
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                <motion.div
                  className="step-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="step-number">{step.number}</div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </motion.div>
                {index < steps.length - 1 && <div className="step-arrow">→</div>}
              </React.Fragment>
            ))}
          </div>
          <div className="section-cta">
            <Button variant="primary" size="large" href="/candidats">
              Voir les candidats
            </Button>
            <Button variant="secondary" size="large">
              Obtenir mes 5 profils qualifiés
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section testimonials-section">
        <div className="container">
          <h2 className="section-title centered">Ils en parlent mieux que nous</h2>
          <div className="testimonials-carousel-wrapper">
            <div className="testimonials-carousel-container">
              <motion.div
                className="testimonials-carousel-track"
                animate={{ x: [0, -100 * testimonials.length] }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 30,
                    ease: "linear"
                  }
                }}
              >
                {duplicatedTestimonials.map((testimonial, index) => (
                  <div key={index} className="testimonial-card">
                    <div className="stars">
                      {'★'.repeat(testimonial.stars)}
                    </div>
                    <p className="testimonial-quote">"{testimonial.quote}"</p>
                    <div className="testimonial-author">
                      <p className="author-name">{testimonial.name}</p>
                      <p className="author-role">{testimonial.role}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Offer Section */}
      <section className="section offer-section">
        <div className="container">
          <div className="offer-card">
            <h2>Offre Starter</h2>
            <ul className="offer-features">
              {offerFeatures.map((feature, index) => (
                <li key={index}>
                  <span className="checkmark">✅</span>
                  {feature}
                </li>
              ))}
            </ul>
            <Button variant="secondary" size="large">
              Obtenir mes 5 profils qualifiés
            </Button>
            <p className="offer-note">Dossiers complets envoyés &lt; 24h après déblocage.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section about-section">
        <div className="container">
          <h2 className="section-title centered">À propos</h2>
          <div className="about-content">
            <p className="about-main">
              Skillijob est né sur le terrain, au contact des équipes qui vivent les vraies galères
              du recrutement : chefs d'équipe, opérateurs, RH, techniciens, dirigeants de PME.
              Nous avons construit notre modèle avec eux, pour eux : <strong>profils validés</strong>,
              <strong> accès immédiat</strong>, <strong>mise en relation rapide</strong>.
            </p>
            <ul className="about-values">
              <li><strong>Obsession opérationnelle :</strong> efficacité, simplicité, résultat.</li>
              <li><strong>Métiers en tension :</strong> Industrie, Logistique, BTP, Transport, Tertiaire…</li>
              <li><strong>Process humain + digital :</strong> préqualification RH obligatoire, données à jour.</li>
            </ul>
            <p className="about-promise">
              Notre promesse : reconnecter ceux qui recrutent et ceux qui veulent travailler,
              <strong> sans friction</strong>.
            </p>
            <div className="about-stats">
              <div className="stat-item">
                <span className="stat-number">3 000+</span>
                <span className="stat-label">profils activés</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">8</span>
                <span className="stat-label">secteurs couverts</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section final-cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Prêt à accélérer vos recrutements ?</h2>
            <p>Aucun engagement • Accès immédiat à l'Espace Candidats • Profils vérifiés RH</p>
            <div className="cta-buttons">
              <Button variant="primary" size="large" href="/candidats">
                Voir les candidats
              </Button>
              <Button variant="secondary" size="large">
                Obtenir mes 5 profils qualifiés
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section faq-section">
        <div className="container">
          <h2 className="section-title centered">FAQ</h2>
          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <h3 className="faq-question">{faq.question}</h3>
                <p className="faq-answer">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Companies;

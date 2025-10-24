import { motion } from 'framer-motion';
import Button from '../shared/Button';
import Icons from '../shared/Icons';
import './PricingSection.css';

const PricingSection = () => {
  const plans = [
    {
      name: 'Découverte (Gratuite)',
      title: 'Offre Gratuite',
      price: 0,
      period: 'Gratuit',
      description: 'Découvrir Skillijob, consulter des profils anonymes et publier ses premières offres gratuitement',
      features: [
        'Accès illimité à la CVthèque (profils anonymisés)',
        'Dépôt d\'offres d\'emploi gratuit et illimité',
        'Génération automatique de fiche de poste',
        'Recherche manuelle via filtres',
        'Alertes automatiques',
        'Assistante virtuelle intégrée',
        'Accès instantané',
        'Aucun engagement'
      ],
      cta: 'Découvrir Skillijob',
      variant: 'secondary',
      popular: false,
      showPrice: false
    },
    {
      name: 'Starter',
      title: 'Le Plus Populaire',
      price: 990,
      period: 'Pack 5 crédits – 60 jours',
      description: 'Recruter rapidement, sans risque, en débloquant les profils de son choix',
      features: [
        '5 crédits = 5 profils à débloquer (valables 60 jours)',
        'CV complet + coordonnées + compte-rendu RH détaillé',
        'Profils présélectionnés par nos équipes RH',
        'Profils débloqués et livrés sous 24h',
        'Jusqu\'à 5 entretiens assurés selon profils',
        'Garantie remplacement si absence',
        'Conseiller RH dédié pour ajuster vos recherches',
        'Sans abonnement'
      ],
      cta: 'Obtenir mon pack Starter',
      variant: 'primary',
      popular: true
    },
    {
      name: 'Premium',
      title: 'Sur Mesure',
      price: 1490,
      period: 'Sur devis (à partir de)',
      description: 'Confier tout le recrutement à un expert Skillijob, du sourcing à l\'intégration',
      features: [
        'Accès prioritaire + sourcing multi-canal',
        'Fiche de poste rédigée et optimisée par experts',
        'Sourcing multicanal + chasse ciblée + entretien RH',
        'Gestion complète du processus d\'entretien',
        'Chef de projet RH dédié à votre entreprise',
        'Garantie remplacement pendant la période d\'essai',
        'Délai moyen : 7 à 15 jours de recrutement',
        'Intégration POEI, recrutement international, suivi complet'
      ],
      cta: 'Tarif personnalisé',
      variant: 'secondary',
      popular: false,
      showPrice: false
    }
  ];

  return (
    <section className="pricing-section">
      {/* Header */}
      <motion.div
        className="pricing-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="pricing-label">
          <Icons.Target size={20} />
          <span>Tarifs transparents. Sans surprise</span>
        </div>
        <h2 className="pricing-title">Des offres flexibles pour tous</h2>
        <p className="pricing-subtitle">
          Choisissez l'offre qui correspond à vos besoins et évoluez à votre rythme
        </p>
      </motion.div>


      {/* Pricing Cards */}
      <div className="pricing-cards">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            className={`pricing-card ${plan.popular ? 'popular' : ''}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 * index }}
          >
            {plan.popular && (
              <div className="popular-badge">
                <Icons.Zap size={16} />
                <span>Plus populaire</span>
              </div>
            )}

            <div className="card-header">
              {plan.title && <div className="plan-title-badge">{plan.title}</div>}
              <h3 className="plan-name">{plan.name}</h3>
              <p className="plan-description">{plan.description}</p>

              {plan.showPrice !== false && (
                <div className="price-wrapper">
                  <span className="price">{plan.price}€</span>
                  <span className="period">/ {plan.period}</span>
                </div>
              )}
            </div>

            <div className="card-body">
              <ul className="features-list">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="feature-item">
                    <div className="check-icon">
                      <Icons.Check size={16} />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-footer">
              <Button
                variant={plan.variant}
                size="large"
                onClick={() => window.location.href = '/paiements'}
              >
                {plan.popular && <Icons.Zap size={18} />}
                {plan.cta}
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PricingSection;

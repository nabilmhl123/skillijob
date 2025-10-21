import React from 'react';
import { motion } from 'framer-motion';
import Card from '../shared/Card';
import Button from '../shared/Button';
import './ProblemSection.css';

const ProblemSection = () => {
  return (
    <section className="problem-section section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Parce que le recrutement actuel ne fonctionne plus</h2>
          <p className="section-subtitle">
            On remet l'humain et l'efficacité au cœur du process.
          </p>
        </motion.div>

        <div className="problem-grid">
          {/* Carte Candidats */}
          <Card gradient>
            <Card.Header>
              <Card.Label>Candidats</Card.Label>
            </Card.Header>
            <Card.Body>
              <p>
                <strong>Vous postulez sans relâche,</strong> mais les réponses se font attendre.
                Le doute s'installe, l'abandon guette, et vous acceptez des postes par défaut.
                <em> Vos compétences restent invisibles</em>, votre potentiel inexploité.
                Il est temps de changer cela !
              </p>
            </Card.Body>
            <Card.Footer>
              <Button variant="primary" href="/candidats">
                Je suis un candidat
              </Button>
            </Card.Footer>
          </Card>

          {/* Carte Entreprises */}
          <Card gradient>
            <Card.Header>
              <Card.Label>Entreprises</Card.Label>
            </Card.Header>
            <Card.Body>
              <p>
                <strong>Vos annonces s'accumulent,</strong> les CV défilent sans conviction,
                les entretiens s'éternisent. Vos équipes souffrent, votre production chute.
                <em> Un recrutement raté coûte cher</em> – jusqu'à <strong>15 000 €</strong> et plus.
                Arrêtez les pertes, trouvez les talents qu'il vous faut !
              </p>
            </Card.Body>
            <Card.Footer>
              <Button variant="secondary" href="/entreprises">
                Je suis une entreprise
              </Button>
            </Card.Footer>
          </Card>
        </div>

        {/* Transition vers la solution */}
        <motion.div
          className="solution-transition"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3>Chez Skillijob, on a décidé de casser ce schéma inefficace.</h3>

          <p className="solution-text">
            Nous avons créé un <strong>système direct, humain, et rapide</strong> :
            des profils déjà validés et motivés, des offres d'emploi concrètes,
            et une connexion facilitée entre entreprises et talents terrain.
          </p>

          <p className="solution-highlight">
            Skillijob est différent : nous ne vendons pas des CV.
            Nous mettons en relation des humains, prêts à travailler ensemble.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;

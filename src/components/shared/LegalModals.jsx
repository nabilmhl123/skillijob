import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LegalModals.css';

const LegalModals = () => {
  const [activeModal, setActiveModal] = useState(null);

  // Fermer avec Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && activeModal) {
        setActiveModal(null);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [activeModal]);

  // Empêcher le scroll quand une modale est ouverte
  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeModal]);

  const openModal = (modalId) => (e) => {
    e.preventDefault();
    setActiveModal(modalId);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  // Expose openModal function globally for footer links
  useEffect(() => {
    window.openLegalModal = (modalId) => setActiveModal(modalId);
    return () => {
      delete window.openLegalModal;
    };
  }, []);

  return (
    <AnimatePresence>
      {activeModal && (
        <motion.div
          className="legal-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
        >
          <motion.div
            className="legal-modal-content"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="legal-head">
              <h3>
                {activeModal === 'mentions' && 'Mentions légales'}
                {activeModal === 'cookies' && 'Politique de cookies'}
                {activeModal === 'confidentialite' && 'Politique de confidentialité'}
                {activeModal === 'cgv' && 'Conditions générales de vente'}
              </h3>
              <button className="legal-close" onClick={closeModal}>
                Fermer ✕
              </button>
            </div>

            {/* Body */}
            <div className="legal-body">
              {activeModal === 'mentions' && <MentionsLegales />}
              {activeModal === 'cookies' && <PolitiqueCookies />}
              {activeModal === 'confidentialite' && <PolitiqueConfidentialite />}
              {activeModal === 'cgv' && <CGV />}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Composant Mentions Légales
const MentionsLegales = () => (
  <>
    <h1>Mentions légales</h1>
    <section className="card">
      <h2>Éditeur du site</h2>
      <p>
        <strong>SKILLIJOB</strong>, Société par actions simplifiée (SAS)
        <br />
        Siège social : Rue François 1er, 75008 Paris, France
        <br />
        RCS Paris – <strong>SIREN</strong> 980 918 858 – <strong>SIRET</strong> 980 918 858 00013
        <br />
        Capital social : 1 000 €
      </p>
      <p>
        <strong>Directrice de la publication :</strong> Anissa Melo, Présidente
      </p>
    </section>

    <section className="card">
      <h2>Contact</h2>
      <p>
        📧 <a href="mailto:contact@skillijob.com">contact@skillijob.com</a>
        <br />
        📞 09 70 19 67 02
      </p>
    </section>

    <section className="card">
      <h2>Hébergement</h2>
      <div className="box">
        <p>
          <strong>IONOS</strong> — <em>coordonnées à compléter</em> :
        </p>
        <ul>
          <li>
            Raison sociale complète : <span className="muted">[à compléter]</span>
          </li>
          <li>
            Adresse : <span className="muted">[à compléter]</span>
          </li>
          <li>
            Téléphone : <span className="muted">[à compléter]</span>
          </li>
        </ul>
      </div>
    </section>

    <section className="card">
      <h2>Propriété intellectuelle</h2>
      <p>
        Le présent site et l'ensemble de ses contenus (textes, visuels, logos, marques, vidéos, code) sont la propriété de SKILLIJOB ou de ses partenaires et sont protégés par le droit de la propriété intellectuelle. Toute reproduction ou représentation non autorisée est interdite.
      </p>
    </section>

    <section className="card">
      <h2>Responsabilité</h2>
      <p>
        SKILLIJOB met en œuvre les moyens nécessaires pour assurer l'exactitude et la mise à jour du site, sans garantie d'exhaustivité. L'éditeur ne saurait être tenu responsable de l'utilisation faite du site ni des dommages directs ou indirects qui pourraient en résulter.
      </p>
    </section>

    <section className="card">
      <h2>Signalement</h2>
      <p>
        Pour tout signalement d'un contenu illicite, écrivez à{' '}
        <a href="mailto:contact@skillijob.com">contact@skillijob.com</a>.
      </p>
    </section>

    <section className="card">
      <h2>Données personnelles</h2>
      <p>
        Voir notre Politique de confidentialité et notre Politique cookies.
      </p>
    </section>

    <section className="card">
      <h2>Droit applicable</h2>
      <p>
        Le présent site est soumis au droit français. En cas de litige et à défaut d'accord amiable, compétence est attribuée aux juridictions du ressort de la Cour d'appel de Paris.
      </p>
    </section>
  </>
);

// Composant Politique Cookies
const PolitiqueCookies = () => (
  <>
    <header>
      <div className="kicker">
        <span aria-hidden="true" className="dot"></span>
        <span>SKILLIJOB</span>
      </div>
      <h1>Politique cookies</h1>
      <p className="muted">
        Cette politique explique comment SKILLIJOB utilise des cookies et technologies similaires sur son site.
      </p>
    </header>

    <section className="card">
      <h2>1. Qu'est-ce qu'un cookie ?</h2>
      <p>
        Un cookie est un fichier déposé sur votre terminal pour stocker des informations. Certains sont essentiels au site (cookies "strictement nécessaires"), d'autres sont optionnels (mesure d'audience, marketing, etc.).
      </p>
    </section>

    <section className="card">
      <h2>2. Votre choix</h2>
      <p>
        Lors de votre première visite, un bandeau vous permet d'accepter/refuser les cookies non essentiels. Vous pouvez modifier votre choix à tout moment via Paramètres cookies (lien à intégrer à votre CMP).
      </p>
    </section>

    <section className="card">
      <h2>3. Cookies utilisés</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Catégorie</th>
              <th>Finalité</th>
              <th>Exemples</th>
              <th>Durée</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Nécessaires</td>
              <td>Fonctionnement du site, sécurité, équilibrage</td>
              <td>Session, préférence langue</td>
              <td>Session à 12 mois</td>
            </tr>
            <tr>
              <td>Mesure d'audience</td>
              <td>Statistiques d'usage pour améliorer le service</td>
              <td>
                <span className="muted">[Matomo/GA4 – à confirmer]</span>
              </td>
              <td>6 à 13 mois</td>
            </tr>
            <tr>
              <td>Marketing</td>
              <td>Suivi des conversions, remarketing</td>
              <td>
                <span className="muted">[ex. Meta/LinkedIn – à confirmer]</span>
              </td>
              <td>Selon partenaire</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section className="card">
      <h2>4. Gestion depuis votre navigateur</h2>
      <p>
        Vous pouvez configurer votre navigateur pour bloquer/supprimer les cookies. Attention, cela peut altérer certaines fonctionnalités.
      </p>
    </section>

    <section className="card">
      <h2>5. Contact</h2>
      <p>
        Pour toute question : <a href="mailto:contact@skillijob.com">contact@skillijob.com</a>.
      </p>
    </section>
  </>
);

// Composant Politique de Confidentialité
const PolitiqueConfidentialite = () => (
  <>
    <h1>Politique de confidentialité</h1>
    <p className="muted">Dernière mise à jour : 03/10/2025</p>

    <section className="card">
      <h2>1. Responsable du traitement</h2>
      <p>
        <strong>SKILLIJOB, SAS</strong> – Rue François 1er, 75008 Paris, France
        <br />
        RCS Paris – SIREN 980 918 858 – SIRET 980 918 858 00013
        <br />
        📧 <a href="mailto:contact@skillijob.com">contact@skillijob.com</a> – B2B uniquement.
      </p>
    </section>

    <section className="card">
      <h2>2. Finalités et bases légales</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Finalité</th>
              <th>Exemples</th>
              <th>Base légale</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Fourniture du service</td>
              <td>Création de compte, accès espace candidats, livraison de dossiers</td>
              <td>Exécution du contrat</td>
            </tr>
            <tr>
              <td>Relation commerciale B2B</td>
              <td>Prospection, démos, suivi client</td>
              <td>Intérêt légitime (B2B)</td>
            </tr>
            <tr>
              <td>Facturation & conformité</td>
              <td>Devis, factures, obligations comptables</td>
              <td>Obligation légale</td>
            </tr>
            <tr>
              <td>Sécurité & prévention</td>
              <td>Logs, lutte contre fraude/abus</td>
              <td>Intérêt légitime</td>
            </tr>
            <tr>
              <td>Amélioration produit</td>
              <td>Statistiques d'usage, feedback</td>
              <td>Intérêt légitime</td>
            </tr>
            <tr>
              <td>Marketing avec consentement</td>
              <td>Cookies non essentiels, newsletters opt-in</td>
              <td>Consentement</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section className="card">
      <h2>3. Données traitées</h2>
      <p>
        Données d'identification et professionnelles (nom, fonction, email pro, téléphone pro, entreprise), données d'utilisation (logs, pages, IP), contenus échangés (demandes, messages), documents transmis (CV, fiches de poste… si fournis).
      </p>
    </section>

    <section className="card">
      <h2>4. Durées de conservation</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Catégorie</th>
              <th>Durée</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Compte & contrat</td>
              <td>Pendant la relation + 5 ans</td>
            </tr>
            <tr>
              <td>Facturation</td>
              <td>10 ans (obligation légale)</td>
            </tr>
            <tr>
              <td>Prospection B2B</td>
              <td>3 ans après dernier contact</td>
            </tr>
            <tr>
              <td>Logs de sécurité</td>
              <td>6 à 12 mois</td>
            </tr>
            <tr>
              <td>Cookies</td>
              <td>Voir Politique cookies</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section className="card">
      <h2>5. Destinataires & sous-traitants</h2>
      <p>
        Données accessibles aux équipes habilitées de SKILLIJOB. Sous-traitants (hébergement, emailing, analytics, support) agissant selon nos instructions et engagements contractuels conformes au RGPD.
      </p>
      <div className="card warning-box">
        <p>
          <strong>Liste indicative (à compléter) :</strong>
        </p>
        <ul>
          <li>
            Hébergement : IONOS (<span className="muted">coordonnées exactes à compléter</span>)
          </li>
          <li>
            Emailing/support : <span className="muted">[ex. Brevo/Sendinblue, Zendesk…]</span>
          </li>
          <li>
            Analytics : <span className="muted">[ex. Matomo/GA4]</span>
          </li>
        </ul>
      </div>
    </section>

    <section className="card">
      <h2>6. Transferts hors UE</h2>
      <p>
        Encadrés par des garanties appropriées (CCT, pays adéquats, mesures complémentaires). Détails fournis sur demande.
      </p>
    </section>

    <section className="card">
      <h2>7. Droits des personnes</h2>
      <p>
        Accès, rectification, effacement, limitation, opposition (dont prospection), portabilité. Exercer vos droits :{' '}
        <a href="mailto:contact@skillijob.com">contact@skillijob.com</a>. Réclamation : CNIL.
      </p>
    </section>

    <section className="card">
      <h2>8. Sécurité</h2>
      <p>
        Mesures techniques et organisationnelles adaptées : chiffrement en transit, contrôle d'accès, journalisation, sauvegardes.
      </p>
    </section>

    <section className="card">
      <h2>9. Cookies</h2>
      <p>
        Voir Politique cookies. Les cookies non essentiels sont déposés avec votre consentement via notre gestionnaire.
      </p>
    </section>

    <section className="card">
      <h2>10. Contact RGPD</h2>
      <p>
        📧 <a href="mailto:contact@skillijob.com">contact@skillijob.com</a>
        <br />
        DPO : <span className="muted">[non désigné]</span>
      </p>
    </section>
  </>
);

// Composant CGV
const CGV = () => (
  <>
    <h1>Conditions Générales (B2B)</h1>
    <p className="intro">
      Les présentes conditions régissent les services fournis par <strong>SKILLIJOB, SAS</strong> aux clients professionnels (B2B).
    </p>

    <section className="card">
      <span className="badge">1. Objet</span>
      <p>
        Accès à l'espace candidats, présélection, fourniture de dossiers complets, accompagnement de planification, et services associés.
      </p>
    </section>

    <section className="card">
      <span className="badge">2. Champ d'application</span>
      <p>Réservé aux professionnels. Toute commande implique l'acceptation des présentes conditions.</p>
    </section>

    <section className="card">
      <span className="badge">3. Compte & accès</span>
      <p>Le client est responsable de la confidentialité de ses identifiants et de l'exactitude des informations fournies.</p>
    </section>

    <section className="card">
      <span className="badge">4. Commandes & prix</span>
      <p>Les tarifs sont indiqués hors taxes. Les commandes sont fermes dès validation et paiement, sauf stipulation contraire.</p>
    </section>

    <section className="card">
      <span className="badge">5. Paiement & facturation</span>
      <p>Paiement selon les modalités convenues (en ligne ou facture). Retard de paiement : pénalités légales et indemnité forfaitaire de recouvrement.</p>
    </section>

    <section className="card">
      <span className="badge">6. Livraison des dossiers</span>
      <p>Les dossiers complets sont livrés dans les délais annoncés (ex. &lt; 24h après déblocage). Le client demeure responsable de ses décisions d'embauche.</p>
    </section>

    <section className="card">
      <span className="badge">7. Engagements & limites</span>
      <p>SKILLIJOB met en œuvre des moyens raisonnables. Aucune garantie d'embauche. Responsabilité limitée au montant payé sur la période contractuelle en cause, hors dommages indirects.</p>
    </section>

    <section className="card">
      <span className="badge">8. Remplacement "no-show"</span>
      <p>En cas de non-présentation/non-joignable sous 48h, application du remplacement 1-pour-1 selon les modalités de l'offre en vigueur.</p>
    </section>

    <section className="card">
      <span className="badge">9. Propriété intellectuelle</span>
      <p>Les contenus, marques et technologies demeurent la propriété de leurs titulaires. Aucun transfert de droits au-delà des licences d'usage nécessaires au service.</p>
    </section>

    <section className="card">
      <span className="badge">10. Confidentialité</span>
      <p>Chaque partie s'engage à préserver la confidentialité des informations de l'autre partie, pendant la relation et 3 ans après.</p>
    </section>

    <section className="card">
      <span className="badge">11. Données personnelles</span>
      <p>Traitements réalisés conformément au RGPD. Voir la Politique de confidentialité. Un accord de sous-traitance (art. 28 RGPD) peut s'appliquer si SKILLIJOB traite des données pour le compte du client.</p>
    </section>

    <section className="card">
      <span className="badge">12. Force majeure</span>
      <p>La responsabilité est écartée en cas de force majeure au sens du droit français.</p>
    </section>

    <section className="card">
      <span className="badge">13. Durée, résiliation</span>
      <p>Contrat valable pour la durée précisée à la commande. Résiliation anticipée selon conditions particulières le cas échéant.</p>
    </section>

    <section className="card">
      <span className="badge">14. Droit applicable & litiges</span>
      <p>Droit français. Compétence des tribunaux du ressort de la Cour d'appel de Paris.</p>
    </section>

    <section className="card">
      <span className="badge">15. Informations légales</span>
      <p>
        <strong>SKILLIJOB, SAS</strong> – Rue François 1er, 75008 Paris – RCS Paris – SIREN 980 918 858 – SIRET 980 918 858 00013 – Capital : 1 000 € –{' '}
        <a href="mailto:contact@skillijob.com">contact@skillijob.com</a>
      </p>
    </section>
  </>
);

export default LegalModals;

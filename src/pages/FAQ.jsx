import React from 'react';
import './FAQ.css';

const FAQ = () => {
  const faqs = [
    {
      question: "Comment fonctionne le service Skillijob pour les candidats ?",
      answer: "Vous déposez votre CV, nous le retravaillons gratuitement pour le rendre plus attractif, puis nous le diffusons auprès de nos entreprises partenaires. Vous êtes contacté directement par les recruteurs intéressés."
    },
    {
      question: "Le service est-il vraiment gratuit pour les candidats ?",
      answer: "Oui, 100% gratuit. Aucun frais caché. Nous sommes rémunérés uniquement par les entreprises qui recrutent via notre plateforme."
    },
    {
      question: "Combien de temps avant d'être contacté par une entreprise ?",
      answer: "En moyenne, nos candidats reçoivent un premier contact sous 48h à 72h après validation de leur profil. Cela dépend des offres disponibles dans votre secteur."
    },
    {
      question: "Dans quels secteurs recrutez-vous ?",
      answer: "Nous recrutons principalement dans le transport, la logistique, l'industrie, le BTP et les métiers techniques. Consultez notre page Candidats pour voir tous les secteurs couverts."
    },
    {
      question: "Puis-je modifier mon CV après l'avoir déposé ?",
      answer: "Oui, vous pouvez nous contacter à tout moment pour mettre à jour votre CV ou vos informations. Nous le modifierons gratuitement."
    },
    {
      question: "Comment êtes-vous rémunérés si c'est gratuit pour les candidats ?",
      answer: "Les entreprises qui recrutent via Skillijob nous versent des frais de service uniquement en cas de recrutement réussi. C'est un modèle gagnant-gagnant."
    },
    {
      question: "Que se passe-t-il si je ne trouve pas d'emploi via Skillijob ?",
      answer: "Votre CV reste dans notre base de données et nous continuons à le diffuser auprès de nouvelles entreprises partenaires. Vous pouvez aussi nous recontacter pour une mise à jour."
    },
    {
      question: "Puis-je postuler à plusieurs offres en même temps ?",
      answer: "Oui, votre profil peut être proposé à plusieurs entreprises simultanément. Vous gérez ensuite vos entretiens selon vos disponibilités."
    },
    {
      question: "Comment savoir si mon profil correspond aux offres disponibles ?",
      answer: "Notre équipe analyse chaque CV et vous contacte uniquement si des offres correspondent à votre profil. Si vous n'avez pas de nouvelles, c'est que nous cherchons encore l'opportunité idéale pour vous."
    },
    {
      question: "Quel type de contrat proposez-vous ?",
      answer: "Nos entreprises partenaires proposent des CDI, CDD, intérim et missions longue durée. Le type de contrat dépend des besoins spécifiques de chaque entreprise."
    },
    {
      question: "Faut-il avoir une expérience minimum pour postuler ?",
      answer: "Non, nous acceptons tous les profils, débutants comme expérimentés. Ce qui compte, c'est votre motivation et votre adéquation avec les postes proposés."
    },
    {
      question: "Comment se passe la préparation aux entretiens ?",
      answer: "Nous vous accompagnons avec des conseils personnalisés avant chaque entretien. Nous vous briefons sur l'entreprise, le poste et les attentes du recruteur."
    }
  ];

  return (
    <div className="faq-page">
      <section className="faq-hero">
        <div className="container">
          <h1 className="faq-hero-title">Questions fréquentes</h1>
          <p className="faq-hero-subtitle">
            Toutes les réponses à vos questions sur Skillijob
          </p>
        </div>
      </section>

      <section className="faq-content-section">
        <div className="container">
          <div className="faq-list-full">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item-full">
                <h3 className="faq-question-full">{faq.question}</h3>
                <p className="faq-answer-full">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="faq-cta-section">
        <div className="container">
          <div className="faq-cta-box">
            <h2>Vous n'avez pas trouvé votre réponse ?</h2>
            <p>Contactez-nous directement, notre équipe vous répond sous 24h</p>
            <a href="tel:0970196702" className="faq-cta-button">
              09 70 19 67 02
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;

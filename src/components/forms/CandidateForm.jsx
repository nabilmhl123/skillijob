import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icons from '../shared/Icons';
import './CandidateForm.css';

const CandidateForm = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Étape 1 - Informations personnelles
    firstName: '',
    lastName: '',
    email: '',
    phone: '',

    // Étape 2 - Recherche d'emploi
    jobSought: '',
    postalCode: '',
    mobility: [],
    vehiclePermit: [],
    mobilityComment: '',

    // Étape 3 - Situation et contrat
    currentSituation: [],
    contractTypes: [],
    salaryRange: '',
    availability: '',
    interviewSlots: '',

    // Étape 4 - Documents
    cvUpToDate: '',
    cvFile: null
  });

  const [errors, setErrors] = useState({});

  const totalSteps = 4;

  const mobilityOptions = [
    { id: 'local', label: 'Local (commune)' },
    { id: 'departementale', label: 'Départementale' },
    { id: 'regionale', label: 'Régionale' },
    { id: 'nationale', label: 'Nationale' }
  ];

  const vehicleOptions = [
    { id: 'vehicle', label: 'Véhicule personnel' },
    { id: 'permit_b', label: 'Permis B' },
    { id: 'permit_c', label: 'Permis C' },
    { id: 'permit_moto', label: 'Permis Moto' },
    { id: 'other', label: 'Autre' }
  ];

  const situationOptions = [
    { id: 'employed', label: 'En poste - En recherche active' },
    { id: 'unemployed', label: 'Demandeur d\'emploi' },
    { id: 'student', label: 'Étudiant / En formation' },
    { id: 'other', label: 'Autre situation' }
  ];

  const contractOptions = [
    { id: 'cdi', label: 'CDI' },
    { id: 'cdd', label: 'CDD' },
    { id: 'interim', label: 'Intérim' },
    { id: 'alternance', label: 'Alternance' },
    { id: 'freelance', label: 'Freelance' },
    { id: 'stage', label: 'Stage' }
  ];

  const availabilityOptions = [
    { id: 'immediate', label: 'Immédiate' },
    { id: '1-3months', label: '1 à 3 mois' },
    { id: 'other', label: 'Autre (préciser)' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleCheckboxChange = (field, value) => {
    setFormData(prev => {
      const currentValues = prev[field];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      return { ...prev, [field]: newValues };
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 10.6MB)
      if (file.size > 10.6 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, cvFile: 'Le fichier ne doit pas dépasser 10.6 MB' }));
        return;
      }
      setFormData(prev => ({ ...prev, cvFile: file }));
      setErrors(prev => ({ ...prev, cvFile: '' }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'Le prénom est requis';
      if (!formData.lastName.trim()) newErrors.lastName = 'Le nom est requis';
      if (!formData.email.trim()) {
        newErrors.email = 'L\'email est requis';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Email invalide';
      }
      if (!formData.phone.trim()) {
        newErrors.phone = 'Le numéro de téléphone est requis';
      } else if (!/^(\+33|0)[1-9](\d{2}){4}$/.test(formData.phone.replace(/\s/g, ''))) {
        newErrors.phone = 'Numéro de téléphone invalide';
      }
    }

    if (step === 2) {
      if (!formData.jobSought.trim()) newErrors.jobSought = 'Le métier recherché est requis';
      if (!formData.postalCode.trim()) newErrors.postalCode = 'Le code postal est requis';
    }

    if (step === 3) {
      if (formData.currentSituation.length === 0) {
        newErrors.currentSituation = 'Veuillez sélectionner votre situation';
      }
      if (!formData.availability) {
        newErrors.availability = 'Veuillez sélectionner votre disponibilité';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep(currentStep)) return;

    // Prepare form data for submission
    const submitData = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'cvFile' && formData[key]) {
        submitData.append(key, formData[key]);
      } else if (Array.isArray(formData[key])) {
        submitData.append(key, formData[key].join(', '));
      } else {
        submitData.append(key, formData[key]);
      }
    });

    try {
      // TODO: Replace with actual API endpoint
      console.log('Form submitted:', Object.fromEntries(submitData));

      // Show success message and close
      alert('Votre candidature a été envoyée avec succès ! Notre équipe RH vous contactera bientôt.');
      onClose();

      // Reset form
      setFormData({
        firstName: '', lastName: '', email: '', phone: '',
        jobSought: '', postalCode: '', mobility: [], vehiclePermit: [],
        mobilityComment: '', currentSituation: [], contractTypes: [],
        salaryRange: '', availability: '', interviewSlots: '',
        cvUpToDate: '', cvFile: null
      });
      setCurrentStep(1);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  const renderStep1 = () => (
    <div className="form-step">
      <div className="step-header">
        <h3>Informations personnelles</h3>
        <p>Commençons par vos coordonnées</p>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="firstName">Prénom <span className="required">*</span></label>
          <input
            type="text"
            id="firstName"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            placeholder="Prénom"
            className={errors.firstName ? 'error' : ''}
          />
          {errors.firstName && <span className="error-message">{errors.firstName}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Nom de famille <span className="required">*</span></label>
          <input
            type="text"
            id="lastName"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            placeholder="Nom de famille"
            className={errors.lastName ? 'error' : ''}
          />
          {errors.lastName && <span className="error-message">{errors.lastName}</span>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="email">Email <span className="required">*</span></label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          placeholder="exemple@exemple.com"
          className={errors.email ? 'error' : ''}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="phone">Numéro de téléphone <span className="required">*</span></label>
        <input
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          placeholder="06 12 34 56 78"
          className={errors.phone ? 'error' : ''}
        />
        {errors.phone && <span className="error-message">{errors.phone}</span>}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="form-step">
      <div className="step-header">
        <h3>Recherche d'emploi</h3>
        <p>Parlons de votre projet professionnel</p>
      </div>

      <div className="form-group">
        <label htmlFor="jobSought">Métier recherché <span className="required">*</span></label>
        <input
          type="text"
          id="jobSought"
          value={formData.jobSought}
          onChange={(e) => handleInputChange('jobSought', e.target.value)}
          placeholder="Quel poste recherchez-vous ?"
          className={errors.jobSought ? 'error' : ''}
        />
        {errors.jobSought && <span className="error-message">{errors.jobSought}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="postalCode">Code postal / Département de résidence <span className="required">*</span></label>
        <input
          type="text"
          id="postalCode"
          value={formData.postalCode}
          onChange={(e) => handleInputChange('postalCode', e.target.value)}
          placeholder="75001"
          className={errors.postalCode ? 'error' : ''}
        />
        {errors.postalCode && <span className="error-message">{errors.postalCode}</span>}
      </div>

      <div className="form-group">
        <label>Niveau de mobilité géographique</label>
        <div className="checkbox-grid">
          {mobilityOptions.map(option => (
            <label key={option.id} className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.mobility.includes(option.id)}
                onChange={() => handleCheckboxChange('mobility', option.id)}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Véhicule et permis</label>
        <div className="checkbox-grid">
          {vehicleOptions.map(option => (
            <label key={option.id} className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.vehiclePermit.includes(option.id)}
                onChange={() => handleCheckboxChange('vehiclePermit', option.id)}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="mobilityComment">Commentaire sur la mobilité (optionnel)</label>
        <textarea
          id="mobilityComment"
          value={formData.mobilityComment}
          onChange={(e) => handleInputChange('mobilityComment', e.target.value)}
          placeholder="Ex: mobile sur le département 45 et 72"
          rows="3"
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="form-step">
      <div className="step-header">
        <h3>Situation et contrat</h3>
        <p>Précisez votre situation actuelle et vos attentes</p>
      </div>

      <div className="form-group">
        <label>Situation et recherche <span className="required">*</span></label>
        <div className="checkbox-grid">
          {situationOptions.map(option => (
            <label key={option.id} className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.currentSituation.includes(option.id)}
                onChange={() => handleCheckboxChange('currentSituation', option.id)}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
        {errors.currentSituation && <span className="error-message">{errors.currentSituation}</span>}
      </div>

      <div className="form-group">
        <label>Types de contrat souhaités</label>
        <div className="checkbox-grid">
          {contractOptions.map(option => (
            <label key={option.id} className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.contractTypes.includes(option.id)}
                onChange={() => handleCheckboxChange('contractTypes', option.id)}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="salaryRange">Fourchette salariale souhaitée (optionnel)</label>
        <input
          type="text"
          id="salaryRange"
          value={formData.salaryRange}
          onChange={(e) => handleInputChange('salaryRange', e.target.value)}
          placeholder="Ex: 35 000€ - 40 000€ annuel brut"
        />
      </div>

      <div className="form-group">
        <label>Disponibilité prise de poste <span className="required">*</span></label>
        <div className="radio-group">
          {availabilityOptions.map(option => (
            <label key={option.id} className="radio-label">
              <input
                type="radio"
                name="availability"
                value={option.id}
                checked={formData.availability === option.id}
                onChange={(e) => handleInputChange('availability', e.target.value)}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
        {errors.availability && <span className="error-message">{errors.availability}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="interviewSlots">Créneaux disponibles pour entretien (optionnel)</label>
        <textarea
          id="interviewSlots"
          value={formData.interviewSlots}
          onChange={(e) => handleInputChange('interviewSlots', e.target.value)}
          placeholder="Ex: Lundi-Vendredi 9h-12h"
          rows="2"
        />
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="form-step">
      <div className="step-header">
        <h3>Documents</h3>
        <p>Dernière étape : envoyez-nous votre CV</p>
      </div>

      <div className="form-group">
        <label>Mon CV est à jour</label>
        <div className="radio-group">
          <label className="radio-label">
            <input
              type="radio"
              name="cvUpToDate"
              value="yes"
              checked={formData.cvUpToDate === 'yes'}
              onChange={(e) => handleInputChange('cvUpToDate', e.target.value)}
            />
            <span>Oui</span>
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="cvUpToDate"
              value="no"
              checked={formData.cvUpToDate === 'no'}
              onChange={(e) => handleInputChange('cvUpToDate', e.target.value)}
            />
            <span>Non, j'aimerais être accompagné</span>
          </label>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="cvFile">Envoi de fichiers (optionnel)</label>
        <div className="file-upload-wrapper">
          <input
            type="file"
            id="cvFile"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="file-input"
          />
          <label htmlFor="cvFile" className="file-upload-label">
            <Icons.FileText size={24} />
            <span>{formData.cvFile ? formData.cvFile.name : 'Cliquez pour télécharger votre CV'}</span>
            <small>PDF, DOC, DOCX (max 10.6 MB)</small>
          </label>
        </div>
        {errors.cvFile && <span className="error-message">{errors.cvFile}</span>}
      </div>

      <div className="form-info-box">
        <Icons.Info size={20} />
        <p>Votre CV sera traité de manière confidentielle et partagé uniquement avec les recruteurs pertinents.</p>
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <motion.div
      className="candidate-form-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
        <motion.div
          className="candidate-form-container"
          initial={{ scale: 0.9, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 50 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="form-header">
            <div className="form-header-content">
              <h2>Formulaire Candidat</h2>
              <p>Déposez votre candidature en quelques minutes</p>
            </div>
            <button className="form-close-btn" onClick={onClose}>
              <Icons.X size={24} />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="form-progress">
            <div className="progress-steps">
              {[1, 2, 3, 4].map(step => (
                <div
                  key={step}
                  className={`progress-step ${currentStep >= step ? 'active' : ''} ${currentStep === step ? 'current' : ''}`}
                >
                  <div className="step-circle">{step}</div>
                  <div className="step-label">
                    {step === 1 && 'Infos'}
                    {step === 2 && 'Recherche'}
                    {step === 3 && 'Situation'}
                    {step === 4 && 'Documents'}
                  </div>
                </div>
              ))}
            </div>
            <div className="progress-bar-track">
              <div
                className="progress-bar-fill"
                style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
              />
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="candidate-form-content">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {currentStep === 1 && renderStep1()}
                {currentStep === 2 && renderStep2()}
                {currentStep === 3 && renderStep3()}
                {currentStep === 4 && renderStep4()}
              </motion.div>
            </AnimatePresence>

            {/* Form Actions */}
            <div className="form-actions">
              {currentStep > 1 && (
                <button type="button" className="btn-secondary" onClick={handlePrevious}>
                  <Icons.ChevronDown size={18} style={{ transform: 'rotate(90deg)' }} />
                  Précédent
                </button>
              )}

              <div style={{ flex: 1 }} />

              {currentStep < totalSteps ? (
                <button type="button" className="btn-primary" onClick={handleNext}>
                  Suivant
                  <Icons.ChevronDown size={18} style={{ transform: 'rotate(-90deg)' }} />
                </button>
              ) : (
                <button type="submit" className="btn-primary btn-submit">
                  <Icons.Check size={18} />
                  Envoyer ma candidature
                </button>
              )}
            </div>
          </form>
        </motion.div>
    </motion.div>
  );
};

export default CandidateForm;

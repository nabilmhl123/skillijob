import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useAuth } from '../components/AuthProvider';
import Icons from '../components/shared/Icons';
import './PublierOffre.css';

const PublierOffre = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useAuth();
  const createJob = useMutation(api.jobs.createJob);
  const updateJob = useMutation(api.jobs.updateJob);
  const publishJob = useMutation(api.jobs.publishJob);

  // États du formulaire
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: [''],
    location: '',
    type: 'full-time',
    department: '',
    industry: '',
    experienceLevel: '',
    educationLevel: '',
    languages: [{ language: '', level: 'intermediate' }],
    remoteWork: 'no',
    workingHours: '',
    contractDuration: '',
    skills: [],
    tools: [],
    softSkills: [],
    certifications: [],
    benefits: [],
    companyDescription: '',
    teamSize: '',
    officeAddress: '',
    applicationProcess: [],
    contactEmail: '',
    contactPhone: '',
    parking: false,
    catering: false,
    trainingBudget: false,
    careerDevelopment: false,
    diversity: false,
    urgent: false,
    internalReference: '',
    salaryMin: '',
    salaryMax: '',
    startDate: '',
    applicationDeadline: '',
    expiresAt: ''
  });

  // États de l'interface
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState('saved');
  const [lastSaved, setLastSaved] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  // États pour l'édition
  const [isEditing, setIsEditing] = useState(false);
  const [editingJob, setEditingJob] = useState(null);


  // Données de référence
  const jobTypes = [
    { value: 'full-time', label: 'Temps plein', icon: 'Briefcase' },
    { value: 'part-time', label: 'Temps partiel', icon: 'Clock' },
    { value: 'contract', label: 'Contrat', icon: 'FileText' },
    { value: 'internship', label: 'Stage', icon: 'User' },
    { value: 'freelance', label: 'Freelance', icon: 'TrendingUp' }
  ];

  const experienceLevels = [
    { value: 'junior', label: 'Junior (0-2 ans)', description: 'Première expérience professionnelle' },
    { value: 'intermediate', label: 'Intermédiaire (2-5 ans)', description: 'Expérience confirmée' },
    { value: 'senior', label: 'Senior (5-10 ans)', description: 'Expert dans son domaine' },
    { value: 'expert', label: 'Expert (10+ ans)', description: 'Leader technique ou fonctionnel' }
  ];

  const languageLevels = [
    { value: 'basic', label: 'Notions', description: 'Connaissances de base' },
    { value: 'intermediate', label: 'Intermédiaire', description: 'Conversation courante' },
    { value: 'fluent', label: 'Courant', description: 'Maîtrise complète' },
    { value: 'native', label: 'Langue maternelle', description: 'Niveau natif' }
  ];

  const commonLanguages = ['Français', 'Anglais', 'Espagnol', 'Allemand', 'Italien', 'Chinois', 'Arabe', 'Russe'];

  const commonSkills = [
    // Tech
    'JavaScript', 'Python', 'Java', 'C++', 'C#', 'PHP', 'Ruby', 'Go', 'Rust', 'Swift',
    'React', 'Angular', 'Vue.js', 'Svelte', 'Next.js', 'Nuxt.js',
    'Node.js', 'Express', 'Django', 'Spring', 'Laravel', 'Symfony',
    'HTML', 'CSS', 'SASS', 'Tailwind', 'Bootstrap',
    'SQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Elasticsearch',
    'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform',
    'Git', 'Jenkins', 'GitLab CI', 'GitHub Actions',

    // Data & AI
    'Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision',
    'Python', 'R', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas',
    'Tableau', 'Power BI', 'Looker', 'Data Studio',

    // Marketing
    'SEO', 'SEA', 'SEM', 'SMA', 'Content Marketing', 'Growth Hacking',
    'Google Analytics', 'Facebook Ads', 'LinkedIn Ads', 'Twitter Ads',
    'HubSpot', 'Salesforce', 'Mailchimp', 'Hootsuite',

    // Business
    'Management', 'Leadership', 'Strategy', 'Project Management',
    'Agile', 'Scrum', 'Kanban', 'Lean', 'Six Sigma',
    'Excel', 'PowerPoint', 'Word', 'SAP', 'Oracle'
  ];

  const commonTools = [
    'VS Code', 'IntelliJ', 'PyCharm', 'WebStorm', 'Sublime Text',
    'Figma', 'Sketch', 'Adobe XD', 'Photoshop', 'Illustrator',
    'Jira', 'Trello', 'Asana', 'Monday.com', 'Notion',
    'Slack', 'Teams', 'Zoom', 'Google Meet', 'Discord',
    'Postman', 'Insomnia', 'Swagger', 'Newman'
  ];

  const commonSoftSkills = [
    'Communication', 'Leadership', 'Travail d\'équipe', 'Adaptabilité',
    'Résolution de problèmes', 'Créativité', 'Gestion du temps',
    'Autonomie', 'Empathie', 'Intelligence émotionnelle',
    'Esprit critique', 'Apprentissage continu', 'Persuasion',
    'Négociation', 'Gestion de projet', 'Mentoring'
  ];

  const commonBenefits = [
    'RTT (Réduction du Temps de Travail)',
    'Mutuelle santé',
    'Tickets restaurant',
    'Télétravail',
    'Formation continue',
    'Prime de participation',
    'Plan d\'épargne entreprise',
    'Parking gratuit',
    'Salle de sport / Coaching',
    'Assurance vie',
    'Prime de Noël',
    'Chèques cadeaux',
    'Congés supplémentaires',
    'Horaires flexibles',
    'Budget home office'
  ];

  const industries = [
    'Technologie', 'Finance', 'Santé', 'Éducation', 'Commerce',
    'Industrie', 'Énergie', 'Transport', 'Immobilier', 'Tourisme',
    'Médias', 'Télécommunications', 'Automobile', 'Agroalimentaire',
    'Cosmétique', 'Mode', 'Sport', 'Environnement', 'Marketing', 'ONG', 'Autre'
  ];

  const departments = [
    'Développement', 'Design', 'Marketing', 'Ventes', 'RH',
    'Finance', 'Support', 'Produit', 'Opérations', 'Qualité',
    'Recherche', 'Juridique', 'Communication', 'Logistique'
  ];

  const applicationProcessSteps = [
    'CV et lettre de motivation',
    'Test technique',
    'Entretien RH',
    'Entretien technique',
    'Entretien manager',
    'Étude de cas',
    'Assessment center',
    'Références professionnelles'
  ];

  // Gestionnaires d'événements
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError('');
    setAutoSaveStatus('unsaved');
  };

  const handleArrayChange = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
    setAutoSaveStatus('unsaved');
  };

  const handleLanguageChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.map((lang, i) =>
        i === index ? { ...lang, [field]: value } : lang
      )
    }));
    setAutoSaveStatus('unsaved');
  };

  const addArrayItem = (field, defaultValue = '') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], defaultValue]
    }));
    setAutoSaveStatus('unsaved');
  };

  const removeArrayItem = (field, index) => {
    if (formData[field].length > 1) {
      setFormData(prev => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index)
      }));
      setAutoSaveStatus('unsaved');
    }
  };

  const addLanguage = () => {
    setFormData(prev => ({
      ...prev,
      languages: [...prev.languages, { language: '', level: 'intermediate' }]
    }));
    setAutoSaveStatus('unsaved');
  };

  const removeLanguage = (index) => {
    if (formData.languages.length > 1) {
      setFormData(prev => ({
        ...prev,
        languages: prev.languages.filter((_, i) => i !== index)
      }));
      setAutoSaveStatus('unsaved');
    }
  };

  const addSkill = (skill) => {
    if (!formData.skills.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills.filter(s => s !== ''), skill]
      }));
      setAutoSaveStatus('unsaved');
    }
  };

  const removeSkill = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
    setAutoSaveStatus('unsaved');
  };

  const addTool = (tool) => {
    if (!formData.tools.includes(tool)) {
      setFormData(prev => ({
        ...prev,
        tools: [...prev.tools.filter(t => t !== ''), tool]
      }));
      setAutoSaveStatus('unsaved');
    }
  };

  const removeTool = (tool) => {
    setFormData(prev => ({
      ...prev,
      tools: prev.tools.filter(t => t !== tool)
    }));
    setAutoSaveStatus('unsaved');
  };

  const addSoftSkill = (skill) => {
    if (!formData.softSkills.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        softSkills: [...prev.softSkills.filter(s => s !== ''), skill]
      }));
      setAutoSaveStatus('unsaved');
    }
  };

  const removeSoftSkill = (skill) => {
    setFormData(prev => ({
      ...prev,
      softSkills: prev.softSkills.filter(s => s !== skill)
    }));
    setAutoSaveStatus('unsaved');
  };

  const addBenefit = (benefit) => {
    if (!formData.benefits.includes(benefit)) {
      setFormData(prev => ({
        ...prev,
        benefits: [...prev.benefits.filter(b => b !== ''), benefit]
      }));
      setAutoSaveStatus('unsaved');
    }
  };

  const removeBenefit = (benefit) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits.filter(b => b !== benefit)
    }));
    setAutoSaveStatus('unsaved');
  };

  const addCertification = (certification) => {
    if (!formData.certifications.includes(certification)) {
      setFormData(prev => ({
        ...prev,
        certifications: [...prev.certifications.filter(c => c !== ''), certification]
      }));
      setAutoSaveStatus('unsaved');
    }
  };

  const removeCertification = (certification) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(c => c !== certification)
    }));
    setAutoSaveStatus('unsaved');
  };

  const addProcessStep = (step) => {
    if (!formData.applicationProcess.includes(step)) {
      setFormData(prev => ({
        ...prev,
        applicationProcess: [...prev.applicationProcess, step]
      }));
      setAutoSaveStatus('unsaved');
    }
  };

  const removeProcessStep = (step) => {
    setFormData(prev => ({
      ...prev,
      applicationProcess: prev.applicationProcess.filter(s => s !== step)
    }));
    setAutoSaveStatus('unsaved');
  };


  // Auto-save functionality
  useEffect(() => {
    if (autoSaveStatus === 'unsaved') {
      const timer = setTimeout(() => {
        // Ici on pourrait implémenter la sauvegarde automatique en brouillon
        setAutoSaveStatus('saved');
        setLastSaved(new Date());
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [autoSaveStatus, formData]);

  // Pré-remplir le formulaire si on édite une offre
  useEffect(() => {
    const state = location.state;
    if (state && state.editJob && state.isEditing) {
      const job = state.editJob;
      setIsEditing(true);
      setEditingJob(job);

      // Pré-remplir le formulaire avec les données de l'offre
      setFormData({
        title: job.title || '',
        description: job.description || '',
        requirements: job.requirements || [''],
        location: job.location || '',
        type: job.type || 'full-time',
        department: job.department || '',
        industry: job.industry || '',
        experienceLevel: job.experienceLevel || '',
        educationLevel: job.educationLevel || '',
        languages: job.languages && job.languages.length > 0 ? job.languages : [{ language: '', level: 'intermediate' }],
        remoteWork: job.remoteWork || 'no',
        workingHours: job.workingHours || '',
        contractDuration: job.contractDuration || '',
        skills: job.skills || [],
        tools: job.tools || [],
        softSkills: job.softSkills || [],
        certifications: job.certifications || [],
        benefits: job.benefits || [],
        companyDescription: job.companyDescription || '',
        teamSize: job.teamSize ? job.teamSize.toString() : '',
        officeAddress: job.officeAddress || '',
        applicationProcess: job.applicationProcess || [],
        contactEmail: job.contactEmail || '',
        contactPhone: job.contactPhone || '',
        parking: job.parking || false,
        catering: job.catering || false,
        trainingBudget: job.trainingBudget || false,
        careerDevelopment: job.careerDevelopment || false,
        diversity: job.diversity || false,
        urgent: job.urgent || false,
        internalReference: job.internalReference || '',
        salaryMin: job.salaryMin ? job.salaryMin.toString() : '',
        salaryMax: job.salaryMax ? job.salaryMax.toString() : '',
        startDate: job.startDate ? new Date(job.startDate).toISOString().split('T')[0] : '',
        applicationDeadline: job.applicationDeadline ? new Date(job.applicationDeadline).toISOString().split('T')[0] : '',
        expiresAt: job.expiresAt ? new Date(job.expiresAt).toISOString().split('T')[0] : ''
      });
    }
  }, [location.state]);

  // Validation avancée
  const validateForm = () => {
    // Validation de base
    if (!formData.title.trim()) return 'Le titre du poste est requis';
    if (!formData.description.trim()) return 'La description du poste est requise';
    if (!formData.location.trim()) return 'La localisation est requise';
    if (!formData.department.trim()) return 'Le département est requis';
    if (!formData.experienceLevel) return 'Le niveau d\'expérience est requis';

    // Validation exigences
    if (!formData.requirements.some(req => req.trim())) return 'Au moins une exigence est requise';

    // Validation compétences
    if (formData.skills.length === 0) return 'Au moins une compétence technique est requise';

    // Validation salaire
    if (formData.salaryMin && formData.salaryMax) {
      const min = parseInt(formData.salaryMin);
      const max = parseInt(formData.salaryMax);
      if (min >= max) return 'Le salaire minimum doit être inférieur au salaire maximum';
      if (min < 0 || max < 0) return 'Les salaires ne peuvent pas être négatifs';
    }

    // Validation langues (optionnel maintenant)
    // const validLanguages = formData.languages.filter(lang =>
    //   lang.language.trim() && lang.level
    // );
    // if (validLanguages.length === 0) return 'Au moins une langue est requise';

    // Validation dates
    if (formData.startDate && new Date(formData.startDate) < new Date()) {
      return 'La date de début ne peut pas être dans le passé';
    }

    if (formData.applicationDeadline && formData.expiresAt) {
      if (new Date(formData.applicationDeadline) >= new Date(formData.expiresAt)) {
        return 'La date limite de candidature doit être antérieure à la date d\'expiration';
      }
    }

    // Validation contact
    if (formData.contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      return 'L\'adresse email de contact n\'est pas valide';
    }

    return null;
  };

  const handleSubmit = async (e, publish = false) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    try {
      // Préparer les données pour l'API
      const jobData = {
        token,
        title: formData.title.trim(),
        description: formData.description.trim(),
        requirements: formData.requirements.filter(req => req.trim()),
        location: formData.location.trim(),
        type: formData.type,

        // Nouveaux champs
        department: formData.department.trim(),
        industry: formData.industry,
        experienceLevel: formData.experienceLevel,
        educationLevel: formData.educationLevel,
        languages: formData.languages.filter(lang => lang.language.trim()),
        remoteWork: formData.remoteWork,
        workingHours: formData.workingHours,
        contractDuration: formData.contractDuration,

        skills: formData.skills,
        tools: formData.tools,
        softSkills: formData.softSkills,
        certifications: formData.certifications,

        benefits: formData.benefits,
        companyDescription: formData.companyDescription,
        teamSize: formData.teamSize ? parseInt(formData.teamSize) : undefined,
        officeAddress: formData.officeAddress,

        applicationProcess: formData.applicationProcess,
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone,

        parking: formData.parking,
        catering: formData.catering,
        trainingBudget: formData.trainingBudget,
        careerDevelopment: formData.careerDevelopment,
        diversity: formData.diversity,
        urgent: formData.urgent,

        internalReference: formData.internalReference,

        ...(formData.salaryMin && { salaryMin: parseInt(formData.salaryMin) }),
        ...(formData.salaryMax && { salaryMax: parseInt(formData.salaryMax) }),
        ...(formData.startDate && { startDate: new Date(formData.startDate).getTime() }),
        ...(formData.applicationDeadline && { applicationDeadline: new Date(formData.applicationDeadline).getTime() }),
        ...(formData.expiresAt && { expiresAt: new Date(formData.expiresAt).getTime() })
      };

      let result;
      if (isEditing && editingJob) {
        // Mise à jour d'une offre existante
        result = await updateJob({
          ...jobData,
          jobId: editingJob._id
        });
      } else {
        // Création d'une nouvelle offre
        result = await createJob(jobData);

        // Publier automatiquement l'offre après création
        await publishJob({ token, jobId: result.jobId });
      }

      setSuccess(true);

      // Rediriger vers le dashboard après succès
      setTimeout(() => {
        navigate('/dashboard-entreprise');
      }, 2000);

    } catch (err) {
      setError(err.message || `Une erreur est survenue lors de ${isEditing ? 'la mise à jour' : 'la création'} de l'offre`);
    } finally {
      setLoading(false);
    }
  };

  // Calcul du score de complétude
  const calculateCompletionScore = () => {
    let score = 0;
    let total = 0;

    // Champs obligatoires (50 points)
    const requiredFields = ['title', 'description', 'location', 'department', 'experienceLevel'];
    requiredFields.forEach(field => {
      total += 10;
      if (formData[field] && formData[field].trim()) score += 10;
    });

    // Compétences (20 points)
    total += 20;
    if (formData.skills.length > 0) score += 10;
    if (formData.tools.length > 0) score += 5;
    if (formData.softSkills.length > 0) score += 5;

    // Avantages (10 points)
    total += 10;
    if (formData.benefits.length > 0) score += 10;

    // Informations entreprise (10 points)
    total += 10;
    if (formData.companyDescription) score += 5;
    if (formData.teamSize) score += 5;

    // Processus recrutement (10 points)
    total += 10;
    if (formData.applicationProcess.length > 0) score += 10;

    return Math.round((score / total) * 100);
  };

  const completionScore = calculateCompletionScore();

  // Étapes du wizard
  const steps = [
    { id: 'basic', title: 'Informations de base', description: 'Titre, description et détails principaux' },
    { id: 'requirements', title: 'Exigences & Compétences', description: 'Niveau d\'expérience et compétences requises' },
    { id: 'conditions', title: 'Conditions de travail', description: 'Salaire, avantages et modalités' },
    { id: 'company', title: 'À propos de l\'entreprise', description: 'Présentation et culture d\'entreprise' },
    { id: 'recruitment', title: 'Processus de recrutement', description: 'Étapes et contacts pour candidater' },
    { id: 'preview', title: 'Aperçu final', description: 'Vérification avant publication' }
  ];

  // Fonctions de navigation
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  // Fonction helper pour les icônes dynamiques
  const renderIcon = (iconName, size = 16) => {
    const IconComponent = Icons[iconName];
    return IconComponent ? <IconComponent size={size} /> : null;
  };


  if (success) {
    return (
      <div className="publier-offre-page">
        <div className="success-message">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="success-icon"
          >
            <Icons.Check size={64} />
          </motion.div>
          <h2>{isEditing ? 'Offre modifiée avec succès !' : 'Offre publiée avec succès !'}</h2>
          <p>{isEditing ? 'Vos modifications ont été enregistrées.' : 'Votre offre est maintenant visible par les candidats.'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="publier-offre-page">
      <div className="publier-offre-container">
        {/* Header avec progression */}
        <div className="publier-offre-header">
          <div className="header-top">
            <button
              className="back-btn"
              onClick={() => navigate('/dashboard-entreprise')}
            >
              <Icons.ArrowLeft size={16} />
              Retour au dashboard
            </button>
            <div className="dashboard-title">
              <Icons.Briefcase size={24} />
              <span>Publication d'offre d'emploi</span>
            </div>

            <div className="header-actions">
              <div className="auto-save-status">
                <Icons.Check size={16} />
                <span>
                  {autoSaveStatus === 'saved' ? 'Sauvegardé' :
                   autoSaveStatus === 'saving' ? 'Sauvegarde...' : 'Non sauvegardé'}
                </span>
                {lastSaved && (
                  <small>{lastSaved.toLocaleTimeString('fr-FR')}</small>
                )}
              </div>

              <div className="completion-score">
                <div className="score-bar">
                  <div
                    className="score-fill"
                    style={{ width: `${completionScore}%` }}
                  ></div>
                </div>
                <span className="score-text">{completionScore}% complet</span>
              </div>
            </div>
          </div>

          <h1>{isEditing ? 'Modifier l\'offre d\'emploi' : 'Publier une offre d\'emploi'}</h1>
          <p>{isEditing ? 'Modifiez les détails de votre offre d\'emploi' : 'Créez une offre d\'emploi détaillée et attractive pour attirer les meilleurs talents'}</p>
        </div>

        {error && (
          <div className="error-message">
            <Icons.AlertCircle size={20} />
            {error}
          </div>
        )}

        {/* Barre de progression des étapes */}
        <div className="step-progress">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
          <div className="step-indicators">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`step-indicator ${index <= currentStep ? 'completed' : ''} ${index === currentStep ? 'active' : ''}`}
                onClick={() => index <= currentStep ? goToStep(index) : null}
              >
                <span className="step-number">{index + 1}</span>
                <span className="step-title">{step.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Titre de l'étape actuelle */}
        <div className="current-step-header">
          <h2>{steps[currentStep].title}</h2>
          <p>{steps[currentStep].description}</p>
        </div>

        <div className="form-content">
          <AnimatePresence mode="wait">
            {/* Étape 1: Informations de base */}
            {currentStep === 0 && (
              <motion.div
                key="basic"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="step-content"
              >
                <div className="form-section">
                  <div className="form-group">
                    <label htmlFor="title">Titre du poste *</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Ex: Développeur Full-Stack React/Node.js"
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="department">Département *</label>
                      <select
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Sélectionner un département</option>
                        {departments.map(dept => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="industry">Secteur d'activité</label>
                      <select
                        id="industry"
                        name="industry"
                        value={formData.industry}
                        onChange={handleInputChange}
                      >
                        <option value="">Tous secteurs</option>
                        {industries.map(industry => (
                          <option key={industry} value={industry}>{industry}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="location">Localisation *</label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="Ex: Paris, Lyon, Télétravail"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="type">Type de contrat *</label>
                      <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        required
                      >
                        {jobTypes.map(type => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="description">Description du poste *</label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Décrivez le poste, les missions, l'environnement de travail..."
                      rows={8}
                      required
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Étape 2: Exigences & Compétences */}
            {currentStep === 1 && (
              <motion.div
                key="requirements"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="step-content"
              >
                {/* Niveau d'expérience */}
                <div className="form-section">
                  <h3>Niveau d'expérience requis *</h3>
                  <div className="experience-grid">
                    {experienceLevels.map(level => (
                      <div
                        key={level.value}
                        className={`experience-card ${formData.experienceLevel === level.value ? 'selected' : ''}`}
                        onClick={() => setFormData(prev => ({ ...prev, experienceLevel: level.value }))}
                      >
                        <h4>{level.label}</h4>
                        <p>{level.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Langues */}
                <div className="form-section">
                  <h3>Langues requises</h3>
                  <div className="languages-list">
                    {formData.languages.map((lang, index) => (
                      <div key={index} className="language-item">
                        <select
                          value={lang.language}
                          onChange={(e) => handleLanguageChange(index, 'language', e.target.value)}
                        >
                          <option value="">Sélectionner une langue</option>
                          {commonLanguages.map(language => (
                            <option key={language} value={language}>{language}</option>
                          ))}
                        </select>

                        <select
                          value={lang.level}
                          onChange={(e) => handleLanguageChange(index, 'level', e.target.value)}
                        >
                          {languageLevels.map(level => (
                            <option key={level.value} value={level.value}>
                              {level.label}
                            </option>
                          ))}
                        </select>

                        {formData.languages.length > 1 && (
                          <button
                            type="button"
                            className="remove-btn"
                            onClick={() => removeLanguage(index)}
                          >
                            <Icons.X size={16} />
                          </button>
                        )}
                      </div>
                    ))}

                    <button
                      type="button"
                      className="add-btn"
                      onClick={addLanguage}
                    >
                      <Icons.Plus size={16} />
                      Ajouter une langue
                    </button>
                  </div>
                </div>

                {/* Compétences techniques */}
                <div className="form-section">
                  <h3>Compétences techniques</h3>
                  <div className="skills-section">
                    <div className="common-skills">
                      <p>Compétences populaires :</p>
                      <div className="skill-tags">
                        {commonSkills.slice(0, 20).map(skill => (
                          <button
                            key={skill}
                            type="button"
                            className={`skill-tag ${formData.skills.includes(skill) ? 'selected' : ''}`}
                            onClick={() => formData.skills.includes(skill) ? removeSkill(skill) : addSkill(skill)}
                          >
                            {skill}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="custom-skills">
                      <p>Compétences personnalisées :</p>
                      <div className="array-inputs">
                        {formData.skills.filter(skill => !commonSkills.includes(skill)).map((skill, index) => (
                          <div key={index} className="array-input-group">
                            <input
                              type="text"
                              value={skill}
                              onChange={(e) => handleArrayChange('skills', formData.skills.indexOf(skill), e.target.value)}
                              placeholder="Compétence personnalisée"
                            />
                            <button
                              type="button"
                              className="remove-btn"
                              onClick={() => removeSkill(skill)}
                            >
                              <Icons.X size={16} />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          className="add-btn"
                          onClick={() => addSkill('')}
                        >
                          <Icons.Plus size={16} />
                          Ajouter une compétence
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Outils */}
                <div className="form-section">
                  <h3>Outils et technologies</h3>
                  <div className="tools-grid">
                    {commonTools.map(tool => (
                      <button
                        key={tool}
                        type="button"
                        className={`tool-tag ${formData.tools.includes(tool) ? 'selected' : ''}`}
                        onClick={() => formData.tools.includes(tool) ? removeTool(tool) : addTool(tool)}
                      >
                        {tool}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Compétences soft skills */}
                <div className="form-section">
                  <h3>Qualités et soft skills</h3>
                  <div className="soft-skills-grid">
                    {commonSoftSkills.map(skill => (
                      <button
                        key={skill}
                        type="button"
                        className={`soft-skill-tag ${formData.softSkills.includes(skill) ? 'selected' : ''}`}
                        onClick={() => formData.softSkills.includes(skill) ? removeSoftSkill(skill) : addSoftSkill(skill)}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div className="form-section">
                  <h3>Certifications souhaitées</h3>
                  <div className="certifications-input">
                    <input
                      type="text"
                      placeholder="Ex: AWS Certified Solutions Architect, Scrum Master..."
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addCertification(e.target.value);
                          e.target.value = '';
                        }
                      }}
                    />
                    <div className="certifications-tags">
                      {formData.certifications.map(cert => (
                        <span key={cert} className="certification-tag">
                          {cert}
                          <button onClick={() => removeCertification(cert)}>
                            <Icons.X size={12} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Exigences libres */}
                <div className="form-section">
                  <h3>Autres exigences</h3>
                  <div className="array-inputs">
                    {formData.requirements.map((requirement, index) => (
                      <div key={index} className="array-input-group">
                        <input
                          type="text"
                          value={requirement}
                          onChange={(e) => handleArrayChange('requirements', index, e.target.value)}
                          placeholder={`Exigence ${index + 1}`}
                        />
                        {formData.requirements.length > 1 && (
                          <button
                            type="button"
                            className="remove-btn"
                            onClick={() => removeArrayItem('requirements', index)}
                          >
                            <Icons.X size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      className="add-btn"
                      onClick={() => addArrayItem('requirements')}
                    >
                      <Icons.Plus size={16} />
                      Ajouter une exigence
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Étape 3: Conditions de travail */}
            {currentStep === 2 && (
              <motion.div
                key="conditions"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="step-content"
              >
                {/* Télétravail */}
                <div className="form-section">
                  <h3>Modalités de travail</h3>
                  <div className="remote-work-options">
                    {[
                      { value: 'no', label: 'Présentiel uniquement', desc: 'Travail sur site' },
                      { value: 'partial', label: 'Hybride', desc: 'Mélange présentiel/télétravail' },
                      { value: 'full', label: 'Télétravail complet', desc: '100% à distance' }
                    ].map(option => (
                      <div
                        key={option.value}
                        className={`remote-option ${formData.remoteWork === option.value ? 'selected' : ''}`}
                        onClick={() => setFormData(prev => ({ ...prev, remoteWork: option.value }))}
                      >
                        <h4>{option.label}</h4>
                        <p>{option.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Salaire */}
                <div className="form-section">
                  <h3>Rémunération</h3>
                  <div className="salary-section">
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="salaryMin">Salaire minimum (€/an)</label>
                        <input
                          type="number"
                          id="salaryMin"
                          name="salaryMin"
                          value={formData.salaryMin}
                          onChange={handleInputChange}
                          placeholder="Ex: 35000"
                          min="0"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="salaryMax">Salaire maximum (€/an)</label>
                        <input
                          type="number"
                          id="salaryMax"
                          name="salaryMax"
                          value={formData.salaryMax}
                          onChange={handleInputChange}
                          placeholder="Ex: 45000"
                          min="0"
                        />
                      </div>
                    </div>
                    <small>Fourchette salariale indicative, à négocier selon profil</small>
                  </div>
                </div>

                {/* Avantages */}
                <div className="form-section">
                  <h3>Avantages et perks</h3>
                  <div className="benefits-grid">
                    {commonBenefits.map(benefit => (
                      <button
                        key={benefit}
                        type="button"
                        className={`benefit-tag ${formData.benefits.includes(benefit) ? 'selected' : ''}`}
                        onClick={() => formData.benefits.includes(benefit) ? removeBenefit(benefit) : addBenefit(benefit)}
                      >
                        {benefit}
                      </button>
                    ))}
                  </div>

                  <div className="custom-benefits">
                    <input
                      type="text"
                      placeholder="Ajouter un avantage personnalisé..."
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addBenefit(e.target.value);
                          e.target.value = '';
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Horaires et contrat */}
                <div className="form-section">
                  <h3>Conditions contractuelles</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="workingHours">Horaires de travail</label>
                      <input
                        type="text"
                        id="workingHours"
                        name="workingHours"
                        value={formData.workingHours}
                        onChange={handleInputChange}
                        placeholder="Ex: 39h/semaine, horaires flexibles"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="contractDuration">Durée du contrat</label>
                      <input
                        type="text"
                        id="contractDuration"
                        name="contractDuration"
                        value={formData.contractDuration}
                        onChange={handleInputChange}
                        placeholder="Ex: CDI, CDD 12 mois"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="startDate">Date de début souhaitée</label>
                      <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="applicationDeadline">Date limite de candidature</label>
                      <input
                        type="date"
                        id="applicationDeadline"
                        name="applicationDeadline"
                        value={formData.applicationDeadline}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Étape 4: À propos de l'entreprise */}
            {currentStep === 3 && (
              <motion.div
                key="company"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="step-content"
              >
                <div className="form-section">
                  <h3>Présentation de l'entreprise</h3>

                  <div className="form-group">
                    <label htmlFor="companyDescription">Description de l'entreprise</label>
                    <textarea
                      id="companyDescription"
                      name="companyDescription"
                      value={formData.companyDescription}
                      onChange={handleInputChange}
                      placeholder="Présentez brièvement votre entreprise, ses valeurs, sa culture..."
                      rows={6}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="teamSize">Taille de l'équipe</label>
                      <input
                        type="number"
                        id="teamSize"
                        name="teamSize"
                        value={formData.teamSize}
                        onChange={handleInputChange}
                        placeholder="Ex: 15"
                        min="1"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="officeAddress">Adresse du bureau</label>
                      <input
                        type="text"
                        id="officeAddress"
                        name="officeAddress"
                        value={formData.officeAddress}
                        onChange={handleInputChange}
                        placeholder="Ex: 123 Rue de la Paix, 75001 Paris"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3>Équipements et installations</h3>
                  <div className="facilities-grid">
                    {[
                      { key: 'parking', label: 'Parking gratuit', icon: 'Car' },
                      { key: 'catering', label: 'Restauration sur place', icon: 'Coffee' },
                      { key: 'trainingBudget', label: 'Budget formation', icon: 'BookOpen' },
                      { key: 'careerDevelopment', label: 'Développement carrière', icon: 'TrendingUp' },
                      { key: 'diversity', label: 'Égalité & diversité', icon: 'Users' }
                    ].map(facility => (
                      <label key={facility.key} className="facility-checkbox">
                        <input
                          type="checkbox"
                          checked={formData[facility.key]}
                          onChange={handleInputChange}
                          name={facility.key}
                        />
                        <span className="facility-label">
                          {renderIcon(facility.icon, 16)}
                          {facility.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Étape 5: Processus de recrutement */}
            {currentStep === 4 && (
              <motion.div
                key="recruitment"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="step-content"
              >
                <div className="form-section">
                  <h3>Processus de recrutement</h3>
                  <p>Sélectionnez les étapes de votre processus de recrutement :</p>

                  <div className="process-steps">
                    {applicationProcessSteps.map(step => (
                      <button
                        key={step}
                        type="button"
                        className={`process-step ${formData.applicationProcess.includes(step) ? 'selected' : ''}`}
                        onClick={() => formData.applicationProcess.includes(step) ? removeProcessStep(step) : addProcessStep(step)}
                      >
                        {step}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-section">
                  <h3>Informations de contact</h3>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="contactEmail">Email de contact</label>
                      <input
                        type="email"
                        id="contactEmail"
                        name="contactEmail"
                        value={formData.contactEmail}
                        onChange={handleInputChange}
                        placeholder="recrutement@entreprise.com"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="contactPhone">Téléphone de contact</label>
                      <input
                        type="tel"
                        id="contactPhone"
                        name="contactPhone"
                        value={formData.contactPhone}
                        onChange={handleInputChange}
                        placeholder="01 23 45 67 89"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3>Paramètres de l'offre</h3>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="expiresAt">Date d'expiration</label>
                      <input
                        type="date"
                        id="expiresAt"
                        name="expiresAt"
                        value={formData.expiresAt}
                        onChange={handleInputChange}
                        min={new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="internalReference">Référence interne</label>
                      <input
                        type="text"
                        id="internalReference"
                        name="internalReference"
                        value={formData.internalReference}
                        onChange={handleInputChange}
                        placeholder="REF-2024-001"
                      />
                    </div>
                  </div>

                  <div className="urgent-option">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.urgent}
                        onChange={handleInputChange}
                        name="urgent"
                      />
                      <span>Recrutement urgent - Mention spéciale dans l'offre</span>
                    </label>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Étape 6: Aperçu final */}
            {currentStep === 5 && (
              <motion.div
                key="preview"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="step-content"
              >
                <div className="preview-content">
                  <div className="preview-header">
                    <h3>Aperçu de votre offre d'emploi</h3>
                    <p>Voici comment votre offre apparaîtra aux candidats</p>
                  </div>

                  <div className="job-preview">
                    <div className="preview-job-header">
                      <h1>{formData.title || 'Titre du poste'}</h1>
                      <div className="preview-job-meta">
                        <span className="location">
                          <Icons.MapPin size={16} />
                          {formData.location || 'Localisation'}
                        </span>
                        <span className="type">{jobTypes.find(t => t.value === formData.type)?.label || 'Type de contrat'}</span>
                        <span className="department">{formData.department || 'Département'}</span>
                      </div>
                    </div>

                    <div className="preview-job-description">
                      <h3>Description du poste</h3>
                      <p>{formData.description || 'Description du poste à venir...'}</p>
                    </div>

                    {formData.requirements.length > 0 && (
                      <div className="preview-requirements">
                        <h3>Exigences</h3>
                        <ul>
                          {formData.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {(formData.skills.length > 0 || formData.tools.length > 0) && (
                      <div className="preview-skills">
                        <h3>Compétences requises</h3>
                        <div className="skills-list">
                          {formData.skills.map(skill => (
                            <span key={skill} className="skill-tag">{skill}</span>
                          ))}
                          {formData.tools.map(tool => (
                            <span key={tool} className="tool-tag">{tool}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {formData.benefits.length > 0 && (
                      <div className="preview-benefits">
                        <h3>Avantages</h3>
                        <ul>
                          {formData.benefits.map((benefit, index) => (
                            <li key={index}>{benefit}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {(formData.salaryMin || formData.salaryMax) && (
                      <div className="preview-salary">
                        <h3>Rémunération</h3>
                        <p>
                          {formData.salaryMin && formData.salaryMax
                            ? `${formData.salaryMin}€ - ${formData.salaryMax}€ par an`
                            : formData.salaryMin
                            ? `À partir de ${formData.salaryMin}€ par an`
                            : `Jusqu'à ${formData.salaryMax}€ par an`
                          }
                        </p>
                      </div>
                    )}

                    {formData.companyDescription && (
                      <div className="preview-company">
                        <h3>À propos de l'entreprise</h3>
                        <p>{formData.companyDescription}</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation par étapes */}
        <div className="step-navigation">
          <div className="nav-left">
            {currentStep > 0 && (
              <button
                type="button"
                className="nav-btn secondary-btn"
                onClick={prevStep}
              >
                <Icons.ArrowLeft size={16} />
                Précédent
              </button>
            )}
          </div>

          <div className="nav-center">
            <span className="step-counter">
              Étape {currentStep + 1} sur {steps.length}
            </span>
          </div>

          <div className="nav-right">
            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                className="nav-btn primary-btn"
                onClick={nextStep}
              >
                Suivant
                <Icons.ArrowRight size={16} />
              </button>
            ) : (
              <button
                type="button"
                className="nav-btn primary-btn"
                onClick={(e) => handleSubmit(e, false)}
                disabled={loading || completionScore < 70}
              >
                {loading ? (
                  <>
                    <Icons.Loader size={16} className="spinning" />
                    Publication...
                  </>
                ) : (
                  <>
                    <Icons.Check size={16} />
                    Publier l'offre
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublierOffre;
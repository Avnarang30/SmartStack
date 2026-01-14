export interface Question {
  id: string;
  unitId: string;
  text: string;
  choices: string[];
  correctAnswer: number;
  difficulty: 'easy' | 'medium' | 'hard';
  explanation: string;
  topic: string;
}

export interface Unit {
  id: string;
  subjectId: string;
  title: string;
  description: string;
  questionCount: number;
  progress: number;
}

export interface Subject {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: string;
  color: string;
  units: Unit[];
  progress: number;
}

export interface UserProgress {
  subjectProgress: Record<string, number>;
  unitProgress: Record<string, number>;
  streakCount: number;
  lastStudyDate: string;
  plannerTasks: PlannerTask[];
  totalQuestionsAnswered: number;
  correctAnswers: number;
}

export interface PlannerTask {
  id: string;
  title: string;
  subjectId: string;
  unitId?: string;
  date: string;
  completed: boolean;
  duration: number; // in minutes
}

export const subjects: Subject[] = [
  {
    id: 'ap-chemistry',
    title: 'AP Chemistry',
    shortTitle: 'AP Chem',
    description: 'Master chemical reactions, atomic structure, and thermodynamics',
    icon: '⚗️',
    color: '#4CAF50',
    progress: 45,
    units: [
      { id: 'chem-1', subjectId: 'ap-chemistry', title: 'Unit 1: Atomic Structure and Properties', description: 'Explore atomic models, electron configuration, and periodic trends', questionCount: 35, progress: 80 },
      { id: 'chem-2', subjectId: 'ap-chemistry', title: 'Unit 2: Molecular and Ionic Compound Structure', description: 'Learn about bonding, Lewis structures, and molecular geometry', questionCount: 40, progress: 65 },
      { id: 'chem-3', subjectId: 'ap-chemistry', title: 'Unit 3: Intermolecular Forces', description: 'Understand IMFs and their effects on physical properties', questionCount: 25, progress: 40 },
      { id: 'chem-4', subjectId: 'ap-chemistry', title: 'Unit 4: Chemical Reactions', description: 'Master reaction types, stoichiometry, and balancing equations', questionCount: 45, progress: 30 },
      { id: 'chem-5', subjectId: 'ap-chemistry', title: 'Unit 5: Kinetics', description: 'Study reaction rates, rate laws, and mechanisms', questionCount: 30, progress: 20 },
      { id: 'chem-6', subjectId: 'ap-chemistry', title: 'Unit 6: Thermodynamics', description: 'Explore enthalpy, entropy, and Gibbs free energy', questionCount: 35, progress: 10 },
      { id: 'chem-7', subjectId: 'ap-chemistry', title: 'Unit 7: Equilibrium', description: 'Learn equilibrium constants and Le Chatelier\'s principle', questionCount: 40, progress: 0 },
      { id: 'chem-8', subjectId: 'ap-chemistry', title: 'Unit 8: Acids and Bases', description: 'Master pH, buffers, and acid-base reactions', questionCount: 45, progress: 0 },
      { id: 'chem-9', subjectId: 'ap-chemistry', title: 'Unit 9: Applications of Thermodynamics', description: 'Apply thermodynamic principles to real-world scenarios', questionCount: 25, progress: 0 },
    ],
  },
  {
    id: 'ap-biology',
    title: 'AP Biology',
    shortTitle: 'AP Bio',
    description: 'Explore cellular processes, genetics, and evolution',
    icon: '🧬',
    color: '#8BC34A',
    progress: 62,
    units: [
      { id: 'bio-1', subjectId: 'ap-biology', title: 'Unit 1: Chemistry of Life', description: 'Learn about biological molecules and water properties', questionCount: 30, progress: 100 },
      { id: 'bio-2', subjectId: 'ap-biology', title: 'Unit 2: Cell Structure and Function', description: 'Explore cell organelles and membrane transport', questionCount: 40, progress: 85 },
      { id: 'bio-3', subjectId: 'ap-biology', title: 'Unit 3: Cellular Energetics', description: 'Master photosynthesis and cellular respiration', questionCount: 45, progress: 70 },
      { id: 'bio-4', subjectId: 'ap-biology', title: 'Unit 4: Cell Communication and Cell Cycle', description: 'Study signal transduction and mitosis', questionCount: 35, progress: 55 },
      { id: 'bio-5', subjectId: 'ap-biology', title: 'Unit 5: Heredity', description: 'Learn Mendelian genetics and inheritance patterns', questionCount: 40, progress: 40 },
      { id: 'bio-6', subjectId: 'ap-biology', title: 'Unit 6: Gene Expression and Regulation', description: 'Explore DNA replication and protein synthesis', questionCount: 45, progress: 25 },
      { id: 'bio-7', subjectId: 'ap-biology', title: 'Unit 7: Natural Selection', description: 'Understand evolution and evidence for evolution', questionCount: 30, progress: 15 },
      { id: 'bio-8', subjectId: 'ap-biology', title: 'Unit 8: Ecology', description: 'Study ecosystems, populations, and biodiversity', questionCount: 35, progress: 0 },
    ],
  },
  {
    id: 'ap-calculus-ab',
    title: 'AP Calculus AB',
    shortTitle: 'AP Calc AB',
    description: 'Master limits, derivatives, and integrals',
    icon: '📐',
    color: '#2196F3',
    progress: 38,
    units: [
      { id: 'calc-1', subjectId: 'ap-calculus-ab', title: 'Unit 1: Limits and Continuity', description: 'Learn limit evaluation and continuity concepts', questionCount: 35, progress: 90 },
      { id: 'calc-2', subjectId: 'ap-calculus-ab', title: 'Unit 2: Differentiation: Definition and Fundamental Properties', description: 'Master derivative rules and applications', questionCount: 40, progress: 75 },
      { id: 'calc-3', subjectId: 'ap-calculus-ab', title: 'Unit 3: Differentiation: Composite, Implicit, and Inverse Functions', description: 'Apply chain rule and implicit differentiation', questionCount: 35, progress: 50 },
      { id: 'calc-4', subjectId: 'ap-calculus-ab', title: 'Unit 4: Contextual Applications of Differentiation', description: 'Solve related rates and optimization problems', questionCount: 30, progress: 30 },
      { id: 'calc-5', subjectId: 'ap-calculus-ab', title: 'Unit 5: Analytical Applications of Differentiation', description: 'Analyze function behavior using derivatives', questionCount: 40, progress: 15 },
      { id: 'calc-6', subjectId: 'ap-calculus-ab', title: 'Unit 6: Integration and Accumulation of Change', description: 'Learn definite and indefinite integrals', questionCount: 45, progress: 5 },
      { id: 'calc-7', subjectId: 'ap-calculus-ab', title: 'Unit 7: Differential Equations', description: 'Solve separable differential equations', questionCount: 25, progress: 0 },
      { id: 'calc-8', subjectId: 'ap-calculus-ab', title: 'Unit 8: Applications of Integration', description: 'Calculate areas and volumes using integration', questionCount: 35, progress: 0 },
    ],
  },
  {
    id: 'ap-physics-1',
    title: 'AP Physics 1',
    shortTitle: 'AP Phys 1',
    description: 'Understand mechanics, waves, and circuits',
    icon: '⚛️',
    color: '#9C27B0',
    progress: 28,
    units: [
      { id: 'phys-1', subjectId: 'ap-physics-1', title: 'Unit 1: Kinematics', description: 'Study motion in one and two dimensions', questionCount: 40, progress: 70 },
      { id: 'phys-2', subjectId: 'ap-physics-1', title: 'Unit 2: Dynamics', description: 'Learn Newton\'s laws and force analysis', questionCount: 45, progress: 50 },
      { id: 'phys-3', subjectId: 'ap-physics-1', title: 'Unit 3: Circular Motion and Gravitation', description: 'Explore centripetal force and gravitational fields', questionCount: 30, progress: 30 },
      { id: 'phys-4', subjectId: 'ap-physics-1', title: 'Unit 4: Energy', description: 'Master work, energy, and power concepts', questionCount: 35, progress: 20 },
      { id: 'phys-5', subjectId: 'ap-physics-1', title: 'Unit 5: Momentum', description: 'Study impulse and conservation of momentum', questionCount: 30, progress: 10 },
      { id: 'phys-6', subjectId: 'ap-physics-1', title: 'Unit 6: Simple Harmonic Motion', description: 'Understand oscillations and wave behavior', questionCount: 25, progress: 0 },
      { id: 'phys-7', subjectId: 'ap-physics-1', title: 'Unit 7: Torque and Rotational Motion', description: 'Analyze rotational dynamics', questionCount: 35, progress: 0 },
    ],
  },
  {
    id: 'ap-us-history',
    title: 'AP US History',
    shortTitle: 'APUSH',
    description: 'Explore American history from colonization to present',
    icon: '🗽',
    color: '#F44336',
    progress: 52,
    units: [
      { id: 'apush-1', subjectId: 'ap-us-history', title: 'Unit 1: Period 1 (1491-1607)', description: 'Pre-Columbian societies and European exploration', questionCount: 25, progress: 100 },
      { id: 'apush-2', subjectId: 'ap-us-history', title: 'Unit 2: Period 2 (1607-1754)', description: 'Colonial America and transatlantic connections', questionCount: 35, progress: 85 },
      { id: 'apush-3', subjectId: 'ap-us-history', title: 'Unit 3: Period 3 (1754-1800)', description: 'Revolution and the new nation', questionCount: 40, progress: 70 },
      { id: 'apush-4', subjectId: 'ap-us-history', title: 'Unit 4: Period 4 (1800-1848)', description: 'Democracy, expansion, and reform', questionCount: 45, progress: 55 },
      { id: 'apush-5', subjectId: 'ap-us-history', title: 'Unit 5: Period 5 (1844-1877)', description: 'Civil War and Reconstruction', questionCount: 50, progress: 40 },
      { id: 'apush-6', subjectId: 'ap-us-history', title: 'Unit 6: Period 6 (1865-1898)', description: 'Industrialization and the Gilded Age', questionCount: 40, progress: 25 },
      { id: 'apush-7', subjectId: 'ap-us-history', title: 'Unit 7: Period 7 (1890-1945)', description: 'Progressive Era, WWI, and WWII', questionCount: 55, progress: 10 },
      { id: 'apush-8', subjectId: 'ap-us-history', title: 'Unit 8: Period 8 (1945-1980)', description: 'Cold War and civil rights', questionCount: 45, progress: 0 },
      { id: 'apush-9', subjectId: 'ap-us-history', title: 'Unit 9: Period 9 (1980-Present)', description: 'Modern America and globalization', questionCount: 30, progress: 0 },
    ],
  },
  {
    id: 'ap-world-history',
    title: 'AP World History',
    shortTitle: 'AP World',
    description: 'Study global civilizations and their connections',
    icon: '🌍',
    color: '#FF9800',
    progress: 35,
    units: [
      { id: 'world-1', subjectId: 'ap-world-history', title: 'Unit 1: The Global Tapestry (1200-1450)', description: 'Regional civilizations and their development', questionCount: 35, progress: 75 },
      { id: 'world-2', subjectId: 'ap-world-history', title: 'Unit 2: Networks of Exchange (1200-1450)', description: 'Trade routes and cultural diffusion', questionCount: 40, progress: 60 },
      { id: 'world-3', subjectId: 'ap-world-history', title: 'Unit 3: Land-Based Empires (1450-1750)', description: 'Ottoman, Safavid, Mughal, and more', questionCount: 45, progress: 45 },
      { id: 'world-4', subjectId: 'ap-world-history', title: 'Unit 4: Transoceanic Connections (1450-1750)', description: 'Exploration and the Columbian Exchange', questionCount: 40, progress: 30 },
      { id: 'world-5', subjectId: 'ap-world-history', title: 'Unit 5: Revolutions (1750-1900)', description: 'Political and industrial revolutions', questionCount: 50, progress: 20 },
      { id: 'world-6', subjectId: 'ap-world-history', title: 'Unit 6: Consequences of Industrialization (1750-1900)', description: 'Imperialism and social changes', questionCount: 45, progress: 10 },
      { id: 'world-7', subjectId: 'ap-world-history', title: 'Unit 7: Global Conflict (1900-Present)', description: 'World Wars and decolonization', questionCount: 55, progress: 0 },
      { id: 'world-8', subjectId: 'ap-world-history', title: 'Unit 8: Cold War and Decolonization (1900-Present)', description: 'Superpower rivalry and new nations', questionCount: 40, progress: 0 },
      { id: 'world-9', subjectId: 'ap-world-history', title: 'Unit 9: Globalization (1900-Present)', description: 'Modern global connections', questionCount: 30, progress: 0 },
    ],
  },
  {
    id: 'ap-english-lang',
    title: 'AP English Language',
    shortTitle: 'AP Lang',
    description: 'Master rhetoric, argumentation, and synthesis',
    icon: '✍️',
    color: '#607D8B',
    progress: 55,
    units: [
      { id: 'lang-1', subjectId: 'ap-english-lang', title: 'Unit 1: Claims and Evidence', description: 'Analyze and construct arguments', questionCount: 30, progress: 90 },
      { id: 'lang-2', subjectId: 'ap-english-lang', title: 'Unit 2: Reasoning and Organization', description: 'Understand logical structure', questionCount: 35, progress: 75 },
      { id: 'lang-3', subjectId: 'ap-english-lang', title: 'Unit 3: Style', description: 'Analyze author\'s stylistic choices', questionCount: 40, progress: 60 },
      { id: 'lang-4', subjectId: 'ap-english-lang', title: 'Unit 4: Synthesis', description: 'Combine multiple sources into arguments', questionCount: 35, progress: 45 },
      { id: 'lang-5', subjectId: 'ap-english-lang', title: 'Unit 5: Rhetorical Analysis', description: 'Analyze rhetorical strategies', questionCount: 45, progress: 30 },
      { id: 'lang-6', subjectId: 'ap-english-lang', title: 'Unit 6: Argumentation', description: 'Develop and support arguments', questionCount: 40, progress: 15 },
    ],
  },
  {
    id: 'ap-macroeconomics',
    title: 'AP Macroeconomics',
    shortTitle: 'AP Macro',
    description: 'Understand national and global economic principles',
    icon: '📊',
    color: '#00BCD4',
    progress: 42,
    units: [
      { id: 'macro-1', subjectId: 'ap-macroeconomics', title: 'Unit 1: Basic Economic Concepts', description: 'Scarcity, opportunity cost, and production', questionCount: 25, progress: 85 },
      { id: 'macro-2', subjectId: 'ap-macroeconomics', title: 'Unit 2: Economic Indicators and the Business Cycle', description: 'GDP, inflation, and unemployment', questionCount: 35, progress: 70 },
      { id: 'macro-3', subjectId: 'ap-macroeconomics', title: 'Unit 3: National Income and Price Determination', description: 'Aggregate supply and demand', questionCount: 40, progress: 50 },
      { id: 'macro-4', subjectId: 'ap-macroeconomics', title: 'Unit 4: Financial Sector', description: 'Money, banking, and monetary policy', questionCount: 45, progress: 30 },
      { id: 'macro-5', subjectId: 'ap-macroeconomics', title: 'Unit 5: Long-Run Consequences of Stabilization Policies', description: 'Fiscal and monetary policy effects', questionCount: 35, progress: 15 },
      { id: 'macro-6', subjectId: 'ap-macroeconomics', title: 'Unit 6: Open Economy—International Trade and Finance', description: 'Balance of payments and exchange rates', questionCount: 30, progress: 0 },
    ],
  },
];

export const sampleQuestions: Question[] = [
  {
    id: 'q1',
    unitId: 'chem-1',
    text: 'Which of the following electron configurations represents an atom in an excited state?',
    choices: ['1s² 2s² 2p⁶ 3s²', '1s² 2s² 2p⁶ 3s¹', '1s² 2s² 2p⁵ 3s¹', '1s² 2s² 2p⁶'],
    correctAnswer: 2,
    difficulty: 'medium',
    explanation: 'An excited state occurs when an electron occupies a higher energy level than its ground state. In option C, an electron from 2p has been excited to 3s, leaving the 2p subshell with only 5 electrons instead of 6.',
    topic: 'Electron Configuration',
  },
  {
    id: 'q2',
    unitId: 'chem-1',
    text: 'As atomic radius increases down a group, what happens to first ionization energy?',
    choices: ['Increases', 'Decreases', 'Remains constant', 'First increases then decreases'],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: 'As atomic radius increases down a group, the outer electrons are farther from the nucleus and experience more shielding. This makes them easier to remove, so ionization energy decreases.',
    topic: 'Periodic Trends',
  },
  {
    id: 'q3',
    unitId: 'chem-1',
    text: 'Which of the following atoms has the highest electronegativity?',
    choices: ['Sodium (Na)', 'Chlorine (Cl)', 'Fluorine (F)', 'Oxygen (O)'],
    correctAnswer: 2,
    difficulty: 'easy',
    explanation: 'Fluorine has the highest electronegativity of all elements (3.98 on the Pauling scale). Electronegativity increases across a period and decreases down a group.',
    topic: 'Periodic Trends',
  },
  {
    id: 'q4',
    unitId: 'chem-2',
    text: 'According to VSEPR theory, what is the molecular geometry of SF₄?',
    choices: ['Tetrahedral', 'Seesaw', 'Trigonal bipyramidal', 'Square planar'],
    correctAnswer: 1,
    difficulty: 'hard',
    explanation: 'SF₄ has 4 bonding pairs and 1 lone pair, giving it 5 electron domains. The electron geometry is trigonal bipyramidal, but the molecular geometry (shape) is seesaw because the lone pair occupies an equatorial position.',
    topic: 'Molecular Geometry',
  },
  {
    id: 'q5',
    unitId: 'bio-1',
    text: 'Which of the following is NOT a property of water that makes it essential for life?',
    choices: ['High specific heat capacity', 'Universal solvent properties', 'Lower density as a solid than liquid', 'Nonpolar covalent bonds'],
    correctAnswer: 3,
    difficulty: 'easy',
    explanation: 'Water has polar covalent bonds, not nonpolar. The electronegativity difference between oxygen and hydrogen creates partial charges, making water a polar molecule. This polarity is responsible for many of water\'s life-supporting properties.',
    topic: 'Properties of Water',
  },
  {
    id: 'q6',
    unitId: 'calc-1',
    text: 'What is the limit of (sin x)/x as x approaches 0?',
    choices: ['0', '1', 'undefined', '∞'],
    correctAnswer: 1,
    difficulty: 'medium',
    explanation: 'This is a famous limit known as the "sinc function" limit. Using L\'Hôpital\'s rule or the squeeze theorem, we can show that lim(x→0) sin(x)/x = 1. This limit is fundamental to calculus.',
    topic: 'Limits',
  },
];

export const defaultUserProgress: UserProgress = {
  subjectProgress: {
    'ap-chemistry': 45,
    'ap-biology': 62,
    'ap-calculus-ab': 38,
    'ap-physics-1': 28,
    'ap-us-history': 52,
    'ap-world-history': 35,
    'ap-english-lang': 55,
    'ap-macroeconomics': 42,
  },
  unitProgress: {},
  streakCount: 7,
  lastStudyDate: new Date().toISOString().split('T')[0],
  plannerTasks: [
    { id: 't1', title: 'Review Unit 1 Flashcards', subjectId: 'ap-chemistry', unitId: 'chem-1', date: new Date().toISOString().split('T')[0], completed: false, duration: 30 },
    { id: 't2', title: 'Practice Limit Problems', subjectId: 'ap-calculus-ab', unitId: 'calc-1', date: new Date().toISOString().split('T')[0], completed: true, duration: 45 },
    { id: 't3', title: 'Read Chapter on DNA Replication', subjectId: 'ap-biology', unitId: 'bio-6', date: new Date().toISOString().split('T')[0], completed: false, duration: 60 },
  ],
  totalQuestionsAnswered: 342,
  correctAnswers: 278,
};

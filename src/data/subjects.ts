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
    id: 'ap-microeconomics',
    title: 'AP Microeconomics',
    shortTitle: 'AP Micro',
    description: 'Understand individual economic decision-making and market structures',
    icon: '📊',
    color: '#00BCD4',
    progress: 0,
    units: [
      { id: 'micro-1', subjectId: 'ap-microeconomics', title: 'Unit 1: Basic Economic Concepts', description: 'Scarcity, opportunity cost, and comparative advantage', questionCount: 25, progress: 0 },
      { id: 'micro-2', subjectId: 'ap-microeconomics', title: 'Unit 2: Supply and Demand', description: 'Market equilibrium, elasticity, and price controls', questionCount: 35, progress: 0 },
      { id: 'micro-3', subjectId: 'ap-microeconomics', title: 'Unit 3: Production, Cost, and the Perfect Competition Model', description: 'Cost curves, profit maximization, and competitive markets', questionCount: 40, progress: 0 },
      { id: 'micro-4', subjectId: 'ap-microeconomics', title: 'Unit 4: Imperfect Competition', description: 'Monopoly, oligopoly, and monopolistic competition', questionCount: 45, progress: 0 },
      { id: 'micro-5', subjectId: 'ap-microeconomics', title: 'Unit 5: Factor Markets', description: 'Labor markets, wages, and resource allocation', questionCount: 30, progress: 0 },
      { id: 'micro-6', subjectId: 'ap-microeconomics', title: 'Unit 6: Market Failure and the Role of Government', description: 'Externalities, public goods, and government intervention', questionCount: 30, progress: 0 },
    ],
  },
];

export const sampleQuestions: Question[] = [
  {
    id: 'q1',
    unitId: 'micro-1',
    text: 'Which of the following best illustrates the concept of opportunity cost?',
    choices: ['The price of a movie ticket', 'The value of the next best alternative given up', 'The total cost of production', 'The marginal cost of one more unit'],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: 'Opportunity cost is the value of the next best alternative that must be forgone when making a choice. It is not simply the monetary cost, but what you give up.',
    topic: 'Opportunity Cost',
  },
  {
    id: 'q2',
    unitId: 'micro-2',
    text: 'If the price of a good increases and the quantity demanded decreases, this movement is best described as:',
    choices: ['A shift in demand', 'A change in quantity demanded', 'A shift in supply', 'A change in consumer income'],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: 'A movement along the demand curve due to a price change is called a change in quantity demanded, not a shift in demand. Shifts occur when non-price determinants change.',
    topic: 'Supply and Demand',
  },
  {
    id: 'q3',
    unitId: 'micro-3',
    text: 'A perfectly competitive firm maximizes profit by producing where:',
    choices: ['Price equals average total cost', 'Marginal revenue equals marginal cost', 'Total revenue is maximized', 'Average variable cost is minimized'],
    correctAnswer: 1,
    difficulty: 'medium',
    explanation: 'In perfect competition, a firm maximizes profit (or minimizes loss) by producing the quantity where marginal revenue (MR) equals marginal cost (MC), as long as price covers average variable cost.',
    topic: 'Perfect Competition',
  },
  {
    id: 'q4',
    unitId: 'micro-4',
    text: 'Which market structure is characterized by a single seller with no close substitutes?',
    choices: ['Perfect competition', 'Monopolistic competition', 'Oligopoly', 'Monopoly'],
    correctAnswer: 3,
    difficulty: 'easy',
    explanation: 'A monopoly is defined as a market structure with a single seller producing a product with no close substitutes, giving the firm significant market power.',
    topic: 'Monopoly',
  },
];

export const defaultUserProgress: UserProgress = {
  subjectProgress: {
    'ap-microeconomics': 0,
  },
  unitProgress: {},
  streakCount: 0,
  lastStudyDate: new Date().toISOString().split('T')[0],
  plannerTasks: [
    { id: 't1', title: 'Review Supply and Demand', subjectId: 'ap-microeconomics', unitId: 'micro-2', date: new Date().toISOString().split('T')[0], completed: false, duration: 30 },
  ],
  totalQuestionsAnswered: 0,
  correctAnswers: 0,
};

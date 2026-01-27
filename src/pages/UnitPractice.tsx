import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BluebookHeader } from '@/components/bluebook/BluebookHeader';
import { BluebookBottomNav } from '@/components/bluebook/BluebookBottomNav';
import { BluebookQuestionCard } from '@/components/bluebook/BluebookQuestionCard';
import { QuestionGridModal } from '@/components/bluebook/QuestionGridModal';
import { DirectionsModal } from '@/components/bluebook/DirectionsModal';
import { AITutorModal } from '@/components/AITutorModal';
import { Button } from '@/components/ui/button';
import { subjects, sampleQuestions, type Question } from '@/data/subjects';
import { ChevronLeft } from 'lucide-react';

interface QuestionState {
  answered: boolean;
  correct?: boolean;
  markedForReview: boolean;
}

export default function UnitPractice() {
  const { unitId } = useParams();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isQuestionMenuOpen, setIsQuestionMenuOpen] = useState(false);
  const [isDirectionsOpen, setIsDirectionsOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | undefined>();
  const [questionStates, setQuestionStates] = useState<Map<number, QuestionState>>(new Map());

  // Find the unit and its subject
  let unit = null;
  let subject = null;
  for (const s of subjects) {
    const u = s.units.find(u => u.id === unitId);
    if (u) {
      unit = u;
      subject = s;
      break;
    }
  }

  // Filter questions based on unit
  const unitQuestions = useMemo(() => {
    if (!subject) return [];
    return sampleQuestions.filter(q => 
      q.unitId === unitId || q.unitId.startsWith(subject.id.split('-')[1].slice(0, 4))
    );
  }, [unitId, subject]);

  // Build question statuses for the grid
  const questionStatuses = useMemo(() => {
    return unitQuestions.map((_, index) => {
      const state = questionStates.get(index);
      return {
        answered: state?.answered ?? false,
        correct: state?.correct,
        markedForReview: state?.markedForReview ?? false,
      };
    });
  }, [unitQuestions, questionStates]);

  const currentQuestionState = questionStates.get(questionIndex);
  const isMarkedForReview = currentQuestionState?.markedForReview ?? false;

  const toggleMarkForReview = () => {
    setQuestionStates(prev => {
      const newMap = new Map(prev);
      const current = newMap.get(questionIndex) ?? { answered: false, markedForReview: false };
      newMap.set(questionIndex, { ...current, markedForReview: !current.markedForReview });
      return newMap;
    });
  };

  const handleAnswered = (correct: boolean) => {
    setQuestionStates(prev => {
      const newMap = new Map(prev);
      const current = newMap.get(questionIndex) ?? { answered: false, markedForReview: false };
      newMap.set(questionIndex, { ...current, answered: true, correct });
      return newMap;
    });
  };

  const handleAIHelp = (question: Question) => {
    setCurrentQuestion(question);
    setIsAIModalOpen(true);
  };

  const handlePrevious = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
    }
  };

  const handleNext = () => {
    if (questionIndex < unitQuestions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    }
  };

  const handleSelectQuestion = (index: number) => {
    setQuestionIndex(index);
  };

  if (!unit || !subject) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-sm">
          <h1 className="text-xl font-semibold text-gray-900 mb-4">Unit not found</h1>
          <Link to="/subjects">
            <Button className="bg-bluebook-blue hover:bg-bluebook-blue/90">Back to Subjects</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (unitQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <BluebookHeader
          subjectTitle={subject.shortTitle}
          unitTitle={unit.title}
          currentQuestion={0}
          totalQuestions={0}
          isMarkedForReview={false}
          onToggleMarkReview={() => {}}
          onShowDirections={() => {}}
        />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center bg-white p-8 rounded-lg shadow-sm">
            <p className="text-gray-600 mb-4">
              No questions available for this unit yet.
            </p>
            <Link to={`/subjects/${subject.id}`}>
              <Button variant="outline" className="border-gray-300">Back to Units</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const activeQuestion = unitQuestions[questionIndex];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Bluebook Header */}
      <BluebookHeader
        subjectTitle={subject.shortTitle}
        unitTitle={unit.title}
        currentQuestion={questionIndex + 1}
        totalQuestions={unitQuestions.length}
        isMarkedForReview={isMarkedForReview}
        onToggleMarkReview={toggleMarkForReview}
        onShowDirections={() => setIsDirectionsOpen(true)}
      />

      {/* Subtle Exit Link */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-2">
          <Link 
            to={`/subjects/${subject.id}`} 
            className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 transition-colors"
          >
            <ChevronLeft className="h-3 w-3" />
            Exit to {subject.shortTitle}
          </Link>
        </div>
      </div>

      {/* Main Content Area - Gray Background */}
      <main className="flex-1 py-6 pb-24">
        <div className="container mx-auto px-4">
          <div key={activeQuestion.id} className="animate-fade-in">
            <BluebookQuestionCard
              question={activeQuestion}
              questionNumber={questionIndex + 1}
              onAIHelp={handleAIHelp}
              onAnswered={handleAnswered}
            />
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BluebookBottomNav
        currentQuestion={questionIndex + 1}
        totalQuestions={unitQuestions.length}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onOpenQuestionMenu={() => setIsQuestionMenuOpen(true)}
        canGoBack={questionIndex > 0}
        canGoForward={questionIndex < unitQuestions.length - 1}
      />

      {/* Question Grid Modal */}
      <QuestionGridModal
        isOpen={isQuestionMenuOpen}
        onClose={() => setIsQuestionMenuOpen(false)}
        questionStatuses={questionStatuses}
        currentQuestion={questionIndex + 1}
        onSelectQuestion={handleSelectQuestion}
      />

      {/* Directions Modal */}
      <DirectionsModal
        isOpen={isDirectionsOpen}
        onClose={() => setIsDirectionsOpen(false)}
        subjectTitle={subject.title}
      />

      {/* AI Tutor Modal */}
      <AITutorModal 
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        question={currentQuestion}
      />
    </div>
  );
}

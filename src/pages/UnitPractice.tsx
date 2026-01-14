import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { QuestionCard } from '@/components/QuestionCard';
import { AITutorModal } from '@/components/AITutorModal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProgressBar } from '@/components/ProgressBar';
import { subjects, sampleQuestions, type Question } from '@/data/subjects';
import { ChevronLeft, Filter, Shuffle } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function UnitPractice() {
  const { unitId } = useParams();
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | undefined>();
  const [questionIndex, setQuestionIndex] = useState(0);

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

  if (!unit || !subject) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Unit not found</h1>
          <Link to="/subjects">
            <Button>Back to Subjects</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Filter questions based on unit (using sample questions for demo)
  const unitQuestions = sampleQuestions.filter(q => 
    q.unitId === unitId || q.unitId.startsWith(subject.id.split('-')[1].slice(0, 4))
  );

  const filteredQuestions = unitQuestions.filter(q =>
    selectedDifficulty === 'all' || q.difficulty === selectedDifficulty
  );

  const handleAIHelp = (question: Question) => {
    setCurrentQuestion(question);
    setIsAIModalOpen(true);
  };

  const handleNextQuestion = () => {
    setQuestionIndex((prev) => (prev + 1) % filteredQuestions.length);
  };

  const handleShuffle = () => {
    setQuestionIndex(Math.floor(Math.random() * filteredQuestions.length));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link 
          to={`/subjects/${subject.id}`} 
          className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to {subject.shortTitle}
        </Link>

        {/* Unit Header */}
        <div className="glass-card p-6 mb-8 animate-fade-up">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <Badge variant="secondary" className="mb-2">
                {subject.icon} {subject.shortTitle}
              </Badge>
              <h1 className="text-2xl font-bold mb-2">{unit.title}</h1>
              <p className="text-muted-foreground">{unit.description}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Progress</div>
                <div className="text-xl font-bold text-primary">{unit.progress}%</div>
              </div>
              <div className="w-24">
                <ProgressBar progress={unit.progress} />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Filter:</span>
          </div>
          
          <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Difficulties</SelectItem>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm" onClick={handleShuffle} className="gap-2">
            <Shuffle className="h-4 w-4" />
            Shuffle
          </Button>

          <div className="ml-auto text-sm text-muted-foreground">
            Question {questionIndex + 1} of {filteredQuestions.length}
          </div>
        </div>

        {/* Question Display */}
        {filteredQuestions.length > 0 ? (
          <div className="max-w-3xl mx-auto">
            <QuestionCard 
              question={filteredQuestions[questionIndex]} 
              onAIHelp={handleAIHelp}
            />
            
            <div className="flex justify-center mt-6">
              <Button onClick={handleNextQuestion} variant="outline" className="gap-2">
                Next Question
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 glass-card">
            <p className="text-muted-foreground mb-4">
              No questions available for this unit yet. Check back soon!
            </p>
            <Link to={`/subjects/${subject.id}`}>
              <Button variant="outline">Back to Units</Button>
            </Link>
          </div>
        )}

        {/* AI Tutor Modal */}
        <AITutorModal 
          isOpen={isAIModalOpen}
          onClose={() => setIsAIModalOpen(false)}
          question={currentQuestion}
        />
      </main>
    </div>
  );
}

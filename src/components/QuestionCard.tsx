import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Check, X, ChevronDown, ChevronUp } from 'lucide-react';
import type { Question } from '@/data/subjects';

interface QuestionCardProps {
  question: Question;
  onAIHelp?: (question: Question) => void;
}

export function QuestionCard({ question, onAIHelp }: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      setShowResult(true);
    }
  };

  const handleReset = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setShowExplanation(false);
  };

  const isCorrect = selectedAnswer === question.correctAnswer;

  const difficultyColors = {
    easy: 'bg-success/10 text-success border-success/20',
    medium: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    hard: 'bg-destructive/10 text-destructive border-destructive/20',
  };

  return (
    <div className="glass-card p-6 animate-scale-in">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <Badge variant="outline" className={difficultyColors[question.difficulty]}>
          {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
        </Badge>
        <Badge variant="secondary" className="text-xs">
          {question.topic}
        </Badge>
      </div>

      {/* Question */}
      <p className="text-lg font-medium mb-6">{question.text}</p>

      {/* Choices */}
      <div className="space-y-3 mb-6">
        {question.choices.map((choice, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrectAnswer = index === question.correctAnswer;
          
          let choiceStyle = 'border-border hover:border-primary/50 hover:bg-primary/5';
          
          if (showResult) {
            if (isCorrectAnswer) {
              choiceStyle = 'border-success bg-success/10';
            } else if (isSelected && !isCorrectAnswer) {
              choiceStyle = 'border-destructive bg-destructive/10';
            }
          } else if (isSelected) {
            choiceStyle = 'border-primary bg-primary/10';
          }

          return (
            <button
              key={index}
              onClick={() => !showResult && setSelectedAnswer(index)}
              disabled={showResult}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all ${choiceStyle} ${!showResult && 'cursor-pointer'}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium ${
                  showResult && isCorrectAnswer 
                    ? 'bg-success text-success-foreground' 
                    : showResult && isSelected && !isCorrectAnswer
                    ? 'bg-destructive text-destructive-foreground'
                    : isSelected 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted'
                }`}>
                  {showResult && isCorrectAnswer ? (
                    <Check className="h-4 w-4" />
                  ) : showResult && isSelected && !isCorrectAnswer ? (
                    <X className="h-4 w-4" />
                  ) : (
                    String.fromCharCode(65 + index)
                  )}
                </div>
                <span>{choice}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        {!showResult ? (
          <>
            <Button 
              onClick={handleSubmit} 
              disabled={selectedAnswer === null}
              className="flex-1"
            >
              Submit Answer
            </Button>
            <Button 
              variant="outline" 
              onClick={() => onAIHelp?.(question)}
              className="gap-2"
            >
              <Sparkles className="h-4 w-4" />
              I'm Stuck
            </Button>
          </>
        ) : (
          <>
            <Button onClick={handleReset} variant="outline" className="flex-1">
              Try Another
            </Button>
            <Button
              variant="ghost"
              onClick={() => setShowExplanation(!showExplanation)}
              className="gap-2"
            >
              {showExplanation ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              Explanation
            </Button>
          </>
        )}
      </div>

      {/* Result Message */}
      {showResult && (
        <div className={`mt-4 p-4 rounded-xl ${isCorrect ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>
          <p className="font-medium">
            {isCorrect ? '🎉 Correct! Great job!' : '❌ Not quite. Keep practicing!'}
          </p>
        </div>
      )}

      {/* Explanation */}
      {showExplanation && (
        <div className="mt-4 p-4 rounded-xl bg-muted/50 animate-fade-up">
          <h4 className="font-semibold mb-2">Explanation</h4>
          <p className="text-muted-foreground">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}

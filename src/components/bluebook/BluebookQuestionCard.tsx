import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Check, X, Lightbulb, Sparkles } from 'lucide-react';
import type { Question } from '@/data/subjects';

interface BluebookQuestionCardProps {
  question: Question;
  questionNumber: number;
  onAIHelp?: (question: Question) => void;
  onAnswered?: (correct: boolean) => void;
  showPassage?: boolean;
  passage?: string;
}

export function BluebookQuestionCard({
  question,
  questionNumber,
  onAIHelp,
  onAnswered,
  showPassage = false,
  passage,
}: BluebookQuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasChecked, setHasChecked] = useState(false);
  const [eliminatedChoices, setEliminatedChoices] = useState<Set<number>>(new Set());
  const [eliminatorMode, setEliminatorMode] = useState(false);

  const isCorrect = selectedAnswer === question.correctAnswer;

  const handleChoiceClick = (index: number) => {
    if (hasChecked) return;

    if (eliminatorMode) {
      toggleEliminated(index);
    } else {
      setSelectedAnswer(index);
    }
  };

  const handleContextMenu = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    if (!hasChecked) {
      toggleEliminated(index);
    }
  };

  const toggleEliminated = (index: number) => {
    setEliminatedChoices(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
        // Deselect if eliminated
        if (selectedAnswer === index) {
          setSelectedAnswer(null);
        }
      }
      return newSet;
    });
  };

  const handleCheckAnswer = () => {
    if (selectedAnswer !== null) {
      setHasChecked(true);
      onAnswered?.(isCorrect);
    }
  };

  const handleReset = useCallback(() => {
    setSelectedAnswer(null);
    setHasChecked(false);
    setEliminatedChoices(new Set());
  }, []);

  const getChoiceStyle = (index: number) => {
    const isSelected = selectedAnswer === index;
    const isCorrectAnswer = index === question.correctAnswer;
    const isEliminated = eliminatedChoices.has(index);

    if (hasChecked) {
      if (isCorrectAnswer) {
        return 'border-green-500 bg-green-50 dark:bg-green-900/20';
      }
      if (isSelected && !isCorrectAnswer) {
        return 'border-red-500 bg-red-50 dark:bg-red-900/20';
      }
      return 'border-border opacity-50';
    }

    if (isEliminated) {
      return 'border-border opacity-40';
    }

    if (isSelected) {
      return 'border-bluebook-blue bg-bluebook-blue/10';
    }

    return 'border-border hover:border-bluebook-blue/50 hover:bg-muted/50';
  };

  const getChoiceLabelStyle = (index: number) => {
    const isSelected = selectedAnswer === index;
    const isCorrectAnswer = index === question.correctAnswer;

    if (hasChecked) {
      if (isCorrectAnswer) {
        return 'bg-green-500 text-white';
      }
      if (isSelected && !isCorrectAnswer) {
        return 'bg-red-500 text-white';
      }
      return 'bg-muted text-muted-foreground';
    }

    if (isSelected) {
      return 'bg-bluebook-blue text-white';
    }

    return 'bg-muted text-foreground';
  };

  return (
    <div className={`flex flex-col lg:flex-row gap-6 ${showPassage ? 'lg:divide-x lg:divide-border' : ''}`}>
      {/* Passage Column (if applicable) */}
      {showPassage && passage && (
        <div className="lg:w-1/2 lg:pr-6">
          <div className="bg-muted/30 rounded-lg p-6 h-full overflow-y-auto max-h-[60vh]">
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide text-muted-foreground">
              Passage
            </h3>
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <p className="whitespace-pre-wrap leading-relaxed">{passage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Question Column */}
      <div className={`${showPassage && passage ? 'lg:w-1/2 lg:pl-6' : 'w-full max-w-3xl mx-auto'}`}>
        {/* Question Number & Text */}
        <div className="mb-6">
          <div className="text-sm font-medium text-muted-foreground mb-2">
            Question {questionNumber}
          </div>
          <p className="text-lg leading-relaxed">{question.text}</p>
        </div>

        {/* Eliminator Toggle */}
        <div className="flex items-center justify-between mb-4">
          <Button
            variant={eliminatorMode ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setEliminatorMode(!eliminatorMode)}
            className="text-xs gap-1.5"
          >
            <span className={eliminatorMode ? 'line-through' : ''}>ABC</span>
            Eliminator {eliminatorMode ? 'On' : 'Off'}
          </Button>
          
          {eliminatedChoices.size > 0 && !hasChecked && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setEliminatedChoices(new Set())}
              className="text-xs text-muted-foreground"
            >
              Clear eliminated
            </Button>
          )}
        </div>

        {/* Answer Choices */}
        <div className="space-y-3 mb-6">
          {question.choices.map((choice, index) => {
            const isEliminated = eliminatedChoices.has(index);
            const isSelected = selectedAnswer === index;
            const isCorrectAnswer = index === question.correctAnswer;

            return (
              <button
                key={index}
                onClick={() => handleChoiceClick(index)}
                onContextMenu={(e) => handleContextMenu(e, index)}
                disabled={hasChecked || (eliminatorMode && isEliminated)}
                className={`
                  w-full p-4 rounded-lg border-2 text-left transition-all duration-200
                  ${getChoiceStyle(index)}
                  ${!hasChecked && !isEliminated ? 'cursor-pointer' : ''}
                  ${isEliminated && !hasChecked ? 'cursor-pointer' : ''}
                `}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0
                      ${getChoiceLabelStyle(index)}
                    `}
                  >
                    {hasChecked && isCorrectAnswer ? (
                      <Check className="h-4 w-4" />
                    ) : hasChecked && isSelected && !isCorrectAnswer ? (
                      <X className="h-4 w-4" />
                    ) : (
                      String.fromCharCode(65 + index)
                    )}
                  </div>
                  <span className={`pt-1 ${isEliminated ? 'line-through text-muted-foreground' : ''}`}>
                    {choice}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          {!hasChecked ? (
            <Button
              onClick={handleCheckAnswer}
              disabled={selectedAnswer === null}
              className="bg-bluebook-blue hover:bg-bluebook-blue/90 text-white"
            >
              Check Answer
            </Button>
          ) : (
            <Button onClick={handleReset} variant="outline">
              Try Again
            </Button>
          )}

          <Button
            variant="outline"
            onClick={() => onAIHelp?.(question)}
            className="gap-2"
          >
            <Sparkles className="h-4 w-4" />
            AI Help
          </Button>
        </div>

        {/* Explanation (only after checking) */}
        {hasChecked && (
          <div className="mt-6 animate-fade-in">
            {/* Result Banner */}
            <div
              className={`p-4 rounded-lg mb-4 ${
                isCorrect
                  ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                  : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
              }`}
            >
              <div className="flex items-center gap-2">
                {isCorrect ? (
                  <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                ) : (
                  <X className="h-5 w-5 text-red-600 dark:text-red-400" />
                )}
                <span
                  className={`font-medium ${
                    isCorrect
                      ? 'text-green-700 dark:text-green-300'
                      : 'text-red-700 dark:text-red-300'
                  }`}
                >
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </span>
              </div>
            </div>

            {/* Explanation Box */}
            <div className="p-4 rounded-lg bg-muted/50 border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="h-4 w-4 text-amber-500" />
                <h4 className="font-semibold text-sm">Explanation</h4>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {question.explanation}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Check, X, Lightbulb, Sparkles, Strikethrough } from 'lucide-react';
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

  // Reset state when question changes
  useEffect(() => {
    setSelectedAnswer(null);
    setHasChecked(false);
    setEliminatedChoices(new Set());
    setEliminatorMode(false);
  }, [question.id]);

  const isCorrect = selectedAnswer === question.correctAnswer;

  const handleChoiceClick = (index: number) => {
    if (hasChecked) return;

    if (eliminatorMode) {
      toggleEliminated(index);
    } else {
      if (!eliminatedChoices.has(index)) {
        setSelectedAnswer(index);
      }
    }
  };

  const toggleEliminated = (index: number) => {
    setEliminatedChoices(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
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

  return (
    <div className={`flex flex-col lg:flex-row gap-8 ${showPassage ? 'lg:divide-x lg:divide-border' : ''}`}>
      {/* Passage Column (if applicable) */}
      {showPassage && passage && (
        <div className="lg:w-1/2 lg:pr-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6 h-full overflow-y-auto max-h-[70vh] shadow-sm">
            <h3 className="font-semibold mb-4 text-xs uppercase tracking-widest text-gray-500">
              Passage
            </h3>
            <div className="prose prose-sm max-w-none text-gray-800 leading-relaxed">
              <p className="whitespace-pre-wrap">{passage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Question Column */}
      <div className={`${showPassage && passage ? 'lg:w-1/2 lg:pl-8' : 'w-full max-w-3xl mx-auto'}`}>
        {/* Question Card */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          {/* Question Header with Eliminator Toggle */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <span className="text-sm font-semibold text-gray-600">
              Question {questionNumber}
            </span>
            <Button
              variant={eliminatorMode ? 'default' : 'outline'}
              size="sm"
              onClick={() => setEliminatorMode(!eliminatorMode)}
              className={`gap-2 text-xs ${
                eliminatorMode 
                  ? 'bg-bluebook-navy hover:bg-bluebook-navy-light text-white' 
                  : 'border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Strikethrough className="h-3.5 w-3.5" />
              Strikethrough
            </Button>
          </div>

          {/* Question Text */}
          <div className="px-6 py-5">
            <p className="text-base leading-relaxed text-gray-900">{question.text}</p>
          </div>

          {/* Answer Choices */}
          <div className="px-6 pb-6 space-y-3">
            {question.choices.map((choice, index) => {
              const isEliminated = eliminatedChoices.has(index);
              const isSelected = selectedAnswer === index;
              const isCorrectAnswer = index === question.correctAnswer;

              // Determine styling based on state
              let containerStyle = 'border-gray-200 bg-white hover:border-gray-300';
              let circleStyle = 'border-gray-300 bg-white text-gray-700';
              
              if (hasChecked) {
                if (isCorrectAnswer) {
                  containerStyle = 'border-green-500 bg-green-50';
                  circleStyle = 'border-green-500 bg-green-500 text-white';
                } else if (isSelected && !isCorrectAnswer) {
                  containerStyle = 'border-red-500 bg-red-50';
                  circleStyle = 'border-red-500 bg-red-500 text-white';
                } else {
                  containerStyle = 'border-gray-200 bg-gray-50 opacity-60';
                  circleStyle = 'border-gray-300 bg-gray-100 text-gray-400';
                }
              } else if (isSelected) {
                containerStyle = 'border-bluebook-blue border-2 bg-blue-50';
                circleStyle = 'border-bluebook-blue bg-bluebook-blue text-white';
              } else if (isEliminated) {
                containerStyle = 'border-gray-200 bg-gray-50 opacity-40';
                circleStyle = 'border-gray-300 bg-gray-100 text-gray-400';
              }

              return (
                <button
                  key={index}
                  onClick={() => handleChoiceClick(index)}
                  disabled={hasChecked}
                  className={`
                    w-full p-4 rounded-lg border text-left transition-all duration-150
                    ${containerStyle}
                    ${!hasChecked && !isEliminated ? 'cursor-pointer' : ''}
                    ${eliminatorMode && !hasChecked ? 'cursor-crosshair' : ''}
                  `}
                >
                  <div className="flex items-start gap-4">
                    {/* Choice Circle */}
                    <div
                      className={`
                        w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0
                        border-2 transition-all duration-150
                        ${circleStyle}
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
                    
                    {/* Choice Text */}
                    <span 
                      className={`
                        pt-1.5 text-sm leading-relaxed
                        ${isEliminated ? 'line-through text-gray-400' : 'text-gray-800'}
                      `}
                    >
                      {choice}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Action Bar */}
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 rounded-b-lg">
            <div className="flex items-center gap-3">
              {!hasChecked ? (
                <Button
                  onClick={handleCheckAnswer}
                  disabled={selectedAnswer === null}
                  className="bg-bluebook-blue hover:bg-bluebook-blue/90 text-white font-medium px-6"
                >
                  Check Answer
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setSelectedAnswer(null);
                    setHasChecked(false);
                    setEliminatedChoices(new Set());
                  }}
                  variant="outline"
                  className="border-gray-300"
                >
                  Try Again
                </Button>
              )}

              <Button
                variant="ghost"
                onClick={() => onAIHelp?.(question)}
                className="gap-2 text-gray-600 hover:text-gray-900"
              >
                <Sparkles className="h-4 w-4" />
                AI Help
              </Button>
            </div>
          </div>
        </div>

        {/* Explanation (only after checking) */}
        {hasChecked && (
          <div className="mt-4 animate-fade-in">
            {/* Result Banner */}
            <div
              className={`p-4 rounded-lg border ${
                isCorrect
                  ? 'bg-green-50 border-green-200'
                  : 'bg-red-50 border-red-200'
              }`}
            >
              <div className="flex items-center gap-2">
                {isCorrect ? (
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                    <X className="h-4 w-4 text-white" />
                  </div>
                )}
                <span className={`font-semibold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </span>
              </div>
            </div>

            {/* Explanation Box */}
            <div className="mt-3 p-4 rounded-lg bg-white border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center">
                  <Lightbulb className="h-3.5 w-3.5 text-amber-600" />
                </div>
                <h4 className="font-semibold text-sm text-gray-900">Explanation</h4>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {question.explanation}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

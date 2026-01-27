import { Flag, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BluebookHeaderProps {
  subjectTitle: string;
  unitTitle: string;
  currentQuestion: number;
  totalQuestions: number;
  isMarkedForReview: boolean;
  onToggleMarkReview: () => void;
  onShowDirections: () => void;
}

export function BluebookHeader({
  subjectTitle,
  unitTitle,
  currentQuestion,
  totalQuestions,
  isMarkedForReview,
  onToggleMarkReview,
  onShowDirections,
}: BluebookHeaderProps) {
  return (
    <header className="bg-bluebook-navy">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left: Subject & Unit */}
        <div className="flex items-center gap-4">
          <div>
            <div className="text-[11px] text-gray-400 uppercase tracking-widest font-medium">
              {subjectTitle}
            </div>
            <div className="text-sm font-medium text-white">{unitTitle}</div>
          </div>
        </div>

        {/* Center: Question Counter */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden md:block">
          <div className="text-sm font-medium text-white">
            Question {currentQuestion} of {totalQuestions}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={onShowDirections}
            className="gap-2 text-white hover:bg-white/10 hover:text-white"
          >
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline text-sm">Directions</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleMarkReview}
            className={`gap-2 hover:bg-white/10 ${
              isMarkedForReview 
                ? 'text-orange-400 hover:text-orange-400' 
                : 'text-white hover:text-white'
            }`}
          >
            <Flag
              className={`h-4 w-4 ${isMarkedForReview ? 'fill-orange-400' : ''}`}
            />
            <span className="hidden sm:inline text-sm">
              {isMarkedForReview ? 'Marked' : 'Mark for Review'}
            </span>
          </Button>
        </div>
      </div>

      {/* Mobile Question Counter */}
      <div className="md:hidden text-center pb-2 text-sm text-gray-400">
        Question {currentQuestion} of {totalQuestions}
      </div>
    </header>
  );
}

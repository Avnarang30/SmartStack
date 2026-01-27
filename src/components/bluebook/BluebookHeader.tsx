import { Flag, FileText, MoreHorizontal } from 'lucide-react';
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
    <header className="bg-bluebook-navy text-white">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left: Subject & Unit */}
        <div className="flex items-center gap-4">
          <div>
            <div className="text-xs text-bluebook-gray uppercase tracking-wide">
              {subjectTitle}
            </div>
            <div className="text-sm font-medium">{unitTitle}</div>
          </div>
        </div>

        {/* Center: Question Counter */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden md:block">
          <div className="text-sm font-medium">
            Question {currentQuestion} of {totalQuestions}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleMarkReview}
            className={`gap-2 text-white hover:bg-white/10 ${
              isMarkedForReview ? 'bg-white/20' : ''
            }`}
          >
            <Flag
              className={`h-4 w-4 ${isMarkedForReview ? 'fill-orange-400 text-orange-400' : ''}`}
            />
            <span className="hidden sm:inline">Mark for Review</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onShowDirections}
            className="gap-2 text-white hover:bg-white/10"
          >
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Directions</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Mobile Question Counter */}
      <div className="md:hidden text-center pb-2 text-sm text-bluebook-gray">
        Question {currentQuestion} of {totalQuestions}
      </div>
    </header>
  );
}

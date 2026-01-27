import { ChevronLeft, ChevronRight, Grid3X3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BluebookBottomNavProps {
  currentQuestion: number;
  totalQuestions: number;
  onPrevious: () => void;
  onNext: () => void;
  onOpenQuestionMenu: () => void;
  canGoBack: boolean;
  canGoForward: boolean;
}

export function BluebookBottomNav({
  currentQuestion,
  totalQuestions,
  onPrevious,
  onNext,
  onOpenQuestionMenu,
  canGoBack,
  canGoForward,
}: BluebookBottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-bluebook-navy border-t border-bluebook-navy-light z-50">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={onPrevious}
          disabled={!canGoBack}
          className="gap-2 text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="hidden sm:inline">Back</span>
        </Button>

        {/* Center: Question Menu Button */}
        <Button
          variant="outline"
          onClick={onOpenQuestionMenu}
          className="gap-2 bg-transparent border-bluebook-gray/40 text-white hover:bg-white/10 hover:border-white/50"
        >
          <Grid3X3 className="h-4 w-4" />
          Question {currentQuestion} of {totalQuestions}
        </Button>

        {/* Next Button */}
        <Button
          variant="ghost"
          onClick={onNext}
          disabled={!canGoForward}
          className="gap-2 text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </nav>
  );
}

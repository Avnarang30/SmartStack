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
    <nav className="fixed bottom-0 left-0 right-0 bg-bluebook-navy z-50">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left: Empty for balance */}
        <div className="w-24" />

        {/* Center: Question Menu Button */}
        <Button
          variant="outline"
          onClick={onOpenQuestionMenu}
          className="gap-2 bg-transparent border-gray-500 text-white hover:bg-white/10 hover:text-white hover:border-gray-400"
        >
          <Grid3X3 className="h-4 w-4" />
          <span className="text-sm">Question {currentQuestion} of {totalQuestions}</span>
        </Button>

        {/* Right: Navigation Buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onPrevious}
            disabled={!canGoBack}
            className="gap-1 text-white hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:text-white"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline text-sm">Back</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onNext}
            disabled={!canGoForward}
            className="gap-1 text-white hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:text-white"
          >
            <span className="hidden sm:inline text-sm">Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </nav>
  );
}

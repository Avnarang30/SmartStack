import { X, Flag, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface QuestionStatus {
  answered: boolean;
  correct?: boolean;
  markedForReview: boolean;
}

interface QuestionGridModalProps {
  isOpen: boolean;
  onClose: () => void;
  questionStatuses: QuestionStatus[];
  currentQuestion: number;
  onSelectQuestion: (index: number) => void;
}

export function QuestionGridModal({
  isOpen,
  onClose,
  questionStatuses,
  currentQuestion,
  onSelectQuestion,
}: QuestionGridModalProps) {
  const handleSelect = (index: number) => {
    onSelectQuestion(index);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-bluebook-navy border-none text-white">
        <DialogHeader className="border-b border-white/10 pb-4">
          <DialogTitle className="text-white flex items-center justify-between">
            <span className="text-lg font-semibold">Question Navigator</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/10 hover:text-white -mr-2"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 text-xs text-gray-400 py-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded border border-gray-500 bg-transparent" />
            <span>Unanswered</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-bluebook-answered flex items-center justify-center">
              <Check className="h-3 w-3 text-white" />
            </div>
            <span>Answered</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded border-2 border-orange-400 flex items-center justify-center">
              <Flag className="h-3 w-3 text-orange-400 fill-orange-400" />
            </div>
            <span>For Review</span>
          </div>
        </div>

        {/* Question Grid */}
        <div className="grid grid-cols-6 gap-2 max-h-[280px] overflow-y-auto py-2">
          {questionStatuses.map((status, index) => {
            const isCurrent = index === currentQuestion - 1;
            
            return (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                className={`
                  relative w-10 h-10 rounded flex items-center justify-center text-sm font-semibold
                  transition-all duration-150 hover:scale-105
                  ${isCurrent ? 'ring-2 ring-white ring-offset-2 ring-offset-bluebook-navy' : ''}
                  ${status.answered 
                    ? 'bg-bluebook-answered text-white' 
                    : 'bg-transparent border border-gray-500 text-white hover:bg-white/10'
                  }
                  ${status.markedForReview ? 'border-2 !border-orange-400' : ''}
                `}
              >
                {index + 1}
                {status.markedForReview && (
                  <Flag className="absolute -top-1 -right-1 h-3 w-3 text-orange-400 fill-orange-400" />
                )}
              </button>
            );
          })}
        </div>

        {/* Summary */}
        <div className="pt-4 border-t border-white/10 text-sm text-gray-400">
          <div className="flex justify-between">
            <span>Answered: {questionStatuses.filter(s => s.answered).length}</span>
            <span>For Review: {questionStatuses.filter(s => s.markedForReview).length}</span>
            <span>Remaining: {questionStatuses.filter(s => !s.answered).length}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

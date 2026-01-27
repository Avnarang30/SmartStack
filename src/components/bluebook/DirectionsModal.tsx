import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface DirectionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  subjectTitle: string;
}

export function DirectionsModal({ isOpen, onClose, subjectTitle }: DirectionsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Directions</span>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 text-sm text-muted-foreground">
          <p>
            <strong className="text-foreground">{subjectTitle}</strong> — Multiple Choice Questions
          </p>

          <div className="space-y-3">
            <p>
              <strong className="text-foreground">Answering Questions:</strong> Select the best answer from the options provided. You may change your answer at any time before submitting.
            </p>

            <p>
              <strong className="text-foreground">Check Answer:</strong> Click the "Check Answer" button to see if your selection is correct. The explanation will appear after checking.
            </p>

            <p>
              <strong className="text-foreground">Mark for Review:</strong> Use the flag icon to mark questions you want to revisit. Marked questions are highlighted in the Question Navigator.
            </p>

            <p>
              <strong className="text-foreground">Eliminator Tool:</strong> Right-click or long-press on any answer choice to cross it out. This helps you eliminate wrong answers. Click again to restore.
            </p>

            <p>
              <strong className="text-foreground">Navigation:</strong> Use the Back and Next buttons or the Question Navigator (grid icon) to move between questions.
            </p>
          </div>

          <div className="pt-4 border-t">
            <Button onClick={onClose} className="w-full">
              Got it
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

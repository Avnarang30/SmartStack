import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Lightbulb, BookOpen, HelpCircle, Loader2 } from 'lucide-react';
import type { Question } from '@/data/subjects';

interface AITutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  question?: Question;
}

// Placeholder for Gemini API integration
async function getAIExplanation(question: Question, studentAttempt?: string): Promise<{
  hint: string;
  explanation: string;
  conceptReview: string;
}> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Placeholder response - replace with actual Gemini API call
  return {
    hint: `Think about the relationship between ${question.topic.toLowerCase()} and how it applies to this problem. Consider what happens when you analyze each option carefully.`,
    explanation: question.explanation,
    conceptReview: `This question tests your understanding of ${question.topic}. Key concepts to remember:\n\n1. Always identify what the question is really asking\n2. Eliminate obviously incorrect answers first\n3. Use your knowledge of ${question.topic} to find the best answer`,
  };
}

export function AITutorModal({ isOpen, onClose, question }: AITutorModalProps) {
  const [studentAttempt, setStudentAttempt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<{
    hint: string;
    explanation: string;
    conceptReview: string;
  } | null>(null);
  const [activeTab, setActiveTab] = useState<'hint' | 'explanation' | 'concept'>('hint');

  const handleGetHelp = async () => {
    if (!question) return;
    
    setIsLoading(true);
    try {
      const result = await getAIExplanation(question, studentAttempt);
      setResponse(result);
    } catch (error) {
      console.error('Error getting AI explanation:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setStudentAttempt('');
    setResponse(null);
    setActiveTab('hint');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span>AI Tutor</span>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-4">
          {/* Question Display */}
          {question && (
            <div className="p-4 rounded-xl bg-muted/50 border border-border">
              <p className="font-medium">{question.text}</p>
            </div>
          )}

          {!response ? (
            <>
              {/* Student Attempt Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Your thinking (optional)</label>
                <Textarea
                  placeholder="What have you tried? What's confusing you?"
                  value={studentAttempt}
                  onChange={(e) => setStudentAttempt(e.target.value)}
                  rows={3}
                />
              </div>

              <Button 
                onClick={handleGetHelp} 
                disabled={isLoading} 
                className="w-full gap-2"
                variant="hero"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Getting Help...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Get AI Help
                  </>
                )}
              </Button>
            </>
          ) : (
            <>
              {/* Tabs */}
              <div className="flex gap-2 border-b border-border pb-2">
                {[
                  { id: 'hint', label: 'Hint', icon: Lightbulb },
                  { id: 'explanation', label: 'Step-by-Step', icon: HelpCircle },
                  { id: 'concept', label: 'Concept Review', icon: BookOpen },
                ].map((tab) => (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => setActiveTab(tab.id as any)}
                    className="gap-1.5"
                  >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                  </Button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-4 rounded-xl bg-secondary/50 min-h-[150px] animate-fade-in">
                {activeTab === 'hint' && (
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Lightbulb className="h-4 w-4 text-amber-500" />
                      Hint
                    </h4>
                    <p className="text-muted-foreground">{response.hint}</p>
                  </div>
                )}
                {activeTab === 'explanation' && (
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <HelpCircle className="h-4 w-4 text-primary" />
                      Step-by-Step Explanation
                    </h4>
                    <p className="text-muted-foreground whitespace-pre-line">{response.explanation}</p>
                  </div>
                )}
                {activeTab === 'concept' && (
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-success" />
                      Concept Review
                    </h4>
                    <p className="text-muted-foreground whitespace-pre-line">{response.conceptReview}</p>
                  </div>
                )}
              </div>

              <Button variant="outline" onClick={() => setResponse(null)} className="w-full">
                Ask Another Question
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

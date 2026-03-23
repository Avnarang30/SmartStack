import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Lightbulb, BookOpen, HelpCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import type { CsvQuestion } from '@/hooks/useCsvQuestions';

interface AITutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  question?: CsvQuestion;
}

export function AITutorModal({ isOpen, onClose, question }: AITutorModalProps) {
  const [studentAttempt, setStudentAttempt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMode, setLoadingMode] = useState<string | null>(null);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<'hint' | 'explanation' | 'concept'>('hint');

  const fetchMode = async (mode: string) => {
    if (!question || responses[mode]) return;
    setLoadingMode(mode);
    try {
      const { data, error } = await supabase.functions.invoke('ai-tutor', {
        body: { question: question.text, choices: question.choices, studentAttempt, mode },
      });
      if (error) throw error;
      setResponses(prev => ({ ...prev, [mode]: data.content }));
    } catch (err) {
      console.error('AI tutor error:', err);
      setResponses(prev => ({ ...prev, [mode]: 'Sorry, an error occurred. Please try again.' }));
    } finally {
      setLoadingMode(null);
    }
  };

  const handleGetHelp = async () => {
    if (!question) return;
    setIsLoading(true);
    await fetchMode('hint');
    setIsLoading(false);
  };

  const handleTabChange = (tab: 'hint' | 'explanation' | 'concept') => {
    setActiveTab(tab);
    fetchMode(tab);
  };

  const handleClose = () => {
    setStudentAttempt('');
    setResponses({});
    setActiveTab('hint');
    setLoadingMode(null);
    onClose();
  };

  const hasAnyResponse = Object.keys(responses).length > 0;

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
          {question && (
            <div className="p-4 rounded-xl bg-muted/50 border border-border">
              <p className="font-medium">{question.text}</p>
            </div>
          )}

          {!hasAnyResponse ? (
            <>
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
              <div className="flex gap-2 border-b border-border pb-2">
                {[
                  { id: 'hint' as const, label: 'Hint', icon: Lightbulb },
                  { id: 'explanation' as const, label: 'Step-by-Step', icon: HelpCircle },
                  { id: 'concept' as const, label: 'Concept Review', icon: BookOpen },
                ].map((tab) => (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => handleTabChange(tab.id)}
                    className="gap-1.5"
                  >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                  </Button>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-secondary/50 min-h-[150px] animate-fade-in">
                {loadingMode === activeTab ? (
                  <div className="flex items-center justify-center h-[150px]">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <>
                    {activeTab === 'hint' && responses.hint && (
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Lightbulb className="h-4 w-4 text-amber-500" />
                          Hint
                        </h4>
                        <p className="text-muted-foreground whitespace-pre-line">{responses.hint}</p>
                      </div>
                    )}
                    {activeTab === 'explanation' && responses.explanation && (
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <HelpCircle className="h-4 w-4 text-primary" />
                          Step-by-Step Explanation
                        </h4>
                        <p className="text-muted-foreground whitespace-pre-line">{responses.explanation}</p>
                      </div>
                    )}
                    {activeTab === 'concept' && responses.concept && (
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-green-500" />
                          Concept Review
                        </h4>
                        <p className="text-muted-foreground whitespace-pre-line">{responses.concept}</p>
                      </div>
                    )}
                  </>
                )}
              </div>

              <Button variant="outline" onClick={() => { setResponses({}); setStudentAttempt(''); }} className="w-full">
                Ask Another Question
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

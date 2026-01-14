import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { subjects } from '@/data/subjects';
import { 
  Sparkles, 
  Send, 
  Lightbulb, 
  BookOpen, 
  HelpCircle,
  Loader2,
  MessageCircle,
  Bot
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function AITutor() {
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const quickPrompts = [
    'Explain this concept step by step',
    'Give me a practice problem',
    'What are common mistakes to avoid?',
    'How does this relate to real life?',
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response (placeholder for Gemini API)
    await new Promise(resolve => setTimeout(resolve, 1500));

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: `Great question! Let me help you understand this better.\n\nBased on your question about "${inputMessage.slice(0, 50)}...", here's a detailed explanation:\n\n1. **Key Concept**: This relates to fundamental principles in ${selectedSubject ? subjects.find(s => s.id === selectedSubject)?.title || 'your subject' : 'AP studies'}.\n\n2. **Step-by-Step Breakdown**:\n   - First, consider the underlying theory\n   - Then, apply it to specific examples\n   - Finally, practice with similar problems\n\n3. **Pro Tip**: Focus on understanding the "why" behind each step, not just the "how".\n\nWould you like me to provide a practice problem to test your understanding?`,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  const handleQuickPrompt = (prompt: string) => {
    setInputMessage(prompt);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 animate-fade-up">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold">AI Tutor</h1>
            </div>
            <p className="text-muted-foreground">
              Get instant help with any AP concept. Ask questions, get explanations, and practice problems.
            </p>
          </div>

          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map(subject => (
                <SelectItem key={subject.id} value={subject.id}>
                  {subject.icon} {subject.shortTitle}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Chat Container */}
        <div className="flex-1 glass-card flex flex-col overflow-hidden animate-fade-up" style={{ animationDelay: '0.1s' }}>
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center mb-6 animate-float">
                  <Bot className="h-10 w-10 text-primary-foreground" />
                </div>
                <h2 className="text-xl font-semibold mb-2">How can I help you today?</h2>
                <p className="text-muted-foreground max-w-md mb-8">
                  Ask me anything about your AP subjects. I can explain concepts, solve problems, 
                  and help you prepare for your exams.
                </p>

                {/* Quick Prompts */}
                <div className="flex flex-wrap justify-center gap-2 max-w-lg">
                  {quickPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => handleQuickPrompt(prompt)}
                      className="px-4 py-2 rounded-xl bg-secondary hover:bg-secondary/80 text-sm font-medium transition-colors"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>

                {/* Features */}
                <div className="grid grid-cols-3 gap-4 mt-12 max-w-lg">
                  {[
                    { icon: Lightbulb, label: 'Get Hints' },
                    { icon: BookOpen, label: 'Explanations' },
                    { icon: HelpCircle, label: 'Practice' },
                  ].map((feature) => (
                    <div key={feature.label} className="text-center p-3 rounded-xl bg-muted/30">
                      <feature.icon className="h-5 w-5 mx-auto mb-1 text-primary" />
                      <span className="text-xs text-muted-foreground">{feature.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center shrink-0">
                      <Sparkles className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                  
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    <div className={`text-xs mt-2 ${
                      message.role === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>

                  {message.role === 'user' && (
                    <div className="w-8 h-8 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                      <MessageCircle className="h-4 w-4 text-secondary-foreground" />
                    </div>
                  )}
                </div>
              ))
            )}

            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="bg-muted rounded-2xl p-4">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-muted-foreground">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-border p-4">
            <div className="flex gap-3">
              <Textarea
                placeholder="Ask me anything about your AP subjects..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                className="min-h-[60px] max-h-[150px] resize-none"
                rows={2}
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={!inputMessage.trim() || isLoading}
                className="shrink-0 h-auto"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              AI responses are generated and may not always be accurate. Always verify important information.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

import { useState, useEffect, useRef } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { subjects } from '@/data/subjects';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { 
  Sparkles, 
  Send, 
  Lightbulb, 
  BookOpen, 
  HelpCircle,
  Loader2,
  MessageCircle,
  Bot,
  Plus,
  Trash2,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface Conversation {
  id: string;
  subject_id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export default function AITutor() {
  const { user } = useAuth();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loadingConversations, setLoadingConversations] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load conversations on mount
  useEffect(() => {
    if (!user) { setLoadingConversations(false); return; }
    loadConversations();
  }, [user]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const loadConversations = async () => {
    setLoadingConversations(true);
    const { data } = await supabase
      .from('tutor_conversations')
      .select('*')
      .order('updated_at', { ascending: false });
    setConversations((data as Conversation[]) ?? []);
    setLoadingConversations(false);
  };

  const loadMessages = async (conversationId: string) => {
    const { data } = await supabase
      .from('tutor_messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });
    if (data) {
      setMessages(data.map((m: any) => ({
        id: m.id,
        role: m.role as 'user' | 'assistant',
        content: m.content,
        timestamp: new Date(m.created_at),
      })));
    }
  };

  const selectConversation = async (conv: Conversation) => {
    setActiveConversationId(conv.id);
    setSelectedSubject(conv.subject_id);
    await loadMessages(conv.id);
  };

  const startNewChat = () => {
    setActiveConversationId(null);
    setSelectedSubject(null);
    setMessages([]);
    setInputMessage('');
  };

  const deleteConversation = async (convId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await supabase.from('tutor_conversations').delete().eq('id', convId);
    if (activeConversationId === convId) startNewChat();
    setConversations(prev => prev.filter(c => c.id !== convId));
  };

  const quickPrompts = [
    'Explain this concept step by step',
    'Give me a practice problem',
    'What are common mistakes to avoid?',
    'How does this relate to real life?',
  ];

  const handleSendMessage = async () => {
    const messageText = inputMessage.trim();
    if (!messageText || !selectedSubject || !user) return;

    const subjectObj = subjects.find(s => s.id === selectedSubject);
    const selectedSubjectTitle = subjectObj?.title ?? '';

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Create or reuse conversation
    let convId = activeConversationId;
    if (!convId) {
      const title = messageText.length > 50 ? messageText.slice(0, 50) + '…' : messageText;
      const { data } = await supabase
        .from('tutor_conversations')
        .insert({ user_id: user.id, subject_id: selectedSubject, title })
        .select()
        .single();
      if (data) {
        convId = data.id;
        setActiveConversationId(convId);
        setConversations(prev => [data as Conversation, ...prev]);
      }
    }

    // Persist user message
    if (convId) {
      await supabase.from('tutor_messages').insert({
        conversation_id: convId,
        role: 'user',
        content: messageText,
      });
    }

    try {
      const { data, error } = await supabase.functions.invoke('ai-tutor', {
        body: {
          message: messageText,
          subject: selectedSubjectTitle,
        },
      });

      if (error) throw error;

      const aiContent = data?.content || 'I could not generate a response. Please try again.';

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiContent,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Persist assistant message
      if (convId) {
        await supabase.from('tutor_messages').insert({
          conversation_id: convId,
          role: 'assistant',
          content: aiContent,
        });
        // Update conversation timestamp
        await supabase.from('tutor_conversations').update({ updated_at: new Date().toISOString() }).eq('id', convId);
      }
    } catch (error) {
      console.error('AI Tutor chat error:', error);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I could not process that right now. Please try again in a moment.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    setInputMessage(prompt);
  };

  // Subject selection screen
  if (!selectedSubject && !activeConversationId) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center justify-center max-w-2xl">
          <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center mb-6 animate-float">
            <Bot className="h-10 w-10 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Start a Tutoring Session</h1>
          <p className="text-muted-foreground mb-8 text-center">
            Choose a subject to get started. Your AI tutor will tailor help to the topic you pick.
          </p>

          <div className="grid gap-3 w-full max-w-md">
            {subjects.map(subject => (
              <button
                key={subject.id}
                onClick={() => setSelectedSubject(subject.id)}
                className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:bg-accent/50 transition-colors text-left"
              >
                <span className="text-2xl">{subject.icon}</span>
                <div>
                  <div className="font-semibold">{subject.title}</div>
                  <div className="text-sm text-muted-foreground">{subject.description}</div>
                </div>
              </button>
            ))}
          </div>

          {conversations.length > 0 && (
            <div className="mt-10 w-full max-w-md">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Previous Conversations</h3>
              <div className="space-y-2">
                {conversations.slice(0, 5).map(conv => (
                  <button
                    key={conv.id}
                    onClick={() => selectConversation(conv)}
                    className="w-full flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors text-left"
                  >
                    <MessageCircle className="h-4 w-4 text-muted-foreground shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{conv.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {subjects.find(s => s.id === conv.subject_id)?.shortTitle ?? conv.subject_id}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        {sidebarOpen && (
          <aside className="w-72 border-r border-border bg-muted/30 flex flex-col shrink-0">
            <div className="p-3 border-b border-border flex items-center gap-2">
              <Button variant="outline" size="sm" className="flex-1 gap-2" onClick={startNewChat}>
                <Plus className="h-4 w-4" /> New Chat
              </Button>
              <Button variant="ghost" size="icon" className="shrink-0 h-9 w-9" onClick={() => setSidebarOpen(false)}>
                <PanelLeftClose className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {loadingConversations ? (
                <div className="p-4 text-center text-sm text-muted-foreground">Loading…</div>
              ) : conversations.length === 0 ? (
                <div className="p-4 text-center text-sm text-muted-foreground">No previous chats</div>
              ) : (
                conversations.map(conv => (
                  <button
                    key={conv.id}
                    onClick={() => selectConversation(conv)}
                    className={`w-full group flex items-center gap-2 p-2.5 rounded-lg text-left text-sm transition-colors ${
                      activeConversationId === conv.id ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50'
                    }`}
                  >
                    <MessageCircle className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                    <div className="flex-1 min-w-0">
                      <div className="truncate font-medium">{conv.title}</div>
                      <div className="text-xs text-muted-foreground">{subjects.find(s => s.id === conv.subject_id)?.shortTitle ?? ''}</div>
                    </div>
                    <button
                      onClick={(e) => deleteConversation(conv.id, e)}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-destructive/10 hover:text-destructive transition-opacity"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </button>
                ))
              )}
            </div>
          </aside>
        )}

        {/* Chat Container */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Chat header */}
          <div className="border-b border-border px-4 py-3 flex items-center gap-3 bg-card">
            {!sidebarOpen && (
              <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setSidebarOpen(true)}>
                <PanelLeftOpen className="h-4 w-4" />
              </Button>
            )}
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-base font-semibold">AI Tutor</h1>
              <p className="text-xs text-muted-foreground">
                {subjects.find(s => s.id === selectedSubject)?.title ?? 'Select a subject'}
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={startNewChat} className="text-xs">
              Change Subject
            </Button>
          </div>

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
                      onClick={() => { setInputMessage(prompt); }}
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

            <div ref={messagesEndRef} />
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
                  disabled={!inputMessage.trim() || isLoading || !selectedSubject}
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

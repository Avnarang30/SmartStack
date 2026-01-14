import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TaskCard } from '@/components/TaskCard';
import { ProgressBar } from '@/components/ProgressBar';
import { subjects, defaultUserProgress } from '@/data/subjects';
import { 
  Calendar, 
  Clock, 
  Plus, 
  Wand2,
  CheckCircle2,
  Circle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function Planner() {
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [hoursPerWeek, setHoursPerWeek] = useState('10');
  const [examDate, setExamDate] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showGenerator, setShowGenerator] = useState(false);

  const tasks = defaultUserProgress.plannerTasks;
  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;

  const handleGeneratePlan = async () => {
    setIsGenerating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);
    setShowGenerator(false);
    // In a real app, this would call an API to generate the plan
  };

  const toggleSubject = (subjectId: string) => {
    setSelectedSubjects(prev =>
      prev.includes(subjectId)
        ? prev.filter(id => id !== subjectId)
        : [...prev, subjectId]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 animate-fade-up">
          <div>
            <h1 className="text-3xl font-bold mb-2">Study Planner</h1>
            <p className="text-muted-foreground">
              Organize your AP study schedule and track your progress.
            </p>
          </div>
          
          <Dialog open={showGenerator} onOpenChange={setShowGenerator}>
            <DialogTrigger asChild>
              <Button variant="hero" className="gap-2">
                <Wand2 className="h-4 w-4" />
                Generate Study Plan
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Wand2 className="h-5 w-5 text-primary" />
                  Generate Study Plan
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6 py-4">
                {/* Subject Selection */}
                <div className="space-y-2">
                  <Label>Select AP Subjects</Label>
                  <div className="flex flex-wrap gap-2">
                    {subjects.map(subject => (
                      <button
                        key={subject.id}
                        onClick={() => toggleSubject(subject.id)}
                        className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                          selectedSubjects.includes(subject.id)
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted hover:bg-muted/80'
                        }`}
                      >
                        {subject.icon} {subject.shortTitle}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Exam Date */}
                <div className="space-y-2">
                  <Label htmlFor="examDate">AP Exam Date</Label>
                  <Input
                    id="examDate"
                    type="date"
                    value={examDate}
                    onChange={(e) => setExamDate(e.target.value)}
                  />
                </div>

                {/* Hours per Week */}
                <div className="space-y-2">
                  <Label htmlFor="hours">Hours per Week</Label>
                  <Select value={hoursPerWeek} onValueChange={setHoursPerWeek}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[5, 10, 15, 20, 25, 30].map(hours => (
                        <SelectItem key={hours} value={hours.toString()}>
                          {hours} hours/week
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={handleGeneratePlan} 
                  disabled={isGenerating || selectedSubjects.length === 0}
                  className="w-full gap-2"
                >
                  {isGenerating ? (
                    <>Generating...</>
                  ) : (
                    <>
                      <Wand2 className="h-4 w-4" />
                      Generate My Plan
                    </>
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Calendar Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Week View */}
            <div className="glass-card p-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-lg">This Week</h2>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium">Jan 13 - Jan 19, 2026</span>
                  <Button variant="ghost" size="icon">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2">
                {weekDays.map((day, index) => (
                  <div key={day} className="text-center">
                    <div className="text-xs text-muted-foreground mb-2">{day}</div>
                    <div 
                      className={`aspect-square rounded-xl flex items-center justify-center text-sm font-medium transition-all cursor-pointer ${
                        index === 0 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted/50 hover:bg-muted'
                      }`}
                    >
                      {13 + index}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Today's Schedule */}
            <div className="glass-card p-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-lg">Today's Schedule</h2>
                <Button variant="outline" size="sm" className="gap-1">
                  <Plus className="h-4 w-4" />
                  Add Task
                </Button>
              </div>

              <div className="space-y-4">
                {[
                  { time: '9:00 AM', task: 'AP Chemistry - Unit 1 Review', duration: '45 min', subject: 'ap-chemistry', done: true },
                  { time: '10:00 AM', task: 'AP Calculus - Practice Problems', duration: '60 min', subject: 'ap-calculus-ab', done: true },
                  { time: '2:00 PM', task: 'AP Biology - DNA Replication', duration: '45 min', subject: 'ap-biology', done: false },
                  { time: '4:00 PM', task: 'APUSH - Period 5 Essay Prep', duration: '30 min', subject: 'ap-us-history', done: false },
                ].map((item, index) => {
                  const subject = subjects.find(s => s.id === item.subject);
                  return (
                    <div 
                      key={index}
                      className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                        item.done 
                          ? 'bg-muted/30 border-border/50' 
                          : 'bg-card border-border hover:border-primary/30'
                      }`}
                    >
                      {item.done ? (
                        <CheckCircle2 className="h-5 w-5 text-success shrink-0" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground shrink-0" />
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium ${item.done ? 'line-through text-muted-foreground' : ''}`}>
                          {item.task}
                        </p>
                        <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                          <span>{item.time}</span>
                          <span>•</span>
                          <span>{item.duration}</span>
                        </div>
                      </div>

                      {subject && (
                        <div className="text-2xl">{subject.icon}</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Overview */}
            <div className="glass-card p-6 animate-fade-up" style={{ animationDelay: '0.15s' }}>
              <h3 className="font-semibold mb-4">Today's Progress</h3>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-1">
                  <ProgressBar 
                    progress={(completedTasks / totalTasks) * 100} 
                    size="lg"
                    color="success"
                  />
                </div>
                <span className="font-bold text-success">
                  {completedTasks}/{totalTasks}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Tasks completed</span>
                <span className="font-medium">{Math.round((completedTasks / totalTasks) * 100)}%</span>
              </div>
            </div>

            {/* Weekly Goals */}
            <div className="glass-card p-6 animate-fade-up" style={{ animationDelay: '0.25s' }}>
              <h3 className="font-semibold mb-4">Weekly Goals</h3>
              
              <div className="space-y-4">
                {[
                  { label: 'Study Hours', current: 7, target: 10, unit: 'hrs' },
                  { label: 'Questions', current: 45, target: 100, unit: '' },
                  { label: 'Units Reviewed', current: 3, target: 5, unit: '' },
                ].map((goal) => (
                  <div key={goal.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">{goal.label}</span>
                      <span className="font-medium">
                        {goal.current}/{goal.target} {goal.unit}
                      </span>
                    </div>
                    <ProgressBar progress={(goal.current / goal.target) * 100} size="sm" />
                  </div>
                ))}
              </div>
            </div>

            {/* Reminders */}
            <div className="glass-card p-6 animate-fade-up" style={{ animationDelay: '0.35s' }}>
              <h3 className="font-semibold mb-4">Reminders</h3>
              
              <div className="space-y-3">
                {[
                  { text: 'AP Chemistry exam in 4 months', type: 'warning' },
                  { text: 'Review flashcards before bed', type: 'info' },
                  { text: 'Weekly practice test on Saturday', type: 'info' },
                ].map((reminder, index) => (
                  <div 
                    key={index}
                    className={`p-3 rounded-xl text-sm ${
                      reminder.type === 'warning' 
                        ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400' 
                        : 'bg-primary/5 text-primary'
                    }`}
                  >
                    {reminder.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

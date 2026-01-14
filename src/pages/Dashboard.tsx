import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/Navbar';
import { CookieStreak } from '@/components/CookieStreak';
import { ProgressBar } from '@/components/ProgressBar';
import { TaskCard } from '@/components/TaskCard';
import { SubjectCard } from '@/components/SubjectCard';
import { subjects, defaultUserProgress } from '@/data/subjects';
import { 
  ArrowRight, 
  TrendingUp, 
  Target, 
  Clock,
  BookOpen,
  Calendar,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export default function Dashboard() {
  const userProgress = defaultUserProgress;
  const accuracy = Math.round((userProgress.correctAnswers / userProgress.totalQuestionsAnswered) * 100);

  // Get top 4 subjects for quick access
  const topSubjects = subjects.slice(0, 4);

  // Get recommended units based on progress
  const recommendedUnits = subjects
    .flatMap(s => s.units.map(u => ({ ...u, subjectIcon: s.icon, subjectTitle: s.shortTitle })))
    .filter(u => u.progress > 0 && u.progress < 100)
    .sort((a, b) => b.progress - a.progress)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-up">
          <h1 className="text-3xl font-bold mb-2">Welcome back! 👋</h1>
          <p className="text-muted-foreground">Let's continue your AP journey.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <div className="glass-card p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                  <Target className="h-4 w-4" />
                  Accuracy
                </div>
                <div className="text-2xl font-bold text-primary">{accuracy}%</div>
              </div>
              <div className="glass-card p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                  <BookOpen className="h-4 w-4" />
                  Questions
                </div>
                <div className="text-2xl font-bold">{userProgress.totalQuestionsAnswered}</div>
              </div>
              <div className="glass-card p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                  <TrendingUp className="h-4 w-4" />
                  Correct
                </div>
                <div className="text-2xl font-bold text-success">{userProgress.correctAnswers}</div>
              </div>
              <div className="glass-card p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                  <Clock className="h-4 w-4" />
                  Study Time
                </div>
                <div className="text-2xl font-bold">42h</div>
              </div>
            </div>

            {/* Continue Learning */}
            <div className="glass-card p-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-lg">Continue Learning</h2>
                <Link to="/subjects">
                  <Button variant="ghost" size="sm" className="gap-1">
                    View All
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>

              <div className="space-y-3">
                {recommendedUnits.map((unit, index) => (
                  <Link 
                    key={unit.id} 
                    to={`/units/${unit.id}`}
                    className="block"
                  >
                    <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors group">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-lg">
                        {unit.subjectIcon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">{unit.subjectTitle}</span>
                        </div>
                        <p className="font-medium truncate group-hover:text-primary transition-colors">
                          {unit.title}
                        </p>
                        <ProgressBar progress={unit.progress} size="sm" className="mt-1" />
                      </div>
                      <div className="text-sm font-medium text-primary">
                        {unit.progress}%
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Access Subjects */}
            <div className="animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-lg">Your Subjects</h2>
                <Link to="/subjects">
                  <Button variant="ghost" size="sm" className="gap-1">
                    All Subjects
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {topSubjects.map((subject, index) => (
                  <SubjectCard key={subject.id} subject={subject} index={index} />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Cookie Streak */}
            <div className="animate-fade-up" style={{ animationDelay: '0.15s' }}>
              <CookieStreak streakCount={userProgress.streakCount} />
            </div>

            {/* Today's Tasks */}
            <div className="glass-card p-6 animate-fade-up" style={{ animationDelay: '0.25s' }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-lg">Today's Tasks</h2>
                <Link to="/planner">
                  <Button variant="ghost" size="sm">
                    <Calendar className="h-4 w-4" />
                  </Button>
                </Link>
              </div>

              <div className="space-y-3">
                {userProgress.plannerTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>

              <Link to="/planner" className="block mt-4">
                <Button variant="outline" className="w-full gap-2">
                  <Calendar className="h-4 w-4" />
                  View Full Planner
                </Button>
              </Link>
            </div>

            {/* AI Tutor Promo */}
            <div className="glass-card p-6 gradient-card animate-fade-up" style={{ animationDelay: '0.35s' }}>
              <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Need Help?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get instant explanations with our AI tutor when you're stuck on any question.
              </p>
              <Link to="/ai-tutor">
                <Button variant="default" className="w-full gap-2">
                  <Sparkles className="h-4 w-4" />
                  Try AI Tutor
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

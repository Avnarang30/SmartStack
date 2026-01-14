import { useParams, Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { UnitCard } from '@/components/UnitCard';
import { ProgressBar } from '@/components/ProgressBar';
import { Button } from '@/components/ui/button';
import { subjects } from '@/data/subjects';
import { ChevronLeft, BookOpen, Trophy } from 'lucide-react';

export default function SubjectDetail() {
  const { subjectId } = useParams();
  const subject = subjects.find(s => s.id === subjectId);

  if (!subject) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Subject not found</h1>
          <Link to="/subjects">
            <Button>Back to Subjects</Button>
          </Link>
        </div>
      </div>
    );
  }

  const totalQuestions = subject.units.reduce((sum, unit) => sum + unit.questionCount, 0);
  const completedUnits = subject.units.filter(u => u.progress === 100).length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/subjects" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ChevronLeft className="h-4 w-4" />
          Back to Subjects
        </Link>

        {/* Subject Header */}
        <div className="glass-card p-6 md:p-8 mb-8 animate-fade-up">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div 
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl shadow-lg"
              style={{ backgroundColor: `${subject.color}20` }}
            >
              {subject.icon}
            </div>
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{subject.title}</h1>
              <p className="text-muted-foreground mb-4">{subject.description}</p>
              
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span>{subject.units.length} units</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-muted-foreground">•</span>
                  <span>{totalQuestions} questions</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Trophy className="h-4 w-4 text-amber-500" />
                  <span>{completedUnits} units completed</span>
                </div>
              </div>
            </div>

            <div className="w-full md:w-48">
              <div className="text-right mb-2">
                <span className="text-2xl font-bold text-primary">{subject.progress}%</span>
                <span className="text-muted-foreground ml-1">complete</span>
              </div>
              <ProgressBar progress={subject.progress} size="lg" />
            </div>
          </div>
        </div>

        {/* Units Grid */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Units</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subject.units.map((unit, index) => (
              <UnitCard key={unit.id} unit={unit} index={index} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

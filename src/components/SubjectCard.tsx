import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/ProgressBar';
import type { Subject } from '@/data/subjects';

interface SubjectCardProps {
  subject: Subject;
  index?: number;
}

export function SubjectCard({ subject, index = 0 }: SubjectCardProps) {
  return (
    <Link 
      to={`/subjects/${subject.id}`}
      className={`group block animate-fade-up`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="glass-card-hover p-6 h-full">
        <div className="flex items-start justify-between mb-4">
          <div 
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-soft"
            style={{ backgroundColor: `${subject.color}20` }}
          >
            {subject.icon}
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowRight className="h-5 w-5 text-primary" />
          </div>
        </div>

        <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
          {subject.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {subject.description}
        </p>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{subject.units.length} units</span>
            <span className="font-medium text-primary">{subject.progress}%</span>
          </div>
          <ProgressBar progress={subject.progress} size="sm" />
        </div>
      </div>
    </Link>
  );
}

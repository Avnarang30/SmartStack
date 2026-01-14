import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/ProgressBar';
import type { Unit } from '@/data/subjects';

interface UnitCardProps {
  unit: Unit;
  index?: number;
}

export function UnitCard({ unit, index = 0 }: UnitCardProps) {
  return (
    <Link 
      to={`/units/${unit.id}`}
      className="group block animate-fade-up"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="glass-card-hover p-5 h-full">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors line-clamp-1">
              {unit.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {unit.description}
            </p>
          </div>
          <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowRight className="h-5 w-5 text-primary" />
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <BookOpen className="h-4 w-4" />
            <span>{unit.questionCount} questions</span>
          </div>
          <span className="text-sm font-medium text-primary">{unit.progress}%</span>
        </div>
        
        <ProgressBar progress={unit.progress} size="sm" className="mt-2" />
      </div>
    </Link>
  );
}

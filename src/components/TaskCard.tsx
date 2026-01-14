import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Clock, BookOpen } from 'lucide-react';
import type { PlannerTask } from '@/data/subjects';
import { subjects } from '@/data/subjects';

interface TaskCardProps {
  task: PlannerTask;
  onToggle?: (taskId: string, completed: boolean) => void;
}

export function TaskCard({ task, onToggle }: TaskCardProps) {
  const [isCompleted, setIsCompleted] = useState(task.completed);

  const subject = subjects.find(s => s.id === task.subjectId);

  const handleToggle = () => {
    const newState = !isCompleted;
    setIsCompleted(newState);
    onToggle?.(task.id, newState);
  };

  return (
    <div 
      className={`glass-card p-4 transition-all duration-300 ${
        isCompleted ? 'opacity-60' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        <Checkbox 
          checked={isCompleted} 
          onCheckedChange={handleToggle}
          className="mt-1"
        />
        
        <div className="flex-1 min-w-0">
          <p className={`font-medium transition-all ${isCompleted ? 'line-through text-muted-foreground' : ''}`}>
            {task.title}
          </p>
          
          <div className="flex flex-wrap items-center gap-2 mt-2">
            {subject && (
              <Badge variant="secondary" className="text-xs">
                <span className="mr-1">{subject.icon}</span>
                {subject.shortTitle}
              </Badge>
            )}
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {task.duration} min
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

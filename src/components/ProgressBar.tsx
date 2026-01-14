import { useEffect, useState } from 'react';

interface ProgressBarProps {
  progress: number;
  className?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'success' | 'cookie';
  animated?: boolean;
}

export function ProgressBar({ 
  progress, 
  className = '', 
  showLabel = false, 
  size = 'md',
  color = 'primary',
  animated = true 
}: ProgressBarProps) {
  const [displayProgress, setDisplayProgress] = useState(animated ? 0 : progress);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => setDisplayProgress(progress), 100);
      return () => clearTimeout(timer);
    } else {
      setDisplayProgress(progress);
    }
  }, [progress, animated]);

  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const colorClasses = {
    primary: 'bg-gradient-to-r from-primary to-primary/80',
    success: 'bg-gradient-to-r from-success to-success/80',
    cookie: 'bg-gradient-to-r from-cookie-light to-cookie',
  };

  return (
    <div className={`w-full ${className}`}>
      <div className={`w-full bg-muted rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${colorClasses[color]}`}
          style={{ width: `${displayProgress}%` }}
        />
      </div>
      {showLabel && (
        <div className="mt-1 text-xs text-muted-foreground text-right">
          {Math.round(displayProgress)}%
        </div>
      )}
    </div>
  );
}

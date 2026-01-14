import { useState, useEffect } from 'react';
import { Cookie, Flame, Snowflake } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CookieStreakProps {
  streakCount: number;
  compact?: boolean;
  showAnimation?: boolean;
  onStreakUpdate?: (newStreak: number) => void;
}

export function CookieStreak({ streakCount, compact = false, showAnimation = false, onStreakUpdate }: CookieStreakProps) {
  const [isAnimating, setIsAnimating] = useState(showAnimation);
  const [displayStreak, setDisplayStreak] = useState(streakCount);

  useEffect(() => {
    if (showAnimation) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 800);
      return () => clearTimeout(timer);
    }
  }, [showAnimation, streakCount]);

  const getCookieLevel = (streak: number) => {
    if (streak >= 100) return { level: 'legendary', emoji: '🍪✨', color: 'from-yellow-400 to-amber-600', glow: 'shadow-amber-400/50' };
    if (streak >= 30) return { level: 'golden', emoji: '🍪🔥', color: 'from-amber-400 to-orange-500', glow: 'shadow-orange-400/50' };
    if (streak >= 14) return { level: 'bronze', emoji: '🍪', color: 'from-orange-400 to-amber-600', glow: 'shadow-amber-400/30' };
    if (streak >= 7) return { level: 'starter', emoji: '🍪', color: 'from-cookie-light to-cookie', glow: 'shadow-cookie/30' };
    if (streak >= 3) return { level: 'crumb', emoji: '🍪', color: 'from-amber-200 to-amber-400', glow: '' };
    return { level: 'new', emoji: '🍪', color: 'from-amber-100 to-amber-300', glow: '' };
  };

  const cookieInfo = getCookieLevel(displayStreak);

  if (compact) {
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${cookieInfo.color} text-primary-foreground shadow-lg ${cookieInfo.glow} ${isAnimating ? 'animate-cookie-bounce' : ''}`}>
        <span className="text-lg">{cookieInfo.emoji}</span>
        <span className="font-bold">{displayStreak}</span>
        <Flame className="h-4 w-4" />
      </div>
    );
  }

  return (
    <div className="glass-card p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cookie/20 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">Daily Streak</h3>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <Snowflake className="h-4 w-4 mr-1" />
            Freeze
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className={`relative w-20 h-20 flex items-center justify-center rounded-2xl bg-gradient-to-br ${cookieInfo.color} shadow-xl ${cookieInfo.glow} ${isAnimating ? 'animate-cookie-bounce' : ''}`}>
            <span className="text-4xl">{cookieInfo.emoji}</span>
            {displayStreak >= 7 && (
              <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-destructive flex items-center justify-center">
                <Flame className="h-3.5 w-3.5 text-destructive-foreground" />
              </div>
            )}
          </div>
          
          <div>
            <div className="text-4xl font-bold text-foreground">{displayStreak}</div>
            <div className="text-sm text-muted-foreground">day streak</div>
          </div>
        </div>

        {/* Milestone indicators */}
        <div className="mt-4 flex gap-2">
          {[3, 7, 14, 30, 100].map((milestone) => (
            <div
              key={milestone}
              className={`flex-1 h-2 rounded-full transition-colors ${
                displayStreak >= milestone 
                  ? 'bg-gradient-to-r from-cookie-light to-cookie' 
                  : 'bg-muted'
              }`}
            />
          ))}
        </div>
        <div className="mt-1 flex justify-between text-xs text-muted-foreground">
          <span>3</span>
          <span>7</span>
          <span>14</span>
          <span>30</span>
          <span>100</span>
        </div>
      </div>
    </div>
  );
}

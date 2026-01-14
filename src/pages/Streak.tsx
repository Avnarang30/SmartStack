import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { defaultUserProgress } from '@/data/subjects';
import { Cookie, Flame, Snowflake, Gift, Trophy, Star, Lock } from 'lucide-react';

const milestones = [
  { days: 3, reward: 'Bronze Cookie', icon: '🍪', unlocked: true, description: 'You started your streak!' },
  { days: 7, reward: 'Silver Cookie', icon: '🍪✨', unlocked: true, description: 'One week strong!' },
  { days: 14, reward: 'Gold Cookie', icon: '🍪🌟', unlocked: false, description: 'Two weeks of dedication!' },
  { days: 30, reward: 'Diamond Cookie', icon: '🍪💎', unlocked: false, description: 'A full month of learning!' },
  { days: 60, reward: 'Platinum Cookie', icon: '🍪👑', unlocked: false, description: 'Two months of excellence!' },
  { days: 100, reward: 'Legendary Cookie', icon: '🍪🔥', unlocked: false, description: '100 days of mastery!' },
];

const calendarDays = Array.from({ length: 35 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - 7 + i);
  return {
    date,
    day: date.getDate(),
    isToday: i === 7,
    hasStreak: i >= 1 && i <= 7,
    isFuture: i > 7,
  };
});

export default function Streak() {
  const [showAnimation, setShowAnimation] = useState(false);
  const streakCount = defaultUserProgress.streakCount;

  const handleCookieClick = () => {
    setShowAnimation(true);
    setTimeout(() => setShowAnimation(false), 800);
  };

  const getCookieStyle = () => {
    if (streakCount >= 100) return 'from-amber-400 via-yellow-300 to-amber-500 shadow-amber-400/50';
    if (streakCount >= 30) return 'from-amber-400 to-orange-500 shadow-orange-400/40';
    if (streakCount >= 14) return 'from-orange-400 to-amber-500 shadow-amber-400/30';
    if (streakCount >= 7) return 'from-cookie-light to-cookie shadow-cookie/30';
    return 'from-amber-200 to-amber-400';
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-up">
          <h1 className="text-3xl font-bold mb-2">Daily Cookie Streak</h1>
          <p className="text-muted-foreground">
            Study every day to build your streak and unlock rewards!
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main Cookie Display */}
          <div className="glass-card p-8 md:p-12 text-center mb-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <div className="relative inline-block mb-6">
              {/* Glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${getCookieStyle()} rounded-full blur-2xl opacity-30 scale-125`} />
              
              {/* Main cookie */}
              <button
                onClick={handleCookieClick}
                className={`relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br ${getCookieStyle()} flex items-center justify-center shadow-xl transition-transform hover:scale-105 active:scale-95 ${
                  showAnimation ? 'animate-cookie-bounce' : ''
                }`}
              >
                <span className="text-6xl md:text-7xl">🍪</span>
                {streakCount >= 7 && (
                  <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-destructive flex items-center justify-center shadow-lg">
                    <Flame className="h-5 w-5 text-destructive-foreground" />
                  </div>
                )}
              </button>
            </div>

            <div className="text-6xl md:text-7xl font-bold mb-2">{streakCount}</div>
            <div className="text-xl text-muted-foreground mb-6">day streak</div>

            <div className="flex justify-center gap-4">
              <Button variant="outline" className="gap-2">
                <Snowflake className="h-4 w-4" />
                Use Streak Freeze
              </Button>
              <Button variant="hero" className="gap-2">
                <Flame className="h-4 w-4" />
                Study Now
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Calendar */}
            <div className="glass-card p-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <h2 className="font-semibold text-lg mb-4">Streak Calendar</h2>
              
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                  <div key={i} className="text-center text-xs text-muted-foreground py-1">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, i) => (
                  <div
                    key={i}
                    className={`aspect-square rounded-lg flex items-center justify-center text-sm transition-all ${
                      day.isToday
                        ? 'bg-primary text-primary-foreground font-bold'
                        : day.hasStreak
                        ? 'bg-gradient-to-br from-cookie-light to-cookie text-primary-foreground'
                        : day.isFuture
                        ? 'bg-muted/30 text-muted-foreground'
                        : 'bg-muted/50'
                    }`}
                  >
                    {day.hasStreak && !day.isToday ? (
                      <span className="text-xs">🍪</span>
                    ) : (
                      day.day
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Milestones */}
            <div className="glass-card p-6 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <h2 className="font-semibold text-lg mb-4">Milestones</h2>
              
              <div className="space-y-3">
                {milestones.map((milestone) => (
                  <div
                    key={milestone.days}
                    className={`flex items-center gap-4 p-3 rounded-xl transition-all ${
                      milestone.unlocked
                        ? 'bg-success/10 border border-success/20'
                        : 'bg-muted/30 border border-border'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
                      milestone.unlocked 
                        ? 'bg-gradient-to-br from-cookie-light to-cookie' 
                        : 'bg-muted'
                    }`}>
                      {milestone.unlocked ? milestone.icon : <Lock className="h-5 w-5 text-muted-foreground" />}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{milestone.reward}</span>
                        {milestone.unlocked && (
                          <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {milestone.days} days • {milestone.description}
                      </div>
                    </div>

                    {streakCount >= milestone.days && milestone.unlocked ? (
                      <Trophy className="h-5 w-5 text-amber-500" />
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        {Math.max(0, milestone.days - streakCount)} to go
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="glass-card p-6 mt-6 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <h2 className="font-semibold text-lg mb-4">Streak Stats</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Current Streak', value: `${streakCount} days`, icon: Flame, color: 'text-orange-500' },
                { label: 'Longest Streak', value: '14 days', icon: Trophy, color: 'text-amber-500' },
                { label: 'Streak Freezes', value: '2 available', icon: Snowflake, color: 'text-blue-500' },
                { label: 'Total Study Days', value: '42 days', icon: Star, color: 'text-purple-500' },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-4 rounded-xl bg-muted/30">
                  <stat.icon className={`h-6 w-6 mx-auto mb-2 ${stat.color}`} />
                  <div className="font-bold text-lg">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

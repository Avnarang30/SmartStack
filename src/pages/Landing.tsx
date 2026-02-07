import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Sparkles, 
  Calendar, 
  Cookie, 
  CheckCircle2,
  ArrowRight,
  Star,
  Users,
  Trophy
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const features = [
  {
    icon: BookOpen,
    title: 'Massive Question Bank',
    description: 'Thousands of AP questions organized by subject and unit, with detailed explanations.',
  },
  {
    icon: Sparkles,
    title: 'AI Tutor',
    description: 'Get instant help when you\'re stuck with step-by-step explanations powered by AI.',
  },
  {
    icon: Calendar,
    title: 'Smart Planner',
    description: 'Auto-generate study schedules based on your exam dates and available time.',
  },
  {
    icon: Cookie,
    title: 'Daily Streaks',
    description: 'Stay motivated with daily study streaks and unlock rewards as you progress.',
  },
];

const testimonials = [
  {
    name: 'Sarah M.',
    score: '5 on AP Chem',
    text: 'SmartStack helped me understand concepts I struggled with for months. The AI tutor is like having a personal teacher available 24/7.',
    avatar: '👩‍🎓',
  },
  {
    name: 'James K.',
    score: '5 on AP Calc AB',
    text: 'The daily streak system kept me accountable. I studied every day for 60 days straight and it paid off!',
    avatar: '👨‍🎓',
  },
  {
    name: 'Emily R.',
    score: '5 on APUSH',
    text: 'The planner feature organized my entire AP season. I knew exactly what to study each day.',
    avatar: '👩‍💻',
  },
];

const stats = [
  { value: '50K+', label: 'Students' },
  { value: '10K+', label: 'Questions' },
  { value: '8', label: 'AP Subjects' },
  { value: '4.9', label: 'Rating', icon: Star },
];

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-[0.03]" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-up">
              <Trophy className="h-4 w-4" />
              Join 50,000+ students scoring 5s
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Master AP Exams With
              <span className="text-primary block mt-2">SmartStack AP</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '0.2s' }}>
              Practice smarter with AI-powered tutoring, personalized study plans, 
              and a massive question bank designed for AP success.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <Link to="/dashboard">
                <Button variant="hero" size="xl" className="gap-2 w-full sm:w-auto">
                  Start Practicing Free
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/subjects">
                <Button variant="outline" size="xl" className="gap-2 w-full sm:w-auto">
                  Browse Subjects
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 animate-fade-up" style={{ animationDelay: '0.4s' }}>
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-foreground flex items-center justify-center gap-1">
                    {stat.value}
                    {stat.icon && <stat.icon className="h-6 w-6 text-amber-400 fill-amber-400" />}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Score a 5
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive platform gives you all the tools for AP success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="glass-card-hover p-6 text-center animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              8 AP Subjects, Endless Practice
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From STEM to Humanities, we've got you covered with College Board-aligned content.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {['⚗️ AP Chemistry', '🧬 AP Biology', '📐 AP Calculus', '⚛️ AP Physics', '🗽 APUSH', '🌍 AP World', '✍️ AP Lang', '📊 AP Macro'].map((subject) => (
              <div 
                key={subject}
                className="px-5 py-3 rounded-2xl bg-secondary/50 border border-border hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer"
              >
                <span className="font-medium">{subject}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/subjects">
              <Button variant="outline" size="lg" className="gap-2">
                Explore All Subjects
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Students Love SmartStack
            </h2>
            <p className="text-muted-foreground">
              Join thousands who've improved their AP scores.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.name}
                className="glass-card p-6 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-primary font-medium">{testimonial.score}</div>
                  </div>
                </div>
                <p className="text-muted-foreground">&ldquo;{testimonial.text}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto gradient-primary rounded-3xl p-8 md:p-12 text-center text-primary-foreground relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Ace Your AP Exams?
              </h2>
              <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
                Start practicing today and join the thousands of students who've scored 5s with SmartStack.
              </p>
              <Link to="/dashboard">
                <Button variant="hero-outline" size="xl" className="gap-2">
                  Get Started Free
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

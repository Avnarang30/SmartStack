import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  Target, 
  Heart,
  ArrowRight,
  Sparkles,
  Award
} from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 gradient-hero opacity-[0.03]" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-up">
              About SmartStack AP
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '0.1s' }}>
              We're on a mission to help every student achieve their AP exam goals through 
              smart practice, personalized learning, and AI-powered support.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Target,
                  title: 'Our Mission',
                  description: 'To democratize AP exam preparation by making high-quality study resources accessible to all students, regardless of their background or resources.',
                },
                {
                  icon: Heart,
                  title: 'Our Values',
                  description: 'We believe in the power of consistent practice, personalized learning paths, and the importance of celebrating every small win along the way.',
                },
                {
                  icon: Sparkles,
                  title: 'Our Approach',
                  description: 'Combining proven study techniques with cutting-edge AI technology to create a learning experience that adapts to each student\'s unique needs.',
                },
              ].map((item, index) => (
                <div 
                  key={item.title}
                  className="glass-card p-6 text-center animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">By the Numbers</h2>
              <p className="text-muted-foreground">
                Helping students succeed since 2024
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { value: '50K+', label: 'Active Students' },
                { value: '10K+', label: 'Practice Questions' },
                { value: '4.9/5', label: 'Average Rating' },
                { value: '85%', label: 'Score 4 or 5' },
              ].map((stat, index) => (
                <div 
                  key={stat.label}
                  className="text-center p-6 glass-card animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Meet the Team</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Built by students, for students. Our team understands the challenges of AP exams firsthand.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { name: 'Alex Chen', role: 'Founder & CEO', emoji: '👨‍💻' },
                { name: 'Sarah Kim', role: 'Head of Content', emoji: '👩‍🏫' },
                { name: 'Marcus Johnson', role: 'Lead Developer', emoji: '👨‍🔬' },
                { name: 'Emily Rodriguez', role: 'AI Engineer', emoji: '👩‍💻' },
              ].map((member, index) => (
                <div 
                  key={member.name}
                  className="text-center animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-4xl mx-auto mb-3">
                    {member.emoji}
                  </div>
                  <div className="font-semibold">{member.name}</div>
                  <div className="text-sm text-muted-foreground">{member.role}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="glass-card gradient-card p-8 md:p-12 text-center max-w-3xl mx-auto">
              <Award className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Start Your AP Journey?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Join thousands of students who are already using SmartStack to prepare for their AP exams.
              </p>
              <Link to="/dashboard">
                <Button variant="hero" size="lg" className="gap-2">
                  Get Started Free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

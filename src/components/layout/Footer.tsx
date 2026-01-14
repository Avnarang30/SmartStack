import { Link } from 'react-router-dom';
import { BookOpen, Twitter, Github, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary">
                <BookOpen className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">
                Smart<span className="text-primary">Stack</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Master your AP exams with smart practice, AI tutoring, and daily streaks.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/subjects" className="hover:text-primary transition-colors">Question Bank</Link></li>
              <li><Link to="/ai-tutor" className="hover:text-primary transition-colors">AI Tutor</Link></li>
              <li><Link to="/planner" className="hover:text-primary transition-colors">Study Planner</Link></li>
              <li><Link to="/streak" className="hover:text-primary transition-colors">Daily Streak</Link></li>
            </ul>
          </div>

          {/* Subjects */}
          <div>
            <h4 className="font-semibold mb-4">AP Subjects</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/subjects/ap-chemistry" className="hover:text-primary transition-colors">AP Chemistry</Link></li>
              <li><Link to="/subjects/ap-biology" className="hover:text-primary transition-colors">AP Biology</Link></li>
              <li><Link to="/subjects/ap-calculus-ab" className="hover:text-primary transition-colors">AP Calculus</Link></li>
              <li><Link to="/subjects/ap-us-history" className="hover:text-primary transition-colors">AP US History</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-primary transition-colors">About</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 SmartStack AP. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

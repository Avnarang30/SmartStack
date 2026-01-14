import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  LayoutDashboard, 
  Calendar, 
  Cookie, 
  Settings, 
  Sparkles,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/subjects', label: 'Subjects', icon: BookOpen },
  { path: '/planner', label: 'Planner', icon: Calendar },
  { path: '/streak', label: 'Streak', icon: Cookie },
  { path: '/ai-tutor', label: 'AI Tutor', icon: Sparkles },
];

export function Navbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary shadow-md group-hover:shadow-lg transition-shadow">
              <BookOpen className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">
              Smart<span className="text-primary">Stack</span> AP
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive(item.path) ? 'secondary' : 'ghost'}
                  size="sm"
                  className={`gap-2 ${isActive(item.path) ? 'bg-primary/10 text-primary' : ''}`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/settings">
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </Link>
            <Button variant="hero" size="sm">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-fade-up">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button
                    variant={isActive(item.path) ? 'secondary' : 'ghost'}
                    className={`w-full justify-start gap-2 ${isActive(item.path) ? 'bg-primary/10 text-primary' : ''}`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              ))}
              <div className="border-t border-border/50 pt-2 mt-2">
                <Link to="/settings" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start gap-2">
                    <Settings className="h-4 w-4" />
                    Settings
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

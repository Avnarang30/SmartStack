import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Bell, 
  Palette, 
  Key, 
  Shield, 
  LogOut,
  Save,
  Camera
} from 'lucide-react';

export default function Settings() {
  const [notifications, setNotifications] = useState({
    dailyReminder: true,
    streakAlert: true,
    weeklyProgress: false,
    newContent: true,
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-8 animate-fade-up">Settings</h1>

        {/* Profile Section */}
        <section className="glass-card p-6 mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-2 mb-6">
            <User className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Profile</h2>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center text-4xl">
                👨‍🎓
              </div>
              <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors">
                <Camera className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="Alex" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Johnson" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="alex.j@student.edu" />
              </div>
            </div>
          </div>
        </section>

        {/* Notifications Section */}
        <section className="glass-card p-6 mb-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-2 mb-6">
            <Bell className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Notifications</h2>
          </div>

          <div className="space-y-4">
            {[
              { key: 'dailyReminder', label: 'Daily Study Reminder', description: 'Get reminded to study every day' },
              { key: 'streakAlert', label: 'Streak Alert', description: 'Notify when streak is at risk' },
              { key: 'weeklyProgress', label: 'Weekly Progress Report', description: 'Receive weekly progress summary' },
              { key: 'newContent', label: 'New Content', description: 'Get notified about new questions and features' },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between py-2">
                <div>
                  <div className="font-medium">{item.label}</div>
                  <div className="text-sm text-muted-foreground">{item.description}</div>
                </div>
                <Switch
                  checked={notifications[item.key as keyof typeof notifications]}
                  onCheckedChange={(checked) =>
                    setNotifications(prev => ({ ...prev, [item.key]: checked }))
                  }
                />
              </div>
            ))}
          </div>
        </section>

        {/* Appearance Section */}
        <section className="glass-card p-6 mb-6 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center gap-2 mb-6">
            <Palette className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Appearance</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <div className="font-medium">Theme</div>
                <div className="text-sm text-muted-foreground">Choose your preferred color scheme</div>
              </div>
              <div className="flex gap-2">
                {['Light', 'Dark', 'System'].map((theme) => (
                  <button
                    key={theme}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                      theme === 'Light'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted hover:bg-muted/80'
                    }`}
                  >
                    {theme}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* API Configuration Section */}
        <section className="glass-card p-6 mb-6 animate-fade-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center gap-2 mb-6">
            <Key className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">API Configuration</h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="geminiKey">Gemini API Key (Optional)</Label>
              <Input 
                id="geminiKey" 
                type="password" 
                placeholder="Enter your Gemini API key"
              />
              <p className="text-xs text-muted-foreground">
                Add your own API key for unlimited AI tutor usage. Get one at{' '}
                <a href="https://ai.google.dev" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  ai.google.dev
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* Account Section */}
        <section className="glass-card p-6 mb-6 animate-fade-up" style={{ animationDelay: '0.5s' }}>
          <div className="flex items-center gap-2 mb-6">
            <Shield className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Account</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <div className="font-medium">Change Password</div>
                <div className="text-sm text-muted-foreground">Update your password</div>
              </div>
              <Button variant="outline">Change</Button>
            </div>
            
            <Separator />

            <div className="flex items-center justify-between py-2">
              <div>
                <div className="font-medium">Export Data</div>
                <div className="text-sm text-muted-foreground">Download all your progress data</div>
              </div>
              <Button variant="outline">Export</Button>
            </div>

            <Separator />

            <div className="flex items-center justify-between py-2">
              <div>
                <div className="font-medium text-destructive">Delete Account</div>
                <div className="text-sm text-muted-foreground">Permanently delete your account and data</div>
              </div>
              <Button variant="destructive">Delete</Button>
            </div>
          </div>
        </section>

        {/* Save Button */}
        <div className="flex justify-end gap-4 animate-fade-up" style={{ animationDelay: '0.6s' }}>
          <Button variant="outline" className="gap-2">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
          <Button variant="hero" className="gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </main>
    </div>
  );
}

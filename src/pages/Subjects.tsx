import { Navbar } from '@/components/layout/Navbar';
import { SubjectCard } from '@/components/SubjectCard';
import { subjects } from '@/data/subjects';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useState } from 'react';

export default function Subjects() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSubjects = subjects.filter(subject =>
    subject.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    subject.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-up">
          <h1 className="text-3xl font-bold mb-2">AP Subjects</h1>
          <p className="text-muted-foreground">
            Choose a subject to start practicing. Each subject is organized by official College Board units.
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-md mb-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search subjects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Subjects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSubjects.map((subject, index) => (
            <SubjectCard key={subject.id} subject={subject} index={index} />
          ))}
        </div>

        {filteredSubjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No subjects found matching "{searchQuery}"</p>
          </div>
        )}
      </main>
    </div>
  );
}

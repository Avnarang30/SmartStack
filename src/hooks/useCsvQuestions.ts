import { useState, useEffect, useMemo } from 'react';

export interface CsvQuestion {
  id: string;
  unitId: string;
  text: string;
  choices: string[];
  image?: string;
  questionHash: string;
}

function hashString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return 'q-' + Math.abs(hash).toString(36);
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

const UNIT_IDS = ['micro-1', 'micro-2', 'micro-3', 'micro-4', 'micro-5', 'micro-6'];

export function useCsvQuestions() {
  const [allQuestions, setAllQuestions] = useState<CsvQuestion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/microeconomics-questions.csv')
      .then(res => res.text())
      .then(text => {
        const lines = text.split('\n').filter(l => l.trim());
        // Skip header
        const questions: CsvQuestion[] = [];
        for (let i = 1; i < lines.length; i++) {
          const cols = parseCSVLine(lines[i]);
          const questionText = cols[1]?.trim();
          if (!questionText) continue;
          
          const choices = [cols[2], cols[3], cols[4], cols[5], cols[6]]
            .map(c => c?.trim())
            .filter(Boolean);
          
          if (choices.length < 2) continue;

          const unitIndex = (i - 1) % UNIT_IDS.length;
          const qHash = hashString(questionText);

          questions.push({
            id: qHash,
            unitId: UNIT_IDS[unitIndex],
            text: questionText,
            choices,
            image: cols[0]?.trim() || undefined,
            questionHash: qHash,
          });
        }
        setAllQuestions(questions);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load questions CSV:', err);
        setLoading(false);
      });
  }, []);

  return { allQuestions, loading };
}

export function useUnitQuestions(unitId: string | undefined) {
  const { allQuestions, loading } = useCsvQuestions();
  
  const unitQuestions = useMemo(() => {
    if (!unitId) return [];
    return allQuestions.filter(q => q.unitId === unitId);
  }, [allQuestions, unitId]);

  return { unitQuestions, loading };
}

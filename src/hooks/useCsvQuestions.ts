import { useState, useEffect, useMemo } from 'react';
import Papa from 'papaparse';

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

const UNIT_IDS = ['micro-1', 'micro-2', 'micro-3', 'micro-4', 'micro-5', 'micro-6'];

export function useCsvQuestions() {
  const [allQuestions, setAllQuestions] = useState<CsvQuestion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/microeconomics-questions.csv')
      .then(res => res.text())
      .then(text => {
        const result = Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
        });

        const questions: CsvQuestion[] = [];
        let index = 0;

        for (const row of result.data as Record<string, string>[]) {
          const questionText = row['Question']?.trim();
          if (!questionText) continue;

          const choices = [
            row['Answer 1'],
            row['Answer 2'],
            row['Answer 3'],
            row['Answer 4'],
            row['Answer 5'],
          ].map(c => c?.trim()).filter(Boolean);

          if (choices.length < 2) continue;

          const unitIndex = index % UNIT_IDS.length;
          const qHash = hashString(questionText);

          questions.push({
            id: qHash,
            unitId: UNIT_IDS[unitIndex],
            text: questionText,
            choices,
            image: row['Image']?.trim() || undefined,
            questionHash: qHash,
          });
          index++;
        }

        console.log(`Loaded ${questions.length} questions from CSV`);
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

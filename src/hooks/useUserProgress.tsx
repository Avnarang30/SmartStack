import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useCallback } from 'react';

export function useUserProgress() {
  const { user } = useAuth();

  const recordAnswer = useCallback(async (
    subjectId: string,
    unitId: string,
    questionId: string,
    selectedAnswer: string,
    isCorrect: boolean,
  ) => {
    if (!user) return;

    // Insert progress record
    await supabase.from('user_progress').insert({
      user_id: user.id,
      subject_id: subjectId,
      unit_id: unitId,
      question_id: questionId,
      selected_answer: selectedAnswer,
      is_correct: isCorrect,
    });

    // Update streak
    const today = new Date().toISOString().split('T')[0];
    const { data: streak } = await supabase
      .from('user_streaks')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (streak) {
      const lastDate = streak.last_activity_date;
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      let newStreak = streak.current_streak;
      if (lastDate === today) {
        // Already active today, no streak change
      } else if (lastDate === yesterdayStr) {
        newStreak += 1;
      } else {
        newStreak = 1;
      }

      const longestStreak = Math.max(newStreak, streak.longest_streak);

      await supabase
        .from('user_streaks')
        .update({
          current_streak: newStreak,
          longest_streak: longestStreak,
          last_activity_date: today,
          total_questions_answered: streak.total_questions_answered + 1,
          total_correct: streak.total_correct + (isCorrect ? 1 : 0),
        })
        .eq('user_id', user.id);
    }
  }, [user]);

  const getStreak = useCallback(async () => {
    if (!user) return null;
    const { data } = await supabase
      .from('user_streaks')
      .select('*')
      .eq('user_id', user.id)
      .single();
    return data;
  }, [user]);

  const getProgressForUnit = useCallback(async (unitId: string) => {
    if (!user) return [];
    const { data } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', user.id)
      .eq('unit_id', unitId);
    return data ?? [];
  }, [user]);

  return { recordAnswer, getStreak, getProgressForUnit };
}

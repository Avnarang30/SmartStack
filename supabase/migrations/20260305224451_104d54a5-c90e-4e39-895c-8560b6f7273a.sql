
CREATE TABLE public.ai_question_answers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_hash text NOT NULL UNIQUE,
  correct_answer_index integer NOT NULL,
  explanation text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.ai_question_answers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read cached answers"
ON public.ai_question_answers
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Anyone can insert cached answers"
ON public.ai_question_answers
FOR INSERT
TO authenticated
WITH CHECK (true);

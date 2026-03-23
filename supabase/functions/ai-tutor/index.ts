import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

async function callAI(apiKey: string, url: string, messages: any[]): Promise<Response> {
  for (let i = 0; i < 3; i++) {
    const response = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: url.includes("lovable") ? "google/gemini-2.5-flash-lite" : "gemini-2.0-flash", messages }),
    });
    if (response.status === 429 && i < 2) {
      await new Promise(r => setTimeout(r, (i + 1) * 2000));
      continue;
    }
    return response;
  }
  throw new Error("Exhausted retries");
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { question, choices, studentAttempt, mode } = await req.json();

    const choicesText = choices.map((c: string, i: number) => `${String.fromCharCode(65 + i)}) ${c}`).join("\n");

    const systemPrompts: Record<string, string> = {
      hint: "You are an AP Microeconomics tutor. Give a helpful hint for this question WITHOUT revealing the answer. Guide the student's thinking with 2-3 sentences.",
      explanation: "You are an AP Microeconomics tutor. Provide a clear step-by-step explanation of how to solve this question. Walk through the reasoning for each answer choice and explain why the correct one is right. Use numbered steps.",
      concept: "You are an AP Microeconomics tutor. Provide a concept review relevant to this question. Explain the key economic concepts, definitions, and principles being tested. Include real-world examples where helpful.",
    };

    const systemPrompt = systemPrompts[mode] || systemPrompts.hint;

    let userContent = `Question: ${question}\n\nChoices:\n${choicesText}`;
    if (studentAttempt) {
      userContent += `\n\nStudent's thinking: ${studentAttempt}`;
    }

    const messages = [
      { role: "system", content: systemPrompt },
      { role: "user", content: userContent },
    ];

    // Try Gemini first, fallback to Lovable AI
    let response: Response | null = null;
    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");

    if (GEMINI_API_KEY) {
      try {
        response = await callAI(GEMINI_API_KEY, "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions", messages);
        if (!response.ok) { console.log(`Gemini failed ${response.status}, falling back`); response = null; }
      } catch { response = null; }
    }

    if (!response) {
      const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
      if (!LOVABLE_API_KEY) throw new Error("No AI API key available");
      response = await callAI(LOVABLE_API_KEY, "https://ai.gateway.lovable.dev/v1/chat/completions", messages);
      if (!response.ok) {
        const t = await response.text();
        console.error("AI error:", response.status, t);
        throw new Error("AI error");
      }
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) throw new Error("No content in AI response");

    return new Response(JSON.stringify({ content }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("ai-tutor error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

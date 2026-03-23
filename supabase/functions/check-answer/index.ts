import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

async function callGemini(apiKey: string, body: string, retries = 3): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/openai/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body,
    });
    if (response.status === 429 && i < retries - 1) {
      const delay = (i + 1) * 2000; // 2s, 4s backoff
      console.log(`Rate limited, retrying in ${delay}ms (attempt ${i + 2}/${retries})`);
      await new Promise(r => setTimeout(r, delay));
      continue;
    }
    return response;
  }
  throw new Error("Exhausted retries");
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { question, choices } = await req.json();
    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    if (!GEMINI_API_KEY) throw new Error("GEMINI_API_KEY is not configured");

    const choicesText = choices.map((c: string, i: number) => `${String.fromCharCode(65 + i)}) ${c}`).join("\n");

    const response = await callGemini(GEMINI_API_KEY, JSON.stringify({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "system",
          content: "You are an AP Microeconomics expert. Given a multiple choice question, determine the correct answer. Use the provided tool to return your answer."
        },
        {
          role: "user",
          content: `Question: ${question}\n\nChoices:\n${choicesText}\n\nWhich is the correct answer?`
        }
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "submit_answer",
            description: "Submit the correct answer for this AP Microeconomics question.",
            parameters: {
              type: "object",
              properties: {
                correct_answer_index: {
                  type: "integer",
                  description: "Zero-based index of the correct answer (0=A, 1=B, 2=C, 3=D, 4=E)"
                },
                explanation: {
                  type: "string",
                  description: "Brief explanation of why this is the correct answer"
                }
              },
              required: ["correct_answer_index", "explanation"],
              additionalProperties: false
            }
          }
        }
      ],
      tool_choice: { type: "function", function: { name: "submit_answer" } },
    }));

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited, please try again shortly." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("Gemini API error:", response.status, t);
      throw new Error("Gemini API error");
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    
    if (!toolCall) {
      throw new Error("No tool call in AI response");
    }

    const result = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify({
      correct_answer_index: result.correct_answer_index,
      explanation: result.explanation,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("check-answer error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

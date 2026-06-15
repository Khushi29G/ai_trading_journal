import { NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@/lib/supabase/client";
const supabase = createClient();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET() {
  try {
    const { data: trades } =
      await supabase
        .from("trades")
        .select("*");

    const { data: journals } =
      await supabase
        .from("trade_journals")
        .select("*");

    const prompt = `
You are a professional trading coach.

Analyze these trades and journals.

Provide:

1. Overall Performance Summary
2. Win Rate Analysis
3. Most Common Emotion
4. Biggest Mistake
5. Best Habit
6. Top 3 Recommendations

Trades:
${JSON.stringify(trades)}

Journals:
${JSON.stringify(journals)}
`;

    const completion =
      await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

    return NextResponse.json({
      review:
        completion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      review:
        "Unable to generate review.",
    });
  }
}
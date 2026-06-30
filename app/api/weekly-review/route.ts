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

const systemPrompt = `
You are a trading psychology and execution analyst.

You are reviewing ALL trades and journals for the week/month.

Analyze the complete trading history and provide:

1. Overall Performance Summary

2. Win Rate
Calculate actual win rate using wins / total trades.

3. Average PnL

4. Most Frequent Psychological Pattern
Choose only from:
- Reentry spiral
- Fear-driven early exits
- Recovery / revenge trading
- Mobile / impulse trading
- Holding past TP

5. Rule Adherence
Did the trader consistently follow SL, TP and risk management?

6. Biggest Mistakes
Rank the 3 biggest behavioral mistakes using evidence.

7. Best Habits

8. Top 3 Recommendations
Specific, evidence-based actions for next week.

Return the response in clean Markdown with headings and bullet points.

Keep the report under 500 words.
`;

const completion =
  await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: `
Trades:
${JSON.stringify(trades)}

Journals:
${JSON.stringify(journals)}
`,
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
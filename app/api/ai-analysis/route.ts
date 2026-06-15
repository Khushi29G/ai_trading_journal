import { NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@/lib/supabase/client";
const supabase = createClient();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET() {
  try {

    const { data: journals } = await supabase
      .from("trade_journals")
      .select("*");

    const prompt = `
Analyze these trading journals.

Find:

1. Most common emotions
2. Biggest mistakes
3. Best trading habits
4. Suggestions for improvement

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
      analysis:
        completion.choices[0].message.content,
    });

  } catch (error) {
    return NextResponse.json({
      error: "Failed",
    });
  }
}
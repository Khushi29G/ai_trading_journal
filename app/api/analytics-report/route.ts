import { NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@/lib/supabase/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET() {
  try {
    const supabase = await createClient();

    const { data: trades, error: tradesError } =
      await supabase
        .from("trades")
        .select("*");

    const { data: journals, error: journalsError } =
      await supabase
        .from("trade_journals")
        .select("*");

    if (tradesError || journalsError) {
      throw new Error(
        tradesError?.message ||
          journalsError?.message
      );
    }

    const prompt = `
You are an elite trading performance coach.

Analyze the provided trades and journals.

IMPORTANT:
Return ONLY valid JSON.
Do NOT wrap the response in markdown.
Do NOT use \`\`\`json.
Do NOT include explanations outside JSON.

Return exactly this structure:

{
  "performanceSummary": "string",
  "bestSymbol": "string",
  "worstSymbol": "string",
  "mostCommonEmotion": "string",
  "biggestMistake": "string",
  "bestHabit": "string",
  "riskManagementFeedback": "string",
  "recommendations": [
    "string",
    "string",
    "string",
    "string",
    "string"
  ]
}

Trades:
${JSON.stringify(trades)}

Journals:
${JSON.stringify(journals)}
`;

    const completion =
      await openai.chat.completions.create({
        model: "gpt-4o-mini",
        response_format: {
          type: "json_object",
        },
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

    const raw =
      completion.choices[0].message.content || "{}";

    console.log("========== GPT RESPONSE ==========");
    console.log(raw);
    console.log("==================================");

    let cleaned = raw
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    try {
      const parsed = JSON.parse(cleaned);

      return NextResponse.json(parsed);
    } catch (jsonError) {
      console.error(
        "JSON Parse Error:",
        jsonError
      );

      return NextResponse.json({
        performanceSummary: cleaned,
        bestSymbol: "N/A",
        worstSymbol: "N/A",
        mostCommonEmotion: "N/A",
        biggestMistake: "N/A",
        bestHabit: "N/A",
        riskManagementFeedback: "N/A",
        recommendations: [],
      });
    }
  } catch (error: any) {
    console.error(
      "Analytics Report Error:",
      error
    );

    return NextResponse.json({
      performanceSummary:
        error?.message ||
        "Failed to generate report",
      bestSymbol: "N/A",
      worstSymbol: "N/A",
      mostCommonEmotion: "N/A",
      biggestMistake: "N/A",
      bestHabit: "N/A",
      riskManagementFeedback: "N/A",
      recommendations: [],
    });
  }
}
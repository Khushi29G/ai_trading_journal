import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const journal = await request.json();

    const prompt = `
You are an elite trading mentor.

Analyze this trade journal.

IMPORTANT:
Return ONLY valid JSON.
Do not wrap in markdown.
Do not add explanations outside JSON.

Format:

{
  "score": 0,
  "strengths": [
    "",
    "",
    ""
  ],
  "weaknesses": [
    "",
    "",
    ""
  ],
  "recommendations": [
    "",
    "",
    ""
  ]
}

Trade Journal:

${JSON.stringify(journal)}
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

    const parsed = JSON.parse(raw);

    return NextResponse.json(parsed);

  } catch (error) {
    console.error(error);

    return NextResponse.json({
      score: 0,
      strengths: [],
      weaknesses: [],
      recommendations: [],
    });
  }
}
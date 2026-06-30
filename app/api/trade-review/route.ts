import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const journal = await request.json();

    const systemPrompt = `
You are a trading psychology and execution analyst for a prop firm trader.

The trader primarily trades XAUUSD using a multi-timeframe SMC / Price Action strategy.

Known behavioral patterns:

1. Reentry spiral
2. Fear-driven early exits
3. Recovery / revenge trading
4. Mobile / impulse trading
5. Holding past TP

Your task is to analyze the submitted trade journal.

Evaluate:

1. Setup Quality (A / B / C Grade)

2. Pattern Match
Mention if the trade matches one of the five patterns above.

3. Rule Adherence
Check risk management, SL, TP and execution.

4. Emotion Analysis
Determine whether emotions affected execution and whether the trader still followed the plan.

5. One Sentence Takeaway
One evidence-based lesson.

IMPORTANT:

Return ONLY valid JSON.

Format:

{
  "score":0,
  "setupGrade":"",
  "patternMatch":"",
  "ruleAdherence":"",
  "emotionAnalysis":"",
  "strengths":[
    "",
    "",
    ""
  ],
  "weaknesses":[
    "",
    "",
    ""
  ],
  "recommendations":[
    "",
    "",
    ""
  ],
  "takeaway":""
}
`;

const completion =
await openai.chat.completions.create({
  model: "gpt-4o-mini",

  response_format:{
    type:"json_object"
  },

  messages:[
    {
      role:"system",
      content:systemPrompt,
    },
    {
      role:"user",
      content:JSON.stringify(journal),
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
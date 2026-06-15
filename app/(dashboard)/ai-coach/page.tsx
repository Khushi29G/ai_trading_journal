import AIAnalysis from "@/components/ai/ai-analysis";

export default function AICoachPage() {
  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-5xl font-bold text-white">
          🤖 AI Trading Coach
        </h1>

        <p className="text-slate-400 mt-3 text-lg">
          Personalized insights generated from your
          trading journals and performance.
        </p>

      </div>

      <AIAnalysis />

    </div>
  );
}
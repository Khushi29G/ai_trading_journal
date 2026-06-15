"use client";

import { useState } from "react";
import {
  Sparkles,
  Trophy,
  AlertTriangle,
  Brain,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";

export default function AIReport() {
  const [loading, setLoading] =
    useState(false);

  const [report, setReport] =
    useState<any>(null);

  async function generateReport() {
    try {
      setLoading(true);

      const response = await fetch(
        "/api/analytics-report"
      );

      const data =
        await response.json();

      setReport(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">

      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-8">

        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
            <Sparkles className="text-emerald-400" />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-white">
              AI Analytics Report
            </h2>

            <p className="text-slate-400">
              AI-powered performance review
            </p>
          </div>

        </div>

        <button
          onClick={generateReport}
          disabled={loading}
          className="mt-6 bg-emerald-500 hover:bg-emerald-600 text-black font-semibold px-6 py-3 rounded-xl"
        >
          {loading
            ? "Generating..."
            : "Generate Report"}
        </button>

      </div>

      {report && (
        <>
          {/* Top Cards */}

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

            <Card
              title="Best Symbol"
              value={report.bestSymbol}
              icon={<Trophy />}
              color="text-emerald-400"
            />

            <Card
              title="Worst Symbol"
              value={report.worstSymbol}
              icon={<AlertTriangle />}
              color="text-red-400"
            />

            <Card
              title="Emotion"
              value={report.mostCommonEmotion}
              icon={<Brain />}
              color="text-cyan-400"
            />

            <Card
              title="Best Habit"
              value={report.bestHabit}
              icon={<TrendingUp />}
              color="text-violet-400"
            />

          </div>

          {/* Summary */}

          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8">

            <h3 className="text-2xl font-bold text-white mb-4">
              Performance Summary
            </h3>

            <p className="text-slate-300 leading-8">
              {report.performanceSummary}
            </p>

          </div>

          {/* Mistake */}

          <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-8">

            <h3 className="text-2xl font-bold text-red-400 mb-4">
              Biggest Mistake
            </h3>

            <p className="text-slate-300">
              {report.biggestMistake}
            </p>

          </div>

          {/* Risk */}

          <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-8">

            <div className="flex items-center gap-3 mb-4">

              <ShieldCheck className="text-emerald-400" />

              <h3 className="text-2xl font-bold text-white">
                Risk Management Feedback
              </h3>

            </div>

            <p className="text-slate-300">
              {report.riskManagementFeedback}
            </p>

          </div>

          {/* Recommendations */}

          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8">

            <h3 className="text-2xl font-bold text-white mb-6">
              Top Recommendations
            </h3>

            <div className="space-y-4">

              {report.recommendations?.map(
                (
                  item: string,
                  index: number
                ) => (
                  <div
                    key={index}
                    className="rounded-xl bg-slate-950 border border-slate-800 p-4 text-slate-300"
                  >
                    {index + 1}. {item}
                  </div>
                )
              )}

            </div>

          </div>
        </>
      )}

    </div>
  );
}

function Card({
  title,
  value,
  icon,
  color,
}: any) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">

      <div className={`mb-4 ${color}`}>
        {icon}
      </div>

      <p className="text-slate-400 text-sm">
        {title}
      </p>

      <h3 className="text-white text-xl font-bold mt-2">
        {value}
      </h3>

    </div>
  );
}
"use client";

import { useState } from "react";

import {
  Brain,
  Sparkles,
  AlertTriangle,
  TrendingUp,
  Target,
  FileText,
} from "lucide-react";

export default function AIAnalysis() {
  const [analysis, setAnalysis] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function runAnalysis() {
    try {
      setLoading(true);

      const response = await fetch(
        "/api/ai-analysis"
      );

      const data =
        await response.json();

      setAnalysis(data.analysis);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">

      {/* Hero */}

      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-8">

        <div className="flex items-center gap-4">

          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center">

            <Brain className="h-8 w-8 text-emerald-400" />

          </div>

          <div>

            <h2 className="text-3xl font-bold text-white">
              AI Journal Analysis
            </h2>

            <p className="text-slate-400 mt-1">
              Discover emotional patterns,
              strengths and mistakes.
            </p>

          </div>

        </div>

        <button
          onClick={runAnalysis}
          disabled={loading}
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-black hover:bg-emerald-600 transition disabled:opacity-50"
        >
          <Sparkles size={18} />

          {loading
            ? "Analyzing..."
            : "Analyze My Journals"}
        </button>

      </div>

      {analysis && (
        <>
          {/* Insight Cards */}

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">

              <Target className="text-cyan-400 mb-4" />

              <h3 className="text-white font-semibold text-lg">
                Trading Discipline
              </h3>

              <p className="text-slate-400 mt-2">
                Following structured plans and
                waiting for confirmations improves
                trading quality.
              </p>

            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">

              <AlertTriangle className="text-red-400 mb-4" />

              <h3 className="text-white font-semibold text-lg">
                Biggest Risk
              </h3>

              <p className="text-slate-400 mt-2">
                Incomplete journaling and missing
                trade reflections reduce learning.
              </p>

            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">

              <TrendingUp className="text-emerald-400 mb-4" />

              <h3 className="text-white font-semibold text-lg">
                Positive Habit
              </h3>

              <p className="text-slate-400 mt-2">
                Consistent trade planning and
                emotional awareness.
              </p>

            </div>

          </div>

          {/* Analysis Panel */}

          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl overflow-hidden">

            <div className="flex items-center gap-3 px-8 py-5 border-b border-slate-800">

              <FileText className="text-emerald-400" />

              <h3 className="text-2xl font-bold text-white">
                Detailed AI Analysis
              </h3>

            </div>

            <div className="max-h-[700px] overflow-y-auto p-8">

              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-8">

                <pre className="whitespace-pre-wrap text-slate-200 leading-8 text-[15px] font-sans">
                  {analysis}
                </pre>

              </div>

            </div>

          </div>
        </>
      )}

    </div>
  );
}
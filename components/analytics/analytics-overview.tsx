"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  Trophy,
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  Star,
} from "lucide-react";

const supabase = createClient();

export default function AnalyticsOverview() {
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    loadAnalytics();
  }, []);

  async function loadAnalytics() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data: trades } = await supabase
      .from("trades")
      .select("*")
      .eq("user_id", user.id);

    const { data: journals } = await supabase
      .from("trade_journals")
      .select("*")
      .eq("user_id", user.id);

    const totalTrades = trades?.length || 0;

    const winningTrades =
      trades?.filter((t) => Number(t.pnl) > 0) || [];

    const losingTrades =
      trades?.filter((t) => Number(t.pnl) < 0) || [];

    const winRate =
      totalTrades > 0
        ? (
            (winningTrades.length / totalTrades) *
            100
          ).toFixed(1)
        : "0";

    const avgWin =
      winningTrades.length > 0
        ? (
            winningTrades.reduce(
              (sum, t) => sum + Number(t.pnl),
              0
            ) / winningTrades.length
          ).toFixed(2)
        : "0";

    const avgLoss =
      losingTrades.length > 0
        ? (
            Math.abs(
              losingTrades.reduce(
                (sum, t) => sum + Number(t.pnl),
                0
              ) / losingTrades.length
            )
          ).toFixed(2)
        : "0";

    const symbolPnL: Record<string, number> = {};

    trades?.forEach((trade) => {
      symbolPnL[trade.symbol] =
        (symbolPnL[trade.symbol] || 0) +
        Number(trade.pnl);
    });

    const sortedSymbols = Object.entries(
      symbolPnL
    ).sort((a, b) => b[1] - a[1]);

    const bestSymbol =
      sortedSymbols[0]?.[0] || "N/A";

    const worstSymbol =
      sortedSymbols[sortedSymbols.length - 1]
        ?. [0] || "N/A";

    const emotions: Record<string, number> = {};

    journals?.forEach((journal) => {
      if (!journal.emotions) return;

      emotions[journal.emotions] =
        (emotions[journal.emotions] || 0) + 1;
    });

    setAnalytics({
      totalTrades,
      winRate,
      avgWin,
      avgLoss,
      bestSymbol,
      worstSymbol,
      emotions,
    });
  }

  if (!analytics)
    return (
      <div className="text-slate-400">
        Loading analytics...
      </div>
    );

  return (
    <div className="space-y-8">

      {/* Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-5">

        <MetricCard
          title="Total Trades"
          value={analytics.totalTrades}
          icon={<BarChart3 />}
          color="emerald"
        />

        <MetricCard
          title="Win Rate"
          value={`${analytics.winRate}%`}
          icon={<TrendingUp />}
          color="blue"
        />

        <MetricCard
          title="Average Win"
          value={`$${analytics.avgWin}`}
          icon={<DollarSign />}
          color="violet"
        />

        <MetricCard
          title="Average Loss"
          value={`$${analytics.avgLoss}`}
          icon={<TrendingDown />}
          color="red"
        />

        <MetricCard
          title="Best Symbol"
          value={analytics.bestSymbol}
          icon={<Trophy />}
          color="yellow"
        />

        <MetricCard
          title="Worst Symbol"
          value={analytics.worstSymbol}
          icon={<Star />}
          color="cyan"
        />

      </div>

      {/* Chart + Symbol */}

      <div className="grid lg:grid-cols-2 gap-6">

        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6">

          <h3 className="text-xl font-semibold text-white mb-6">
            PnL Over Time
          </h3>

          <div className="h-[320px] rounded-2xl border border-slate-800 bg-gradient-to-br from-emerald-500/20 to-transparent flex items-center justify-center">
            <span className="text-slate-400">
              Recharts Graph Here
            </span>
          </div>

        </div>

        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6">

          <h3 className="text-xl font-semibold text-white mb-8">
            Top Symbol
          </h3>

          <div className="flex flex-col items-center">

            <div className="w-52 h-52 rounded-full border-[18px] border-emerald-500 flex items-center justify-center">

              <div className="text-center">
                <h2 className="text-5xl font-bold text-white">
                  {analytics.winRate}%
                </h2>

                <p className="text-slate-400">
                  Win Rate
                </p>
              </div>

            </div>

            <h2 className="text-2xl font-bold text-white mt-8">
              {analytics.bestSymbol}
            </h2>

          </div>

        </div>

      </div>

      {/* Emotion Analysis */}

      <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-8">

        <h2 className="text-2xl font-semibold text-white mb-8">
          Emotion Analysis
        </h2>

       {Object.entries(
  analytics.emotions as Record<string, number>
).map(([emotion, count]) => {
           const totalEmotions = Object.values(
  analytics.emotions as Record<string, number>
).reduce(
  (a, b) => a + b,
  0
);

const percentage =
  totalEmotions > 0
    ? (count / totalEmotions) * 100
    : 0;

            return (
              <div
                key={emotion}
                className="mb-6"
              >
                <div className="flex justify-between text-white mb-2">
                  <span>{emotion}</span>
                  <span>
                    {count} (
                    {percentage.toFixed(0)}%)
                  </span>
                </div>

                <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">

                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{
                      width: `${percentage}%`,
                    }}
                  />

                </div>
              </div>
            );
          }
        )}

      </div>

    </div>
  );
}

function MetricCard({
  title,
  value,
  icon,
  color,
}: any) {
  const colors: any = {
    emerald: "text-emerald-400",
    blue: "text-blue-400",
    violet: "text-violet-400",
    red: "text-red-400",
    yellow: "text-yellow-400",
    cyan: "text-cyan-400",
  };

  return (
    <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 hover:border-emerald-500/40 transition-all">

      <div className="flex items-center justify-between">

        <p className="text-slate-400 text-sm">
          {title}
        </p>

        <div className={colors[color]}>
          {icon}
        </div>

      </div>

      <h2 className="text-3xl font-bold text-white mt-4">
        {value}
      </h2>

    </div>
  );
}
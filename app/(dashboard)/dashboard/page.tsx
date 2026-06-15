"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
const supabase = createClient();

import DashboardStats from "@/components/dashboard/dashboard-stats";
import DashboardChart from "@/components/dashboard/dashboard-chart";
import WeeklyReview from "@/components/dashboard/weekly-review";
import TradingCalendar from "@/components/dashboard/trading-calendar";

export default function DashboardPage() {
  const [chartData, setChartData] =
    useState<any[]>([]);

  useEffect(() => {
    loadChart();
  }, []);

  async function loadChart() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { data, error } = await supabase
    .from("trades")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", {
      ascending: true,
    });

  if (error) {
    console.error(error);
    return;
  }

  const trades = data || [];

  let runningPnL = 0;

  const formattedData = trades.map(
    (trade, index) => {
      runningPnL += Number(
        trade.pnl || 0
      );

     return {
  name: new Date(
    trade.created_at
  ).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  }),
  pnl: runningPnL,
};
    }
  );

  console.log(
    "Equity Curve Data:",
    formattedData
  );

  if (formattedData.length === 1) {
  setChartData([
    {
      name: "Start",
      pnl: 0,
    },
    ...formattedData,
  ]);
} else {
  setChartData(formattedData);
}
}

  return (
  <div className="min-h-screen bg-slate-950 text-white p-6">
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold">
          AI Trading Journal
        </h1>

        <p className="text-slate-400 mt-2">
          Track, Analyze & Improve
          Your Trading Performance
        </p>
      </div>

      <DashboardStats />

      <DashboardChart
  data={chartData}
/>

<TradingCalendar />

<WeeklyReview />
    </div>
  </div>
);
}
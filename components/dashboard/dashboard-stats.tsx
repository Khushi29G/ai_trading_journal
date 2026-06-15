"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
const supabase = createClient();
import StatCard from "./stat-card";

export default function DashboardStats() {
const [stats, setStats] = useState({
  totalTrades: 0,
  winningTrades: 0,
  losingTrades: 0,
  netPnl: 0,
  winRate: 0,
  initialBalance: 10000,
  currentBalance: 10000,
});

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    const {
  data: { user },
} = await supabase.auth.getUser();

if (!user) return;

const { data } = await supabase
  .from("trades")
  .select("*")
  .eq("user_id", user.id);

    const trades = data || [];

    const totalTrades = trades.length;

    const winningTrades = trades.filter(
      (trade) => Number(trade.pnl) > 0
    ).length;

    const losingTrades = trades.filter(
      (trade) => Number(trade.pnl) < 0
    ).length;

    const netPnl = trades.reduce(
      (sum, trade) =>
        sum + Number(trade.pnl || 0),
      0
    );

    const winRate =
      totalTrades > 0
        ? (
            (winningTrades /
              totalTrades) *
            100
          ).toFixed(1)
        : "0";

    const initialBalance =
  typeof window !== "undefined"
    ? Number(
        localStorage.getItem("initialBalance")
      ) || 10000
    : 10000;

const currentBalance =
  initialBalance + netPnl;

setStats({
  totalTrades,
  winningTrades,
  losingTrades,
  netPnl,
  winRate: Number(winRate),
  initialBalance,
  currentBalance,
});
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-7 gap-4">

      <StatCard
        title="Total Trades"
        value={stats.totalTrades.toString()}
      />

      <StatCard
        title="Winning"
        value={stats.winningTrades.toString()}
      />

      <StatCard
        title="Losing"
        value={stats.losingTrades.toString()}
      />

      <StatCard
  title="Initial Balance"
  value={`$${stats.initialBalance}`}
/>

      <StatCard
        title="Net PnL"
        value={`$${stats.netPnl}`}
      />

      <StatCard
        title="Win Rate"
        value={`${stats.winRate}%`}
      />

      <StatCard
  title="Current Balance"
  value={`$${stats.currentBalance}`}
/>

    </div>
  );
}
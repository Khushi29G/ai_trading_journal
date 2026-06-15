"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export default function TradesTable() {
  const [trades, setTrades] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [editingTrade, setEditingTrade] = useState<any>(null);

  useEffect(() => {
    loadTrades();
  }, []);

  async function loadTrades() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("trades")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", {
        ascending: false,
      });

    setTrades(data || []);
  }

  async function deleteTrade(id: string) {
    await supabase.from("trades").delete().eq("id", id);

    loadTrades();
  }

  async function updateTrade() {
    await supabase
      .from("trades")
      .update({
        symbol: editingTrade.symbol,
        trade_type: editingTrade.trade_type,
        entry_point: editingTrade.entry_point,
        exit_point: editingTrade.exit_point,
        lot_size: editingTrade.lot_size,
        pnl: editingTrade.pnl,
      })
      .eq("id", editingTrade.id);

    setEditingTrade(null);
    loadTrades();
  }

  const filteredTrades = trades
    .filter((trade) =>
      trade.symbol?.toLowerCase().includes(search.toLowerCase())
    )
    .filter((trade) => {
      if (filter === "WINNERS") return trade.pnl > 0;
      if (filter === "LOSERS") return trade.pnl < 0;
      return true;
    });

  return (
    <div className="border rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">
        Trade History
      </h2>

      <div className="flex gap-3 mb-4">
        <input
          placeholder="Search Symbol..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded flex-1"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="ALL">All Trades</option>
          <option value="WINNERS">Winners</option>
          <option value="LOSERS">Losers</option>
        </select>
      </div>

      <div className="space-y-3">
        {filteredTrades.map((trade) => (
          <div
            key={trade.id}
            className="bg-slate-800 border border-slate-700 rounded-xl p-5 flex justify-between items-center hover:border-emerald-500 transition-all"
          >
            <div>
              <h3 className="font-bold text-lg text-white">
                {trade.symbol}
              </h3>

              <p className="text-slate-400">
                {trade.trade_type}
              </p>

              <p className="text-slate-300 text-sm">
                Entry: {trade.entry_point ?? "-"}
              </p>

              <p className="text-slate-300 text-sm">
                Exit: {trade.exit_point ?? "-"}
              </p>

              <p className="text-slate-300 text-sm">
                Lot Size: {trade.lot_size ?? "-"}
              </p>

              <p
                className={`font-semibold ${
                  trade.pnl > 0
                    ? "text-emerald-400"
                    : "text-red-400"
                }`}
              >
                PnL: ${trade.pnl}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setEditingTrade(trade)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                Edit
              </button>

              <button
                onClick={() => deleteTrade(trade.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingTrade && (
        <div className="border rounded-xl p-4 mt-6">
          <h3 className="font-semibold mb-3">
            Edit Trade
          </h3>

          <select
            value={editingTrade.symbol}
            onChange={(e) =>
              setEditingTrade({
                ...editingTrade,
                symbol: e.target.value,
              })
            }
            className="border p-2 rounded w-full mb-2"
          >
            <option value="XAUUSD">XAUUSD</option>
            <option value="BTCUSD">BTCUSD</option>
            <option value="EURUSD">EURUSD</option>
            <option value="GBPUSD">GBPUSD</option>
            <option value="USDJPY">USDJPY</option>
            <option value="AUDUSD">AUDUSD</option>
            <option value="USDCAD">USDCAD</option>
            <option value="NQ">NQ</option>
          </select>

          <select
            value={editingTrade.trade_type}
            onChange={(e) =>
              setEditingTrade({
                ...editingTrade,
                trade_type: e.target.value,
              })
            }
            className="border p-2 rounded w-full mb-2"
          >
            <option value="BUY">BUY</option>
            <option value="SELL">SELL</option>
          </select>

          <input
            type="number"
            placeholder="Entry Point"
            value={editingTrade.entry_point || ""}
            onChange={(e) =>
              setEditingTrade({
                ...editingTrade,
                entry_point: Number(e.target.value),
              })
            }
            className="border p-2 rounded w-full mb-2"
          />

          <input
            type="number"
            placeholder="Exit Point"
            value={editingTrade.exit_point || ""}
            onChange={(e) =>
              setEditingTrade({
                ...editingTrade,
                exit_point: Number(e.target.value),
              })
            }
            className="border p-2 rounded w-full mb-2"
          />

          <input
            type="number"
            placeholder="Lot Size"
            value={editingTrade.lot_size || ""}
            onChange={(e) =>
              setEditingTrade({
                ...editingTrade,
                lot_size: Number(e.target.value),
              })
            }
            className="border p-2 rounded w-full mb-2"
          />

          <input
            type="number"
            placeholder="PnL"
            value={editingTrade.pnl || ""}
            onChange={(e) =>
              setEditingTrade({
                ...editingTrade,
                pnl: Number(e.target.value),
              })
            }
            className="border p-2 rounded w-full mb-3"
          />

          <div className="flex gap-2">
            <button
              onClick={updateTrade}
              className="bg-black text-white px-4 py-2 rounded"
            >
              Save Changes
            </button>

            <button
              onClick={() => setEditingTrade(null)}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
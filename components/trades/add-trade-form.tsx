"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export default function AddTradeForm() {
  const [symbol, setSymbol] = useState("XAUUSD");
  const [tradeType, setTradeType] = useState("BUY");
  const [entryPoint, setEntryPoint] = useState("");
  const [exitPoint, setExitPoint] = useState("");
  const [lotSize, setLotSize] = useState("");
  const [pnl, setPnl] = useState("");

  async function addTrade() {
    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        alert(sessionError.message);
        return;
      }

      const user = session?.user;

      if (!user) {
        alert("Please login first");
        return;
      }

      const { error } = await supabase.from("trades").insert({
        user_id: user.id,
        symbol,
        trade_type: tradeType,
        entry_point: Number(entryPoint),
        exit_point: Number(exitPoint),
        lot_size: Number(lotSize),
        pnl: Number(pnl),
        created_at: new Date().toISOString(),
      });

      if (error) {
        console.error(error);
        alert(error.message);
        return;
      }

      setSymbol("XAUUSD");
      setTradeType("BUY");
      setEntryPoint("");
      setExitPoint("");
      setLotSize("");
      setPnl("");

      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  }

  return (
    <div className="border rounded-xl p-4 space-y-3">
      <h2 className="font-semibold text-lg">Add Trade</h2>

      <select
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        className="border p-2 rounded w-full"
      >
        <option value="XAUUSD">XAUUSD (Gold)</option>
        <option value="BTCUSD">BTCUSD (Bitcoin)</option>
        <option value="EURUSD">EURUSD</option>
        <option value="GBPUSD">GBPUSD</option>
        <option value="USDJPY">USDJPY</option>
        <option value="AUDUSD">AUDUSD</option>
        <option value="USDCAD">USDCAD</option>
        <option value="NQ">NQ (Nasdaq Futures)</option>
      </select>

      <select
        value={tradeType}
        onChange={(e) => setTradeType(e.target.value)}
        className="border p-2 rounded w-full"
      >
        <option value="BUY">BUY</option>
        <option value="SELL">SELL</option>
      </select>

      <input
        type="number"
        step="0.01"
        value={entryPoint}
        onChange={(e) => setEntryPoint(e.target.value)}
        placeholder="Entry Point"
        className="border p-2 rounded w-full"
      />

      <input
        type="number"
        step="0.01"
        value={exitPoint}
        onChange={(e) => setExitPoint(e.target.value)}
        placeholder="Exit Point"
        className="border p-2 rounded w-full"
      />

      <input
        type="number"
        step="0.01"
        value={lotSize}
        onChange={(e) => setLotSize(e.target.value)}
        placeholder="Lot Size"
        className="border p-2 rounded w-full"
      />

      <input
        type="number"
        step="0.01"
        value={pnl}
        onChange={(e) => setPnl(e.target.value)}
        placeholder="PnL"
        className="border p-2 rounded w-full"
      />

      <button
        onClick={addTrade}
        className="bg-black text-white px-4 py-2 rounded w-full"
      >
        Save Trade
      </button>
    </div>
  );
}
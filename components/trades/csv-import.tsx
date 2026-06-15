"use client";

import Papa from "papaparse";
import { createClient } from "@/lib/supabase/client";
const supabase = createClient();

export default function CsvImport() {
  async function handleFile(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    Papa.parse(file, {
      header: true,

      complete: async (results) => {
        const rows = results.data as any[];

       const {
  data: { user },
} = await supabase.auth.getUser();

if (!user) {
  alert("Please login first");
  return;
}

const trades = rows.map((row) => ({
  user_id: user.id,
  symbol:
    row.symbol ||
    row.Symbol ||
    "",

  trade_type:
    row.trade_type ||
    row.Type ||
    "BUY",

  pnl: Number(
    row.pnl ||
    row.PnL ||
    row.Profit ||
    0
  ),
}));

        const { error } =
          await supabase
            .from("trades")
            .insert(trades);

        if (error) {
          alert(error.message);
          return;
        }

        alert(
          `${trades.length} trades imported`
        );

        window.location.reload();
      },
    });
  }

  return (
    <div className="border rounded-xl p-4">

      <h2 className="font-semibold mb-3">
        Import CSV
      </h2>

      <input
        type="file"
        accept=".csv"
        onChange={handleFile}
      />

    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import UploadImage from "./upload-image";

const supabase = createClient();

export default function JournalForm() {
  const [trades, setTrades] = useState<any[]>([]);
  const [tradeId, setTradeId] = useState("");

  const [preTrade, setPreTrade] = useState("");
  const [postTrade, setPostTrade] = useState("");
  const [emotions, setEmotions] = useState("");
  const [lessons, setLessons] = useState("");
  const [tags, setTags] = useState("");
  const [rating, setRating] = useState("");

  const [beforeScreenshot, setBeforeScreenshot] =
    useState("");
  const [afterScreenshot, setAfterScreenshot] =
    useState("");

  useEffect(() => {
    loadTrades();
  }, []);

 async function loadTrades() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { data, error } = await supabase
    .from("trades")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error(error);
    return;
  }

  setTrades(data || []);
}

  async function saveJournal() {
  if (!tradeId) {
    alert("Please select a trade");
    return;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    alert("Please login first");
    return;
  }

  const { error } = await supabase
    .from("trade_journals")
    .insert({
      user_id: user.id,
      trade_id: tradeId,
      pre_trade_analysis: preTrade,
      post_trade_analysis: postTrade,
      emotions,
      lessons,
      tags,
      rating: Number(rating),
      before_screenshot_url:
        beforeScreenshot,
      after_screenshot_url:
        afterScreenshot,
    });

  if (error) {
    alert(error.message);
    return;
  }

  alert("Journal Saved Successfully");

  setTradeId("");
  setPreTrade("");
  setPostTrade("");
  setEmotions("");
  setLessons("");
  setTags("");
  setRating("");
  setBeforeScreenshot("");
  setAfterScreenshot("");

  window.location.reload();
}

  return (
    <div className="border rounded-xl p-6 space-y-4">
      <h2 className="text-xl font-semibold">
        Create Journal
      </h2>

      <select
        value={tradeId}
        onChange={(e) =>
          setTradeId(e.target.value)
        }
        className="border p-2 rounded w-full"
      >
        <option value="">
          Select Trade
        </option>

        {trades.map((trade) => (
          <option
            key={trade.id}
            value={trade.id}
          >
            {trade.symbol} | PnL:
            {trade.pnl}
          </option>
        ))}
      </select>

      <textarea
        placeholder="Pre Trade Analysis"
        value={preTrade}
        onChange={(e) =>
          setPreTrade(e.target.value)
        }
        className="border p-2 rounded w-full"
      />

      <textarea
        placeholder="Post Trade Analysis"
        value={postTrade}
        onChange={(e) =>
          setPostTrade(e.target.value)
        }
        className="border p-2 rounded w-full"
      />

      <input
        placeholder="Emotions"
        value={emotions}
        onChange={(e) =>
          setEmotions(e.target.value)
        }
        className="border p-2 rounded w-full"
      />

      <input
        placeholder="Lessons Learned"
        value={lessons}
        onChange={(e) =>
          setLessons(e.target.value)
        }
        className="border p-2 rounded w-full"
      />

      <input
        placeholder="Tags"
        value={tags}
        onChange={(e) =>
          setTags(e.target.value)
        }
        className="border p-2 rounded w-full"
      />

      <input
        type="number"
        placeholder="Rating (1-10)"
        value={rating}
        onChange={(e) =>
          setRating(e.target.value)
        }
        className="border p-2 rounded w-full"
      />

      <div>
        <p className="font-medium mb-2">
          Before Trade Screenshot
        </p>

        <UploadImage
          onUpload={(url) =>
            setBeforeScreenshot(url)
          }
        />

        {beforeScreenshot && (
          <img
            src={beforeScreenshot}
            alt="before"
            className="h-40 rounded mt-3"
          />
        )}
      </div>

      <div>
        <p className="font-medium mb-2">
          After Trade Screenshot
        </p>

        <UploadImage
          onUpload={(url) =>
            setAfterScreenshot(url)
          }
        />

        {afterScreenshot && (
          <img
            src={afterScreenshot}
            alt="after"
            className="h-40 rounded mt-3"
          />
        )}
      </div>

      <button
        onClick={saveJournal}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Save Journal
      </button>
    </div>
  );
}
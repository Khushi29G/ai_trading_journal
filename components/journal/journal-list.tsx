"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
const supabase = createClient();

export default function JournalList() {
  const [journals, setJournals] = useState<any[]>([]);
  const [reviews, setReviews] = useState<
  Record<string, any>
>({});
  const [editingJournal, setEditingJournal] =
    useState<any>(null);

  useEffect(() => {
    loadJournals();
  }, []);

 async function loadJournals() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { data } = await supabase
    .from("trade_journals")
    .select(`
      *,
      trades (
        symbol,
        pnl,
        trade_type
      )
    `)
    .eq("user_id", user.id)
    .order("created_at", {
      ascending: false,
    });

  setJournals(data || []);
}

  async function saveEdit() {
    await supabase
      .from("trade_journals")
      .update({
        lessons:
          editingJournal.lessons,
        emotions:
          editingJournal.emotions,
        tags:
          editingJournal.tags,
        rating:
          editingJournal.rating,
      })
      .eq("id", editingJournal.id);

    setEditingJournal(null);

    loadJournals();
  }

  return (
    <div className="border rounded-xl p-6">

      <h2 className="text-xl font-semibold mb-4">
        Journal History
      </h2>

      <div className="space-y-4">

        {journals.map((journal) => (
          <div
            key={journal.id}
            className="bg-slate-900/70 backdrop-blur-xl border border-slate-700 rounded-3xl p-6 hover:border-emerald-500/40 transition-all"
          >
           <h3 className="text-xl font-bold text-white">
  {journal.trades?.symbol}
</h3>

            <p>
              PnL:
              {" "}
              {journal.trades?.pnl}
            </p>

           <p className="text-yellow-400 font-semibold">
  ⭐ {journal.rating}/10
</p>

           <p className="text-cyan-400">
  😊 {journal.emotions}
</p>

            <p className="text-purple-400">
  🏷️ {journal.tags}
</p>
            <p>
              Lesson:
              {" "}
              {journal.lessons}
            </p>

            {journal.before_screenshot_url && (
  <div className="mt-3">
    <p className="font-semibold">
      Before Trade
    </p>

    <img
      src={
        journal.before_screenshot_url
      }
      alt="before"
      className="h-40 rounded"
    />
  </div>
)}

{journal.after_screenshot_url && (
  <div className="mt-3">
    <p className="font-semibold">
      After Trade
    </p>

    <img
      src={
        journal.after_screenshot_url
      }
      alt="after"
      className="h-40 rounded"
    />
  </div>
)}

            <div className="flex gap-3 mt-3">

              <button
                onClick={() =>
                  setEditingJournal(
                    journal
                  )
                }
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl"
              >
                Edit
              </button>

              <button
                onClick={async () => {
                  const response =
                    await fetch(
                      "/api/trade-review",
                      {
                        method: "POST",
                        headers: {
                          "Content-Type":
                            "application/json",
                        },
                        body: JSON.stringify(
                          journal
                        ),
                      }
                    );

                  const data =
                    await response.json();

                  setReviews((prev) => ({
  ...prev,
  [journal.id]: data,
}));
                }}
               className="bg-emerald-500 hover:bg-emerald-600 text-black font-semibold px-4 py-2 rounded-xl"
              >
                Analyze Trade
              </button>

            </div>

           {reviews[journal.id] && (
  <div className="mt-6">

    <div className="grid md:grid-cols-4 gap-4 mb-5">

      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
        <p className="text-slate-400 text-sm">
          Trade Score
        </p>

        <h3 className="text-3xl font-bold text-emerald-400 mt-2">
          {reviews[journal.id].score}/100
        </h3>
      </div>

      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
        <p className="text-slate-400 text-sm">
          Strengths
        </p>

        <h3 className="text-cyan-400 font-bold mt-2">
          {reviews[journal.id].strengths?.length || 0}
        </h3>
      </div>

      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
        <p className="text-slate-400 text-sm">
          Weaknesses
        </p>

        <h3 className="text-red-400 font-bold mt-2">
          {reviews[journal.id].weaknesses?.length || 0}
        </h3>
      </div>

      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
        <p className="text-slate-400 text-sm">
          Recommendations
        </p>

        <h3 className="text-violet-400 font-bold mt-2">
          {reviews[journal.id].recommendations?.length || 0}
        </h3>
      </div>

    </div>

    <div className="grid lg:grid-cols-3 gap-4">

      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
        <h3 className="text-emerald-400 font-semibold mb-4">
          ✅ Strengths
        </h3>

        <ul className="space-y-2 text-slate-300">
          {reviews[journal.id].strengths?.map(
            (item: string, index: number) => (
              <li key={index}>• {item}</li>
            )
          )}
        </ul>
      </div>

      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
        <h3 className="text-red-400 font-semibold mb-4">
          ⚠️ Weaknesses
        </h3>

        <ul className="space-y-2 text-slate-300">
          {reviews[journal.id].weaknesses?.map(
            (item: string, index: number) => (
              <li key={index}>• {item}</li>
            )
          )}
        </ul>
      </div>

      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
        <h3 className="text-cyan-400 font-semibold mb-4">
          💡 Recommendations
        </h3>

        <ul className="space-y-2 text-slate-300">
          {reviews[journal.id].recommendations?.map(
            (item: string, index: number) => (
              <li key={index}>• {item}</li>
            )
          )}
        </ul>
      </div>

    </div>

  </div>
)}
          </div>
        ))}

      </div>

      {editingJournal && (
        <div className="border rounded-lg p-4 mt-6">

          <h3 className="font-semibold mb-3">
            Edit Journal
          </h3>

          <input
            value={
              editingJournal.emotions
            }
            onChange={(e) =>
              setEditingJournal({
                ...editingJournal,
                emotions:
                  e.target.value,
              })
            }
            className="border p-2 w-full mb-2"
            placeholder="Emotion"
          />

          <input
            value={
              editingJournal.tags
            }
            onChange={(e) =>
              setEditingJournal({
                ...editingJournal,
                tags:
                  e.target.value,
              })
            }
            className="border p-2 w-full mb-2"
            placeholder="Tags"
          />

          <textarea
            value={
              editingJournal.lessons
            }
            onChange={(e) =>
              setEditingJournal({
                ...editingJournal,
                lessons:
                  e.target.value,
              })
            }
            className="border p-2 w-full mb-2"
            placeholder="Lessons"
          />

          <input
            type="number"
            value={
              editingJournal.rating
            }
            onChange={(e) =>
              setEditingJournal({
                ...editingJournal,
                rating:
                  e.target.value,
              })
            }
            className="border p-2 w-full mb-3"
            placeholder="Rating"
          />

          <button
            onClick={saveEdit}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Save Changes
          </button>

        </div>
      )}

    </div>
  );
}
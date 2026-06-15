"use client";

import { useState } from "react";

export default function WeeklyReview() {
  const [review, setReview] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function generateReview() {
    setLoading(true);

    const response = await fetch(
      "/api/weekly-review"
    );

    const data =
      await response.json();

    setReview(data.review);

    setLoading(false);
  }

  return (
   <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">

      <h2 className="text-xl font-semibold mb-4">
        AI Weekly Review
      </h2>

      <button
        onClick={generateReview}
        className="bg-emerald-500 hover:bg-emerald-600 text-black font-semibold px-5 py-2 rounded-xl transition-all"
      >
        {loading
          ? "Generating..."
          : "Generate Weekly Review"}
      </button>

      {review && (
        <div className="mt-4 border rounded p-4 whitespace-pre-wrap">
          {review}
        </div>
      )}

    </div>
  );
}
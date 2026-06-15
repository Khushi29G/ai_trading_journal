"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addMonths,
  subMonths,
  isSameMonth,
} from "date-fns";

const supabase = createClient();

interface DayStats {
  trades: number;
  pnl: number;
}

export default function TradingCalendar() {
  const [monthData, setMonthData] = useState<
    Record<string, DayStats>
  >({});

  const [currentMonth, setCurrentMonth] =
    useState(new Date());

  useEffect(() => {
    loadCalendar();
  }, []);

  async function loadCalendar() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("trades")
      .select("*")
      .eq("user_id", user.id);

    const grouped: Record<
      string,
      DayStats
    > = {};

    (data || []).forEach((trade) => {
      const day = format(
        new Date(trade.created_at),
        "yyyy-MM-dd"
      );

      if (!grouped[day]) {
        grouped[day] = {
          trades: 0,
          pnl: 0,
        };
      }

      grouped[day].trades += 1;
      grouped[day].pnl += Number(
        trade.pnl || 0
      );
    });

    setMonthData(grouped);
  }

  const monthStart =
    startOfMonth(currentMonth);

  const monthEnd =
    endOfMonth(currentMonth);

  const calendarStart =
    startOfWeek(monthStart, {
      weekStartsOn: 1, // Monday
    });

  const calendarEnd =
    endOfWeek(monthEnd, {
      weekStartsOn: 1,
    });

  const days = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() =>
            setCurrentMonth(
              subMonths(currentMonth, 1)
            )
          }
          className="px-3 py-2 bg-slate-800 rounded-lg hover:bg-slate-700"
        >
          ←
        </button>

        <h2 className="text-2xl font-bold text-white">
          {format(
            currentMonth,
            "MMMM yyyy"
          )}
        </h2>

        <button
          onClick={() =>
            setCurrentMonth(
              addMonths(currentMonth, 1)
            )
          }
          className="px-3 py-2 bg-slate-800 rounded-lg hover:bg-slate-700"
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-3 text-center text-slate-400 font-medium">
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
        <div>Sun</div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((day) => {
          const key = format(
            day,
            "yyyy-MM-dd"
          );

          const dayStats =
            monthData[key];

          const pnl =
            dayStats?.pnl || 0;

          const trades =
            dayStats?.trades || 0;

          const currentMonthDay =
            isSameMonth(
              day,
              currentMonth
            );

          return (
            <div
              key={key}
              className={`min-h-[120px] rounded-xl border p-2 ${
                !currentMonthDay
                  ? "bg-slate-950 border-slate-900 opacity-40"
                  : pnl > 0
                  ? "bg-emerald-950 border-emerald-700"
                  : pnl < 0
                  ? "bg-red-950 border-red-700"
                  : "bg-slate-800 border-slate-700"
              }`}
            >
              <div className="text-white font-bold">
                {format(day, "d")}
              </div>

              {trades > 0 && (
                <>
                  <div className="text-xs text-slate-300 mt-2">
                    Trades: {trades}
                  </div>

                  <div
                    className={`text-sm font-semibold ${
                      pnl >= 0
                        ? "text-emerald-400"
                        : "text-red-400"
                    }`}
                  >
                    ${pnl.toFixed(2)}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
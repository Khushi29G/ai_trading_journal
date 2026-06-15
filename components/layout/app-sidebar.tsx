"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  CandlestickChart,
  BookOpen,
  BarChart3,
  Brain,
  Settings,
  TrendingUp,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Trades",
    href: "/trades",
    icon: CandlestickChart,
  },
  {
    title: "Journal",
    href: "/journal",
    icon: BookOpen,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    title: "AI Coach",
    href: "/ai-coach",
    icon: Brain,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[280px] min-h-screen bg-[#030712] border-r border-slate-800 flex flex-col">

      {/* Logo */}

      <div className="p-8 border-b border-slate-800">

        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-black font-bold text-lg shadow-lg shadow-emerald-500/20">
            AI
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white">
              Trading Journal
            </h1>

            <p className="text-slate-400 text-sm">
              AI Powered Analytics
            </p>
          </div>

        </div>

      </div>

      {/* Navigation */}

      <nav className="flex-1 p-5 space-y-2">

        {menuItems.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.title}
              href={item.href}
              className={`group flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300
              ${
                active
                  ? "bg-gradient-to-r from-emerald-500/20 to-cyan-500/10 border border-emerald-500/30 text-emerald-400"
                  : "text-slate-400 hover:bg-slate-900 hover:text-white"
              }`}
            >
              <item.icon
                size={20}
                className={`${
                  active
                    ? "text-emerald-400"
                    : "group-hover:text-white"
                }`}
              />

              <span className="font-medium">
                {item.title}
              </span>
            </Link>
          );
        })}

      </nav>

      {/* AI Coach Card */}

      <div className="p-5">

        <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-5">

          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-4">

            <TrendingUp
              className="text-emerald-400"
              size={22}
            />

          </div>

          <h3 className="text-white font-bold text-lg">
            AI Trading Coach
          </h3>

          <p className="text-slate-400 text-sm mt-2 leading-6">
            Review trades, track emotions and
            improve trading consistency.
          </p>

          <button className="w-full mt-5 bg-emerald-500 hover:bg-emerald-600 text-black font-semibold py-3 rounded-xl transition">
            Start Coaching →
          </button>

        </div>

      </div>

      {/* Theme Switch Mock */}

      <div className="px-5 pb-6">

        <div className="w-fit rounded-full bg-slate-900 border border-slate-800 p-1 flex items-center gap-2">

          <div className="w-10 h-10 rounded-full bg-emerald-500"></div>

          <div className="w-10 h-10 rounded-full"></div>

        </div>

      </div>

    </aside>
  );
}
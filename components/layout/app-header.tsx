import LogoutButton from "@/components/logout-button";

export default function AppHeader() {
  return (
    <header className="h-20 border-b border-slate-800 bg-slate-950 px-8 flex justify-between items-center sticky top-0 z-50">

      <div>
        <h2 className="text-2xl font-bold text-white">
          AI Trading Journal
        </h2>

        <p className="text-sm text-slate-400">
          Track • Analyze • Improve
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl">
          <div className="w-3 h-3 rounded-full bg-emerald-500"></div>

          <span className="text-sm text-slate-300">
            Active Session
          </span>
        </div>

        <LogoutButton />
      </div>

    </header>
  );
}
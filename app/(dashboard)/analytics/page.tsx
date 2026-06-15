import AnalyticsOverview from "@/components/analytics/analytics-overview";
import AIReport from "@/components/analytics/ai-report";

export default function AnalyticsPage() {
  return (
    <div className="space-y-8 max-w-400">

      <div>
  <h1 className="text-4xl font-bold text-white">
    Analytics Overview
  </h1>

  <p className="text-slate-400 mt-2">
    Comprehensive insights into your trading performance
  </p>
</div>

      <AnalyticsOverview />

      <AIReport />

    </div>
  );
}
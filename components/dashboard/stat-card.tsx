import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
}

export default function StatCard({
  title,
  value,
}: StatCardProps) {
  const isProfit =
    title.toLowerCase().includes("pnl");

  return (
    <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 text-white hover:scale-[1.02] transition-all duration-300 shadow-lg">
      <CardContent className="p-6">
        <p className="text-slate-400 text-sm">
          {title}
        </p>

        <h3
          className={`text-3xl font-bold mt-2 ${
            isProfit
              ? "text-emerald-400"
              : "text-white"
          }`}
        >
          {value}
        </h3>
      </CardContent>
    </Card>
  );
}
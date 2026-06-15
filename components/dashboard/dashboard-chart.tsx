"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface DashboardChartProps {
  data: {
    name: string;
    pnl: number;
  }[];
}

export default function DashboardChart({
  data,
}: DashboardChartProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
     <h2 className="text-2xl font-bold text-white mb-4">
  Equity Curve
</h2>
      <div className="h-80">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

     <Line
  type="monotone"
  dataKey="pnl"
  stroke="#22c55e"
  strokeWidth={5}
  dot={{ r: 6 }}
  activeDot={{ r: 8 }}
/>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
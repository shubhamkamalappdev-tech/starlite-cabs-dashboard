"use client";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  Tooltip,
  AreaChart,
  Area
} from "recharts";

export default function ChartBox() {
  const data = [
    { day: "Mon", income: 200 },
    { day: "Tue", income: 100 },
    { day: "Wed", income: 300 },
    { day: "Thu", income: 250 },
    { day: "Fri", income: 400 }
  ];

  return (
    <div
      style={{
        background: "#111827",
        borderRadius: 20,
        padding: 24,
        height: 420,
        border: "1px solid #1E293B"
      }}
    >
      <h2
        style={{
          marginBottom: 20
        }}
      >
        Daily Income Trend
      </h2>

      <ResponsiveContainer
        width="100%"
        height="90%"
      >
        <AreaChart data={data}>
          <XAxis dataKey="day" />
          <Tooltip />

          <Area
            type="monotone"
            dataKey="income"
            stroke="#FBBF24"
            fill="#FBBF24"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
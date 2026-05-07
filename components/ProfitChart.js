"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip
} from "recharts";

export default function ProfitChart({
  data
}) {
  return (
    <div
      style={{
        background: "#111827",
        borderRadius: 20,
        padding: 24,
        border: "1px solid #1E293B",
        height: 420
      }}
    >
      <h2
        style={{
          marginBottom: 20
        }}
      >
        Monthly Profit Trend
      </h2>

      <ResponsiveContainer
        width="100%"
        height="90%"
      >
        <AreaChart data={data}>
          <XAxis dataKey="date" />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="profit"
            stroke="#FBBF24"
            fill="#FBBF24"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
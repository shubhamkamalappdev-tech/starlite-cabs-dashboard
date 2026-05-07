"use client";

export default function StatsCard({
  title,
  value
}) {
  return (
    <div
      style={{
        background: "#111827",
        padding: 24,
        borderRadius: 20,
        border: "1px solid #1E293B"
      }}
    >
      <p
        style={{
          color: "#94A3B8",
          marginBottom: 12
        }}
      >
        {title}
      </p>

      <h2
        style={{
          fontSize: 32,
          fontWeight: "bold"
        }}
      >
        {value}
      </h2>
    </div>
  );
}
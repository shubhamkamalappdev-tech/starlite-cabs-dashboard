"use client";

export default function AnalyticsCards({
  totalProfit,
  ownerProfit,
  driverPayout,
  bestCar,
  bestDriver
}) {
  const cards = [
    {
      title: "Total Profit",
      value: `₹${totalProfit}`
    },
    {
      title: "Owner Earnings",
      value: `₹${ownerProfit}`
    },
    {
      title: "Driver Payout",
      value: `₹${driverPayout}`
    },
    {
      title: "Best Vehicle",
      value: bestCar || "-"
    },
    {
      title: "Best Driver",
      value: bestDriver || "-"
    }
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit,minmax(220px,1fr))",
        gap: 20,
        marginBottom: 30
      }}
    >
      {cards.map((card, index) => (
        <div
          key={index}
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
            {card.title}
          </p>

          <h2
            style={{
              fontSize: 28,
              fontWeight: "bold"
            }}
          >
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}
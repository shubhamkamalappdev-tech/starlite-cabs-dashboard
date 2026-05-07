"use client";

export default function TopCards() {
  const cards = [
    {
      title: "Owner Profit",
      value: "₹5,623"
    },
    {
      title: "Commission Profit",
      value: "₹623"
    },
    {
      title: "Rental Income",
      value: "₹5,000"
    },
    {
      title: "Active Drivers",
      value: "2"
    },
    {
      title: "Vehicles",
      value: "2"
    }
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit,minmax(220px,1fr))",
        gap: 20
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
              fontSize: 34,
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
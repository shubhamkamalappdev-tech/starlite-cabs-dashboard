"use client";

export default function AnalyticsCards({
  totalProfit,
  ownerProfit,
  driverPayout,
  rentalIncome,
  totalKm,
  highestDay,
  bestCar,
  bestDriver
}) {
  const cards = [
    {
      title: "Business Income",
      value: `₹${Number(
        totalProfit || 0
      ).toLocaleString()}`
    },
    {
      title: "Rental Income",
      value: `₹${Number(
        rentalIncome || 0
      ).toLocaleString()}`
    },
    {
      title: "Owner Earnings",
      value: `₹${Number(
        ownerProfit || 0
      ).toLocaleString()}`
    },
    {
      title: "Driver Payout",
      value: `₹${Number(
        driverPayout || 0
      ).toLocaleString()}`
    },
    {
      title: "Total KM",
      value: Number(
        totalKm || 0
      ).toLocaleString()
    },
    {
      title: "Highest Day",
      value: highestDay
        ? `₹${Number(
            highestDay.profit || 0
          ).toLocaleString()}`
        : "-"
    },
    {
      title: "Best Vehicle",
      value:
        bestCar || "-"
    },
    {
      title: "Best Driver",
      value:
        bestDriver || "-"
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
      {cards.map(
        (
          card,
          index
        ) => (
          <div
            key={index}
            style={{
              background:
                "#111827",

              padding: 24,

              borderRadius: 20,

              border:
                "1px solid #1E293B",

              minHeight: 120
            }}
          >
            <p
              style={{
                color:
                  "#94A3B8",

                marginBottom: 12,

                fontSize: 14
              }}
            >
              {card.title}
            </p>

            <h2
              style={{
                fontSize: 26,

                fontWeight:
                  "bold",

                wordBreak:
                  "break-word"
              }}
            >
              {card.value}
            </h2>
          </div>
        )
      )}
    </div>
  );
}
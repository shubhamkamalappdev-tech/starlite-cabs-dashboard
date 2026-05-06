
import { cardStyle } from "../app/styles/theme";

export default function DashboardCards({
  totalProfit,
  monthlyProfit,
  totalDue
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
        gap: 16,
        marginBottom: 20
      }}
    >
      <div style={cardStyle}>
        <h4>Total Owner Profit</h4>
        <h2>₹{totalProfit.toFixed(0)}</h2>
      </div>

      <div style={cardStyle}>
        <h4>This Month</h4>
        <h2>₹{monthlyProfit.toFixed(0)}</h2>
      </div>

      <div style={cardStyle}>
        <h4>Driver Due</h4>
        <h2>₹{totalDue.toFixed(0)}</h2>
      </div>
    </div>
  );
}


import { cardStyle } from "../app/styles/theme";

export default function LogsTable({
  logs,
  editLog
}) {
  return (
    <div
      style={{
        ...cardStyle,
        marginTop: 20
      }}
    >
      <h3>History</h3>

      <div style={{ overflowX: "auto" }}>
        <table style={table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Driver</th>
              <th>Car</th>
              <th>Profit</th>
              <th>Owner</th>
              <th>Driver Share</th>
              <th>Driver Due</th>
              <th>Edit</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((l) => (
              <tr key={l.id}>
                <td>
                  {l.date
                    ? new Date(l.date).toLocaleDateString()
                    : "-"}
                </td>

                <td>{l.driver}</td>

                <td>{l.car}</td>

                <td>
                  ₹{Number(l.profit || 0).toFixed(0)}
                </td>

                <td>
                  ₹{Number(l.owner || 0).toFixed(0)}
                </td>

                <td>
                  ₹{Number(
                    l.driverShare || 0
                  ).toFixed(0)}
                </td>

                <td>
                  ₹{Number(l.balance || 0).toFixed(0)}
                </td>

                <td>
                  <button
                    onClick={() => editLog(l)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const table = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: 16
};

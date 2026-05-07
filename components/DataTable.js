"use client";

export default function DataTable({
  drivers,
  onDelete,
  onEdit
}) {
  return (
    <div
      style={{
        background: "#111827",
        borderRadius: 20,
        padding: 24,
        marginTop: 30,
        border: "1px solid #1E293B"
      }}
    >
      <h2
        style={{
          marginBottom: 20
        }}
      >
        Drivers
      </h2>

      <table
        style={{
          width: "100%"
        }}
      >
        <thead>
          <tr
            style={{
              color: "#94A3B8",
              textAlign: "left"
            }}
          >
            <th>Name</th>
            <th>Phone</th>
            <th>Earnings</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {drivers.map((driver) => (
            <tr key={driver.id}>
              <td
                style={{
                  padding:
                    "16px 0"
                }}
              >
                {driver.name}
              </td>

              <td>
                {driver.phone}
              </td>

              <td>
                {
                  driver.earnings
                }
              </td>

              <td>
                <div
                  style={{
                    display:
                      "flex",
                    gap: 8
                  }}
                >
                  <button
                    onClick={() =>
                      onEdit(
                        driver
                      )
                    }
                    style={{
                      background:
                        "#3B82F6",
                      border:
                        "none",
                      padding:
                        "8px 12px",
                      borderRadius: 8,
                      color:
                        "white",
                      cursor:
                        "pointer"
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      onDelete(
                        driver.id
                      )
                    }
                    style={{
                      background:
                        "#EF4444",
                      border:
                        "none",
                      padding:
                        "8px 12px",
                      borderRadius: 8,
                      color:
                        "white",
                      cursor:
                        "pointer"
                    }}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
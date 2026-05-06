
import { cardStyle } from "../app/styles/theme";

export default function EntryForm({
  form,
  setForm,
  save,
  editing
}) {
  return (
    <div style={cardStyle}>
      <h3>{editing ? "Edit Entry" : "New Entry"}</h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(180px,1fr))",
          gap: 12,
          marginTop: 14
        }}
      >
        <input
          style={input}
          placeholder="Driver"
          value={form.driver}
          onChange={(e) =>
            setForm({ ...form, driver: e.target.value })
          }
        />

        <input
          style={input}
          placeholder="Car Number"
          value={form.car}
          onChange={(e) =>
            setForm({ ...form, car: e.target.value })
          }
        />

        <input
          style={input}
          placeholder="Cash"
          value={form.cash}
          onChange={(e) =>
            setForm({ ...form, cash: e.target.value })
          }
        />

        <input
          style={input}
          placeholder="Online"
          value={form.online}
          onChange={(e) =>
            setForm({ ...form, online: e.target.value })
          }
        />

        <input
          style={input}
          placeholder="Cashout"
          value={form.cashout}
          onChange={(e) =>
            setForm({ ...form, cashout: e.target.value })
          }
        />

        <input
          style={input}
          placeholder="Commission"
          value={form.commission}
          onChange={(e) =>
            setForm({
              ...form,
              commission: e.target.value
            })
          }
        />

        <input
          style={input}
          placeholder="Subscription"
          value={form.subscription}
          onChange={(e) =>
            setForm({
              ...form,
              subscription: e.target.value
            })
          }
        />

        <input
          style={input}
          placeholder="Toll"
          value={form.toll}
          onChange={(e) =>
            setForm({ ...form, toll: e.target.value })
          }
        />

        <input
          style={input}
          placeholder="KM"
          value={form.km}
          onChange={(e) =>
            setForm({ ...form, km: e.target.value })
          }
        />

        <input
          style={input}
          placeholder="Driver Paid"
          value={form.driverPaid}
          onChange={(e) =>
            setForm({
              ...form,
              driverPaid: e.target.value
            })
          }
        />
      </div>

      <button style={btn} onClick={save}>
        {editing ? "Update Log" : "Save Log"}
      </button>
    </div>
  );
}

const input = {
  padding: 12,
  borderRadius: 8,
  border: "1px solid #334155",
  background: "#0f172a",
  color: "white"
};

const btn = {
  marginTop: 16,
  padding: "12px 18px",
  borderRadius: 10,
  border: "none",
  background: "#22c55e",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer"
};

# STARLITE CABS PRO — CLEAN REBUILD

This rebuild gives you:

* Modern dashboard UI
* Proper editable logs
* Car-wise tracking
* Driver-wise tracking
* Monthly analytics ready
* EMI tracking ready
* WhatsApp share ready
* Clean architecture
* Firebase cloud sync

---

# 1. FOLDER STRUCTURE

Create this structure inside your project:

```txt
app/
  page.js
components/
  DashboardCards.js
  EntryForm.js
  LogsTable.js
styles/
  theme.js
firebase.js
```

---

# 2. CREATE styles/theme.js

```javascript
export const colors = {
  bg: "#0f172a",
  card: "#1e293b",
  border: "#334155",
  text: "#f8fafc",
  sub: "#94a3b8",
  green: "#22c55e",
  red: "#ef4444"
};

export const cardStyle = {
  background: colors.card,
  borderRadius: 14,
  padding: 18,
  border: `1px solid ${colors.border}`
};
```

---

# 3. CREATE components/DashboardCards.js

```javascript
import { cardStyle } from "../styles/theme";

export default function DashboardCards({ totalProfit, monthlyProfit, totalDue }) {
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
```

---

# 4. CREATE components/EntryForm.js

```javascript
import { cardStyle } from "../styles/theme";

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
          gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
          gap: 12,
          marginTop: 14
        }}
      >
        <input style={input} placeholder="Driver" value={form.driver} onChange={(e)=>setForm({...form,driver:e.target.value})} />

        <input style={input} placeholder="Car Number" value={form.car} onChange={(e)=>setForm({...form,car:e.target.value})} />

        <input style={input} placeholder="Cash" value={form.cash} onChange={(e)=>setForm({...form,cash:e.target.value})} />

        <input style={input} placeholder="Online" value={form.online} onChange={(e)=>setForm({...form,online:e.target.value})} />

        <input style={input} placeholder="Cashout" value={form.cashout} onChange={(e)=>setForm({...form,cashout:e.target.value})} />

        <input style={input} placeholder="Commission" value={form.commission} onChange={(e)=>setForm({...form,commission:e.target.value})} />

        <input style={input} placeholder="Subscription" value={form.subscription} onChange={(e)=>setForm({...form,subscription:e.target.value})} />

        <input style={input} placeholder="Toll" value={form.toll} onChange={(e)=>setForm({...form,toll:e.target.value})} />

        <input style={input} placeholder="KM" value={form.km} onChange={(e)=>setForm({...form,km:e.target.value})} />

        <input style={input} placeholder="Driver Paid" value={form.driverPaid} onChange={(e)=>setForm({...form,driverPaid:e.target.value})} />
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
```

---

# 5. CREATE components/LogsTable.js

```javascript
import { cardStyle } from "../styles/theme";

export default function LogsTable({ logs, editLog }) {
  return (
    <div style={{ ...cardStyle, marginTop: 20 }}>
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
                <td>{new Date(l.date).toLocaleDateString()}</td>
                <td>{l.driver}</td>
                <td>{l.car}</td>
                <td>₹{Number(l.profit || 0).toFixed(0)}</td>
                <td>₹{Number(l.owner || 0).toFixed(0)}</td>
                <td>₹{Number(l.driverShare || 0).toFixed(0)}</td>
                <td>₹{Number(l.balance || 0).toFixed(0)}</td>
                <td>
                  <button onClick={() => editLog(l)}>
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
```

---

# 6. REPLACE app/page.js

```javascript
"use client";

import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc
} from "firebase/firestore";

import DashboardCards from "../components/DashboardCards";
import EntryForm from "../components/EntryForm";
import LogsTable from "../components/LogsTable";

import { colors } from "../styles/theme";

export default function Home() {
  const emptyForm = {
    driver: "",
    car: "",
    cash: "",
    online: "",
    cashout: "",
    commission: "",
    subscription: "",
    toll: "",
    km: "",
    driverPaid: ""
  };

  const [logs, setLogs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  async function fetchData() {
    const snap = await getDocs(collection(db, "Logs"));

    setLogs(
      snap.docs.map((d) => ({
        id: d.id,
        ...d.data()
      }))
    );
  }

  useEffect(() => {
    fetchData();
  }, []);

  function calculate(data) {
    const fuel = Number(data.km || 0) * 5;

    const profit =
      Number(data.cash || 0) +
      Number(data.online || 0) +
      Number(data.cashout || 0) -
      Number(data.commission || 0) -
      Number(data.subscription || 0) -
      Number(data.toll || 0) -
      fuel;

    const owner = profit * 0.6;
    const driverShare = profit * 0.4;
    const balance = driverShare - Number(data.driverPaid || 0);

    return {
      profit,
      owner,
      driverShare,
      balance
    };
  }

  async function save() {
    const calc = calculate(form);

    if (editingId) {
      await updateDoc(doc(db, "Logs", editingId), {
        ...form,
        ...calc
      });

      setEditingId(null);
    } else {
      await addDoc(collection(db, "Logs"), {
        ...form,
        ...calc,
        date: new Date().toISOString()
      });
    }

    setForm(emptyForm);
    fetchData();
  }

  function editLog(log) {
    setEditingId(log.id);
    setForm(log);
  }

  const totalProfit = logs.reduce(
    (a, b) => a + Number(b.owner || 0),
    0
  );

  const totalDue = logs.reduce(
    (a, b) => a + Number(b.balance || 0),
    0
  );

  const currentMonth = new Date().getMonth();

  const monthlyProfit = logs
    .filter((l) => new Date(l.date).getMonth() === currentMonth)
    .reduce((a, b) => a + Number(b.owner || 0), 0);

  return (
    <div
      style={{
        background: colors.bg,
        minHeight: "100vh",
        padding: 20,
        color: colors.text,
        fontFamily: "system-ui"
      }}
    >
      <h1 style={{ marginBottom: 20 }}>🚖 Starlite Cabs Pro</h1>

      <DashboardCards
        totalProfit={totalProfit}
        monthlyProfit={monthlyProfit}
        totalDue={totalDue}
      />

      <EntryForm
        form={form}
        setForm={setForm}
        save={save}
        editing={editingId}
      />

      <LogsTable logs={logs} editLog={editLog} />
    </div>
  );
}
```

---

# AFTER THIS

Commit changes.
Vercel will auto deploy.

---

# NEXT PHASE

After this stable rebuild:

* 📊 Monthly charts
* 📤 WhatsApp share button
* 🧾 Printable PDF receipt
* 🚗 EMI tracker per car
* 📅 Filter by month/date
* 🔍 Search driver/car

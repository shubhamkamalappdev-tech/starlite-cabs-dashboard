"use client";

import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc
} from "firebase/firestore";

export default function Home() {
  const [logs, setLogs] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const [form, setForm] = useState({
    driver: "",
    cash: "",
    online: "",
    cashout: "",
    commission: "",
    subscription: "",
    toll: "",
    km: "",
    driverPaid: ""
  });

  async function fetchData() {
    const snap = await getDocs(collection(db, "Logs"));
    setLogs(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  }

  useEffect(() => {
    fetchData();
  }, []);

  function calc(f) {
    const fuel = Number(f.km) * 5;

    const profit =
      Number(f.cash) +
      Number(f.online) +
      Number(f.cashout) -
      Number(f.commission) -
      Number(f.subscription) -
      Number(f.toll) -
      fuel;

    return {
      profit,
      owner: profit * 0.6,
      driver: profit * 0.4,
      balance: profit * 0.4 - Number(f.driverPaid)
    };
  }

  async function save() {
    const result = calc(form);

    if (editingIndex !== null) {
      const log = logs[editingIndex];
      await updateDoc(doc(db, "Logs", log.id), {
        ...form,
        ...result,
        date: log.date
      });
      setEditingIndex(null);
    } else {
      await addDoc(collection(db, "Logs"), {
        ...form,
        ...result,
        date: new Date().toISOString()
      });
    }

    setForm({
      driver: "",
      cash: "",
      online: "",
      cashout: "",
      commission: "",
      subscription: "",
      toll: "",
      km: "",
      driverPaid: ""
    });

    fetchData();
  }

  function editLog(i) {
    setEditingIndex(i);
    setForm(logs[i]);
  }

  const total = logs.reduce((a, b) => a + (b.owner || 0), 0);

  return (
    <div style={{ padding: 20, background: "#0f172a", color: "white" }}>

      <h1>🚖 Starlite Cabs</h1>

      <h2>Total Profit: ₹{total.toFixed(0)}</h2>

      {/* FORM */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: 10,
        marginBottom: 20
      }}>
        {Object.keys(form).map(key => (
          <input
            key={key}
            placeholder={key}
            value={form[key]}
            onChange={(e) =>
              setForm({ ...form, [key]: e.target.value })
            }
            style={{
              padding: 10,
              borderRadius: 8,
              border: "none"
            }}
          />
        ))}
      </div>

      <button onClick={save} style={btn}>
        {editingIndex !== null ? "Update Log" : "Add Log"}
      </button>

      {/* TABLE */}
      <table style={{
        width: "100%",
        marginTop: 20,
        borderSpacing: 0
      }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Driver</th>
            <th>Profit</th>
            <th>Owner</th>
            <th>Driver</th>
            <th>Balance</th>
            <th>Edit</th>
          </tr>
        </thead>

        <tbody>
          {logs.map((l, i) => (
            <tr key={i} style={{ background: "#1e293b" }}>
              <td>{new Date(l.date).toLocaleDateString()}</td>
              <td>{l.driver}</td>
              <td>₹{l.profit?.toFixed(0)}</td>
              <td>₹{l.owner?.toFixed(0)}</td>
              <td>₹{l.driver?.toFixed(0)}</td>
              <td>₹{l.balance?.toFixed(0)}</td>
              <td>
                <button onClick={() => editLog(i)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

const btn = {
  padding: 10,
  background: "#22c55e",
  border: "none",
  borderRadius: 6,
  color: "white"
};

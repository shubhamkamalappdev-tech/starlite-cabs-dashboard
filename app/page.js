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
  const [editingId, setEditingId] = useState(null);

  const emptyForm = {
    driver: "",
    cash: "",
    online: "",
    cashout: "",
    commission: "",
    subscription: "",
    toll: "",
    km: "",
    driverPaid: ""
  };

  const [form, setForm] = useState(emptyForm);

  async function fetchData() {
    const snap = await getDocs(collection(db, "Logs"));
    const data = snap.docs.map(d => ({
      id: d.id,
      ...d.data()
    }));
    setLogs(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  function calc(f) {
    const fuel = Number(f.km || 0) * 5;

    const profit =
      Number(f.cash || 0) +
      Number(f.online || 0) +
      Number(f.cashout || 0) -
      Number(f.commission || 0) -
      Number(f.subscription || 0) -
      Number(f.toll || 0) -
      fuel;

    const driver = profit * 0.4;
    const owner = profit * 0.6;
    const balance = driver - Number(f.driverPaid || 0);

    return { profit, driver, owner, balance };
  }

  async function save() {
    const result = calc(form);

    if (editingId) {
      await updateDoc(doc(db, "Logs", editingId), {
        ...form,
        ...result
      });
      setEditingId(null);
    } else {
      await addDoc(collection(db, "Logs"), {
        ...form,
        ...result,
        date: new Date().toISOString()
      });
    }

    setForm(emptyForm);
    fetchData();
  }

  function editLog(log) {
    setEditingId(log.id);

    setForm({
      driver: log.driver || "",
      cash: log.cash || "",
      online: log.online || "",
      cashout: log.cashout || "",
      commission: log.commission || "",
      subscription: log.subscription || "",
      toll: log.toll || "",
      km: log.km || "",
      driverPaid: log.driverPaid || ""
    });
  }

  const total = logs.reduce((a, b) => a + (b.owner || 0), 0);

  return (
    <div style={{ padding: 20, background: "#0f172a", color: "white", minHeight: "100vh" }}>

      <h1>🚖 Starlite Cabs</h1>
      <h2>Total Owner Profit: ₹{total.toFixed(0)}</h2>

      {/* FORM */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
        gap: 10
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
        {editingId ? "Update Log" : "Add Log"}
      </button>

      {/* TABLE */}
      <table style={{
        width: "100%",
        marginTop: 20,
        borderCollapse: "collapse"
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
          {logs.map((l) => (
            <tr key={l.id} style={{ background: "#1e293b" }}>
              <td>{l.date ? new Date(l.date).toLocaleDateString() : "-"}</td>
              <td>{l.driver}</td>
              <td>₹{(l.profit || 0).toFixed(0)}</td>
              <td>₹{(l.owner || 0).toFixed(0)}</td>
              <td>₹{(l.driver || 0).toFixed(0)}</td>
              <td>₹{(l.balance || 0).toFixed(0)}</td>
              <td>
                <button onClick={() => editLog(l)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

const btn = {
  marginTop: 10,
  padding: 10,
  background: "#22c55e",
  border: "none",
  borderRadius: 6,
  color: "white",
  cursor: "pointer"
};

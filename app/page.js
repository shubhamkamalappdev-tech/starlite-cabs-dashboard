"use client";

import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

export default function Home() {
  const [logs, setLogs] = useState([]);
  const [earnings, setEarnings] = useState("");
  const [expenses, setExpenses] = useState("");

  async function fetchLogs() {
    const querySnapshot = await getDocs(collection(db, "DailyLogs"));
    const data = querySnapshot.docs.map(doc => doc.data());
    setLogs(data);
  }

  useEffect(() => {
    fetchLogs();
  }, []);

  const total = logs.reduce((acc, item) => acc + (item.net_profit || 0), 0);

  async function addLog() {
    const net_profit = Number(earnings) - Number(expenses);

    await addDoc(collection(db, "DailyLogs"), {
      earnings: Number(earnings),
      expenses: Number(expenses),
      net_profit,
      date: new Date().toISOString()
    });

    setEarnings("");
    setExpenses("");
    fetchLogs();
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>🚖 STARLITE CABS DASHBOARD</h1>

      <h2>Total Profit: ₹{total}</h2>

      <div style={{ marginTop: 20 }}>
        <input
          placeholder="Earnings"
          value={earnings}
          onChange={(e) => setEarnings(e.target.value)}
        />
        <input
          placeholder="Expenses"
          value={expenses}
          onChange={(e) => setExpenses(e.target.value)}
        />
        <button onClick={addLog}>Add Entry</button>
      </div>

      <h3 style={{ marginTop: 20 }}>Logs:</h3>

      {logs.map((log, i) => (
        <div key={i}>
          ₹{log.net_profit} | {log.date}
        </div>
      ))}
    </div>
  );
}

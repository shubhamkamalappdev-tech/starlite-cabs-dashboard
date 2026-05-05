"use client";

import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc
} from "firebase/firestore";

export default function Home() {
  const [logs, setLogs] = useState([]);
  const [cars, setCars] = useState([]);

  const [earnings, setEarnings] = useState("");
  const [expenses, setExpenses] = useState("");

  const [carNumber, setCarNumber] = useState("");
  const [carType, setCarType] = useState("");

  async function fetchData() {
    const logsSnap = await getDocs(collection(db, "DailyLogs"));
    const carsSnap = await getDocs(collection(db, "Cars"));

    setLogs(logsSnap.docs.map(doc => doc.data()));
    setCars(carsSnap.docs.map(doc => doc.data()));
  }

  useEffect(() => {
    fetchData();
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
    fetchData();
  }

  async function addCar() {
    await addDoc(collection(db, "Cars"), {
      number: carNumber,
      type: carType
    });

    setCarNumber("");
    setCarType("");
    fetchData();
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>🚖 STARLITE CABS DASHBOARD</h1>

      <h2>Total Profit: ₹{total}</h2>

      {/* ADD CAR */}
      <h3>Add Car</h3>
      <input
        placeholder="Car Number"
        value={carNumber}
        onChange={(e) => setCarNumber(e.target.value)}
      />
      <input
        placeholder="Type (EV/CNG)"
        value={carType}
        onChange={(e) => setCarType(e.target.value)}
      />
      <button onClick={addCar}>Add Car</button>

      {/* CAR LIST */}
      <h3>Cars</h3>
      {cars.map((car, i) => (
        <div key={i}>
          {car.number} - {car.type}
        </div>
      ))}

      {/* DAILY LOG */}
      <h3 style={{ marginTop: 20 }}>Add Daily Log</h3>
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

      <h3 style={{ marginTop: 20 }}>Logs</h3>
      {logs.map((log, i) => (
        <div key={i}>
          ₹{log.net_profit} | {log.date}
        </div>
      ))}
    </div>
  );
}

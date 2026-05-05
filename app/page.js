"use client";

import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

export default function Home() {
  const [logs, setLogs] = useState([]);
  const [drivers, setDrivers] = useState([]);

  const [driverName, setDriverName] = useState("");
  const [selectedDriver, setSelectedDriver] = useState("");

  const [cash, setCash] = useState("");
  const [online, setOnline] = useState("");
  const [km, setKm] = useState("");
  const [toll, setToll] = useState("");
  const [subscription, setSubscription] = useState("");
  const [commission, setCommission] = useState("");

  async function fetchData() {
    const logsSnap = await getDocs(collection(db, "Logs"));
    const driversSnap = await getDocs(collection(db, "Drivers"));

    setLogs(logsSnap.docs.map(doc => doc.data()));
    setDrivers(driversSnap.docs.map(doc => doc.data()));
  }

  useEffect(() => {
    fetchData();
  }, []);

  const totalOwner = logs.reduce((a, b) => a + (b.owner || 0), 0);

  async function addDriver() {
    if (!driverName) return;

    await addDoc(collection(db, "Drivers"), {
      name: driverName
    });

    setDriverName("");
    fetchData();
  }

  async function saveLog() {
    if (!selectedDriver) {
      alert("Select driver");
      return;
    }

    const fuel = Number(km) * 5;

    const profit =
      Number(cash) +
      Number(online) -
      Number(toll) -
      Number(subscription) -
      Number(commission) -
      fuel;

    const driverShare = profit * 0.4;
    const owner = profit * 0.6;

    await addDoc(collection(db, "Logs"), {
      driver: selectedDriver,
      profit,
      owner,
      date: new Date().toISOString()
    });

    setCash("");
    setOnline("");
    setKm("");
    setToll("");
    setSubscription("");
    setCommission("");

    fetchData();
  }

  return (
    <div style={{ padding: 20, background: "#111", minHeight: "100vh", color: "white" }}>
      <h1>🚖 Starlite Cabs</h1>

      <h2>Total Owner Profit: ₹{totalOwner}</h2>

      {/* DRIVER */}
      <div style={{ marginBottom: 20 }}>
        <h3>Add Driver</h3>
        <input
          placeholder="Driver name"
          value={driverName}
          onChange={(e) => setDriverName(e.target.value)}
        />
        <button onClick={addDriver}>Add</button>
      </div>

      {/* SELECT DRIVER */}
      <select
        value={selectedDriver}
        onChange={(e) => setSelectedDriver(e.target.value)}
      >
        <option value="">Select Driver</option>
        {drivers.map((d, i) => (
          <option key={i} value={d.name}>
            {d.name}
          </option>
        ))}
      </select>

      {/* INPUTS */}
      <h3>Daily Entry</h3>

      <input placeholder="Cash" value={cash} onChange={(e) => setCash(e.target.value)} />
      <input placeholder="Online" value={online} onChange={(e) => setOnline(e.target.value)} />
      <input placeholder="KM" value={km} onChange={(e) => setKm(e.target.value)} />
      <input placeholder="Toll" value={toll} onChange={(e) => setToll(e.target.value)} />
      <input placeholder="Subscription" value={subscription} onChange={(e) => setSubscription(e.target.value)} />
      <input placeholder="Commission" value={commission} onChange={(e) => setCommission(e.target.value)} />

      <button onClick={saveLog}>Save</button>

      {/* LOGS */}
      <h3>Logs</h3>

      {logs.map((log, i) => (
        <div key={i} style={{ marginBottom: 10 }}>
          {log.driver} | ₹{log.owner}
        </div>
      ))}
    </div>
  );
}

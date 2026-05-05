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
  const [cashout, setCashout] = useState("");
  const [commission, setCommission] = useState("");
  const [subscription, setSubscription] = useState("");
  const [toll, setToll] = useState("");
  const [km, setKm] = useState("");
  const [driverPaid, setDriverPaid] = useState("");

  const [result, setResult] = useState(null);

  async function fetchData() {
    const logsSnap = await getDocs(collection(db, "Logs"));
    const driversSnap = await getDocs(collection(db, "Drivers"));

    setLogs(logsSnap.docs.map(doc => doc.data()));
    setDrivers(driversSnap.docs.map(doc => doc.data()));
  }

  useEffect(() => {
    fetchData();
  }, []);

  // 🔥 CALCULATE
  function calculate() {
    const fuel = Number(km) * 5;

    const profit =
      Number(cash) +
      Number(online) +
      Number(cashout) -
      Number(commission) -
      Number(subscription) -
      Number(toll) -
      fuel;

    const driverShare = profit * 0.4;
    const ownerShare = profit * 0.6;

    const driverBalance = driverShare - Number(driverPaid);

    setResult({
      driver: selectedDriver,
      profit,
      driverShare,
      ownerShare,
      driverPaid: Number(driverPaid),
      driverBalance,
      date: new Date().toISOString()
    });
  }

  async function saveLog() {
    if (!result) return alert("Calculate first");

    await addDoc(collection(db, "Logs"), result);
    fetchData();
  }

  // 🔥 DASHBOARD CALC
  let totalOwner = 0;
  let monthlyOwner = 0;
  let driverStats = {};

  const currentMonth = new Date().getMonth();

  logs.forEach(l => {
    totalOwner += l.ownerShare || 0;

    let logMonth = new Date(l.date).getMonth();
    if (logMonth === currentMonth) {
      monthlyOwner += l.ownerShare || 0;
    }

    driverStats[l.driver] =
      (driverStats[l.driver] || 0) + (l.ownerShare || 0);
  });

  return (
    <div style={{ padding: 20, background: "#111", color: "white", minHeight: "100vh" }}>
      <h1>🚖 Starlite Cabs</h1>

      {/* 📊 DASHBOARD */}
      <div style={{ marginBottom: 20 }}>
        <h2>Total Owner Profit: ₹{totalOwner.toFixed(0)}</h2>
        <h3>Monthly Profit: ₹{monthlyOwner.toFixed(0)}</h3>

        <h4>Driver Performance</h4>
        {Object.keys(driverStats).map((d, i) => (
          <div key={i}>
            {d} → ₹{driverStats[d].toFixed(0)}
          </div>
        ))}
      </div>

      {/* ADD DRIVER */}
      <input
        placeholder="Driver Name"
        value={driverName}
        onChange={(e) => setDriverName(e.target.value)}
      />
      <button
        onClick={async () => {
          await addDoc(collection(db, "Drivers"), { name: driverName });
          setDriverName("");
          fetchData();
        }}
      >
        Add Driver
      </button>

      <select value={selectedDriver} onChange={(e) => setSelectedDriver(e.target.value)}>
        <option value="">Select Driver</option>
        {drivers.map((d, i) => (
          <option key={i} value={d.name}>{d.name}</option>
        ))}
      </select>

      {/* INPUT */}
      <h3>Daily Entry</h3>

      <input placeholder="Cash" value={cash} onChange={(e) => setCash(e.target.value)} />
      <input placeholder="Online" value={online} onChange={(e) => setOnline(e.target.value)} />
      <input placeholder="Cashout" value={cashout} onChange={(e) => setCashout(e.target.value)} />
      <input placeholder="Commission" value={commission} onChange={(e) => setCommission(e.target.value)} />
      <input placeholder="Subscription" value={subscription} onChange={(e) => setSubscription(e.target.value)} />
      <input placeholder="Toll" value={toll} onChange={(e) => setToll(e.target.value)} />
      <input placeholder="KM" value={km} onChange={(e) => setKm(e.target.value)} />
      <input placeholder="Driver Paid" value={driverPaid} onChange={(e) => setDriverPaid(e.target.value)} />

      <button onClick={calculate}>Calculate</button>
      <button onClick={saveLog}>Save</button>

      {/* RESULT */}
      {result && (
        <div>
          <p>Profit: ₹{result.profit.toFixed(0)}</p>
          <p>Driver Share: ₹{result.driverShare.toFixed(0)}</p>
          <p>Owner Share: ₹{result.ownerShare.toFixed(0)}</p>
          <p>Balance: ₹{result.driverBalance.toFixed(0)}</p>
        </div>
      )}

      {/* LOG TABLE */}
      <h3>Logs</h3>

      <table style={{ width: "100%", marginTop: 10 }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Driver</th>
            <th>Profit</th>
            <th>Owner</th>
            <th>Driver</th>
            <th>Balance</th>
          </tr>
        </thead>

        <tbody>
          {logs.map((l, i) => (
            <tr key={i}>
              <td>{new Date(l.date).toLocaleDateString()}</td>
              <td>{l.driver}</td>
              <td>₹{l.profit?.toFixed(0)}</td>
              <td>₹{l.ownerShare?.toFixed(0)}</td>
              <td>₹{l.driverShare?.toFixed(0)}</td>
              <td>₹{l.driverBalance?.toFixed(0)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

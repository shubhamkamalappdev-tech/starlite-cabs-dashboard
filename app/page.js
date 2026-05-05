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

    const data = {
      driver: selectedDriver,
      profit,
      driverShare,
      ownerShare,
      driverPaid: Number(driverPaid),
      driverBalance,
      date: new Date().toISOString()
    };

    setResult(data);
  }

  async function saveLog() {
    if (!result) {
      alert("Calculate first");
      return;
    }

    await addDoc(collection(db, "Logs"), result);
    fetchData();
  }

  return (
    <div style={{ padding: 20, background: "#111", minHeight: "100vh", color: "white" }}>
      <h1>🚖 Starlite Cabs</h1>

      {/* DRIVER */}
      <input
        placeholder="New Driver"
        value={driverName}
        onChange={(e) => setDriverName(e.target.value)}
      />
      <button onClick={async () => {
        await addDoc(collection(db, "Drivers"), { name: driverName });
        setDriverName("");
        fetchData();
      }}>Add Driver</button>

      <select value={selectedDriver} onChange={(e) => setSelectedDriver(e.target.value)}>
        <option value="">Select Driver</option>
        {drivers.map((d, i) => (
          <option key={i} value={d.name}>{d.name}</option>
        ))}
      </select>

      {/* INPUTS */}
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
      <button onClick={saveLog}>Save Log</button>

      {/* RESULT */}
      {result && (
        <div style={{ marginTop: 15 }}>
          <p>Fuel: ₹{(km * 5).toFixed(0)}</p>
          <p>Total Profit: ₹{result.profit.toFixed(0)}</p>
          <p>Driver Share: ₹{result.driverShare.toFixed(0)}</p>
          <p>Owner Share: ₹{result.ownerShare.toFixed(0)}</p>
          <p>Driver Balance: ₹{result.driverBalance.toFixed(0)}</p>
        </div>
      )}

      {/* LOGS */}
      <h3>Logs</h3>
      {logs.map((log, i) => (
        <div key={i}>
          {log.driver} | ₹{log.ownerShare?.toFixed(0)}
        </div>
      ))}
    </div>
  );
}

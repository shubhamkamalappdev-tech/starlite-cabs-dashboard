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

  // CALCULATION
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

  // DASHBOARD CALC
  let totalOwner = 0;
  let monthlyOwner = 0;
  let driverStats = {};

  const currentMonth = new Date().getMonth();

  logs.forEach(l => {
    totalOwner += l.ownerShare || 0;

    let m = new Date(l.date).getMonth();
    if (m === currentMonth) {
      monthlyOwner += l.ownerShare || 0;
    }

    driverStats[l.driver] =
      (driverStats[l.driver] || 0) + (l.ownerShare || 0);
  });

  return (
    <div style={page}>
      
      <h1 style={{ marginBottom: 20 }}>🚖 Starlite Cabs</h1>

      {/* DASHBOARD */}
      <div style={dashboard}>
        <div style={card}>
          <h4>Total Owner Profit</h4>
          <h2>₹{totalOwner.toFixed(0)}</h2>
        </div>

        <div style={card}>
          <h4>Monthly Profit</h4>
          <h2>₹{monthlyOwner.toFixed(0)}</h2>
        </div>
      </div>

      {/* DRIVER */}
      <div style={section}>
        <h3>Add Driver</h3>
        <div style={row}>
          <input
            style={input}
            placeholder="Driver Name"
            value={driverName}
            onChange={(e) => setDriverName(e.target.value)}
          />
          <button style={btn} onClick={async () => {
            await addDoc(collection(db, "Drivers"), { name: driverName });
            setDriverName("");
            fetchData();
          }}>Add</button>
        </div>

        <select
          style={input}
          value={selectedDriver}
          onChange={(e) => setSelectedDriver(e.target.value)}
        >
          <option value="">Select Driver</option>
          {drivers.map((d, i) => (
            <option key={i} value={d.name}>{d.name}</option>
          ))}
        </select>
      </div>

      {/* ENTRY */}
      <div style={section}>
        <h3>Daily Entry</h3>

        <div style={grid}>
          <input style={input} placeholder="Cash" value={cash} onChange={(e)=>setCash(e.target.value)} />
          <input style={input} placeholder="Online" value={online} onChange={(e)=>setOnline(e.target.value)} />
          <input style={input} placeholder="Cashout" value={cashout} onChange={(e)=>setCashout(e.target.value)} />
          <input style={input} placeholder="Commission" value={commission} onChange={(e)=>setCommission(e.target.value)} />
          <input style={input} placeholder="Subscription" value={subscription} onChange={(e)=>setSubscription(e.target.value)} />
          <input style={input} placeholder="Toll" value={toll} onChange={(e)=>setToll(e.target.value)} />
          <input style={input} placeholder="KM" value={km} onChange={(e)=>setKm(e.target.value)} />
          <input style={input} placeholder="Driver Paid" value={driverPaid} onChange={(e)=>setDriverPaid(e.target.value)} />
        </div>

        <div style={{ marginTop: 10 }}>
          <button style={btn} onClick={calculate}>Calculate</button>
          <button style={{ ...btn, marginLeft: 10 }} onClick={saveLog}>Save</button>
        </div>

        {result && (
          <div style={resultBox}>
            <p>Profit: ₹{result.profit.toFixed(0)}</p>
            <p>Owner: ₹{result.ownerShare.toFixed(0)}</p>
            <p>Driver: ₹{result.driverShare.toFixed(0)}</p>
            <p>Balance: ₹{result.driverBalance.toFixed(0)}</p>
          </div>
        )}
      </div>

      {/* LOGS */}
      <div style={section}>
        <h3>Logs</h3>

        <table style={table}>
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

    </div>
  );
}

/* 🎨 STYLES */

const page = {
  background: "#0f172a",
  minHeight: "100vh",
  padding: 20,
  color: "white",
  fontFamily: "system-ui"
};

const dashboard = {
  display: "flex",
  gap: 15,
  flexWrap: "wrap"
};

const card = {
  background: "#1e293b",
  padding: 15,
  borderRadius: 10,
  minWidth: 200
};

const section = {
  background: "#1e293b",
  padding: 15,
  borderRadius: 10,
  marginTop: 20
};

const row = {
  display: "flex",
  gap: 10
};

const grid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 10
};

const input = {
  padding: 10,
  borderRadius: 6,
  border: "none",
  width: "100%"
};

const btn = {
  padding: 10,
  borderRadius: 6,
  border: "none",
  background: "#22c55e",
  color: "white",
  cursor: "pointer"
};

const resultBox = {
  marginTop: 10,
  background: "#020617",
  padding: 10,
  borderRadius: 8
};

const table = {
  width: "100%",
  marginTop: 10
};

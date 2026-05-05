"use client";

import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

export default function Home() {
  const [logs, setLogs] = useState([]);
  const [cars, setCars] = useState([]);
  const [drivers, setDrivers] = useState([]);

  const [earnings, setEarnings] = useState("");
  const [expenses, setExpenses] = useState("");

  const [carNumber, setCarNumber] = useState("");
  const [carType, setCarType] = useState("");

  const [driverName, setDriverName] = useState("");
  const [assignedCar, setAssignedCar] = useState("");

  const [selectedCar, setSelectedCar] = useState("");
  const [selectedDriver, setSelectedDriver] = useState("");

  async function fetchData() {
    const logsSnap = await getDocs(collection(db, "DailyLogs"));
    const carsSnap = await getDocs(collection(db, "Cars"));
    const driversSnap = await getDocs(collection(db, "Drivers"));

    setLogs(logsSnap.docs.map(doc => doc.data()));
    setCars(carsSnap.docs.map(doc => doc.data()));
    setDrivers(driversSnap.docs.map(doc => doc.data()));
  }

  useEffect(() => {
    fetchData();
  }, []);

  const total = logs.reduce((acc, item) => acc + (item.net_profit || 0), 0);

  async function addCar() {
    if (!carNumber || !carType) {
      alert("Enter car details");
      return;
    }

    await addDoc(collection(db, "Cars"), {
      number: carNumber,
      type: carType
    });

    setCarNumber("");
    setCarType("");
    fetchData();
  }

  async function addDriver() {
    if (!driverName || !assignedCar) {
      alert("Enter driver + assign car");
      return;
    }

    await addDoc(collection(db, "Drivers"), {
      name: driverName,
      car: assignedCar
    });

    setDriverName("");
    setAssignedCar("");
    fetchData();
  }

  async function addLog() {
    if (!selectedCar || !selectedDriver) {
      alert("Select car and driver first");
      return;
    }

    const net_profit = Number(earnings) - Number(expenses);

    await addDoc(collection(db, "DailyLogs"), {
      earnings: Number(earnings),
      expenses: Number(expenses),
      net_profit,
      car: selectedCar,
      driver: selectedDriver,
      date: new Date().toISOString()
    });

    setEarnings("");
    setExpenses("");
    setSelectedCar("");
    setSelectedDriver("");
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

      <h3>Cars</h3>
      {cars.map((car, i) => (
        <div key={i}>
          {car.number} - {car.type}
        </div>
      ))}

      {/* ADD DRIVER */}
      <h3 style={{ marginTop: 20 }}>Add Driver</h3>
      <input
        placeholder="Driver Name"
        value={driverName}
        onChange={(e) => setDriverName(e.target.value)}
      />

      <select
        value={assignedCar}
        onChange={(e) => setAssignedCar(e.target.value)}
      >
        <option value="">Assign Car</option>
        {cars.map((car, i) => (
          <option key={i} value={car.number}>
            {car.number}
          </option>
        ))}
      </select>

      <button onClick={addDriver}>Add Driver</button>

      <h3>Drivers</h3>
      {drivers.map((driver, i) => (
        <div key={i}>
          {driver.name} → {driver.car}
        </div>
      ))}

      {/* DAILY LOG */}
      <h3 style={{ marginTop: 20 }}>Add Daily Log</h3>

      <select
        value={selectedCar}
        onChange={(e) => setSelectedCar(e.target.value)}
      >
        <option value="">Select Car</option>
        {cars.map((car, i) => (
          <option key={i} value={car.number}>
            {car.number}
          </option>
        ))}
      </select>

      <select
        value={selectedDriver}
        onChange={(e) => setSelectedDriver(e.target.value)}
      >
        <option value="">Select Driver</option>
        {drivers.map((driver, i) => (
          <option key={i} value={driver.name}>
            {driver.name}
          </option>
        ))}
      </select>

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
          {log.car} | {log.driver} | ₹{log.net_profit}
        </div>
      ))}
    </div>
  );
}

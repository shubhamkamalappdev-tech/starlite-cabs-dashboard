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

import DashboardCards from "../widgets/DashboardCards";
import EntryForm from "../widgets/EntryForm";
import LogsTable from "../widgets/LogsTable";

import { colors } from "./styles/theme";

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
    try {
      const snap = await getDocs(collection(db, "Logs"));

      const data = snap.docs.map((d) => ({
        id: d.id,
        ...d.data()
      }));

      setLogs(data);
    } catch (e) {
      console.log(e);
    }
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
    try {
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
    } catch (e) {
      console.log(e);
    }
  }

  function editLog(log) {
    setEditingId(log.id);

    setForm({
      driver: log.driver || "",
      car: log.car || "",
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
    .filter((l) => {
      if (!l.date) return false;

      return (
        new Date(l.date).getMonth() === currentMonth
      );
    })
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
      <h1 style={{ marginBottom: 20 }}>
        🚖 Starlite Cabs Pro
      </h1>

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

      <LogsTable
        logs={logs}
        editLog={editLog}
      />
    </div>
  );
}

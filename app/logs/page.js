"use client";

import { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar";
import LogsForm from "../../components/LogsForm";

import {
  addLog,
  getLogs,
  getDrivers,
  getVehicles,
  deleteLog,
  updateLog
} from "../../lib/firebaseHelpers";

export default function Logs() {
  const [logs, setLogs] =
    useState([]);

  const [drivers, setDrivers] =
    useState([]);

  const [vehicles, setVehicles] =
    useState([]);

  async function loadData() {
    const logsData =
      await getLogs();

    const driversData =
      await getDrivers();

    const vehiclesData =
      await getVehicles();

    setLogs(logsData);
    setDrivers(driversData);
    setVehicles(vehiclesData);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function saveLog(data) {
    await addLog(data);

    loadData();
  }

  function shareWhatsApp(log) {
    const text =
      `🚖 Starlite Cabs Daily Report

Driver: ${log.driver}
Car: ${log.car}

Profit: ₹${log.profit}`;

    window.open(
      `https://wa.me/?text=${encodeURIComponent(
        text
      )}`
    );
  }

  async function handleDelete(
    id
  ) {
    const ok = confirm(
      "Delete log?"
    );

    if (!ok) return;

    await deleteLog(id);

    loadData();
  }

  async function handleEdit(
    log
  ) {
    const profit = prompt(
      "New Profit",
      log.profit
    );

    if (!profit) return;

    await updateLog(log.id, {
      profit
    });

    loadData();
  }

  return (
    <div
      style={{
        display: "flex",
        background: "#050816",
        minHeight: "100vh",
        color: "white"
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          padding: 30
        }}
      >
        <h1
          style={{
            marginBottom: 30
          }}
        >
          Daily Logs
        </h1>

        <LogsForm
          onSave={saveLog}
          drivers={drivers}
          vehicles={vehicles}
        />

        <div
          style={{
            marginTop: 30,
            background: "#111827",
            padding: 24,
            borderRadius: 20,
            border:
              "1px solid #1E293B",
            overflowX: "auto"
          }}
        >
          <h2
            style={{
              marginBottom: 20
            }}
          >
            Logs History
          </h2>

          <table
            style={{
              width: "100%"
            }}
          >
            <thead>
              <tr
                style={{
                  color: "#94A3B8",
                  textAlign: "left"
                }}
              >
                <th>Date</th>
                <th>Driver</th>
                <th>Car</th>
                <th>Profit</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {logs.map((log) => (
                <tr key={log.id}>
                  <td>
                    {log.createdAt}
                  </td>

                  <td>
                    {log.driver}
                  </td>

                  <td>{log.car}</td>

                  <td>
                    ₹{log.profit}
                  </td>

                  <td>
                    <div
                      style={{
                        display:
                          "flex",
                        gap: 8,
                        flexWrap:
                          "wrap"
                      }}
                    >
                      <button
                        onClick={() =>
                          shareWhatsApp(
                            log
                          )
                        }
                      >
                        WhatsApp
                      </button>

                      <button
                        onClick={() =>
                          handleEdit(
                            log
                          )
                        }
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(
                            log.id
                          )
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
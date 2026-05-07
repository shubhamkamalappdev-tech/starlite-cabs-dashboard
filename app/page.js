"use client";

import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import AnalyticsCards from "../components/AnalyticsCards";
import ProfitChart from "../components/ProfitChart";

import { getLogs } from "../lib/firebaseHelpers";

export default function Home() {
  const [logs, setLogs] =
    useState([]);

  useEffect(() => {
    loadLogs();
  }, []);

  async function loadLogs() {
    const data =
      await getLogs();

    setLogs(data);
  }

  const totalProfit =
    logs.reduce(
      (sum, log) =>
        sum +
        Number(log.profit || 0),
      0
    );

  const ownerProfit =
    logs.reduce(
      (sum, log) =>
        sum +
        Number(
          log.ownerShare || 0
        ),
      0
    );

  const driverPayout =
    logs.reduce(
      (sum, log) =>
        sum +
        Number(
          log.driverShare || 0
        ),
      0
    );

  const bestCar =
    logs.sort(
      (a, b) =>
        b.profit - a.profit
    )[0]?.car;

  const bestDriver =
    logs.sort(
      (a, b) =>
        b.profit - a.profit
    )[0]?.driver;

  const chartData = logs.map(
    (log) => ({
      date: log.createdAt,
      profit:
        Number(log.profit)
    })
  );

  const mobile =
    typeof window !==
      "undefined" &&
    window.innerWidth < 768;

  return (
    <div
      style={{
        display: "flex",
        background: "#050816",
        minHeight: "100vh",
        color: "white",
        overflowX: "hidden"
      }}
    >
      <Sidebar />

      <main
        style={{
          flex: 1,

          padding: mobile
            ? 8
            : 30,

          width: "100%",

          overflowX: "auto"
        }}
      >
        <Header />

        <AnalyticsCards
          totalProfit={
            totalProfit
          }
          ownerProfit={
            ownerProfit
          }
          driverPayout={
            driverPayout
          }
          bestCar={bestCar}
          bestDriver={
            bestDriver
          }
        />

        <ProfitChart
          data={chartData}
        />
      </main>
    </div>
  );
}
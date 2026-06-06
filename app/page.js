"use client";

import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import AnalyticsCards from "../components/AnalyticsCards";
import ProfitChart from "../components/ProfitChart";

import {
  getLogs,
  getRentalLogs,
  getDrivers,
  getVehicles
} from "../lib/firebaseHelpers";

export default function Home() {
  const [logs, setLogs] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  const [selectedMonth, setSelectedMonth] =
    useState("");

  const [selectedVehicle, setSelectedVehicle] =
    useState("");

  const [selectedDriver, setSelectedDriver] =
    useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const logData =
      await getLogs();

    const rentalData =
      await getRentalLogs();

    const driverData =
      await getDrivers();

    const vehicleData =
      await getVehicles();

    setLogs(logData);
    setRentals(rentalData);
    setDrivers(driverData);
    setVehicles(vehicleData);
  }

  const filteredLogs = logs.filter(
    (log) => {
      const monthMatch =
        !selectedMonth ||
        log.createdAt?.startsWith(
          selectedMonth
        );

      const vehicleMatch =
        !selectedVehicle ||
        log.car ===
          selectedVehicle;

      const driverMatch =
        !selectedDriver ||
        log.driver ===
          selectedDriver;

      return (
        monthMatch &&
        vehicleMatch &&
        driverMatch
      );
    }
  );

  const filteredRentals =
    rentals.filter(
      (rental) => {
        const monthMatch =
          !selectedMonth ||
          rental.date?.startsWith(
            selectedMonth
          );

        const vehicleMatch =
          !selectedVehicle ||
          rental.vehicle ===
            selectedVehicle;

        const driverMatch =
          !selectedDriver ||
          rental.driver ===
            selectedDriver;

        return (
          monthMatch &&
          vehicleMatch &&
          driverMatch
        );
      }
    );

  const tripProfit =
    filteredLogs.reduce(
      (sum, log) =>
        sum +
        Number(
          log.profit || 0
        ),
      0
    );

  const rentalIncome =
    filteredRentals.reduce(
      (sum, rental) =>
        sum +
        Number(
          rental.rentalAmount ||
            0
        ),
      0
    );

  const totalProfit =
    tripProfit +
    rentalIncome;

  const ownerProfit =
    filteredLogs.reduce(
      (sum, log) =>
        sum +
        Number(
          log.ownerShare || 0
        ),
      0
    ) + rentalIncome;

  const driverPayout =
    filteredLogs.reduce(
      (sum, log) =>
        sum +
        Number(
          log.driverShare || 0
        ),
      0
    );

  const totalKm =
    filteredLogs.reduce(
      (sum, log) =>
        sum +
        Number(
          log.km || 0
        ),
      0
    );

  const highestDay =
    [...filteredLogs].sort(
      (a, b) =>
        Number(
          b.profit || 0
        ) -
        Number(
          a.profit || 0
        )
    )[0];

  const bestCar =
    [...filteredLogs].sort(
      (a, b) =>
        Number(
          b.profit || 0
        ) -
        Number(
          a.profit || 0
        )
    )[0]?.car;

  const bestDriver =
    [...filteredLogs].sort(
      (a, b) =>
        Number(
          b.profit || 0
        ) -
        Number(
          a.profit || 0
        )
    )[0]?.driver;

  const chartData =
    filteredLogs.map(
      (log) => ({
        date:
          log.createdAt,
        profit:
          Number(
            log.profit || 0
          )
      })
    );

  const mobile =
    typeof window !==
      "undefined" &&
    window.innerWidth <
      768;

  return (
    <div
      style={{
        display: "flex",
        background:
          "#050816",
        minHeight:
          "100vh",
        color: "white",
        overflowX:
          "hidden"
      }}
    >
      <Sidebar />

      <main
        style={{
          flex: 1,
          padding:
            mobile
              ? 8
              : 30,
          width: "100%",
          overflowX:
            "auto"
        }}
      >
        <Header
          selectedMonth={
            selectedMonth
          }
          setSelectedMonth={
            setSelectedMonth
          }
          selectedVehicle={
            selectedVehicle
          }
          setSelectedVehicle={
            setSelectedVehicle
          }
          selectedDriver={
            selectedDriver
          }
          setSelectedDriver={
            setSelectedDriver
          }
          vehicles={
            vehicles
          }
          drivers={
            drivers
          }
        />

        <AnalyticsCards
          totalProfit={
            totalProfit
          }
          rentalIncome={
            rentalIncome
          }
          ownerProfit={
            ownerProfit
          }
          driverPayout={
            driverPayout
          }
          totalKm={
            totalKm
          }
          highestDay={
            highestDay
          }
          bestCar={
            bestCar
          }
          bestDriver={
            bestDriver
          }
        />

        <ProfitChart
          data={
            chartData
          }
        />
      </main>
    </div>
  );
}
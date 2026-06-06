"use client";

import { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar";
import RentalForm from "../../components/RentalForm";

import {
  addRentalLog,
  getRentalLogs,
  getDrivers,
  getVehicles,
  deleteRentalLog
} from "../../lib/firebaseHelpers";

export default function Rentals() {
  const [rentals, setRentals] =
    useState([]);

  const [drivers, setDrivers] =
    useState([]);

  const [vehicles, setVehicles] =
    useState([]);

  async function loadData() {
    setRentals(
      await getRentalLogs()
    );

    setDrivers(
      await getDrivers()
    );

    setVehicles(
      await getVehicles()
    );
  }

  useEffect(() => {
    loadData();
  }, []);

  async function saveRental(
    data
  ) {
    await addRentalLog(
      data
    );

    loadData();
  }

  async function remove(id) {
    const ok = confirm(
      "Delete rental?"
    );

    if (!ok) return;

    await deleteRentalLog(
      id
    );

    loadData();
  }

  return (
    <div
      style={{
        display: "flex",
        background:
          "#050816",
        minHeight:
          "100vh",
        color: "white"
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          padding: 20
        }}
      >
        <h1>
          Rental Logs
        </h1>

        <RentalForm
          onSave={
            saveRental
          }
          drivers={
            drivers
          }
          vehicles={
            vehicles
          }
        />

        <table
          style={{
            width: "100%",
            marginTop: 30
          }}
        >
          <thead>
            <tr>
              <th>Date</th>
              <th>Driver</th>
              <th>Vehicle</th>
              <th>Rental</th>
              <th>
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {rentals.map(
              (r) => (
                <tr
                  key={
                    r.id
                  }
                >
                  <td>
                    {
                      r.date
                    }
                  </td>

                  <td>
                    {
                      r.driver
                    }
                  </td>

                  <td>
                    {
                      r.vehicle
                    }
                  </td>

                  <td>
                    ₹
                    {
                      r.rentalAmount
                    }
                  </td>

                  <td>
                    <button
                      onClick={() =>
                        remove(
                          r.id
                        )
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
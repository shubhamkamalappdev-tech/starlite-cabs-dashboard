"use client";

import { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar";
import VehicleForm from "../../components/VehicleForm";

import {
  addVehicle,
  getVehicles,
  deleteVehicle,
  updateVehicle
} from "../../lib/firebaseHelpers";

export default function Vehicles() {
  const [vehicles, setVehicles] =
    useState([]);

  async function loadVehicles() {
    const data =
      await getVehicles();

    setVehicles(data);
  }

  useEffect(() => {
    loadVehicles();
  }, []);

  async function handleAdd(
    data
  ) {
    await addVehicle(data);

    loadVehicles();
  }

  async function handleDelete(
    id
  ) {
    const ok = confirm(
      "Delete vehicle?"
    );

    if (!ok) return;

    await deleteVehicle(id);

    loadVehicles();
  }

  async function handleEdit(
    vehicle
  ) {
    const carNumber =
      prompt(
        "Car Number",
        vehicle.carNumber
      );

    if (!carNumber)
      return;

    const model = prompt(
      "Model",
      vehicle.model
    );

    const emi = prompt(
      "Monthly EMI",
      vehicle.emi
    );

    await updateVehicle(
      vehicle.id,
      {
        carNumber,
        model,
        emi
      }
    );

    loadVehicles();
  }

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

      <div
        style={{
          flex: 1,

          padding:
            window.innerWidth <
            768
              ? 12
              : 30,

          width: "100%",

          overflowX: "auto"
        }}
      >
        <h1
          style={{
            marginBottom: 30
          }}
        >
          Vehicle Management
        </h1>

        <VehicleForm
          onAdd={handleAdd}
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
            Fleet Vehicles
          </h2>

          <table
            style={{
              width: "100%"
            }}
          >
            <thead>
              <tr>
                <th>
                  Car Number
                </th>

                <th>Model</th>

                <th>EMI</th>

                <th>
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {vehicles.map((v) => (
                <tr key={v.id}>
                  <td>
                    {
                      v.carNumber
                    }
                  </td>

                  <td>
                    {v.model}
                  </td>

                  <td>
                    ₹{v.emi}
                  </td>

                  <td>
                    <button
                      onClick={() =>
                        handleEdit(
                          v
                        )
                      }
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          v.id
                        )
                      }
                    >
                      Delete
                    </button>
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
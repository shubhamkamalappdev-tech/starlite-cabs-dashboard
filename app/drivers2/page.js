"use client";

import { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar";
import DriverForm from "../../components/DriverForm";
import DataTable from "../../components/DataTable";

import {
  addDriver,
  getDrivers,
  deleteDriver,
  updateDriver
} from "../../lib/firebaseHelpers";

export default function Drivers() {
  const [drivers, setDrivers] =
    useState([]);

  async function loadDrivers() {
    const data =
      await getDrivers();

    setDrivers(data);
  }

  useEffect(() => {
    loadDrivers();
  }, []);

  async function handleAdd(
    data
  ) {
    await addDriver(data);

    loadDrivers();
  }

  async function handleDelete(
    id
  ) {
    const ok = confirm(
      "Delete driver?"
    );

    if (!ok) return;

    await deleteDriver(id);

    loadDrivers();
  }

  async function handleEdit(
    driver
  ) {
    const name = prompt(
      "New name",
      driver.name
    );

    if (!name) return;

    const phone = prompt(
      "New phone",
      driver.phone
    );

    await updateDriver(
      driver.id,
      {
        name,
        phone
      }
    );

    loadDrivers();
  }

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

      <div
        style={{
          flex: 1,

          padding: mobile
            ? 8
            : 30,

          width: "100%",

          overflowX: "auto"
        }}
      >
        <h1
          style={{
            marginBottom: 20,

            fontSize: mobile
              ? 34
              : 48
          }}
        >
          Drivers
        </h1>

        <DriverForm
          onAdd={handleAdd}
        />

        <div
          style={{
            overflowX: "auto"
          }}
        >
          <DataTable
            drivers={drivers}
            onDelete={
              handleDelete
            }
            onEdit={
              handleEdit
            }
          />
        </div>
      </div>
    </div>
  );
}
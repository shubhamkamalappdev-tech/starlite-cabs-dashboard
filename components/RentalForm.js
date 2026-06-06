"use client";

import { useState } from "react";

export default function RentalForm({
  onSave,
  drivers,
  vehicles
}) {
  const [form, setForm] =
    useState({
      date: "",
      driver: "",
      vehicle: "",
      rentalAmount: ""
    });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await onSave(form);

    setForm({
      date: "",
      driver: "",
      vehicle: "",
      rentalAmount: ""
    });
  }

  return (
    <form
      onSubmit={
        handleSubmit
      }
      style={{
        background:
          "#111827",
        padding: 20,
        borderRadius: 16,
        marginBottom: 20
      }}
    >
      <h2>
        Daily Rental Entry
      </h2>

      <div
        style={{
          display: "grid",
          gap: 12,
          marginTop: 15
        }}
      >
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={
            handleChange
          }
        />

        <select
          name="driver"
          value={form.driver}
          onChange={
            handleChange
          }
        >
          <option value="">
            Select Driver
          </option>

          {drivers.map((d) => (
            <option
              key={d.id}
              value={d.name}
            >
              {d.name}
            </option>
          ))}
        </select>

        <select
          name="vehicle"
          value={
            form.vehicle
          }
          onChange={
            handleChange
          }
        >
          <option value="">
            Select Vehicle
          </option>

          {vehicles.map((v) => (
            <option
              key={v.id}
              value={
                v.carNumber
              }
            >
              {v.carNumber}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="rentalAmount"
          placeholder="Rental Received"
          value={
            form.rentalAmount
          }
          onChange={
            handleChange
          }
        />

        <button
          type="submit"
        >
          Save Rental
        </button>
      </div>
    </form>
  );
}
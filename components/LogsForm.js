"use client";

import { useState } from "react";

export default function LogsForm({
  onSave,
  drivers,
  vehicles
}) {
  const [form, setForm] =
    useState({
      driver: "",
      car: "",

      cash: "",
      online: "",
      commission: "",
      cashout: "",

      subscription: "",
      toll: "",

      km: "",
      fuelRate: 5,

      advance: ""
    });

  const mobile =
    typeof window !==
      "undefined" &&
    window.innerWidth < 768;

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const fuel =
      Number(form.km || 0) *
      Number(
        form.fuelRate || 5
      );

    const total =
      Number(form.cash || 0) +
      Number(form.online || 0) +
      Number(form.cashout || 0);

    const expenses =
      Number(
        form.commission || 0
      ) +
      Number(
        form.subscription || 0
      ) +
      Number(form.toll || 0) +
      fuel;

    const profit =
      total - expenses;

    const ownerShare =
      profit * 0.6;

    const driverShare =
      profit * 0.4;

    const balance =
      driverShare -
      Number(
        form.advance || 0
      );

    await onSave({
      ...form,

      fuel,
      total,
      expenses,
      profit,

      ownerShare,
      driverShare,
      balance,

      createdAt:
        new Date().toLocaleDateString()
    });

    alert("Saved");

    setForm({
      driver: "",
      car: "",

      cash: "",
      online: "",
      commission: "",
      cashout: "",

      subscription: "",
      toll: "",

      km: "",
      fuelRate: 5,

      advance: ""
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "#111827",
        padding: 24,
        borderRadius: 20,
        border:
          "1px solid #1E293B"
      }}
    >
      <h2
        style={{
          marginBottom: 20
        }}
      >
        Daily Log Entry
      </h2>

      <div
        style={{
          display: "grid",

          gridTemplateColumns:
            mobile
              ? "1fr"
              : "1fr 1fr",

          gap: 12
        }}
      >
        <select
          name="driver"
          onChange={
            handleChange
          }
          value={form.driver}
        >
          <option>
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
          name="car"
          onChange={
            handleChange
          }
          value={form.car}
        >
          <option>
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
          name="cash"
          placeholder="Cash"
          onChange={
            handleChange
          }
          value={form.cash}
        />

        <input
          name="online"
          placeholder="Online"
          onChange={
            handleChange
          }
          value={form.online}
        />

        <input
          name="commission"
          placeholder="Commission"
          onChange={
            handleChange
          }
          value={
            form.commission
          }
        />

        <input
          name="cashout"
          placeholder="Cashout"
          onChange={
            handleChange
          }
          value={
            form.cashout
          }
        />

        <input
          name="subscription"
          placeholder="Subscription"
          onChange={
            handleChange
          }
          value={
            form.subscription
          }
        />

        <input
          name="toll"
          placeholder="Toll"
          onChange={
            handleChange
          }
          value={form.toll}
        />

        <input
          name="km"
          placeholder="KM Driven"
          onChange={
            handleChange
          }
          value={form.km}
        />

        <input
          name="fuelRate"
          placeholder="Fuel ₹/km"
          onChange={
            handleChange
          }
          value={
            form.fuelRate
          }
        />

        <input
          name="advance"
          placeholder="Driver Advance"
          onChange={
            handleChange
          }
          value={
            form.advance
          }
        />
      </div>

      <button
        type="submit"
        style={{
          marginTop: 20,
          background: "#2563EB",
          border: "none",
          padding:
            "12px 20px",
          borderRadius: 12,
          color: "white",
          cursor: "pointer"
        }}
      >
        Calculate & Save
      </button>
    </form>
  );
}
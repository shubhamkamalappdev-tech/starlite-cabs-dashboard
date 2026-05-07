"use client";

import { useState } from "react";

export default function VehicleForm({
  onAdd
}) {
  const [carNumber, setCarNumber] =
    useState("");

  const [model, setModel] =
    useState("");

  const [emi, setEmi] =
    useState("");

  const mobile =
    typeof window !==
      "undefined" &&
    window.innerWidth < 768;

  async function handleSubmit(e) {
    e.preventDefault();

    await onAdd({
      carNumber,
      model,
      emi
    });

    setCarNumber("");
    setModel("");
    setEmi("");
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
        Add Vehicle
      </h2>

      <div
        style={{
          display: "flex",

          flexDirection:
            mobile
              ? "column"
              : "row",

          gap: 12,

          marginBottom: 20
        }}
      >
        <input
          placeholder="Car Number"
          value={carNumber}
          onChange={(e) =>
            setCarNumber(
              e.target.value
            )
          }
          style={{
            flex: 1,
            padding: 14,
            borderRadius: 12,
            border:
              "1px solid #334155",
            background:
              "#0F172A",
            color: "white"
          }}
        />

        <input
          placeholder="Model"
          value={model}
          onChange={(e) =>
            setModel(
              e.target.value
            )
          }
          style={{
            flex: 1,
            padding: 14,
            borderRadius: 12,
            border:
              "1px solid #334155",
            background:
              "#0F172A",
            color: "white"
          }}
        />

        <input
          placeholder="Monthly EMI"
          value={emi}
          onChange={(e) =>
            setEmi(
              e.target.value
            )
          }
          style={{
            flex: 1,
            padding: 14,
            borderRadius: 12,
            border:
              "1px solid #334155",
            background:
              "#0F172A",
            color: "white"
          }}
        />
      </div>

      <button
        type="submit"
        style={{
          background: "#2563EB",
          border: "none",
          padding:
            "12px 20px",
          borderRadius: 12,
          color: "white",
          cursor: "pointer"
        }}
      >
        Save Vehicle
      </button>
    </form>
  );
}
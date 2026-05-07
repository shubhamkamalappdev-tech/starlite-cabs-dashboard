"use client";

import { useState } from "react";

export default function DriverForm({
  onAdd
}) {
  const [name, setName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const mobile =
    typeof window !==
      "undefined" &&
    window.innerWidth < 768;

  async function handleSubmit(e) {
    e.preventDefault();

    await onAdd({
      name,
      phone,
      earnings: 0
    });

    setName("");
    setPhone("");
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
        Add Driver
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
          placeholder="Driver Name"
          value={name}
          onChange={(e) =>
            setName(
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
          placeholder="Phone"
          value={phone}
          onChange={(e) =>
            setPhone(
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
        Save Driver
      </button>
    </form>
  );
}
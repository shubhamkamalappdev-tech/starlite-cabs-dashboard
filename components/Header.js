"use client";

import {
  FaBell,
  FaSearch,
  FaSignOutAlt
} from "react-icons/fa";

import {
  signOut
} from "firebase/auth";

import {
  auth
} from "../firebase";

import { useRouter } from "next/navigation";

export default function Header({
  selectedMonth,
  setSelectedMonth,

  selectedVehicle,
  setSelectedVehicle,

  selectedDriver,
  setSelectedDriver,

  vehicles = [],
  drivers = []
}) {
  const router =
    useRouter();

  async function logout() {
    await signOut(auth);

    router.push("/login");
  }

  const months = [
    "2026-01",
    "2026-02",
    "2026-03",
    "2026-04",
    "2026-05",
    "2026-06",
    "2026-07",
    "2026-08",
    "2026-09",
    "2026-10",
    "2026-11",
    "2026-12"
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        marginBottom: 30
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems:
            "center",
          flexWrap: "wrap",
          gap: 20
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 34,
              fontWeight:
                "bold"
            }}
          >
            Dashboard
          </h1>

          <p
            style={{
              color:
                "#94A3B8"
            }}
          >
            Fleet Management
            System
          </p>
        </div>

        <button
          onClick={logout}
          style={{
            display: "flex",
            alignItems:
              "center",
            gap: 8,
            background:
              "#EF4444",
            border: "none",
            padding:
              "12px 16px",
            borderRadius: 12,
            color: "white",
            cursor:
              "pointer"
          }}
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 12
        }}
      >
        <select
          value={
            selectedMonth
          }
          onChange={(e) =>
            setSelectedMonth(
              e.target.value
            )
          }
          style={{
            padding: 12,
            borderRadius: 12,
            background:
              "#111827",
            color: "white",
            border:
              "1px solid #1E293B"
          }}
        >
          <option value="">
            All Months
          </option>

          {months.map(
            (month) => (
              <option
                key={month}
                value={
                  month
                }
              >
                {month}
              </option>
            )
          )}
        </select>

        <select
          value={
            selectedVehicle
          }
          onChange={(e) =>
            setSelectedVehicle(
              e.target.value
            )
          }
          style={{
            padding: 12,
            borderRadius: 12,
            background:
              "#111827",
            color: "white",
            border:
              "1px solid #1E293B"
          }}
        >
          <option value="">
            All Vehicles
          </option>

          {vehicles.map(
            (v) => (
              <option
                key={v.id}
                value={
                  v.carNumber
                }
              >
                {
                  v.carNumber
                }
              </option>
            )
          )}
        </select>

        <select
          value={
            selectedDriver
          }
          onChange={(e) =>
            setSelectedDriver(
              e.target.value
            )
          }
          style={{
            padding: 12,
            borderRadius: 12,
            background:
              "#111827",
            color: "white",
            border:
              "1px solid #1E293B"
          }}
        >
          <option value="">
            All Drivers
          </option>

          {drivers.map(
            (d) => (
              <option
                key={d.id}
                value={
                  d.name
                }
              >
                {d.name}
              </option>
            )
          )}
        </select>

        <div
          style={{
            display: "flex",
            alignItems:
              "center",
            background:
              "#111827",
            padding:
              "12px 16px",
            borderRadius: 12,
            border:
              "1px solid #1E293B"
          }}
        >
          <FaSearch
            style={{
              marginRight: 10
            }}
          />

          <input
            placeholder="Search..."
            style={{
              background:
                "transparent",
              border: "none",
              outline:
                "none",
              color:
                "white"
            }}
          />
        </div>

        <div
          style={{
            background:
              "#111827",
            padding: 14,
            borderRadius: 12,
            border:
              "1px solid #1E293B"
          }}
        >
          <FaBell />
        </div>
      </div>
    </div>
  );
}
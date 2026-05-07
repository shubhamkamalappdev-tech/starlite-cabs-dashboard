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

export default function Header() {
  const router =
    useRouter();

  async function logout() {
    await signOut(auth);

    router.push("/login");
  }

  return (
    <div
      style={{
        display: "flex",

        justifyContent:
          "space-between",

        alignItems: "center",

        marginBottom: 30,

        gap: 20,

        flexWrap: "wrap"
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
            color: "#94A3B8"
          }}
        >
          Fleet Management
          System
        </p>
      </div>

      <div
        style={{
          display: "flex",

          alignItems:
            "center",

          gap: 14
        }}
      >
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
    </div>
  );
}
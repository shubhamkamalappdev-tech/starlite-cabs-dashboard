"use client";

import Link from "next/link";

import {
  FaHome,
  FaUsers,
  FaCar,
  FaClipboardList,
  FaMoneyBillWave
} from "react-icons/fa";

export default function Sidebar() {
  const mobile =
    typeof window !==
      "undefined" &&
    window.innerWidth < 768;

  const menu = [
    {
      path: "/",
      icon: <FaHome />
    },
    {
      path: "/drivers2",
      icon: <FaUsers />
    },
    {
      path: "/vehicles",
      icon: <FaCar />
    },
    {
      path: "/logs",
      icon: <FaClipboardList />
    },
    {
      path: "/rentals",
      icon: <FaMoneyBillWave />
    }
  ];

  return (
    <aside
      style={{
        width: mobile
          ? 65
          : 220,
        background: "#0F172A",
        padding: mobile
          ? 8
          : 20,
        borderRight:
          "1px solid #1E293B",
        minHeight: "100vh",
        flexShrink: 0
      }}
    >
      <h1
        style={{
          fontSize: mobile
            ? 18
            : 28,
          fontWeight: "bold",
          marginBottom: 30,
          textAlign: "center"
        }}
      >
        {mobile
          ? "SC"
          : "STARLITE"}
      </h1>

      <div
        style={{
          display: "flex",
          flexDirection:
            "column",
          gap: 10
        }}
      >
        {menu.map(
          (item, index) => (
            <Link
              key={index}
              href={item.path}
              style={{
                textDecoration:
                  "none",
                color:
                  "white"
              }}
            >
              <div
                style={{
                  display:
                    "flex",
                  alignItems:
                    "center",
                  justifyContent:
                    "center",
                  padding:
                    mobile
                      ? "14px 10px"
                      : "14px 16px",
                  borderRadius: 12,
                  background:
                    "#111827",
                  fontSize:
                    mobile
                      ? 20
                      : 18
                }}
              >
                {item.icon}
              </div>
            </Link>
          )
        )}
      </div>
    </aside>
  );
}
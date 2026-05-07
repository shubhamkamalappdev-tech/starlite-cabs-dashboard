"use client";

import {
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";

import {
  auth
} from "../../firebase";

import { useRouter } from "next/navigation";

export default function Login() {
  const router =
    useRouter();

  async function login() {
    try {
      const provider =
        new GoogleAuthProvider();

      await signInWithPopup(
        auth,
        provider
      );

      router.push("/");
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent:
          "center",
        alignItems:
          "center",
        background: "#050816",
        color: "white"
      }}
    >
      <div
        style={{
          background:
            "#111827",

          padding: 30,

          borderRadius: 20,

          width: 320,

          textAlign: "center"
        }}
      >
        <h1
          style={{
            marginBottom: 20
          }}
        >
          STARLITE CABS
        </h1>

        <button
          onClick={login}
          style={{
            width: "100%",

            padding: 14,

            background:
              "#2563EB",

            border: "none",

            borderRadius: 10,

            color: "white",

            cursor: "pointer",

            fontSize: 16
          }}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
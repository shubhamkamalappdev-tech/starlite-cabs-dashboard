"use client";

import {
  onAuthStateChanged
} from "firebase/auth";

import {
  auth
} from "../firebase";

import {
  useRouter,
  usePathname
} from "next/navigation";

import {
  useEffect,
  useState
} from "react";

export default function AuthProvider({
  children
}) {
  const router =
    useRouter();

  const pathname =
    usePathname();

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        (user) => {
          if (
            !user &&
            pathname !==
              "/login"
          ) {
            router.push(
              "/login"
            );
          } else {
            setLoading(
              false
            );
          }
        }
      );

    return () =>
      unsubscribe();
  }, [pathname]);

  if (loading) {
    return (
      <div
        style={{
          minHeight:
            "100vh",

          display: "flex",

          justifyContent:
            "center",

          alignItems:
            "center",

          background:
            "#050816",

          color: "white"
        }}
      >
        Checking Login...
      </div>
    );
  }

  return children;
}
"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { userApi } from "@/api/user";

export function withAuth<T>(WrappedComponent: React.ComponentType<T>) {
  return function WithAuth(props: T) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
      async function checkAuth() {
        try {
          const token = localStorage.getItem("jwt") || "";
          const isValid = await userApi.verifyToken(token);

          if (isValid) {
            setIsAuthenticated(true);
          } else {
            router.push("/login");
          }
        } catch (error) {
          router.push("/login");
        }
      }

      checkAuth();
    }, [router]);

    if (!isAuthenticated) {
      return null; // or a loading spinner
    }

    return <WrappedComponent {...(props as T & JSX.IntrinsicAttributes)} />;
  };
}

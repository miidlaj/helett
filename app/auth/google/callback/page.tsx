import { Metadata } from "next";
import { Suspense } from "react";

import GoogleCallback from "./components/GoogleCallback";

export const metadata: Metadata = {
  title: "Google Authentication | Helett",
  description: "Processing Google authentication",
};

export default function GoogleCallbackPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GoogleCallback />
    </Suspense>
  );
}

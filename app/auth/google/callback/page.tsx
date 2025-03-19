import { Metadata } from "next";

import GoogleCallback from "./components/GoogleCallback";

export const metadata: Metadata = {
  title: "Google Authentication | Your App Name",
  description: "Processing Google authentication",
};

export default function GoogleCallbackPage() {
  return <GoogleCallback />;
}

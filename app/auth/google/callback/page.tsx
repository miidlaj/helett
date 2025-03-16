import GoogleCallback from "@/app/login/components/GoogleCallback";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Google Authentication | Your App Name",
  description: "Processing Google authentication",
};

export default function GoogleCallbackPage() {
  return <GoogleCallback />;
}

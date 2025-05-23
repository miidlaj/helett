import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { Toaster } from "sonner";

import { Providers } from "./providers";
import Document from "./_document";
import { inter, poppins } from "./fonts";

import { fontPoppins } from "@/config/fonts";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/footer";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "Helett",
    template: "%s | Helett",
  },
  description:
    "Helett is a trusted brand offering a range of high-quality products designed for businesses and retail environments.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      className={`light ${inter.variable} ${poppins.variable}`}
      lang="en"
    >
      <head />
      <body
        className={clsx(
          "relative bg-background font-poppins antialiased h-screen w-full bg-white dark:bg-black",
          fontPoppins.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <Navbar />

          <div className="py-20">{children}</div>

          <Footer />
        </Providers>
        <Document />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}

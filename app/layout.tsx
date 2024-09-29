import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@nextui-org/link";
import clsx from "clsx";

import { Providers } from "./providers";

import { fontSans } from "@/config/fonts";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/footer";
import { ThemeSwitch } from "@/components/theme-switch";
import { ScrollArea } from "@/components/ui/scroll-area";

// export const metadata: Metadata = {
//   title: {
//     default: siteConfig.name,
//     template: `%s - ${siteConfig.name}`,
//   },
//   description: siteConfig.description,
//   icons: {
//     icon: "/favicon.ico",
//   },
// };

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en" className="light">
      <head />
      <body
        className={clsx(
          "relative bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <ScrollArea className="h-screen w-full bg-white dark:bg-black">
          <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
            <Navbar className="top-2 z-50" />
            {children}

            <Footer />
            <div className="fixed right-4 bottom-4 z-50">
              <ThemeSwitch />
            </div>
          </Providers>
        </ScrollArea>
      </body>
    </html>
  );
}

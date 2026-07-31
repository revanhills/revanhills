import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Revan Hills | Farmstay near Girnar",
  description: "A warm, hosted farmstay near Junagadh, Gujarat.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

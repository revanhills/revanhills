import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://revanhills-official.pages.dev"),
  title: "Revan Hills | Farmstay near Girnar",
  description: "Farm stay in Malida, near Junagadh. Hosted by Devang.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Revan Hills",
    title: "Private villa & farmstay near Girnar",
    description: "Farm stay in Malida, near Junagadh · Hosted by Devang · 4 rooms, 8 beds, 2 ways to stay",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Revan Hills private villa and farmstay near Girnar" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Private villa & farmstay near Girnar",
    description: "Farm stay in Malida, near Junagadh · Hosted by Devang",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

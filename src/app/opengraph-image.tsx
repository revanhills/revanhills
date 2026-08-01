import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";

export const alt = "Revan Hills private villa and farmstay near Girnar";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";
export const runtime = "nodejs";

export default async function OpenGraphImage() {
  const heroImage = `data:image/jpeg;base64,${(await readFile("public/images/property/hero-pool-villa-social.jpg")).toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ background: "#14201c", color: "white", display: "flex", height: "100%", width: "100%", position: "relative" }}>
        <img alt="" src={heroImage} style={{ height: "100%", objectFit: "cover", opacity: 0.78, position: "absolute", width: "100%" }} />
        <div style={{ background: "linear-gradient(90deg, rgba(11, 20, 16, 0.96) 0%, rgba(11, 20, 16, 0.74) 48%, rgba(11, 20, 16, 0.14) 100%)", display: "flex", inset: 0, position: "absolute" }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "58px 64px", position: "relative", width: "720px" }}>
          <div style={{ color: "#cbded4", display: "flex", fontSize: 25, fontWeight: 700, letterSpacing: 0.4 }}>
            Farm stay in Malida, near Junagadh&nbsp;&nbsp;|&nbsp;&nbsp;Hosted by Devang
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 66, fontWeight: 800, letterSpacing: -2.8, lineHeight: 1.03 }}>
              Private villa &amp; farmstay near Girnar
            </div>
            <div style={{ background: "#d2ded7", height: "2px", margin: "30px 0 25px", width: "100%" }} />
            <div style={{ color: "#e6ede9", fontSize: 30, fontWeight: 700, letterSpacing: 0.3 }}>
              4 rooms, 8 beds, 2 ways to stay
            </div>
          </div>
          <div style={{ color: "#e6ede9", fontSize: 20, fontWeight: 800, letterSpacing: 4.2 }}>
            REVAN HILLS&nbsp;&nbsp;ECOSTAY
          </div>
        </div>
      </div>
    ),
    size,
  );
}

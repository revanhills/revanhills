"use client";

import Image from "next/image";
import { useState } from "react";
import { Camera, Images, Play, X } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { MediaCategory, mediaItems } from "@/lib/property-data";

const categories: Array<"All" | MediaCategory> = ["All", "Exterior", "Pool", "Bedrooms", "Bathrooms", "Dining", "Terrace", "Garden", "Views", "Nearby"];

export default function GalleryPage() {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [mode, setMode] = useState<"photos" | "videos">("photos");
  const [selected, setSelected] = useState<number | null>(null);
  const filtered = category === "All" ? mediaItems : mediaItems.filter((item) => item.category === category);

  return <main className="subpage"><SiteHeader /><header className="shell subpage-heading"><p className="eyebrow">A COMPLETE LOOK AROUND</p><h1>Photos & videos</h1><p>Browse the real Revan Hills property by space. Known duplicates, collages and unrelated screenshots have been left out.</p></header>
    <div className="shell gallery-toolbar"><div className="media-tabs"><button className={mode === "photos" ? "active" : ""} onClick={() => setMode("photos")}><Images size={18} /> Photos</button><button className={mode === "videos" ? "active" : ""} onClick={() => setMode("videos")}><Play size={18} /> Videos</button></div>{mode === "photos" && <div className="filter-scroll">{categories.map((item) => <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>)}</div>}</div>
    {mode === "photos" ? <section className="shell gallery-grid">{filtered.map((item, index) => <button key={item.src} className={(index + 1) % 7 === 1 ? "gallery-item gallery-item--large" : "gallery-item"} onClick={() => setSelected(index)}><Image src={item.src} alt={item.alt} fill sizes="(max-width: 760px) 100vw, 33vw" /><span>{item.category}</span></button>)}</section> : <section className="shell video-library"><div className="video-library__intro"><Camera /><h2>Made for real walkthroughs</h2><p>Portrait room tours will lead this section, with landscape property films supported too. These boxes are intentionally marked as placeholders until real footage is supplied.</p></div><div className="video-placeholder-grid"><article className="video-card video-card--portrait"><div><Play fill="currentColor" /><span>9:16 vertical</span></div><h3>Villa walkthrough</h3><p>Video placeholder 01</p></article><article className="video-card video-card--portrait"><div><Play fill="currentColor" /><span>9:16 vertical</span></div><h3>Bedroom tour</h3><p>Video placeholder 02</p></article><article className="video-card video-card--portrait"><div><Play fill="currentColor" /><span>9:16 vertical</span></div><h3>Pool & garden</h3><p>Video placeholder 03</p></article><article className="video-card video-card--landscape"><div><Play fill="currentColor" /><span>16:9 horizontal</span></div><h3>Aerial film</h3><p>Video placeholder 04</p></article></div></section>}
    {selected !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer"><button className="icon-button" onClick={() => setSelected(null)} aria-label="Close photo"><X /></button><div><Image src={filtered[selected].src} alt={filtered[selected].alt} fill sizes="100vw" /></div><p>{filtered[selected].alt}</p></div>}
  </main>;
}

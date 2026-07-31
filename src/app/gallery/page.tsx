"use client";

import Image from "next/image";
import { useState } from "react";
import { Camera, Images, Play, X } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { MediaCategory, mediaItems, VideoCategory, videoCategories, videoItems } from "@/lib/property-data";

const categories: Array<"All" | MediaCategory> = ["All", "Exterior", "Pool", "Bedrooms", "Bathrooms", "Dining", "Terrace", "Garden", "Views", "Nearby"];

export default function GalleryPage() {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [videoCategory, setVideoCategory] = useState<"All" | VideoCategory>("All");
  const [mode, setMode] = useState<"photos" | "videos">("photos");
  const [selected, setSelected] = useState<number | null>(null);
  const filtered = category === "All" ? mediaItems : mediaItems.filter((item) => item.category === category);
  const filteredVideos = videoCategory === "All" ? videoItems : videoItems.filter((item) => item.category === videoCategory);

  return <main className="subpage"><SiteHeader /><header className="shell subpage-heading"><p className="eyebrow">A COMPLETE LOOK AROUND</p><h1>Photos & videos</h1><p>Browse the real Revan Hills property by space. Known duplicates, collages and unrelated screenshots have been left out.</p></header>
    <div className="shell gallery-toolbar"><div className="media-tabs" role="tablist" aria-label="Choose photos or videos"><button role="tab" aria-selected={mode === "photos"} className={mode === "photos" ? "active" : ""} onClick={() => setMode("photos")}><Images size={18} /> Photos <small>{mediaItems.length}</small></button><button role="tab" aria-selected={mode === "videos"} className={mode === "videos" ? "active" : ""} onClick={() => setMode("videos")}><Play size={18} /> Videos <small>{videoItems.length}</small></button></div><div className="filter-scroll" role="tablist" aria-label={mode === "photos" ? "Photo categories" : "Video categories"}>{mode === "photos" ? categories.map((item) => <button role="tab" aria-selected={category === item} key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>) : videoCategories.map((item) => <button role="tab" aria-selected={videoCategory === item} key={item} className={videoCategory === item ? "active" : ""} onClick={() => setVideoCategory(item)}>{item === "All" ? "All videos" : item}</button>)}</div></div>
    {mode === "photos" ? <section className="shell gallery-grid">{filtered.map((item, index) => <button key={item.src} className={(index + 1) % 7 === 1 ? "gallery-item gallery-item--large" : "gallery-item"} onClick={() => setSelected(index)}><Image src={item.src} alt={item.alt} fill sizes="(max-width: 760px) 100vw, 33vw" /><span>{item.category}</span></button>)}</section> : <section className="shell video-library"><div className="video-library__intro"><Camera /><h2>{videoCategory === "All" ? "Made for real walkthroughs" : videoCategory}</h2><p>{filteredVideos.length} planned video{filteredVideos.length === 1 ? "" : "s"}. Portrait room tours lead this section, with landscape property films supported too. Real footage will replace these clearly marked placeholders.</p></div><div className="video-placeholder-grid">{filteredVideos.map((item) => <article key={item.id} className={`video-card video-card--${item.orientation}`}><div><Play fill="currentColor" /><span>{item.format}</span></div><h3>{item.title}</h3><p>{item.category} · Video coming soon</p></article>)}</div></section>}
    {selected !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer"><button className="icon-button" onClick={() => setSelected(null)} aria-label="Close photo"><X /></button><div><Image src={filtered[selected].src} alt={filtered[selected].alt} fill sizes="100vw" /></div><p>{filtered[selected].alt}</p></div>}
  </main>;
}

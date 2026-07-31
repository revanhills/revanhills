"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Bath,
  BedDouble,
  CalendarDays,
  CarFront,
  Check,
  ChevronRight,
  CircleAlert,
  CookingPot,
  DoorOpen,
  Flower2,
  Images,
  MapPin,
  MessageCircle,
  Play,
  ShieldCheck,
  Sparkles,
  Star,
  Trees,
  Users,
  Waves,
  Wifi,
  X,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { amenityGroups, guideItems, houseRules, mediaItems, roomItems, unavailableAmenities } from "@/lib/property-data";

type ModalName = "photos" | "amenities" | "rules" | "video" | null;

function Modal({ active, close }: { active: Exclude<ModalName, null>; close: () => void }) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    document.body.classList.add("modal-open");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("modal-open");
    };
  }, [close]);

  const title = active === "photos" ? "Photo tour" : active === "amenities" ? "What this place offers" : active === "rules" ? "Things to know" : "Property videos";
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && close()}>
      <section className={`modal-panel modal-panel--${active}`} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal-header"><h2 id="modal-title">{title}</h2><button className="icon-button" onClick={close} aria-label="Close"><X /></button></div>
        <div className="modal-body">
          {active === "photos" && <div className="modal-photo-grid">{mediaItems.map((item, index) => <figure key={item.src} className={index % 7 === 0 ? "wide" : ""}><Image src={item.src} alt={item.alt} fill sizes="(max-width: 700px) 100vw, 50vw" /><figcaption>{item.category}</figcaption></figure>)}</div>}
          {active === "amenities" && <><div className="amenity-modal-grid">{amenityGroups.map((group) => <section key={group.title}><h3>{group.title}</h3>{group.items.map((item) => <p key={item}><Check size={18} />{item}</p>)}</section>)}</div><section className="not-included"><h3>Not included or not yet reported</h3>{unavailableAmenities.map((item) => <p key={item}><X size={18} />{item}</p>)}</section></>}
          {active === "rules" && <div className="rules-modal"><section><h3>Checking in and out</h3><p>Check-in is from 10:00 am to 12:00 pm. Checkout is before 10:00 am. Building staff can help you self check in.</p></section><section><h3>During your stay</h3>{houseRules.map((rule) => <p key={rule}><Check size={18} />{rule}</p>)}</section><section><h3>Safety & property</h3><p>Exterior CCTV cameras cover common outdoor areas. There are no cameras inside bedrooms, bathrooms or private guest spaces.</p><p>Smoke and carbon monoxide alarm status was not reported in the source listing and should be confirmed before booking if important to you.</p></section></div>}
          {active === "video" && <div className="video-placeholder-grid"><article className="video-card video-card--portrait"><div><Play fill="currentColor" /><span>Vertical video</span></div><h3>Full property walkthrough</h3><p>Video coming soon</p></article><article className="video-card video-card--portrait"><div><Play fill="currentColor" /><span>Vertical video</span></div><h3>Room-by-room tour</h3><p>Video coming soon</p></article><article className="video-card video-card--landscape"><div><Play fill="currentColor" /><span>Horizontal video</span></div><h3>Revan Hills from the air</h3><p>Video coming soon</p></article></div>}
        </div>
      </section>
    </div>
  );
}

export function PropertyListing() {
  const [modal, setModal] = useState<ModalName>(null);
  const [showSections, setShowSections] = useState(false);
  const [stayType, setStayType] = useState<"villa" | "room">("villa");

  useEffect(() => {
    const update = () => setShowSections(window.scrollY > 620);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <main className="listing-page">
      <SiteHeader compact />
      <nav className={`section-nav ${showSections ? "section-nav--visible" : ""}`} aria-label="Property sections">
        <div className="shell section-nav__inner">
          <div>{[["Photos", "#photos"], ["Overview", "#overview"], ["Rooms", "#rooms"], ["Amenities", "#amenities"], ["Rules", "#rules"], ["Location", "#location"], ["Guide", "#guide"]].map(([label, href]) => <a key={href} href={href}>{label}</a>)}</div>
          <Link href="/book" className="button button--coral">Check dates</Link>
        </div>
      </nav>

      <section className="shell listing-heading">
        <div><p className="listing-kicker">Farm stay in Malida, near Junagadh</p><h1>Revan Hills — private villa & farmstay</h1><p className="listing-meta"><a href="#location">Malida, Gujarat, India</a><span>New direct listing</span></p></div>
        <div className="listing-actions"><button onClick={() => navigator.clipboard?.writeText(window.location.href)}><ArrowRight size={17} /> Share</button><a href="https://wa.me/919825077224" target="_blank"><MessageCircle size={17} /> Save contact</a></div>
      </section>

      <section id="photos" className="shell hero-mosaic">
        <button className="hero-mosaic__main" onClick={() => setModal("photos")} aria-label="Open all property photos"><Image src="/images/property/hero-pool-villa.avif" alt="Revan Hills villa and infinity pool in daylight" fill priority sizes="(max-width: 760px) 88vw, 66vw" /></button>
        <button className="hero-mosaic__side" onClick={() => setModal("photos")} aria-label="Open aerial property photo"><Image src="/images/property/hero-aerial.png" alt="Aerial view of Revan Hills at sunset" fill priority sizes="(max-width: 760px) 88vw, 34vw" /></button>
        <button className="show-photos" onClick={() => setModal("photos")}><Images size={18} /> Show all {mediaItems.length} photos</button>
      </section>

      <div className="shell listing-layout">
        <div className="listing-content">
          <section id="overview" className="listing-section overview-section">
            <div><h2>Entire farmstay hosted by Devang</h2><p>8 guests · 4 bedrooms · 8 beds · 5 bathrooms</p></div><div className="host-avatar">D</div>
          </section>

          <section className="listing-section quick-highlights">
            <article><DoorOpen /><div><h3>Self check-in</h3><p>Building staff are available to welcome you.</p></div></article>
            <article><Waves /><div><h3>Dive right in</h3><p>A shared outdoor infinity pool, open 8:00 am–6:00 pm.</p></div></article>
            <article><Trees /><div><h3>Nature sets the pace</h3><p>Open farmland, garden paths, Girnar views and quieter nights.</p></div></article>
          </section>

          <section className="listing-section description-section">
            <p>Nestled in the landscape of the Girnar Hills, Revan Hills is a peaceful farmstay with mountain views, warm Gujarati hospitality, home-style food and room to slow down.</p>
            <p>Book all four bedrooms for a private family or group stay, or choose an individual room and share the pool, dining and outdoor spaces. Come for a relaxed weekend, spiritual journey, stargazing, seasonal farm life or an unhurried base near Junagadh.</p>
            <button className="text-action" onClick={() => setModal("rules")}>Read the complete property guide <ChevronRight size={18} /></button>
          </section>

          <section id="rooms" className="listing-section">
            <div className="section-title"><div><p className="eyebrow">WHERE YOU’LL SLEEP</p><h2>Four rooms, two ways to stay</h2></div><Link href="/rooms">See room details <ArrowRight size={17} /></Link></div>
            <div className="room-scroll">{roomItems.map((room) => <article className="room-card" key={room.slug}><Link href={`/book?stay=room&room=${room.slug}`}><div className="room-card__image"><Image src={room.image} alt={room.name} fill sizes="(max-width: 760px) 78vw, 30vw" /></div><h3>{room.name}</h3><p>{room.beds}</p><span>{room.tone}</span></Link></article>)}</div>
            <div className="stay-choice-callout"><BedDouble /><div><h3>Prefer the whole place?</h3><p>Reserve all four bedrooms and the full villa for up to 8 guests.</p></div><Link href="/book?stay=villa">Choose entire villa</Link></div>
          </section>

          <section id="amenities" className="listing-section">
            <p className="eyebrow">WHAT THIS PLACE OFFERS</p><h2>Comforts for a slower stay</h2>
            <div className="amenity-preview">
              <p><CookingPot /> Guest kitchen & dining space</p><p><Wifi /> Wi-Fi</p><p><CarFront /> Free parking on premises</p><p><Waves /> Shared outdoor infinity pool</p><p><Flower2 /> Back garden & outdoor furniture</p><p><ShieldCheck /> Exterior-only security cameras</p><p><BedDouble /> Bed linen, towels & extra pillows</p><p><Sparkles /> Breakfast listed — confirm inclusion</p>
            </div>
            <button className="button button--outline-square" onClick={() => setModal("amenities")}>Show all amenities</button>
          </section>

          <section className="listing-section media-invite">
            <div><p className="eyebrow">WATCH THE PROPERTY</p><h2>Walkthroughs are coming next</h2><p>The gallery is ready for portrait-first room tours, farm moments and longer landscape walkthroughs when the videos arrive.</p><button className="button button--ink" onClick={() => setModal("video")}><Play size={17} /> Preview video library</button></div>
            <div className="phone-video-placeholder"><div><Play fill="currentColor" /></div><span>Vertical property tour<br />coming soon</span></div>
          </section>

          <section className="listing-section host-section">
            <div className="host-profile"><div className="host-avatar host-avatar--large">D</div><div><h2>Hosted by Devang</h2><p>Hosting since 2026 · Responds within an hour</p></div></div>
            <p>A filmmaker who enjoys reading and gardening, Devang describes the hosting style simply: make guests feel at home, spend time together when they want company, and give them space when they want quiet.</p>
            <a className="button button--outline-square" href="https://wa.me/919825077224" target="_blank"><MessageCircle size={17} /> Message the host</a>
          </section>

          <section id="rules" className="listing-section">
            <p className="eyebrow">GOOD TO KNOW</p><h2>Before you book</h2>
            <div className="know-grid"><article><CalendarDays /><h3>House rules</h3><p>Check-in 10:00 am–12:00 pm<br />Checkout before 10:00 am<br />No pets · No smoking</p></article><article><ShieldCheck /><h3>Safety</h3><p>Exterior CCTV in common areas. Alarm status should be confirmed.</p></article><article><CircleAlert /><h3>Cancellation</h3><p>Direct-booking cancellation and payment terms will be confirmed with your quote.</p></article></div>
            <button className="text-action" onClick={() => setModal("rules")}>Show all rules and safety details <ChevronRight size={18} /></button>
          </section>

          <section id="location" className="listing-section location-section">
            <p className="eyebrow">WHERE YOU’LL BE</p><h2>Malida, Junagadh, Gujarat</h2><p>Revan Hills · Bawe wali dhar, Malida · Junagadh, Gujarat 362030</p>
            <div className="map-placeholder"><MapPin /><div><strong>Exact map pin being verified</strong><span>Arrival directions will be shared with confirmed guests.</span></div></div>
          </section>

          <section id="guide" className="listing-section guide-preview">
            <div className="section-title"><div><p className="eyebrow">AROUND REVAN HILLS</p><h2>Make more of the journey</h2></div><Link href="/experiences">Open local guide <ArrowRight size={17} /></Link></div>
            <div className="guide-card-grid">{guideItems.slice(0, 3).map((item) => <Link href={`/experiences/${item.slug}`} key={item.slug} className="guide-card"><div><Image src={item.image} alt="" fill sizes="(max-width: 760px) 82vw, 28vw" /></div><p>{item.eyebrow}</p><h3>{item.title}</h3><span>{item.summary}</span></Link>)}</div>
          </section>
        </div>

        <aside className="booking-card">
          <div className="booking-card__top"><div><span>Book direct</span><strong>Price on request</strong></div><small><Star size={14} fill="currentColor" /> New listing</small></div>
          <div className="stay-toggle" role="group" aria-label="Choose stay type"><button className={stayType === "villa" ? "active" : ""} onClick={() => setStayType("villa")}>Entire villa</button><button className={stayType === "room" ? "active" : ""} onClick={() => setStayType("room")}>Private room</button></div>
          <div className="booking-fields"><label><span>Check-in</span><input type="date" /></label><label><span>Checkout</span><input type="date" /></label><label className="booking-fields__wide"><span>Guests</span><select defaultValue="1"><option value="1">1 guest</option>{[2,3,4,5,6,7,8].map((count) => <option key={count} value={count}>{count} guests</option>)}</select></label></div>
          <Link className="button button--coral button--full" href={`/book?stay=${stayType}`}>Check availability</Link>
          <p className="booking-note">You won’t be charged. This sends an availability request to the host.</p>
          <div className="booking-facts"><p><Users /> {stayType === "villa" ? "Up to 8 guests" : "Room occupancy confirmed by host"}</p><p><BedDouble /> {stayType === "villa" ? "4 bedrooms · 8 beds" : "1 king + 1 single bed"}</p><p><Bath /> {stayType === "villa" ? "5 bathrooms" : "Bathroom access"}</p></div>
        </aside>
      </div>

      <div className="mobile-booking-bar"><div><strong>Price on request</strong><span>Choose dates for availability</span></div><Link href="/book" className="button button--coral">Check dates</Link></div>
      {modal && <Modal active={modal} close={() => setModal(null)} />}
    </main>
  );
}

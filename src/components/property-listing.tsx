"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
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
  MessageCircle,
  Play,
  ShieldCheck,
  Sparkles,
  Trees,
  Users,
  Waves,
  Wifi,
  X,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { amenityGroups, guideItems, houseRules, MediaCategory, mediaItems, roomItems, unavailableAmenities, VideoCategory, videoCategories, videoItems } from "@/lib/property-data";

type ModalName = "photos" | "amenities" | "rules" | "video" | null;
type PhotoCategory = "All" | MediaCategory;

const photoCategories: PhotoCategory[] = ["All", "Exterior", "Pool", "Bedrooms", "Bathrooms", "Dining", "Terrace", "Garden", "Views", "Nearby"];

function Modal({ active, close, switchTo }: { active: Exclude<ModalName, null>; close: () => void; switchTo: (next: "photos" | "video") => void }) {
  const [photoCategory, setPhotoCategory] = useState<PhotoCategory>("All");
  const [videoCategory, setVideoCategory] = useState<"All" | VideoCategory>("All");
  const modalBodyRef = useRef<HTMLDivElement>(null);
  const filteredPhotos = photoCategory === "All" ? mediaItems : mediaItems.filter((item) => item.category === photoCategory);
  const filteredVideos = videoCategory === "All" ? videoItems : videoItems.filter((item) => item.category === videoCategory);
  const isMediaTour = active === "photos" || active === "video";

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    document.body.classList.add("modal-open");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("modal-open");
    };
  }, [close]);

  const choosePhotoCategory = (nextCategory: PhotoCategory) => {
    setPhotoCategory(nextCategory);
    modalBodyRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const chooseVideoCategory = (nextCategory: "All" | VideoCategory) => {
    setVideoCategory(nextCategory);
    modalBodyRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const switchMedia = (next: "photos" | "video") => {
    modalBodyRef.current?.scrollTo({ top: 0 });
    switchTo(next);
  };

  const title = isMediaTour ? "Property tour" : active === "amenities" ? "What this place offers" : "Things to know";
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && close()}>
      <section className={`modal-panel modal-panel--${active}`} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal-header"><h2 id="modal-title">{title}</h2>{isMediaTour && <div className="modal-media-switch" role="tablist" aria-label="Choose photos or videos"><button type="button" role="tab" aria-selected={active === "photos"} className={active === "photos" ? "active" : ""} onClick={() => switchMedia("photos")}><Images /> Photos <small>{mediaItems.length}</small></button><button type="button" role="tab" aria-selected={active === "video"} className={active === "video" ? "active" : ""} onClick={() => switchMedia("video")}><Play /> Videos <small>{videoItems.length}</small></button></div>}<button className="icon-button" onClick={close} aria-label="Close"><X /></button></div>
        <div ref={modalBodyRef} className={`modal-body ${isMediaTour ? "modal-body--photos" : ""}`}>
          {active === "photos" && <>
            <nav className="photo-tour-nav" aria-label="Photo categories">
              <div className="photo-tour-tabs" role="tablist" aria-label="Choose a photo category">
                {photoCategories.map((item) => {
                  const count = item === "All" ? mediaItems.length : mediaItems.filter((photo) => photo.category === item).length;
                  return <button key={item} type="button" role="tab" aria-selected={photoCategory === item} className={photoCategory === item ? "active" : ""} onClick={() => choosePhotoCategory(item)}><span>{item === "All" ? "All photos" : item}</span><small>{count}</small></button>;
                })}
              </div>
              <p><strong>{photoCategory === "All" ? "Entire property" : photoCategory}</strong><span>{filteredPhotos.length} photo{filteredPhotos.length === 1 ? "" : "s"}</span></p>
            </nav>
            <div className="modal-photo-grid">{filteredPhotos.map((item, index) => <figure key={item.src} className={index === 0 && filteredPhotos.length > 2 ? "wide" : ""}><Image src={item.src} alt={item.alt} fill sizes="(max-width: 700px) 100vw, 50vw" /><figcaption>{item.alt}</figcaption></figure>)}</div>
          </>}
          {active === "amenities" && <><div className="amenity-modal-grid">{amenityGroups.map((group) => <section key={group.title}><h3>{group.title}</h3>{group.items.map((item) => <p key={item}><Check size={18} />{item}</p>)}</section>)}</div><section className="not-included"><h3>Not included or not yet reported</h3>{unavailableAmenities.map((item) => <p key={item}><X size={18} />{item}</p>)}</section></>}
          {active === "rules" && <div className="rules-modal"><section><h3>Checking in and out</h3><p>Check-in is from 10:00 am to 12:00 pm. Checkout is before 10:00 am. Building staff can help you self check in.</p></section><section><h3>During your stay</h3>{houseRules.map((rule) => <p key={rule}><Check size={18} />{rule}</p>)}</section><section><h3>Safety & property</h3><p>Exterior CCTV cameras cover common outdoor areas. There are no cameras inside bedrooms, bathrooms or private guest spaces.</p><p>Smoke and carbon monoxide alarm availability is not currently confirmed. Ask the host before booking if this is important to you.</p></section></div>}
          {active === "video" && <>
            <nav className="photo-tour-nav" aria-label="Video categories">
              <div className="photo-tour-tabs" role="tablist" aria-label="Choose a video category">
                {videoCategories.map((item) => {
                  const count = item === "All" ? videoItems.length : videoItems.filter((video) => video.category === item).length;
                  return <button key={item} type="button" role="tab" aria-selected={videoCategory === item} className={videoCategory === item ? "active" : ""} onClick={() => chooseVideoCategory(item)}><span>{item === "All" ? "All videos" : item}</span><small>{count}</small></button>;
                })}
              </div>
              <p><strong>{videoCategory === "All" ? "All planned tours" : videoCategory}</strong><span>{filteredVideos.length} video{filteredVideos.length === 1 ? "" : "s"} coming soon</span></p>
            </nav>
            <div className="video-placeholder-grid video-placeholder-grid--tour">{filteredVideos.map((item) => <article key={item.id} className={`video-card video-card--${item.orientation}`}><div><Play fill="currentColor" /><span>{item.format}</span></div><h3>{item.title}</h3><p>{item.category} · Video coming soon</p></article>)}</div>
          </>}
        </div>
      </section>
    </div>
  );
}

export function PropertyListing() {
  const [modal, setModal] = useState<ModalName>(null);
  const [showSections, setShowSections] = useState(false);
  const [stayType, setStayType] = useState<"villa" | "room">("villa");
  const [selectedRoom, setSelectedRoom] = useState(roomItems[0].slug);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

  const bookingHref = useMemo(() => {
    const params = new URLSearchParams({ stay: stayType, guests: String(guests) });
    if (stayType === "room") params.set("room", selectedRoom);
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    return `/book?${params.toString()}`;
  }, [checkIn, checkOut, guests, selectedRoom, stayType]);

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
          <div>{[["Photos", "#photos"], ["Videos", "#videos"], ["Overview", "#overview"], ["Rooms", "#rooms"], ["Amenities", "#amenities"], ["Rules", "#rules"], ["Location", "#location"], ["Guide", "#guide"]].map(([label, href]) => <a key={href} href={href}>{label}</a>)}</div>
          <Link href="/book" className="button button--coral">Check dates</Link>
        </div>
      </nav>

      <section className="shell listing-heading">
        <div><p className="listing-kicker"><span>Farm stay in Malida, near Junagadh</span><span className="listing-kicker__separator" aria-hidden="true">|</span><span>Hosted by Devang</span></p><h1>Private villa & farmstay near Girnar</h1><div className="listing-fact-row" aria-label="Property highlights"><span><Users /> 8 guests</span><span><DoorOpen /> 4 bedrooms</span><span><BedDouble /> 8 beds</span><span><Bath /> 5 bathrooms</span></div></div>
        <div className="listing-actions"><button onClick={() => navigator.clipboard?.writeText(window.location.href)}><ArrowRight size={17} /> Share</button></div>
      </section>

      <section id="photos" className="shell hero-gallery">
        <div className="hero-gallery__lead-wrap">
          <button className="hero-gallery__lead" onClick={() => setModal("photos")} aria-label="Open all property photos"><Image src="/images/property/hero-pool-villa.avif" alt="Revan Hills villa and infinity pool in daylight" fill priority sizes="100vw" /></button>
          <div className="hero-media-selector" aria-label="Open property media tour"><button type="button" onClick={() => setModal("photos")}><Images /> Photos</button><button type="button" onClick={() => setModal("video")}><Play /> Videos <small>coming soon</small></button></div>
        </div>
        <div className="hero-gallery__strip" role="list" aria-label="More property photos">
          {mediaItems.filter((item) => item.category !== "Bathrooms").slice(1, 17).map((item, index) => <button key={item.src} role="listitem" className={index % 4 === 0 ? "hero-gallery__thumb hero-gallery__thumb--wide" : index % 4 === 3 ? "hero-gallery__thumb hero-gallery__thumb--narrow" : "hero-gallery__thumb"} onClick={() => setModal("photos")} aria-label={`Open photo tour: ${item.alt}`}><Image src={item.src} alt={item.alt} fill sizes="(max-width: 760px) 40vw, 20vw" /></button>)}
        </div>
      </section>

      <div className="shell listing-layout">
        <div className="listing-content">
          <section id="overview" className="listing-section quick-highlights">
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
            <div className="section-title"><div><p className="eyebrow">WHERE YOU’LL SLEEP</p><h2>4 rooms, 8 beds, 2 ways to stay</h2></div><Link href="/rooms">See room details <ArrowRight size={17} /></Link></div>
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

          <section id="videos" className="listing-section media-invite">
            <div><p className="eyebrow">WATCH THE PROPERTY</p><h2>Walkthroughs are coming next</h2><p>The gallery is ready for portrait-first room tours, farm moments and longer landscape walkthroughs when the videos arrive.</p><button className="button button--ink" onClick={() => setModal("video")}><Play size={17} /> Preview video library</button></div>
            <div className="phone-video-placeholder"><div><Play fill="currentColor" /></div><span>Vertical property tour<br />coming soon</span></div>
          </section>

          <section className="listing-section host-section">
            <div className="host-profile"><div><h2>Hosted by Devang</h2><p>Hosting since 2024 · Responds within an hour</p></div></div>
            <p>A filmmaker who enjoys reading and gardening, Devang describes the hosting style simply: make guests feel at home, spend time together when they want company, and give them space when they want quiet.</p>
            <a className="button button--outline-square" href="https://wa.me/919825077224" target="_blank"><MessageCircle size={17} /> Message the host</a>
          </section>

          <section id="rules" className="listing-section">
            <p className="eyebrow">GOOD TO KNOW</p><h2>Before you book</h2>
            <div className="know-grid"><article><CalendarDays /><h3>House rules</h3><p>Check-in 10:00 am–12:00 pm<br />Checkout before 10:00 am<br />No pets · No smoking</p></article><article><ShieldCheck /><h3>Safety</h3><p>Exterior CCTV in common areas. Alarm status should be confirmed.</p></article><article><CircleAlert /><h3>Cancellation</h3><p>Cancellation and payment terms will be confirmed with your quote.</p></article></div>
            <button className="text-action" onClick={() => setModal("rules")}>Show all rules and safety details <ChevronRight size={18} /></button>
          </section>

          <section id="location" className="listing-section location-section">
            <p className="eyebrow">WHERE YOU’LL BE</p><h2>Malida, Junagadh, Gujarat</h2><p>Revan Hills · Bawe wali dhar, Malida · Junagadh, Gujarat 362030</p>
            <div className="property-map">
              <iframe
                title="Exact location of Revan Hills Ecostay on Google Maps"
                src="https://www.google.com/maps?q=21.566116,70.594910&t=k&z=18&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <div className="property-map__footer"><div><strong>Revan Hills Ecostay</strong><span>Exact property pin · 21.566116, 70.594910</span></div><a className="button button--outline-square" href="https://www.google.com/maps/dir/?api=1&destination=21.566116%2C70.594910" target="_blank" rel="noreferrer">Open exact pin</a></div>
          </section>

          <section id="guide" className="listing-section guide-preview">
            <div className="section-title"><div><p className="eyebrow">AROUND REVAN HILLS</p><h2>Make more of the journey</h2></div><Link href="/experiences">Open local guide <ArrowRight size={17} /></Link></div>
            <div className="guide-card-grid">{guideItems.map((item) => <Link href={`/experiences/${item.slug}`} key={item.slug} className="guide-card"><div><Image src={item.image} alt={item.title} fill sizes="(max-width: 760px) 82vw, 28vw" /></div><p>{item.eyebrow}</p><h3>{item.title}</h3><span>{item.summary}</span></Link>)}</div>
          </section>
        </div>

        <aside className="booking-card">
          <div className="booking-card__top"><div><span>Check availability</span><strong>Price on request</strong></div></div>
          <div className="stay-toggle" role="group" aria-label="Choose stay type"><button className={stayType === "villa" ? "active" : ""} onClick={() => { setStayType("villa"); setGuests(Math.min(guests, 8)); }}>Entire villa</button><button className={stayType === "room" ? "active" : ""} onClick={() => { setStayType("room"); setGuests(Math.min(guests, 3)); }}>Private room</button></div>
          <div className="booking-fields"><label><span>Check-in</span><input type="date" value={checkIn} onInput={(event) => setCheckIn(event.currentTarget.value)} /></label><label><span>Checkout</span><input type="date" min={checkIn} value={checkOut} onInput={(event) => setCheckOut(event.currentTarget.value)} /></label>{stayType === "room" && <label className="booking-fields__wide"><span>Preferred room</span><select value={selectedRoom} onChange={(event) => setSelectedRoom(event.target.value)}>{roomItems.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}</select></label>}<label className="booking-fields__wide"><span>Guests</span><select value={guests} onChange={(event) => setGuests(Number(event.target.value))}>{Array.from({ length: stayType === "villa" ? 8 : 3 }, (_, index) => index + 1).map((count) => <option key={count} value={count}>{count} guest{count === 1 ? "" : "s"}</option>)}</select></label></div>
          <Link className="button button--coral button--full" href={bookingHref}>Continue with these dates</Link>
          <a className="booking-message-link" href="https://wa.me/919825077224?text=Hello%20Revan%20Hills%2C%20I%20have%20a%20question%20about%20booking." target="_blank" rel="noreferrer"><MessageCircle size={16} /> Message host instead</a>
          <p className="booking-note">You won’t be charged. This sends an availability request to the host.</p>
          <div className="booking-facts"><p><Users /> {stayType === "villa" ? "Up to 8 guests" : "Room occupancy confirmed by host"}</p><p><BedDouble /> {stayType === "villa" ? "4 bedrooms · 8 beds" : "1 king + 1 single bed"}</p><p><Bath /> {stayType === "villa" ? "5 bathrooms" : "Bathroom access"}</p></div>
        </aside>
      </div>

      <div className="mobile-booking-bar"><div><strong>Price on request</strong><span>Choose dates for availability</span></div><Link href="/book" className="button button--coral">Check dates</Link></div>
      {modal && <Modal active={modal} close={() => setModal(null)} switchTo={(next) => setModal(next)} />}
    </main>
  );
}

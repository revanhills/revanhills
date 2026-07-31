"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { ArrowLeft, CalendarDays, Check, MessageCircle, Minus, Plus } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { roomItems } from "@/lib/property-data";

export default function BookPage() {
  const [stay, setStay] = useState<"villa" | "room">("villa");
  const [room, setRoom] = useState("bedroom-1");
  const [guests, setGuests] = useState(2);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("stay") === "room") setStay("room");
    const requestedRoom = params.get("room");
    if (requestedRoom && roomItems.some((item) => item.slug === requestedRoom)) setRoom(requestedRoom);
  }, []);

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    return Math.max(0, Math.round((new Date(`${checkOut}T12:00:00`).getTime() - new Date(`${checkIn}T12:00:00`).getTime()) / 86400000));
  }, [checkIn, checkOut]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!checkIn || !checkOut || nights < 1) { setError("Choose a checkout date after your check-in date."); return; }
    const data = new FormData(event.currentTarget);
    const selectedRoom = roomItems.find((item) => item.slug === room)?.name;
    const message = [`Hello Revan Hills, I would like to check availability.`, `Stay: ${stay === "villa" ? "Entire villa" : selectedRoom}`, `Dates: ${checkIn} to ${checkOut} (${nights} night${nights === 1 ? "" : "s"})`, `Guests: ${guests}`, `Meals: ${data.get("meals")}`, `Name: ${data.get("name")}`, `Phone: ${data.get("phone")}`, `Notes: ${data.get("notes") || "None"}`].join("\n");
    window.open(`https://wa.me/919825077224?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  return <main className="booking-page-new"><SiteHeader /><div className="shell booking-page-grid"><section><Link className="back-link" href="/"><ArrowLeft size={17} /> Back to property</Link><p className="eyebrow">DIRECT BOOKING REQUEST</p><h1>Let’s find your stay.</h1><p className="booking-intro">Choose the stay, dates and group details. We’ll prepare a WhatsApp request for the host; this does not charge you or confirm the booking.</p>
    <form className="booking-form" onSubmit={submit}><fieldset><legend>1. How would you like to stay?</legend><div className="booking-option-grid"><button type="button" className={stay === "villa" ? "active" : ""} onClick={() => {setStay("villa"); setGuests(Math.min(guests, 8));}}><strong>Entire villa</strong><span>4 bedrooms · up to 8 guests</span><i>{stay === "villa" && <Check />}</i></button><button type="button" className={stay === "room" ? "active" : ""} onClick={() => {setStay("room"); setGuests(Math.min(guests, 3));}}><strong>Private room</strong><span>Choose one of four rooms</span><i>{stay === "room" && <Check />}</i></button></div>{stay === "room" && <label className="field"><span>Preferred room</span><select value={room} onChange={(event) => setRoom(event.target.value)}>{roomItems.map((item) => <option key={item.slug} value={item.slug}>{item.name} — {item.tone}</option>)}</select></label>}</fieldset>
      <fieldset><legend>2. Choose your dates</legend><div className="date-grid"><label className="field"><span>Check-in</span><input type="date" value={checkIn} onInput={(event) => setCheckIn(event.currentTarget.value)} required /></label><label className="field"><span>Checkout</span><input type="date" min={checkIn} value={checkOut} onInput={(event) => setCheckOut(event.currentTarget.value)} required /></label></div>{nights > 0 && <p className="field-confirmation"><CalendarDays /> {nights} night{nights === 1 ? "" : "s"}</p>}</fieldset>
      <fieldset><legend>3. Tell us who’s coming</legend><div className="guest-stepper"><div><strong>Guests</strong><span>{stay === "villa" ? "Maximum 8" : "Room capacity confirmed by host"}</span></div><button type="button" aria-label="Remove guest" onClick={() => setGuests(Math.max(1, guests - 1))}><Minus /></button><strong>{guests}</strong><button type="button" aria-label="Add guest" onClick={() => setGuests(Math.min(stay === "villa" ? 8 : 3, guests + 1))}><Plus /></button></div><label className="field"><span>Meal preference</span><select name="meals" defaultValue="Please share meal options"><option>Please share meal options</option><option>Breakfast enquiry</option><option>Full meal plan enquiry</option><option>No meals needed</option></select></label></fieldset>
      <fieldset><legend>4. Your details</legend><div className="date-grid"><label className="field"><span>Name</span><input name="name" required placeholder="Your name" /></label><label className="field"><span>Phone / WhatsApp</span><input name="phone" required type="tel" placeholder="+91" /></label></div><label className="field"><span>Anything the host should know?</span><textarea name="notes" placeholder="Children, accessibility, arrival, food or celebration questions" /></label></fieldset>
      {error && <p className="form-error">{error}</p>}<button className="button button--coral button--full booking-submit" type="submit"><MessageCircle /> Send availability request</button><p className="form-fineprint">WhatsApp will open with your request. The host will confirm availability, the full tariff, taxes, payment terms and cancellation policy before you pay.</p></form></section>
    <aside className="booking-summary"><p className="eyebrow">YOUR REQUEST</p><h2>{stay === "villa" ? "Entire Revan Hills villa" : roomItems.find((item) => item.slug === room)?.name}</h2><dl><div><dt>Stay</dt><dd>{stay === "villa" ? "4 bedrooms · 8 beds" : "1 king + 1 single bed"}</dd></div><div><dt>Dates</dt><dd>{checkIn && checkOut ? `${checkIn} → ${checkOut}` : "Choose dates"}</dd></div><div><dt>Guests</dt><dd>{guests}</dd></div><div><dt>Price</dt><dd>Confirmed by host</dd></div></dl><div className="truth-note"><Check /><p><strong>No surprise confirmation.</strong><br />Your booking is only confirmed after the host accepts the dates and shares payment terms.</p></div><a href="tel:+919825077224">Call +91 98250 77224</a></aside></div></main>;
}

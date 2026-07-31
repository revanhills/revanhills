"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, CalendarDays, Check, MessageCircle, Minus, Plus } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { roomItems } from "@/lib/property-data";

function dateInputValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function addDays(value: string, amount: number) {
  const [year, month, day] = value.split("-").map(Number);
  return dateInputValue(new Date(year, month - 1, day + amount));
}

export default function BookPage() {
  const [stay, setStay] = useState<"villa" | "room">("villa");
  const [room, setRoom] = useState("bedroom-1");
  const [guests, setGuests] = useState(2);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [error, setError] = useState("");
  const today = useMemo(() => dateInputValue(new Date()), []);
  const checkInRef = useRef<HTMLInputElement>(null);
  const checkOutRef = useRef<HTMLInputElement>(null);
  const quickDates = useMemo(() => Array.from({ length: 21 }, (_, index) => {
    const value = addDays(today, index);
    const [year, month, day] = value.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    return { value, weekday: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()], day, month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][month - 1] };
  }), [today]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedStay = params.get("stay") === "room" ? "room" : "villa";
    setStay(requestedStay);
    const requestedRoom = params.get("room");
    if (requestedRoom && roomItems.some((item) => item.slug === requestedRoom)) setRoom(requestedRoom);
    const requestedGuests = Number(params.get("guests"));
    if (Number.isInteger(requestedGuests) && requestedGuests > 0) setGuests(Math.min(requestedStay === "room" ? 3 : 8, requestedGuests));
    const requestedCheckIn = params.get("checkIn") || "";
    const requestedCheckOut = params.get("checkOut") || "";
    if (/^\d{4}-\d{2}-\d{2}$/.test(requestedCheckIn) && requestedCheckIn >= today) setCheckIn(requestedCheckIn);
    if (/^\d{4}-\d{2}-\d{2}$/.test(requestedCheckOut) && requestedCheckOut > requestedCheckIn) setCheckOut(requestedCheckOut);
  }, [today]);

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    return Math.max(0, Math.round((new Date(`${checkOut}T12:00:00`).getTime() - new Date(`${checkIn}T12:00:00`).getTime()) / 86400000));
  }, [checkIn, checkOut]);

  function chooseQuickDate(value: string) {
    setError("");
    if (!checkIn || checkOut || value <= checkIn) {
      setCheckIn(value);
      setCheckOut("");
      return;
    }
    setCheckOut(value);
  }

  function showDatePicker(input: HTMLInputElement | null) {
    input?.focus();
    try { input?.showPicker?.(); } catch { /* Native picker is optional; the visible date strip remains available. */ }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!checkIn || !checkOut || nights < 1) { setError("Choose a checkout date after your check-in date."); return; }
    const data = new FormData(event.currentTarget);
    const selectedRoom = roomItems.find((item) => item.slug === room)?.name;
    const message = [`Hello Revan Hills, I would like to check availability.`, `Stay: ${stay === "villa" ? "Entire villa" : selectedRoom}`, `Dates: ${checkIn} to ${checkOut} (${nights} night${nights === 1 ? "" : "s"})`, `Guests: ${guests}`, `Meals: ${data.get("meals")}`, `Name: ${data.get("name")}`, `Phone: ${data.get("phone")}`, `Notes: ${data.get("notes") || "None"}`].join("\n");
    window.location.assign(`https://wa.me/919825077224?text=${encodeURIComponent(message)}`);
  }

  return <main className="booking-page-new"><SiteHeader /><div className="booking-back-strip"><div className="shell"><Link className="back-link" href="/"><ArrowLeft size={17} /> Back to property</Link></div></div><div className="shell booking-page-grid"><section><p className="eyebrow">REQUEST TO BOOK</p><h1>Let’s find your stay.</h1><p className="booking-intro">Choose the stay, dates and group details. We’ll prepare a WhatsApp request for the host; this does not charge you or confirm the booking.</p>
    <form className="booking-form" onSubmit={submit}><fieldset><legend>1. How would you like to stay?</legend><div className="booking-option-grid"><button type="button" className={stay === "villa" ? "active" : ""} onClick={() => {setStay("villa"); setGuests(Math.min(guests, 8));}}><strong>Entire villa</strong><span>4 bedrooms · up to 8 guests</span><i>{stay === "villa" && <Check />}</i></button><button type="button" className={stay === "room" ? "active" : ""} onClick={() => {setStay("room"); setGuests(Math.min(guests, 3));}}><strong>Private room</strong><span>Choose one of four rooms</span><i>{stay === "room" && <Check />}</i></button></div>{stay === "room" && <label className="field"><span>Preferred room</span><select value={room} onChange={(event) => setRoom(event.target.value)}>{roomItems.map((item) => <option key={item.slug} value={item.slug}>{item.name} — {item.tone}</option>)}</select></label>}</fieldset>
      <fieldset><legend>2. Choose your dates</legend><p className="date-selection-help">Tap once for check-in, then tap a later date for checkout.</p><div className="quick-date-scroll" aria-label="Quick date selection">{quickDates.map((item) => { const selected = item.value === checkIn || item.value === checkOut; const inRange = Boolean(checkIn && checkOut && item.value > checkIn && item.value < checkOut); return <button key={item.value} type="button" className={`${selected ? "selected" : ""} ${inRange ? "in-range" : ""}`} onClick={() => chooseQuickDate(item.value)} aria-label={`${item.weekday}, ${item.day} ${item.month}` }><span>{item.weekday}</span><strong>{item.day}</strong><small>{item.month}</small></button>; })}</div><div className="date-grid"><label className="field"><span>Check-in</span><div className="date-input-control"><input ref={checkInRef} type="date" min={today} value={checkIn} onClick={() => showDatePicker(checkInRef.current)} onChange={(event) => { const value = event.currentTarget.value; setCheckIn(value); setError(""); if (checkOut && checkOut <= value) setCheckOut(""); }} required /><button type="button" onClick={() => showDatePicker(checkInRef.current)} aria-label="Open check-in calendar"><CalendarDays /></button></div></label><label className="field"><span>Checkout</span><div className="date-input-control"><input ref={checkOutRef} type="date" min={checkIn ? addDays(checkIn, 1) : addDays(today, 1)} value={checkOut} onClick={() => showDatePicker(checkOutRef.current)} onChange={(event) => { setCheckOut(event.currentTarget.value); setError(""); }} required /><button type="button" onClick={() => showDatePicker(checkOutRef.current)} aria-label="Open checkout calendar"><CalendarDays /></button></div></label></div>{checkIn && !checkOut && <p className="date-selection-status">Check-in selected. Now choose your checkout date.</p>}{nights > 0 && <p className="field-confirmation"><CalendarDays /> {nights} night{nights === 1 ? "" : "s"} selected</p>}</fieldset>
      <fieldset><legend>3. Tell us who’s coming</legend><div className="guest-stepper"><div><strong>Guests</strong><span>{stay === "villa" ? "Maximum 8" : "Room capacity confirmed by host"}</span></div><button type="button" aria-label="Remove guest" onClick={() => setGuests(Math.max(1, guests - 1))}><Minus /></button><strong>{guests}</strong><button type="button" aria-label="Add guest" onClick={() => setGuests(Math.min(stay === "villa" ? 8 : 3, guests + 1))}><Plus /></button></div><label className="field"><span>Meal preference</span><select name="meals" defaultValue="Please share meal options"><option>Please share meal options</option><option>Breakfast enquiry</option><option>Full meal plan enquiry</option><option>No meals needed</option></select></label></fieldset>
      <fieldset><legend>4. Your details</legend><div className="date-grid"><label className="field"><span>Name</span><input name="name" required placeholder="Your name" /></label><label className="field"><span>Phone / WhatsApp</span><input name="phone" required type="tel" placeholder="+91" /></label></div><label className="field"><span>Anything the host should know?</span><textarea name="notes" placeholder="Children, accessibility, arrival, food or celebration questions" /></label></fieldset>
      {error && <p className="form-error" role="alert">{error}</p>}<button className="button button--coral button--full booking-submit" type="submit"><MessageCircle /> Send availability request</button><a className="booking-message-link booking-message-link--large" href="https://wa.me/919825077224?text=Hello%20Revan%20Hills%2C%20I%20have%20a%20question%20about%20a%20stay." target="_blank" rel="noreferrer"><MessageCircle size={18} /> Message host without completing the form</a><p className="form-fineprint">WhatsApp will open with your request. The host will confirm availability, the full tariff, taxes, payment terms and cancellation policy before you pay.</p></form></section>
    <aside className="booking-summary"><p className="eyebrow">YOUR REQUEST</p><h2>{stay === "villa" ? "Entire Revan Hills villa" : roomItems.find((item) => item.slug === room)?.name}</h2><dl><div><dt>Stay</dt><dd>{stay === "villa" ? "4 bedrooms · 8 beds" : "1 king + 1 single bed"}</dd></div><div><dt>Dates</dt><dd>{checkIn && checkOut ? `${checkIn} → ${checkOut}` : "Choose dates"}</dd></div><div><dt>Guests</dt><dd>{guests}</dd></div><div><dt>Price</dt><dd>Confirmed by host</dd></div></dl><div className="truth-note"><Check /><p><strong>No surprise confirmation.</strong><br />Your booking is only confirmed after the host accepts the dates and shares payment terms.</p></div><div className="booking-contact-links"><a href="https://wa.me/919825077224?text=Hello%20Revan%20Hills%2C%20I%20have%20a%20booking%20question." target="_blank" rel="noreferrer">Message host</a><a href="tel:+919825077224">Call +91 98250 77224</a></div></aside></div></main>;
}

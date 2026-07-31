"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { ArrowLeft, Check, ChevronLeft, ChevronRight, Images, MessageCircle, Minus, Play, Plus, X } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { roomItems } from "@/lib/property-data";

function dateInputValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const shortMonthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const weekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function monthStart(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function shiftMonth(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

function calendarDays(month: Date) {
  const leading = month.getDay();
  const total = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  return Array.from({ length: 42 }, (_, index) => {
    const day = index - leading + 1;
    return day > 0 && day <= total ? dateInputValue(new Date(month.getFullYear(), month.getMonth(), day)) : null;
  });
}

function readableDate(value: string) {
  if (!value) return "Add date";
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return `${weekdayNames[date.getDay()]}, ${day} ${shortMonthNames[month - 1]}`;
}

export default function BookPage() {
  const [stay, setStay] = useState<"villa" | "room">("villa");
  const [room, setRoom] = useState("bedroom-1");
  const [guests, setGuests] = useState(2);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [roomTour, setRoomTour] = useState<string | null>(null);
  const [roomTourMode, setRoomTourMode] = useState<"photos" | "videos">("photos");
  const [error, setError] = useState("");
  const today = useMemo(() => dateInputValue(new Date()), []);
  const [calendarMonth, setCalendarMonth] = useState(() => monthStart(new Date()));
  const firstAvailableMonth = useMemo(() => {
    const [year, month] = today.split("-").map(Number);
    return new Date(year, month - 1, 1);
  }, [today]);

  useEffect(() => {
    if (!roomTour) return;
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setRoomTour(null);
    document.body.classList.add("modal-open");
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [roomTour]);

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
    if (/^\d{4}-\d{2}-\d{2}$/.test(requestedCheckIn) && requestedCheckIn >= today) {
      setCheckIn(requestedCheckIn);
      const [year, month] = requestedCheckIn.split("-").map(Number);
      setCalendarMonth(new Date(year, month - 1, 1));
    }
    if (/^\d{4}-\d{2}-\d{2}$/.test(requestedCheckOut) && requestedCheckOut > requestedCheckIn) setCheckOut(requestedCheckOut);
  }, [today]);

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    return Math.max(0, Math.round((new Date(`${checkOut}T12:00:00`).getTime() - new Date(`${checkIn}T12:00:00`).getTime()) / 86400000));
  }, [checkIn, checkOut]);

  function chooseCalendarDate(value: string) {
    setError("");
    if (!checkIn || checkOut || value <= checkIn) {
      setCheckIn(value);
      setCheckOut("");
      setCalendarOpen(true);
      return;
    }
    setCheckOut(value);
    setCalendarOpen(false);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!checkIn || !checkOut || nights < 1) { setError("Choose a checkout date after your check-in date."); return; }
    const data = new FormData(event.currentTarget);
    const selectedRoom = roomItems.find((item) => item.slug === room)?.name;
    const message = [`Hello Revan Hills, I would like to check availability.`, `Stay: ${stay === "villa" ? "Entire villa" : selectedRoom}`, `Dates: ${checkIn} to ${checkOut} (${nights} night${nights === 1 ? "" : "s"})`, `Guests: ${guests}`, `Meals: ${data.get("meals")}`, `Name: ${data.get("name")}`, `Phone: ${data.get("phone")}`, `Notes: ${data.get("notes") || "None"}`].join("\n");
    window.location.assign(`https://wa.me/919825077224?text=${encodeURIComponent(message)}`);
  }

  function openRoomTour(slug: string) {
    setRoom(slug);
    setRoomTour(slug);
    setRoomTourMode("photos");
  }

  const touredRoom = roomItems.find((item) => item.slug === roomTour);

  return <main className="booking-page-new"><SiteHeader /><div className="booking-back-strip"><div className="shell"><Link className="back-link" href="/"><ArrowLeft size={17} /> Back to property</Link></div></div><div className="shell booking-page-grid"><section><p className="eyebrow">REQUEST TO BOOK</p><h1>Let’s find your stay.</h1><p className="booking-intro">Choose your stay, dates and guests. We’ll prepare the request for Devang on WhatsApp.</p>
    <form className="booking-form" onSubmit={submit}><fieldset><legend>1. How would you like to stay?</legend><div className="booking-option-grid"><button type="button" className={stay === "villa" ? "active" : ""} onClick={() => {setStay("villa"); setGuests(Math.min(guests, 8));}}><strong>Entire villa</strong><span>4 bedrooms · up to 8 guests</span><i>{stay === "villa" && <Check />}</i></button><button type="button" className={stay === "room" ? "active" : ""} onClick={() => {setStay("room"); setGuests(Math.min(guests, 3));}}><strong>Private room</strong><span>Choose one of four rooms</span><i>{stay === "room" && <Check />}</i></button></div>{stay === "room" && <div className="room-choice"><div className="room-choice__heading"><div><span>Preferred room</span><strong>Choose your room</strong></div><small>Tap a room to select it and view its tour</small></div><div className="room-thumbnail-grid" aria-label="Choose a preferred room">{roomItems.map((item) => { const selected = room === item.slug; return <button key={item.slug} type="button" aria-pressed={selected} className={`room-thumbnail-option ${selected ? "active" : ""}`} onClick={() => openRoomTour(item.slug)}><span className="room-thumbnail-option__image"><Image src={item.image} alt={item.name} fill sizes="(max-width: 760px) 42vw, 220px" />{selected && <i><Check /></i>}</span><span className="room-thumbnail-option__copy"><strong>{item.name}</strong><small>{item.tone}</small><em>{selected ? "Selected room" : "View photos & videos"}</em></span></button>; })}</div></div>}</fieldset>
      <fieldset><legend>2. Dates</legend><div className={`hotel-date-picker ${calendarOpen ? "hotel-date-picker--open" : ""}`}><div className="date-picker-selection"><button type="button" className={checkIn ? "has-date" : calendarOpen ? "active" : ""} onClick={() => setCalendarOpen(true)} aria-expanded={calendarOpen}><span>Check-in</span><strong>{readableDate(checkIn)}</strong></button><ArrowLeft className="date-picker-selection__arrow" /><button type="button" className={checkIn && !checkOut && calendarOpen ? "active" : checkOut ? "has-date" : ""} onClick={() => setCalendarOpen(true)} aria-expanded={calendarOpen}><span>Checkout</span><strong>{readableDate(checkOut)}</strong></button></div>{calendarOpen && <><div className="date-picker-toolbar"><button type="button" aria-label="Previous month" disabled={calendarMonth <= firstAvailableMonth} onClick={() => setCalendarMonth((current) => shiftMonth(current, -1))}><ChevronLeft /></button><p>{checkIn && !checkOut ? "Select your checkout date" : "Select your check-in date"}</p><button type="button" aria-label="Next month" onClick={() => setCalendarMonth((current) => shiftMonth(current, 1))}><ChevronRight /></button></div><div className="calendar-months">{[calendarMonth, shiftMonth(calendarMonth, 1)].map((month, monthIndex) => <section className={`calendar-month ${monthIndex === 1 ? "calendar-month--second" : ""}`} key={`${month.getFullYear()}-${month.getMonth()}`}><h3>{monthNames[month.getMonth()]} {month.getFullYear()}</h3><div className="calendar-weekdays">{weekdayNames.map((day) => <span key={day}>{day.slice(0, 1)}</span>)}</div><div className="calendar-days">{calendarDays(month).map((value, index) => { if (!value) return <span className="calendar-day--blank" key={`blank-${index}`} />; const day = Number(value.slice(-2)); const disabled = value < today; const isStart = value === checkIn; const isEnd = value === checkOut; const inRange = Boolean(checkIn && checkOut && value > checkIn && value < checkOut); const isToday = value === today; return <button type="button" key={value} disabled={disabled} className={`${isStart ? "range-start" : ""} ${isEnd ? "range-end" : ""} ${inRange ? "in-range" : ""} ${isToday ? "today" : ""}`} onClick={() => chooseCalendarDate(value)} aria-label={`${weekdayNames[new Date(`${value}T12:00:00`).getDay()]}, ${day} ${monthNames[month.getMonth()]} ${month.getFullYear()}`} aria-pressed={isStart || isEnd}>{day}</button>; })}</div></section>)}</div><div className="date-picker-footer"><span>{checkIn && !checkOut ? "Choose a later date to complete your stay." : nights > 0 ? `${nights} night${nights === 1 ? "" : "s"} selected` : "Past dates are unavailable."}</span>{(checkIn || checkOut) && <button type="button" onClick={() => { setCheckIn(""); setCheckOut(""); setError(""); }}>Clear dates</button>}</div></>}</div></fieldset>
      <fieldset><legend>3. Tell us who’s coming</legend><div className="guest-stepper"><div><strong>Guests</strong><span>{stay === "villa" ? "Maximum 8" : "Room capacity confirmed by host"}</span></div><button type="button" aria-label="Remove guest" onClick={() => setGuests(Math.max(1, guests - 1))}><Minus /></button><strong>{guests}</strong><button type="button" aria-label="Add guest" onClick={() => setGuests(Math.min(stay === "villa" ? 8 : 3, guests + 1))}><Plus /></button></div><label className="field"><span>Meal preference</span><select name="meals" defaultValue="Please share meal options"><option>Please share meal options</option><option>Breakfast enquiry</option><option>Full meal plan enquiry</option><option>No meals needed</option></select></label></fieldset>
      <fieldset><legend>4. Your details</legend><div className="date-grid"><label className="field"><span>Name</span><input name="name" required placeholder="Your name" /></label><label className="field"><span>Phone / WhatsApp</span><input name="phone" required type="tel" placeholder="+91" /></label></div><label className="field"><span>Anything the host should know?</span><textarea name="notes" placeholder="Children, accessibility, arrival, food or celebration questions" /></label></fieldset>
      {error && <p className="form-error" role="alert">{error}</p>}<button className="button button--coral button--full booking-submit" type="submit"><MessageCircle /> Send availability request</button><a className="booking-message-link booking-message-link--large" href="https://wa.me/919825077224?text=Hello%20Revan%20Hills%2C%20I%20have%20a%20question%20about%20a%20stay." target="_blank" rel="noreferrer"><MessageCircle size={18} /> Message host without completing the form</a><p className="form-fineprint">WhatsApp will open with your request. The host will confirm availability, the full tariff, taxes, payment terms and cancellation policy before you pay.</p></form></section>
    <aside className="booking-summary"><p className="eyebrow">YOUR REQUEST</p><h2>{stay === "villa" ? "Entire Revan Hills villa" : roomItems.find((item) => item.slug === room)?.name}</h2><dl><div><dt>Stay</dt><dd>{stay === "villa" ? "4 bedrooms · 8 beds" : "1 king + 1 single bed"}</dd></div><div><dt>Dates</dt><dd>{checkIn && checkOut ? `${checkIn} → ${checkOut}` : "Choose dates"}</dd></div><div><dt>Guests</dt><dd>{guests}</dd></div><div><dt>Price</dt><dd>Confirmed by host</dd></div></dl><div className="truth-note"><Check /><p><strong>No surprise confirmation.</strong><br />Your booking is only confirmed after the host accepts the dates and shares payment terms.</p></div><div className="booking-contact-links"><a href="https://wa.me/919825077224?text=Hello%20Revan%20Hills%2C%20I%20have%20a%20booking%20question." target="_blank" rel="noreferrer">Message host</a><a href="tel:+919825077224">Call +91 98250 77224</a></div></aside></div>{touredRoom && <div className="modal-backdrop room-tour-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setRoomTour(null)}><section className="modal-panel room-tour-modal" role="dialog" aria-modal="true" aria-labelledby="room-tour-title"><div className="modal-header"><div><p className="eyebrow">ROOM TOUR</p><h2 id="room-tour-title">{touredRoom.name}</h2></div><div className="modal-media-switch" role="tablist" aria-label="Choose room photos or videos"><button type="button" role="tab" aria-selected={roomTourMode === "photos"} className={roomTourMode === "photos" ? "active" : ""} onClick={() => setRoomTourMode("photos")}><Images /> Photos <small>4</small></button><button type="button" role="tab" aria-selected={roomTourMode === "videos"} className={roomTourMode === "videos" ? "active" : ""} onClick={() => setRoomTourMode("videos")}><Play /> Videos <small>3</small></button></div><button type="button" className="icon-button" onClick={() => setRoomTour(null)} aria-label="Close room tour"><X /></button></div><div className="modal-body room-tour-modal__body">{roomTourMode === "photos" ? <div className="room-tour-photo-grid"><figure className="room-tour-photo-grid__real"><Image src={touredRoom.image} alt={`${touredRoom.name} current photograph`} fill sizes="(max-width: 760px) 100vw, 60vw" /><figcaption>Current {touredRoom.name} photograph</figcaption></figure>{[2, 3, 4].map((slot) => <figure className="room-tour-photo-slot" key={slot}><Images /><strong>Photo slot {slot}</strong><span>Additional {touredRoom.name.toLowerCase()} photo will be added here</span></figure>)}</div> : <div className="room-tour-video-grid">{[1, 2, 3].map((slot) => <article className="video-card video-card--portrait" key={slot}><div><Play fill="currentColor" /><span>9:16 vertical</span></div><h3>{touredRoom.name} tour {slot}</h3><p>Video coming soon</p></article>)}</div>}</div></section></div>}</main>;
}

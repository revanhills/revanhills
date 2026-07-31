"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { ArrowLeft, Check, ChevronLeft, ChevronRight, MessageCircle, Minus, Plus } from "lucide-react";
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
  const [error, setError] = useState("");
  const today = useMemo(() => dateInputValue(new Date()), []);
  const [calendarMonth, setCalendarMonth] = useState(() => monthStart(new Date()));
  const firstAvailableMonth = useMemo(() => {
    const [year, month] = today.split("-").map(Number);
    return new Date(year, month - 1, 1);
  }, [today]);

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
      return;
    }
    setCheckOut(value);
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
      <fieldset><legend>2. Choose your dates</legend><div className="hotel-date-picker"><div className="date-picker-selection"><div className={checkIn ? "has-date" : "active"}><span>Check-in</span><strong>{readableDate(checkIn)}</strong></div><ArrowLeft className="date-picker-selection__arrow" /><div className={checkIn && !checkOut ? "active" : checkOut ? "has-date" : ""}><span>Checkout</span><strong>{readableDate(checkOut)}</strong></div></div><div className="date-picker-toolbar"><button type="button" aria-label="Previous month" disabled={calendarMonth <= firstAvailableMonth} onClick={() => setCalendarMonth((current) => shiftMonth(current, -1))}><ChevronLeft /></button><p>{checkIn && !checkOut ? "Select your checkout date" : "Select your check-in date"}</p><button type="button" aria-label="Next month" onClick={() => setCalendarMonth((current) => shiftMonth(current, 1))}><ChevronRight /></button></div><div className="calendar-months">{[calendarMonth, shiftMonth(calendarMonth, 1)].map((month, monthIndex) => <section className={`calendar-month ${monthIndex === 1 ? "calendar-month--second" : ""}`} key={`${month.getFullYear()}-${month.getMonth()}`}><h3>{monthNames[month.getMonth()]} {month.getFullYear()}</h3><div className="calendar-weekdays">{weekdayNames.map((day) => <span key={day}>{day.slice(0, 1)}</span>)}</div><div className="calendar-days">{calendarDays(month).map((value, index) => { if (!value) return <span className="calendar-day--blank" key={`blank-${index}`} />; const day = Number(value.slice(-2)); const disabled = value < today; const isStart = value === checkIn; const isEnd = value === checkOut; const inRange = Boolean(checkIn && checkOut && value > checkIn && value < checkOut); const isToday = value === today; return <button type="button" key={value} disabled={disabled} className={`${isStart ? "range-start" : ""} ${isEnd ? "range-end" : ""} ${inRange ? "in-range" : ""} ${isToday ? "today" : ""}`} onClick={() => chooseCalendarDate(value)} aria-label={`${weekdayNames[new Date(`${value}T12:00:00`).getDay()]}, ${day} ${monthNames[month.getMonth()]} ${month.getFullYear()}`} aria-pressed={isStart || isEnd}>{day}</button>; })}</div></section>)}</div><div className="date-picker-footer"><span>{checkIn && !checkOut ? "Choose a later date to complete your stay." : nights > 0 ? `${nights} night${nights === 1 ? "" : "s"} selected` : "Past dates are unavailable."}</span>{(checkIn || checkOut) && <button type="button" onClick={() => { setCheckIn(""); setCheckOut(""); setError(""); }}>Clear dates</button>}</div></div></fieldset>
      <fieldset><legend>3. Tell us who’s coming</legend><div className="guest-stepper"><div><strong>Guests</strong><span>{stay === "villa" ? "Maximum 8" : "Room capacity confirmed by host"}</span></div><button type="button" aria-label="Remove guest" onClick={() => setGuests(Math.max(1, guests - 1))}><Minus /></button><strong>{guests}</strong><button type="button" aria-label="Add guest" onClick={() => setGuests(Math.min(stay === "villa" ? 8 : 3, guests + 1))}><Plus /></button></div><label className="field"><span>Meal preference</span><select name="meals" defaultValue="Please share meal options"><option>Please share meal options</option><option>Breakfast enquiry</option><option>Full meal plan enquiry</option><option>No meals needed</option></select></label></fieldset>
      <fieldset><legend>4. Your details</legend><div className="date-grid"><label className="field"><span>Name</span><input name="name" required placeholder="Your name" /></label><label className="field"><span>Phone / WhatsApp</span><input name="phone" required type="tel" placeholder="+91" /></label></div><label className="field"><span>Anything the host should know?</span><textarea name="notes" placeholder="Children, accessibility, arrival, food or celebration questions" /></label></fieldset>
      {error && <p className="form-error" role="alert">{error}</p>}<button className="button button--coral button--full booking-submit" type="submit"><MessageCircle /> Send availability request</button><a className="booking-message-link booking-message-link--large" href="https://wa.me/919825077224?text=Hello%20Revan%20Hills%2C%20I%20have%20a%20question%20about%20a%20stay." target="_blank" rel="noreferrer"><MessageCircle size={18} /> Message host without completing the form</a><p className="form-fineprint">WhatsApp will open with your request. The host will confirm availability, the full tariff, taxes, payment terms and cancellation policy before you pay.</p></form></section>
    <aside className="booking-summary"><p className="eyebrow">YOUR REQUEST</p><h2>{stay === "villa" ? "Entire Revan Hills villa" : roomItems.find((item) => item.slug === room)?.name}</h2><dl><div><dt>Stay</dt><dd>{stay === "villa" ? "4 bedrooms · 8 beds" : "1 king + 1 single bed"}</dd></div><div><dt>Dates</dt><dd>{checkIn && checkOut ? `${checkIn} → ${checkOut}` : "Choose dates"}</dd></div><div><dt>Guests</dt><dd>{guests}</dd></div><div><dt>Price</dt><dd>Confirmed by host</dd></div></dl><div className="truth-note"><Check /><p><strong>No surprise confirmation.</strong><br />Your booking is only confirmed after the host accepts the dates and shares payment terms.</p></div><div className="booking-contact-links"><a href="https://wa.me/919825077224?text=Hello%20Revan%20Hills%2C%20I%20have%20a%20booking%20question." target="_blank" rel="noreferrer">Message host</a><a href="tel:+919825077224">Call +91 98250 77224</a></div></aside></div></main>;
}

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bath, BedDouble, Check, Users } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { roomItems } from "@/lib/property-data";

export default function RoomsPage() {
  return <main className="subpage"><SiteHeader /><header className="shell subpage-heading"><p className="eyebrow">TWO WAYS TO STAY</p><h1>Take a room.<br />Or make it all yours.</h1><p>Every tagged bedroom is listed with a king bed and a single bed. Book the entire villa for up to eight guests, or request one room and share the common spaces.</p></header>
    <section className="shell stay-mode-banner"><article><div><Users /><p className="eyebrow">ENTIRE VILLA</p><h2>4 bedrooms · 8 beds · 5 bathrooms</h2><p>Up to 8 guests, with the full villa and its shared spaces reserved together.</p></div><Link href="/book?stay=villa" className="button button--coral">Request whole villa <ArrowRight size={17} /></Link></article><article><div><BedDouble /><p className="eyebrow">PRIVATE ROOM</p><h2>Choose your preferred room</h2><p>Room occupancy and final assignment are confirmed personally by the host.</p></div><Link href="/book?stay=room" className="button button--ink">Request a room <ArrowRight size={17} /></Link></article></section>
    <section className="shell room-detail-list">{roomItems.map((room, index) => <article key={room.slug} id={room.slug}><div className="room-detail-image"><Image src={room.image} alt={room.name} fill sizes="(max-width: 760px) 100vw, 48vw" /></div><div><p className="eyebrow">ROOM {index + 1} OF 4</p><h2>{room.name}</h2><p>{room.tone}. A simple, restful base with access to the villa’s shared pool, outdoor areas, dining and kitchen spaces.</p><ul><li><BedDouble /> {room.beds}</li><li><Bath /> {room.bathroom}</li><li><Users /> Occupancy confirmed by host</li><li><Check /> Bed linen, towels and mosquito net listed</li></ul><Link href={`/book?stay=room&room=${room.slug}`} className="button button--outline-square">Check this room <ArrowRight size={17} /></Link></div></article>)}</section>
  </main>;
}

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, ExternalLink, MapPin, ShieldCheck } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { guideItems } from "@/lib/property-data";

export function generateStaticParams() { return guideItems.map((item) => ({ slug: item.slug })); }

export default async function GuideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = guideItems.find((entry) => entry.slug === slug);
  if (!item) notFound();
  return <main className="subpage guide-detail"><SiteHeader /><article><div className="guide-detail__hero"><Image src={item.image} alt="" fill priority sizes="100vw" /><div className="guide-detail__shade" /><div className="shell"><Link href="/experiences"><ArrowLeft /> Local guide</Link><p className="eyebrow">{item.eyebrow}</p><h1>{item.title}</h1></div></div><div className="shell guide-detail__body"><section><p className="lead">{item.summary}</p><p>{item.detail}</p><h2>Plan it well</h2><div className="planning-cards"><article><CalendarDays /><h3>Best timing</h3><p>Confirm opening, weather, seasonal access and festival closures shortly before your visit.</p></article><article><MapPin /><h3>Route from Revan Hills</h3><p>Exact distance and typical drive time will be published after the owner verifies the property map pin.</p></article><article><ShieldCheck /><h3>Travel responsibly</h3><p>Use official bookings for regulated sites, follow local instructions and never promise or chase wildlife sightings.</p></article></div></section><aside><p className="eyebrow">CHECK BEFORE YOU GO</p><h2>Details can change.</h2><p>Operating hours, access, permits, prices and road conditions may change. Use the official source where available and ask the host for current local context.</p>{item.officialUrl ? <a className="button button--ink button--full" href={item.officialUrl} target="_blank">Open official source <ExternalLink size={17} /></a> : <a className="button button--ink button--full" href="https://wa.me/919825077224" target="_blank">Ask the host</a>}</aside></div></article></main>;
}

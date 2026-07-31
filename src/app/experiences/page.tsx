import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { guideItems } from "@/lib/property-data";

export default function ExperiencesPage() {
  return <main className="subpage local-guide-page"><SiteHeader /><header className="shell subpage-heading"><p className="eyebrow">THE REVAN HILLS LOCAL GUIDE</p><h1>Stay slow.<br />Explore thoughtfully.</h1><p>Girnar, Junagadh and the wider Gir region deserve more than a list of pins. Use these guides to shape realistic days, then verify regulated bookings and seasonal access at the official source.</p></header>
    <section className="guide-hero shell"><div><Image src="/images/property/girnar-view.avif" alt="Girnar Hills during the monsoon" fill priority sizes="(max-width: 760px) 100vw, 62vw" /></div><article><p className="eyebrow">START CLOSE TO HOME</p><h2>Girnar changes the rhythm of a stay.</h2><p>Plan one meaningful outing at a time: a mountain morning, a Junagadh heritage afternoon, or a permit-based forest experience. Exact travel times will be added when the property map pin is verified.</p></article></section>
    <section className="shell guide-listing">{guideItems.map((item, index) => <article key={item.slug}><div className="guide-listing__image"><Image src={item.image} alt={item.title} fill sizes="(max-width: 760px) 100vw, 42vw" /><span>{String(index + 1).padStart(2, "0")}</span></div><div><p className="eyebrow">{item.eyebrow}</p><h2>{item.title}</h2><p>{item.summary}</p><div><Link href={`/experiences/${item.slug}`}>Read the guide <ArrowRight size={17} /></Link>{item.officialUrl && <a href={item.officialUrl} target="_blank">Official source <ExternalLink size={15} /></a>}</div></div></article>)}</section>
  </main>;
}

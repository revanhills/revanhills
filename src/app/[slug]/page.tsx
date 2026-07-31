import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, MapPin } from "lucide-react";
import { FaqList } from "@/components/faq-list";
import { SiteHeader } from "@/components/site-header";
import { attractions } from "@/lib/site-data";

const pages: Record<string, { eyebrow: string; title: string; intro: string; image: string }> = {
  stay: { eyebrow: "THE STAY", title: "A villa with its own pace.", intro: "Four inviting rooms, a pool in front of the house and farm land all around. This is a place for families, friends and guests who like space around a good day.", image: "/images/rooms.jpg" },
  experiences: { eyebrow: "AT YOUR OWN PACE", title: "The good kind of plans.", intro: "From the farm to the foothills, build a day around fresh food, a swim, a thoughtful local visit and the pleasure of not rushing.", image: "/images/yoga.jpg" },
  journey: { eyebrow: "PLAN THE WAY", title: "Getting here should feel easy.", intro: "Start with the exact map pin, then choose your route, transfer and day trips with confidence. Verified local contacts will be published by the hosts.", image: "/images/hero-aerial.jpg" },
  gallery: { eyebrow: "A LOOK AROUND", title: "Little glimpses of a slower life.", intro: "The villa, pool, farm food and Girnar light. More guest stories and seasonal videos will be added by the hosts.", image: "/images/pool.jpg" },
};

export function generateStaticParams() {
  return [...Object.keys(pages), "faqs"].map((slug) => ({ slug }));
}

export default async function DetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === "faqs") return <main><SiteHeader /><section className="page-hero page-hero--short"><div className="shell"><p className="eyebrow">GOOD TO KNOW</p><h1>All the answers,<br />right where you need them.</h1><p>Search practical details about the stay, food, farm, pool and journey.</p></div></section><section className="shell faq-page"><FaqList /></section></main>;
  const page = pages[slug] ?? pages.stay;
  return <main><SiteHeader /><section className="page-hero"><div className="shell page-hero-grid"><div><p className="eyebrow">{page.eyebrow}</p><h1>{page.title}</h1><p>{page.intro}</p><Link href="/book" className="button button--dark">Check availability <ArrowRight size={17} /></Link></div><div className="page-hero-image"><Image src={page.image} alt="Revan Hills" fill sizes="(max-width: 700px) 100vw, 45vw" /></div></div></section>
  {slug === "journey" ? <section className="shell guide-list"><p className="eyebrow">CLOSE TO REWARDING DAYS OUT</p>{attractions.map(({ title, detail, icon: Icon }) => <article key={title}><Icon /><div><h3>{title}</h3><p>{detail}</p></div><span><MapPin size={16} /> Verify route</span></article>)}</section> : <section className="shell detail-copy"><div><p className="eyebrow">THE REVAN HILLS WAY</p><h2>Everything you need.<br />Nothing you do not.</h2></div><ul>{["Thoughtful, family-style hosting", "Freshly made food and seasonal produce", "Clear, practical booking information", "A warm base for the Girnar region"].map((item) => <li key={item}><Check />{item}</li>)}</ul></section>}</main>;
}

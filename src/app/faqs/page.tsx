"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { faqGroups } from "@/lib/property-data";

export default function FaqPage() {
  const [query, setQuery] = useState("");
  const groups = useMemo(() => faqGroups.map((group) => ({ ...group, items: group.items.filter(([question, answer]) => `${question} ${answer}`.toLowerCase().includes(query.toLowerCase())) })).filter((group) => group.items.length), [query]);
  return <main className="subpage faq-new"><SiteHeader /><header className="shell subpage-heading"><p className="eyebrow">THE COMPLETE GUEST GUIDE</p><h1>Good answers<br />before you ask.</h1><p>Rooms, booking, food, pool, safety, arrival and nearby plans — with unknown details called out clearly.</p></header><section className="shell faq-layout"><div className="faq-search"><Search /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the guest guide" aria-label="Search the guest guide" /></div>{groups.map((group) => <section key={group.title}><h2>{group.title}</h2>{group.items.map(([question, answer]) => <details key={question}><summary>{question}<ChevronDown /></summary><p>{answer}</p></details>)}</section>)}{groups.length === 0 && <p>No matching answer yet. Try a shorter search or message the host.</p>}</section></main>;
}

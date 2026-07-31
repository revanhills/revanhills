"use client";

import { ChevronDown, Search } from "lucide-react";
import { useState } from "react";
import { faqGroups } from "@/lib/site-data";

export function FaqList() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  return (
    <div className="faq-list">
      <label className="search-box"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search a question" /></label>
      {faqGroups.map((group) => {
        const items = group.items.filter(([question, answer]) => !q || `${question} ${answer}`.toLowerCase().includes(q));
        if (!items.length) return null;
        return <section className="faq-group" key={group.title}><p className="eyebrow">{group.title}</p>{items.map(([question, answer]) => <details key={question} className="faq-item"><summary>{question}<ChevronDown size={18} /></summary><p>{answer}</p></details>)}</section>;
      })}
    </div>
  );
}

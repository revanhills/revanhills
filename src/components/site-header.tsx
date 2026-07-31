"use client";

import Link from "next/link";
import { Globe2, Menu, MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { Brand } from "@/components/brand";
import { navLinks } from "@/lib/site-data";

export function SiteHeader({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <header className={`site-header ${compact ? "site-header--compact" : ""}`}>
      <div className="shell header-inner">
        <Brand />
        <nav className={`site-nav ${open ? "site-nav--open" : ""}`} aria-label="Main navigation">
          {navLinks.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
          <Link className="button button--mobile" href="/book" onClick={() => setOpen(false)}>Check availability</Link>
        </nav>
        <div className="header-actions">
          <button className="language-button" aria-label="Language selector coming soon"><Globe2 size={17} /> EN</button>
          <a className="header-whatsapp" href="https://wa.me/919825077224" target="_blank" aria-label="WhatsApp Revan Hills"><MessageCircle size={18} /></a>
          <Link className="button button--ink" href="/book">Book direct</Link>
          <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Open navigation" aria-expanded={open}>{open ? <X /> : <Menu />}</button>
        </div>
      </div>
    </header>
  );
}

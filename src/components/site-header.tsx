"use client";

import Link from "next/link";
import { Globe2, Menu, MessageCircle, Phone, X } from "lucide-react";
import { useState } from "react";
import { Brand } from "@/components/brand";
import { navLinks } from "@/lib/site-data";

export function SiteHeader({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <header className={`site-header ${compact ? "site-header--compact" : ""}`}>
      <div className="shell header-inner">
        <div className="header-brand-group">
          <Brand />
          <div className="header-contact-row" aria-label="Contact Revan Hills">
            <a className="header-contact-row__phone" href="tel:+919825077224" aria-label="Call Revan Hills host"><Phone /><span>Call host</span></a>
            <a className="header-contact-row__whatsapp" href="https://wa.me/919825077224?text=Hello%20Revan%20Hills%2C%20I%20have%20a%20question%20about%20a%20stay." target="_blank" rel="noreferrer" aria-label="WhatsApp Revan Hills"><MessageCircle /><span>WhatsApp</span></a>
          </div>
        </div>
        <nav className={`site-nav ${open ? "site-nav--open" : ""}`} aria-label="Main navigation">
          {navLinks.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
          <Link className="button button--mobile" href="/book" onClick={() => setOpen(false)}>Check availability</Link>
        </nav>
        <div className="header-actions">
          <button className="language-button" aria-label="Language selector coming soon"><Globe2 size={17} /> EN</button>
          <Link className="button button--ink" href="/book">Reserve</Link>
          <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Open navigation" aria-expanded={open}>{open ? <X /> : <Menu />}</button>
        </div>
      </div>
    </header>
  );
}

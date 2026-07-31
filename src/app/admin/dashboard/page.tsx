"use client";

import Link from "next/link";
import { CalendarDays, ChevronRight, ImagePlus, MapPinned, MessageSquarePlus, PenLine, Plus, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Brand } from "@/components/brand";
import { supabase } from "@/lib/supabase";

const actions = [
  [ImagePlus, "Add photos or video", "Gallery"],
  [PenLine, "Write a farm update", "Blog"],
  [MapPinned, "Add an attraction or rental", "Local guide"],
  [MessageSquarePlus, "Add a guest question", "FAQs"],
];

export default function DashboardPage() {
  const [email, setEmail] = useState("Owner");
  useEffect(() => { supabase?.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? "Owner")); }, []);
  return <main className="dashboard"><header className="dashboard-header"><Brand /><div><span>Signed in as {email}</span><button onClick={() => supabase?.auth.signOut().then(() => window.location.assign("/admin"))}>Sign out</button></div></header><div className="dashboard-shell"><section className="dashboard-welcome"><p className="eyebrow">REVEN HILLS OWNER SPACE</p><h1>Good morning.</h1><p>Keep the stay current, welcoming and easy to book.</p></section><section className="dashboard-stats"><article><CalendarDays /><span><strong>0</strong><small>Upcoming stays</small></span></article><article><Users /><span><strong>4</strong><small>Rooms to manage</small></span></article></section><section><div className="dashboard-section-heading"><div><p className="eyebrow">QUICK UPDATES</p><h2>What would you like to do?</h2></div><Link href="/admin/manage" className="button button--dark"><Plus size={17} /> Add new</Link></div><div className="action-grid">{actions.map(([Icon, title, place]) => <Link href="/admin/manage" key={title as string} className="action-card"><span><Icon size={22} /></span><div><small>{place as string}</small><strong>{title as string}</strong></div><ChevronRight size={18} /></Link>)}</div></section><section className="dashboard-card"><div><p className="eyebrow">COMING NEXT</p><h2>Your content, live and easy to manage.</h2><p>This dashboard is ready for the Supabase content collections in the project plan. First, run the included database migration; then these buttons will open simple phone-friendly edit forms.</p></div><Link href="/" className="button button--outline">View website</Link></section></div></main>;
}

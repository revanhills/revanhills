"use client";

import Link from "next/link";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { FormEvent, useState } from "react";
import { Brand } from "@/components/brand";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) { setMessage("Supabase is not configured yet. Add the local environment values and restart the app."); return; }
    setPending(true); setMessage("");
    const result = mode === "signin" ? await supabase.auth.signInWithPassword({ email, password }) : await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/admin/dashboard` } });
    setPending(false);
    if (result.error) { setMessage(result.error.message); return; }
    if (mode === "signup") setMessage("Account created. Check your email to confirm, then sign in.");
    else window.location.assign("/admin/dashboard");
  }

  return <main className="admin-shell"><div className="admin-art" /><div className="admin-card"><Brand /><div className="admin-heading"><span><LockKeyhole size={16} /></span><p className="eyebrow">OWNER SPACE</p><h1>{mode === "signin" ? "Welcome back." : "Create your owner account."}</h1><p>Use your email and password. No Google sign-in, no extra accounts.</p></div><form onSubmit={submit}><label>Email<input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" /></label><label>Password<input required minLength={8} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 8 characters" /></label>{message && <p className="form-message">{message}</p>}<button disabled={pending} className="button button--dark button--full">{pending ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}<ArrowRight size={17} /></button></form><p className="switch-copy">{mode === "signin" ? "New to the owner space?" : "Already have an account?"}<button onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setMessage(""); }}>{mode === "signin" ? " Create account" : " Sign in"}</button></p><Link className="back-link" href="/">← Back to Revan Hills</Link></div></main>;
}

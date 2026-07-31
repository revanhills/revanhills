import Link from "next/link";

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link className={`brand ${light ? "brand--light" : ""}`} href="/" aria-label="Revan Hills home">
      <svg className="brand__mark" viewBox="0 0 48 48" aria-hidden="true">
        <path d="M8 36C14 29 17 23 20 14c2 8 5 14 9 19 3-6 7-11 12-15-2 11-7 20-15 25-8-3-14-5-18-7Z" fill="currentColor" />
        <path d="M11 36c9-4 18-5 28-1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span className="brand__type"><strong>REVAN HILLS</strong><span>ECOSTAY</span></span>
    </Link>
  );
}

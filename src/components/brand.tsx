import Link from "next/link";

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link className={`brand ${light ? "brand--light" : ""}`} href="/" aria-label="Revan Hills home">
      <svg className="brand__mark" viewBox="0 0 48 48" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <path d="m24 4-7 3-4 6 1 10c1 9 5 16 10 19 5-3 9-10 10-19l1-10-4-6Z" strokeWidth="2.6" />
          <path d="m17 7-7-2 3 8M31 7l7-2-3 8" strokeWidth="2.6" />
          <path d="M14 15c-5 3-7 7-6 13 1 7 5 12 11 15M34 15c5 3 7 7 6 13-1 7-5 12-11 15" strokeWidth="3" />
          <path d="M18 20c2-1 4-1 6 0M25 20c2-1 4-1 6 0" strokeWidth="2" />
          <path d="m24 25-3 3 3 2 3-2Z" fill="var(--coral)" stroke="var(--coral)" strokeWidth="1.5" />
          <path d="M18 32c2 1 4 1 6 1s4 0 6-1M19 36c3 3 7 3 10 0M24 30v8" strokeWidth="2" />
        </g>
      </svg>
      <span className="brand__type"><strong>REVAN HILLS</strong><span>ECOSTAY</span></span>
    </Link>
  );
}

import Link from "next/link";

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link className={`brand ${light ? "brand--light" : ""}`} href="/" aria-label="Revan Hills home">
      <svg className="brand__mark" viewBox="0 0 48 48" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeLinecap="square" strokeLinejoin="miter">
          <path d="m24 2 9 4 7 8 2 10-3 11-7 8-8 4-8-4-7-8-3-11 2-10 7-8Z" strokeWidth="2.5" />
          <path d="m10 18 6-8 8 6 8-6 6 8M10 18l7-5m21 5-7-5" strokeWidth="2.1" />
          <path d="m16 19 6 2-4 3M32 19l-6 2 4 3M24 17v12" strokeWidth="2.2" />
          <path d="m20 29 4-2 4 2-4 4Z" fill="currentColor" strokeWidth="1.5" />
          <path d="m16 27 3 11 5 4 5-4 3-11M24 33v9" strokeWidth="2.2" />
        </g>
      </svg>
      <span className="brand__type"><strong>REVAN HILLS</strong><span>ECOSTAY</span></span>
    </Link>
  );
}

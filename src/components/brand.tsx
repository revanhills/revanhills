import Link from "next/link";

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link className={`brand ${light ? "brand--light" : ""}`} href="/" aria-label="Revan Hills home">
      <svg className="brand__mark" viewBox="0 0 48 48" aria-hidden="true">
        <g fill="currentColor">
          <path fillRule="evenodd" d="M24 1c4 3 7 3 11 2 1 4 4 6 8 7-1 5 1 8 4 11-3 3-4 7-2 11-4 2-6 5-6 10-5 0-8 2-11 5-3-2-5-2-8 0-3-3-6-5-11-5 0-5-2-8-6-10 2-4 1-8-2-11 3-3 5-6 4-11 4-1 7-3 8-7 4 1 7 1 11-2Zm0 9c-6 0-10 5-10 12 0 6 2 11 5 15l5 6 5-6c3-4 5-9 5-15 0-7-4-12-10-12Z" />
          <path d="M16.2 20.7c2.1-1.8 4.4-2 6.6-.3-2 1.5-4.2 1.6-6.6.3Zm15.6 0c-2.1-1.8-4.4-2-6.6-.3 2 1.5 4.2 1.6 6.6.3Zm-11.3 6.5L24 25l3.5 2.2L24 30Z" />
        </g>
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <path d="M24 11v10M24 30v3m0 0c-2 0-3.5 2-5.5 2m5.5-2c2 0 3.5 2 5.5 2M18 37c1.8 3 3.8 4 6 4s4.2-1 6-4" strokeWidth="1.8" />
        </g>
      </svg>
      <span className="brand__type"><strong>REVAN HILLS</strong><span>ECOSTAY</span></span>
    </Link>
  );
}

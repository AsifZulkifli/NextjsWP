import Link from "next/link";

const col1 = [
  { href: "/township", label: "Township" },
  { href: "/homes", label: "Homes" },
  { href: "/commercial", label: "Commercial" },
  { href: "/leisure-lifestyle", label: "Leisure & Lifestyle" },
];

const col2 = [
  { href: "/amenities", label: "Amenities" },
  { href: "/location", label: "Location" },
  { href: "/news-events", label: "News & Events" },
  { href: "/contact", label: "Contact Us" },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-l from-[#194535] via-black via-[40%] to-black text-white">
      <div className="mx-auto px-[5%] py-14 flex items-start gap-10">

        {/* Logo + Social */}
        <div className="flex flex-col gap-6 min-w-[180px]">
          <img src="/gg-logo.png" alt="Gamuda Gardens" className="w-44" />
          <div className="flex gap-3 items-center justify-center">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center hover:border-[#42B58B] hover:text-[#42B58B] transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center hover:border-[#42B58B] hover:text-[#42B58B] transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
        </div>

        {/* Nav col 1 */}
        <nav className="flex flex-col gap-5 min-w-[160px]">
          {col1.map(({ href, label }) => (
            <Link key={href} href={href}
              className="font-markpro text-[13px] uppercase tracking-widest text-[#9E9E9E] hover:text-[#42B58B] transition-colors">
              {label}
            </Link>
          ))}
        </nav>

        {/* Nav col 2 */}
        <nav className="flex flex-col gap-5 min-w-[160px]">
          {col2.map(({ href, label }) => (
            <Link key={href} href={href}
              className="font-markpro text-[13px] uppercase tracking-widest text-[#9E9E9E] hover:text-[#42B58B] transition-colors">
              {label}
            </Link>
          ))}
        </nav>

        {/* Divider */}
        <div className="self-stretch w-px bg-white/20 mx-2" />

        {/* Address */}
        <div className="flex flex-col gap-4 min-w-[240px]">
          <div className="flex items-start gap-3">
            <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_2665_1739)"><path d="M11.6004 5.71419C11.6004 3.80878 10.533 2.0481 8.80039 1.09539C7.06774 0.142682 4.93304 0.142682 3.20039 1.09539C1.46774 2.0481 0.400391 3.80878 0.400391 5.71419C0.400391 6.77095 0.728391 7.75381 1.28439 8.58276H1.27799C3.16599 11.398 6.00039 15.619 6.00039 15.619L10.7228 8.58276H10.7172C11.2935 7.72667 11.6 6.73114 11.6004 5.71419ZM6.00039 7.99991C4.67491 7.99991 3.60039 6.97656 3.60039 5.71419C3.60039 4.45183 4.67491 3.42848 6.00039 3.42848C7.32587 3.42848 8.40039 4.45183 8.40039 5.71419C8.40039 6.97656 7.32587 7.99991 6.00039 7.99991Z" fill="#42B58B"/>
            </g><defs><clipPath id="clip0_2665_1739"><rect width="12" height="16" fill="white"/></clipPath></defs>
            </svg>
            <p className="font-markpro text-[13px] text-white leading-relaxed">
              Gamuda Gardens Experience Gallery,<br />
              Persiaran Gamuda Gardens 1,<br />
              Bandar Gamuda Gardens,<br />
              48050, Kuang, Selangor.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <img src="icons/www.svg" className=""/>
            <a href="https://www.gamudagardens.com.my" target="_blank" rel="noopener noreferrer"
              className="font-markpro text-[13px] text-[#42B58B] hover:underline">
              www.gamudagardens.com.my
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="self-stretch w-px bg-white/20 mx-2" />

        {/* Phone + Gamuda Land */}
        <div className="flex flex-col gap-6 items-end ml-auto">
          <span className="font-markpro text-[32px] font-bold tracking-normal whitespace-nowrap">
            +603 2727 7438
          </span>
          <img src="icons/gl-white.svg" className=""/>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 mx-[5%]">
        <div className="mx-auto py-4 flex items-center justify-between">
          <span className="font-markpro text-[12px] text-white">
            Bandar Serai Development Sdn Bhd [201301020260 (1050090-W)]
          </span>
          <div className="flex items-center gap-4 font-markpro text-[12px] text-white">
            <a href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</a>
            <span>|</span>
            <a href="/privacy" className="hover:text-white transition-colors">Privacy Notice</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

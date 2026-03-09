"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/showcase", label: "Showcase" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between">
      <div className="absolute inset-0 bg-black/10 backdrop-blur-md -z-10" />
      <Link href="/" className="text-white font-bold text-lg tracking-tight">
        NextjsWP
      </Link>
      <nav className="flex items-center gap-1">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
              pathname === href
                ? "bg-white text-gray-900"
                : "text-white/80 hover:text-white hover:bg-white/10"
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

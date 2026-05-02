"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/#fonctionnalites", label: "Fonctionnalités" },
    { href: "/tarifs", label: "Tarifs" },
    { href: "/politique-de-confidentialite", label: "Confidentialité" },
    { href: "/conditions-generales", label: "CGU" },
  ];

  function handleHashClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) {
    e.preventDefault();
    setMenuOpen(false);

    const hashIndex = href.indexOf("#");
    const id = href.slice(hashIndex + 1);
    const basePath = href.slice(0, hashIndex) || "/";

    if (pathname === basePath) {
      // Même page : scroll direct
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      // Page différente : navigation complète, le navigateur gère le hash
      window.location.href = href;
    }
  }

  return (
    <nav className="bg-green-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 bg-green-500 rounded-lg flex items-center justify-center shadow">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                  fill="white"
                />
              </svg>
            </div>
            <span className="text-lg font-bold tracking-tight">
              MMC Go Drivers
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) =>
              link.href.includes("#") ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleHashClick(e, link.href)}
                  className="px-3 py-2 rounded-md text-sm font-medium transition-colors text-green-100 hover:bg-green-800 hover:text-white"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? "bg-green-700 text-white"
                      : "text-green-100 hover:bg-green-800 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
            <a
              href="/#telecharger"
              onClick={(e) => handleHashClick(e, "/#telecharger")}
              className="ml-2 bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow"
            >
              Télécharger
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-green-800 transition-colors"
            aria-label="Menu"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M3 6h18M3 12h18M3 18h18"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-green-800 pt-3 flex flex-col gap-1">
            {navLinks.map((link) =>
              link.href.includes("#") ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleHashClick(e, link.href)}
                  className="py-2 px-3 rounded-md text-green-100 hover:bg-green-800 hover:text-white transition-colors text-sm"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="py-2 px-3 rounded-md text-green-100 hover:bg-green-800 hover:text-white transition-colors text-sm"
                >
                  {link.label}
                </Link>
              )
            )}
            <a
              href="/#telecharger"
              onClick={(e) => handleHashClick(e, "/#telecharger")}
              className="mt-2 bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-lg text-sm font-semibold w-fit transition-colors"
            >
              Télécharger
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}

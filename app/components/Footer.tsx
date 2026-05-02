import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-green-950 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-green-500 rounded-lg flex items-center justify-center">
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
              <h3 className="text-lg font-bold">MMC Go Drivers</h3>
            </div>
            <p className="text-green-400 text-sm leading-relaxed">
              L&apos;outil universel des professionnels du transport. Navigation
              intelligente, gestion de planning et conformité RSE.
            </p>
            <p className="text-green-500 text-xs mt-3">
              Développé avec Flutter &amp; OpenStreetMap
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-green-300 mb-4">
              Navigation
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Accueil" },
                { href: "/tarifs", label: "Tarifs" },
                {
                  href: "/politique-de-confidentialite",
                  label: "Politique de Confidentialité",
                },
                {
                  href: "/conditions-generales",
                  label: "Conditions Générales",
                },
                { href: "/#telecharger", label: "Télécharger l'app" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-green-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-green-300 mb-4">
              Contact & Support
            </h3>
            <div className="space-y-3 text-sm text-green-400">
              <p>
                <a
                  href="mailto:support@mmcgo-drivers.com"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                  support@mmcgo-drivers.com
                </a>
              </p>
              <p className="text-green-500">Version 1.0.0</p>
              <p className="text-green-500">
                © MMC Go Développement
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-green-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-green-500">
          <p>© 2024 MMC Go Développement. Tous droits réservés.</p>
          <div className="flex gap-4">
            <Link
              href="/politique-de-confidentialite"
              className="hover:text-white transition-colors"
            >
              Confidentialité
            </Link>
            <Link
              href="/conditions-generales"
              className="hover:text-white transition-colors"
            >
              CGU
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useState } from "react";
import BetaModal from "./BetaModal";

export default function BetaBanner() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ── BETA SECTION ─────────────────────────────────────── */}
      <section className="py-20 px-4 bg-linear-to-br from-green-900 via-green-800 to-green-900 text-white relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-green-600/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-green-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-400/40 text-green-300 text-xs font-semibold px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Programme bêta — Places limitées
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-5 leading-tight">
            Testez l&apos;application{" "}
            <span className="text-green-400">en avant-première</span>
          </h2>

          <p className="text-green-200 text-lg md:text-xl mb-4 max-w-2xl mx-auto leading-relaxed">
            Rejoignez notre programme bêta et accédez à MMC Go Drivers avant son lancement officiel.
            Votre retour façonnera l&apos;application finale.
          </p>

          <ul className="flex flex-col sm:flex-row gap-4 justify-center text-sm text-green-300 mb-10">
            {[
              "Accès gratuit pendant la bêta",
              "Fonctionnalités complètes débloquées",
              "Influence directe sur le développement",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-green-400 shrink-0">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                {item}
              </li>
            ))}
          </ul>

          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-3 bg-green-400 hover:bg-green-300 text-green-950 font-bold px-8 py-4 rounded-2xl transition-colors shadow-xl text-lg"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            Je veux être bêta testeur
          </button>

          <p className="text-green-500 text-xs mt-4">
            Réservé aux professionnels du transport · Réponse sous 48h
          </p>
        </div>
      </section>

      {open && <BetaModal onClose={() => setOpen(false)} />}
    </>
  );
}

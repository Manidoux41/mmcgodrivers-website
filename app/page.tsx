import Link from "next/link";
import BetaBanner from "./components/BetaBanner";
import { supabase, type Commentaire } from "@/lib/supabase";

export const revalidate = 120;

const features = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
      </svg>
    ),
    title: "Navigation Intelligente",
    description:
      "Calcul d'itinéraires prenant en compte le gabarit de votre véhicule : hauteur, PTAC. Idéal pour les Poids Lourds, bus et taxis.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
      </svg>
    ),
    title: "Planning & Missions",
    description:
      "Visualisez vos missions quotidiennes sous forme de blocs clairs. Recevez des alertes RSE en temps réel pour rester en conformité.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zm-.5 1.5l1.96 2.5H17V9.5h2.5zM6 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm11 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
      </svg>
    ),
    title: "Gestion de Flotte",
    description:
      "Console d'administration complète pour gérer votre parc de véhicules, vos chauffeurs et générer des feuilles de route PDF.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
      </svg>
    ),
    title: "Portefeuille de Documents",
    description:
      "Accès rapide à vos permis, attestations et documents véhicules. Export KML/GPX de vos trajets enregistrés.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4l5 2.18V11c0 3.5-2.33 6.79-5 7.93-2.67-1.14-5-4.43-5-7.93V7.18L12 5z" />
      </svg>
    ),
    title: "Conformité RSE",
    description:
      "Moteur de calcul respectant la Réglementation Sociale Européenne. Alertes automatiques sur l'amplitude, la conduite continue et le temps journalier.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
      </svg>
    ),
    title: "Gestion d'Équipe",
    description:
      "Créez des comptes pour vos chauffeurs avec identifiants sécurisés. Tableau de bord interactif jour/semaine pour toute la flotte.",
  },
];

const pricingTeaser = [
  { name: "Gratuit", price: "0 €", colorClass: "bg-green-50 border-green-200 text-green-900" },
  { name: "Expert", price: "2,99 €", colorClass: "bg-green-100 border-green-300 text-green-900" },
  { name: "Professionnel", price: "15,99 €", colorClass: "bg-green-600 border-green-600 text-white" },
  { name: "Diamant", price: "399 €", colorClass: "bg-green-900 border-green-900 text-white" },
];

export default async function Home() {
  const { data: avisData } = await supabase
    .from("commentaires")
    .select("id, nom, message, note, created_at")
    .eq("statut", "approuve")
    .order("created_at", { ascending: false })
    .limit(6);

  const avisUne = (avisData ?? []) as Pick<Commentaire, "id" | "nom" | "message" | "note" | "created_at">[];

  return (
    <div className="flex flex-col">
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="hero-gradient text-white py-20 px-4 overflow-hidden relative">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-green-700/50 border border-green-500/40 text-green-200 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Application mobile bientôt disponible
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              MMC Go <span className="text-green-400">Drivers</span>
            </h1>
            <p className="text-green-100 text-lg md:text-xl mb-4 leading-relaxed">
              L&apos;outil universel des{" "}
              <strong className="text-white">professionnels du transport</strong>
            </p>
            <p className="text-green-200 text-base mb-8 leading-relaxed max-w-lg">
              Navigation adaptée au gabarit, gestion de planning, conformité RSE
              et console d&apos;administration — tout en une seule application.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start flex-wrap">
              <a
                href="#telecharger"
                className="inline-flex items-center justify-center gap-2 bg-green-400 hover:bg-green-300 text-green-950 font-bold px-6 py-3.5 rounded-xl transition-colors shadow-lg text-base"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.39.07 2.35.77 3.16.78.96-.03 1.87-.77 3.24-.77 1.67.07 2.85.73 3.43 2.05-3.1 1.88-2.62 6.55.76 7.88-.53.98-1.05 1.95-2.59 2.94zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                App Store
              </a>
              <a
                href="#telecharger"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-6 py-3.5 rounded-xl transition-colors text-base"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5v-17c0-0.83,0.94-1.3,1.6-0.8l14,8.5c0.6,0.37,0.6,1.23,0,1.6l-14,8.5C3.94,21.8,3,21.33,3,20.5z" />
                </svg>
                Google Play
              </a>
              <Link
                href="/tarifs"
                className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 border border-white/30 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors text-base"
              >
                Voir les tarifs →
              </Link>
            </div>
          </div>

          {/* Phone illustration */}
          <div className="flex-shrink-0">
            <div className="relative w-52 h-52 md:w-72 md:h-72">
              <div className="absolute inset-0 bg-green-500/20 rounded-full blur-3xl"></div>
              <div className="relative w-full h-full flex items-center justify-center">
                <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <rect x="55" y="10" width="90" height="180" rx="16" fill="#166534" stroke="#4ade80" strokeWidth="2" />
                  <rect x="63" y="25" width="74" height="140" rx="8" fill="#14532d" />
                  <rect x="63" y="25" width="74" height="140" rx="8" fill="#15803d" opacity="0.4" />
                  <path d="M80 140 Q85 110 100 90 Q115 70 120 50" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 3" />
                  <circle cx="100" cy="88" r="8" fill="#4ade80" />
                  <circle cx="100" cy="88" r="4" fill="#14532d" />
                  <rect x="78" y="125" width="28" height="16" rx="3" fill="#22c55e" />
                  <rect x="106" y="129" width="14" height="12" rx="2" fill="#16a34a" />
                  <circle cx="85" cy="144" r="3" fill="#14532d" />
                  <circle cx="112" cy="144" r="3" fill="#14532d" />
                  <rect x="80" y="30" width="40" height="4" rx="2" fill="#4ade80" opacity="0.5" />
                  <rect x="88" y="12" width="24" height="5" rx="2.5" fill="#14532d" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-green-700/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-green-600/20 rounded-full blur-3xl pointer-events-none"></div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────── */}
      <section className="bg-green-800 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "4", label: "Forfaits adaptés" },
            { value: "Bus • Taxi • PL", label: "Types de véhicules" },
            { value: "RSE", label: "Conformité européenne" },
            { value: "iOS & Android", label: "Plateformes" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-bold text-green-300">{stat.value}</div>
              <div className="text-green-200 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────── */}
      <section id="fonctionnalites" className="py-20 px-4 bg-white scroll-mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">
              Fonctionnalités Principales
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto leading-relaxed">
              Conçu pour simplifier le quotidien des conducteurs et des gestionnaires de flotte.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat) => (
              <div key={feat.title} className="card-hover bg-green-50 border border-green-100 rounded-2xl p-6">
                <div className="w-12 h-12 bg-green-600 text-white rounded-xl flex items-center justify-center mb-4">
                  {feat.icon}
                </div>
                <h3 className="text-lg font-bold text-green-900 mb-2">{feat.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING TEASER ───────────────────────────────────── */}
      <section className="py-20 px-4 bg-green-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">Tarifs et Forfaits</h2>
          <p className="text-gray-600 mb-12 max-w-lg mx-auto">
            Du conducteur indépendant à l&apos;entreprise de transport, un forfait adapté à chaque besoin.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {pricingTeaser.map((plan) => (
              <div key={plan.name} className={`card-hover border-2 rounded-2xl p-6 ${plan.colorClass}`}>
                <div className="text-sm font-semibold mb-2 opacity-80">{plan.name}</div>
                <div className="text-2xl font-bold">{plan.price}</div>
                <div className="text-xs mt-1 opacity-60">/ mois</div>
              </div>
            ))}
          </div>
          <Link
            href="/tarifs"
            className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-600 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors shadow-md"
          >
            Voir le détail des forfaits →
          </Link>
        </div>
      </section>

      {/* ── RSE COMPLIANCE ───────────────────────────────────── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-green-800 to-green-700 text-white rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-green-500/30 rounded-2xl flex items-center justify-center">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-green-300">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                </svg>
              </div>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Conformité RSE Intégrée</h2>
              <p className="text-green-100 leading-relaxed mb-4">
                L&apos;application intègre un moteur de calcul respectant la{" "}
                <strong className="text-white">Réglementation Sociale Européenne</strong>.
                Elle alerte automatiquement le conducteur et l&apos;administrateur en cas de :
              </p>
              <ul className="space-y-1.5 text-green-200 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span> Dépassement de l&apos;amplitude (12h)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span> Conduite continue supérieure à 4h30 sans pause
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span> Temps de conduite quotidien approchant les 9h
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      {avisUne.length > 0 && (
        <section className="py-20 px-4 bg-green-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-3">
                Ce que disent nos utilisateurs
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto text-sm">
                Des professionnels du transport qui font confiance à MMC Go Drivers au quotidien.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {avisUne.map((avis) => (
                <div
                  key={avis.id}
                  className="bg-white rounded-2xl border border-green-100 shadow-sm p-6 flex flex-col gap-4 card-hover"
                >
                  {/* Stars */}
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg key={s} width="15" height="15" viewBox="0 0 24 24"
                        fill={s <= avis.note ? "#16a34a" : "none"}
                        stroke={s <= avis.note ? "#16a34a" : "#d1d5db"}
                        strokeWidth="1.5"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  {/* Quote */}
                  <p className="text-gray-700 text-sm leading-relaxed flex-1">
                    &ldquo;{avis.message}&rdquo;
                  </p>
                  {/* Author */}
                  <div className="flex items-center gap-3 pt-2 border-t border-green-50">
                    <div className="w-9 h-9 rounded-full bg-green-700 flex items-center justify-center text-white text-sm font-bold shrink-0">
                      {avis.nom.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-green-900 text-sm">{avis.nom}</p>
                      <p className="text-gray-400 text-xs">
                        {new Date(avis.created_at).toLocaleDateString("fr-FR", {
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                href="/avis"
                className="inline-flex items-center gap-2 text-green-700 hover:text-green-600 font-semibold text-sm transition-colors"
              >
                Voir tous les avis →
              </Link>
            </div>
          </div>
        </section>
      )}

      <BetaBanner />

      {/* ── DOWNLOAD ─────────────────────────────────────────── */}
      <section id="telecharger" className="py-20 px-4 bg-green-900 text-white scroll-mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Télécharger l&apos;Application</h2>
          <p className="text-green-200 mb-10 text-lg">Disponible sur iOS et Android. Commencez gratuitement.</p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <a
              href="#"
              className="flex items-center gap-4 bg-black hover:bg-gray-900 text-white px-6 py-4 rounded-2xl transition-colors min-w-56 shadow-xl"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div className="text-left">
                <div className="text-xs text-gray-400">Télécharger sur</div>
                <div className="text-lg font-bold leading-tight">App Store</div>
              </div>
            </a>
            <a
              href="#"
              className="flex items-center gap-4 bg-black hover:bg-gray-900 text-white px-6 py-4 rounded-2xl transition-colors min-w-56 shadow-xl"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5v-17c0-0.83,0.94-1.3,1.6-0.8l14,8.5c0.6,0.37,0.6,1.23,0,1.6l-14,8.5C3.94,21.8,3,21.33,3,20.5z" />
              </svg>
              <div className="text-left">
                <div className="text-xs text-gray-400">Disponible sur</div>
                <div className="text-lg font-bold leading-tight">Google Play</div>
              </div>
            </a>
          </div>
          <p className="text-green-400 text-sm mt-8">
            Prochainement disponible sur les stores officiels · Version 1.0.0
          </p>
        </div>
      </section>
    </div>
  );
}

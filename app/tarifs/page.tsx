import Link from "next/link";

type Plan = {
  name: string;
  price: string;
  period: string;
  description: string;
  popular: boolean;
  cta: string;
  color: string;
  headerBg: string;
};

const plans: Plan[] = [
  {
    name: "Gratuit",
    price: "0 €",
    period: "/ mois",
    description: "Pour découvrir l'application sans engagement.",
    popular: false,
    cta: "Commencer gratuitement",
    color: "border-gray-200",
    headerBg: "bg-gray-50",
  },
  {
    name: "Expert",
    price: "2,99 €",
    period: "/ mois",
    description: "Pour le conducteur indépendant exigeant.",
    popular: false,
    cta: "Choisir Expert",
    color: "border-green-300",
    headerBg: "bg-green-50",
  },
  {
    name: "Professionnel",
    price: "15,99 €",
    period: "/ mois",
    description: "Pour le conducteur qui gère sa propre activité.",
    popular: true,
    cta: "Choisir Professionnel",
    color: "border-green-600",
    headerBg: "pricing-popular text-white",
  },
  {
    name: "Diamant",
    price: "399 €",
    period: "/ mois",
    description: "Pour les entreprises de transport et les gestionnaires de flotte.",
    popular: false,
    cta: "Contacter",
    color: "border-green-900",
    headerBg: "bg-green-900 text-white",
  },
];

type FeatureRow = {
  label: string;
  values: (string | boolean)[];
};

const featureRows: FeatureRow[] = [
  { label: "Navigation Standard", values: [true, true, true, true] },
  { label: "Enregistrement Trajets", values: ["1 seul", "Illimité", "Illimité", "Illimité"] },
  { label: "Navigation Gabarit (PL)", values: [false, true, true, true] },
  { label: "Export KML / GPX", values: [false, true, true, true] },
  { label: "Billet Collectif (BC)", values: [false, true, true, true] },
  { label: "Planning individuel", values: [false, false, true, true] },
  { label: "Alertes RSE temps réel", values: [false, false, true, true] },
  { label: "Gestion Véhicules", values: [false, false, true, true] },
  { label: "Documents & Contacts", values: [false, false, true, true] },
  { label: "Export Feuilles de route PDF", values: [false, false, true, true] },
  { label: "Administration Flotte", values: [false, false, false, true] },
  { label: "Comptes Chauffeurs", values: [false, false, false, true] },
  { label: "Tableau de bord Excel", values: [false, false, false, true] },
  { label: "Alertes RSE Avancées", values: [false, false, false, true] },
];

function CellValue({ value }: { value: string | boolean }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-700">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 16.2l-3.5-3.5-1.4 1.4L9 19 19 9l-1.4-1.4L9 16.2z" />
        </svg>
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-400">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </svg>
      </span>
    );
  }
  return <span className="text-sm font-medium text-green-700">{value}</span>;
}

export default function Tarifs() {
  return (
    <div>
      {/* Header */}
      <section className="hero-gradient text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Tarifs & Forfaits</h1>
          <p className="text-green-100 text-lg max-w-2xl mx-auto">
            Du conducteur indépendant à l&apos;entreprise de transport, choisissez le forfait
            qui correspond à vos besoins.
          </p>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="py-16 px-4 bg-green-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-white rounded-2xl border-2 ${plan.color} overflow-hidden shadow-sm card-hover flex flex-col`}
              >
                {plan.popular && (
                  <div className="absolute top-3 right-3">
                    <span className="bg-green-400 text-green-950 text-xs font-bold px-2.5 py-1 rounded-full">
                      Populaire
                    </span>
                  </div>
                )}
                <div className={`p-6 ${plan.headerBg}`}>
                  <h2 className="text-xl font-bold mb-1">{plan.name}</h2>
                  <p
                    className={`text-sm mb-4 ${
                      plan.popular || plan.name === "Diamant"
                        ? "text-white/70"
                        : "text-gray-500"
                    }`}
                  >
                    {plan.description}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold">{plan.price}</span>
                    <span
                      className={`text-sm ${
                        plan.popular || plan.name === "Diamant"
                          ? "text-white/70"
                          : "text-gray-400"
                      }`}
                    >
                      {plan.period}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <Link
                    href="/#telecharger"
                    className={`block text-center text-sm font-semibold py-2.5 rounded-xl transition-colors mb-6 ${
                      plan.popular
                        ? "bg-green-600 hover:bg-green-500 text-white"
                        : plan.name === "Diamant"
                          ? "bg-green-900 hover:bg-green-800 text-white"
                          : "bg-green-100 hover:bg-green-200 text-green-800"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                  <ul className="space-y-3 flex-1">
                    {featureRows.map((row) => {
                      const val = row.values[plans.indexOf(plan)];
                      if (val === false) return null;
                      return (
                        <li key={row.label} className="flex items-center gap-2 text-sm text-gray-700">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="text-green-500 shrink-0"
                          >
                            <path d="M9 16.2l-3.5-3.5-1.4 1.4L9 19 19 9l-1.4-1.4L9 16.2z" />
                          </svg>
                          <span>
                            {row.label}
                            {typeof val === "string" && val !== "Illimité" && (
                              <span className="text-green-600 font-medium"> ({val})</span>
                            )}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full comparison table */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-green-900 text-center mb-10">
            Comparaison complète des forfaits
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-green-100 shadow-sm">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="bg-green-900 text-white">
                  <th className="text-left p-4 font-semibold text-sm w-2/5">Fonctionnalité</th>
                  {plans.map((plan) => (
                    <th key={plan.name} className="text-center p-4 font-semibold text-sm">
                      <div>{plan.name}</div>
                      <div className="text-green-300 font-bold text-base mt-0.5">{plan.price}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {featureRows.map((row, idx) => (
                  <tr
                    key={row.label}
                    className={idx % 2 === 0 ? "bg-white" : "bg-green-50"}
                  >
                    <td className="p-4 text-sm text-gray-700 font-medium">{row.label}</td>
                    {row.values.map((val, i) => (
                      <td key={i} className="p-4 text-center">
                        <div className="flex justify-center">
                          <CellValue value={val} />
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Coming soon Mac & PC */}
      <section className="py-12 px-4 bg-white border-t border-green-100">
        <div className="max-w-3xl mx-auto">
          <div className="bg-green-900 text-white rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6 shadow-lg">
            <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-2xl bg-green-700">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor" className="text-green-300">
                <path d="M20 3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h3l-1 1v2h12v-2l-1-1h3c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 13H4V5h16v11z" />
              </svg>
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <span className="bg-green-400 text-green-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  Prochainement
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">Version Mac &amp; PC</h3>
              <p className="text-green-200 text-sm leading-relaxed">
                Une application de bureau pour Mac et PC sera disponible prochainement.{" "}
                <span className="text-green-300 font-semibold">
                  Réservée exclusivement aux abonnés Premium
                </span>{" "}
                — entreprises et administrateurs (forfait Diamant).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ / note */}
      <section className="py-16 px-4 bg-green-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-green-900 text-center mb-8">Questions fréquentes</h2>
          <div className="space-y-4">
            {[
              {
                q: "Comment sont gérés les paiements ?",
                a: "Les paiements sont gérés de manière sécurisée par Stripe. Tout mois entamé est dû. L'annulation prend effet à la fin de la période en cours.",
              },
              {
                q: "Puis-je changer de forfait ?",
                a: "Oui, vous pouvez upgrader ou downgrader votre forfait à tout moment depuis les paramètres de l'application.",
              },
              {
                q: "Le forfait Diamant est-il par conducteur ou par entreprise ?",
                a: "Le forfait Diamant est par entreprise. Il vous permet de créer des comptes pour tous vos chauffeurs et de gérer toute votre flotte depuis une seule console d'administration.",
              },
              {
                q: "Les alertes RSE remplacent-elles le chronotachygraphe ?",
                a: "Non. Les alertes RSE sont fournies à titre indicatif et ne remplacent pas le chronotachygraphe légal. Le conducteur reste seul responsable du respect du code de la route.",
              },
            ].map((faq) => (
              <details
                key={faq.q}
                className="bg-white border border-green-100 rounded-xl p-5 group"
              >
                <summary className="font-semibold text-green-800 cursor-pointer list-none flex justify-between items-center">
                  {faq.q}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-green-500 shrink-0 group-open:rotate-180 transition-transform"
                  >
                    <path d="M7 10l5 5 5-5z" />
                  </svg>
                </summary>
                <p className="text-gray-600 text-sm mt-3 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-green-900 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Prêt à simplifier votre quotidien ?</h2>
          <p className="text-green-200 mb-8">
            Commencez gratuitement dès aujourd&apos;hui. Aucune carte bancaire requise pour le forfait Gratuit.
          </p>
          <Link
            href="/#telecharger"
            className="inline-flex items-center gap-2 bg-green-400 hover:bg-green-300 text-green-950 font-bold px-8 py-3.5 rounded-xl transition-colors shadow-lg"
          >
            Télécharger l&apos;application →
          </Link>
        </div>
      </section>
    </div>
  );
}

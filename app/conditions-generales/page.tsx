export const metadata = {
  title: "Conditions Générales d'Utilisation — MMC Go Drivers",
  description: "Conditions générales d'utilisation du service MMC Go Drivers.",
};

const articles = [
  {
    num: "1",
    title: "Description du Service",
    content:
      "MMC Go Drivers est une solution logicielle destinée aux professionnels du transport. Elle inclut des outils de navigation spécialisée (gabarit véhicule), de gestion de planning, de conformité RSE et de gestion de flotte. L'application est développée avec Flutter et utilise le moteur cartographique OpenStreetMap.",
  },
  {
    num: "2",
    title: "Abonnements et Paiements",
    bullets: [
      "L'utilisation de certaines fonctionnalités nécessite un abonnement payant (Expert à 2,99 €/mois, Professionnel à 15,99 €/mois ou Diamant à 399 €/mois).",
      "Les paiements sont gérés de manière sécurisée par Stripe.",
      "Tout mois entamé est dû. L'annulation d'un abonnement prend effet à la fin de la période en cours.",
      "Les tarifs peuvent être modifiés avec un préavis de 30 jours.",
    ],
  },
  {
    num: "3",
    title: "Responsabilité du Conducteur",
    bullets: [
      "L'application est un outil d'aide à la conduite. Le conducteur reste seul responsable du respect du code de la route, de la réglementation applicable et de la sécurité de son véhicule.",
      "Les alertes RSE (Réglementation Sociale Européenne) sont fournies à titre indicatif et ne remplacent pas le chronotachygraphe légal obligatoire.",
      "MMC Go Développement ne peut être tenu responsable d'infractions ou d'accidents résultant de l'utilisation de l'application.",
    ],
  },
  {
    num: "4",
    title: "Propriété Intellectuelle",
    content:
      "L'application MMC Go Drivers, son logo, son code source, ses algorithmes et l'ensemble de son contenu sont la propriété exclusive de MMC Go Développement. Toute reproduction, modification ou distribution sans autorisation écrite préalable est strictement interdite.",
  },
  {
    num: "5",
    title: "Données Personnelles",
    content:
      "La collecte et le traitement de vos données personnelles sont régis par notre Politique de Confidentialité, disponible dans l'application et sur notre site web. En utilisant MMC Go Drivers, vous acceptez cette politique.",
    link: { href: "/politique-de-confidentialite", label: "Lire la Politique de Confidentialité" },
  },
  {
    num: "6",
    title: "Disponibilité du Service",
    content:
      "Nous nous efforçons d'assurer la disponibilité du service 24h/24 et 7j/7. Des interruptions peuvent survenir pour des raisons de maintenance ou de force majeure. MMC Go Développement ne garantit pas une disponibilité ininterrompue du service.",
  },
  {
    num: "7",
    title: "Résiliation et Suspension",
    bullets: [
      "L'utilisateur peut résilier son abonnement à tout moment depuis les paramètres de l'application.",
      "MMC Go Développement se réserve le droit de suspendre ou résilier tout compte ne respectant pas ces conditions d'utilisation ou faisant un usage abusif du service.",
      "En cas de fraude avérée, le compte peut être suspendu immédiatement sans préavis.",
    ],
  },
  {
    num: "8",
    title: "Limitation de Responsabilité",
    content:
      "Dans les limites autorisées par la loi applicable, MMC Go Développement ne peut être tenu responsable de dommages indirects, consécutifs ou immatériels résultant de l'utilisation ou de l'impossibilité d'utiliser le service. Notre responsabilité directe est limitée au montant payé par l'utilisateur au cours des 3 derniers mois.",
  },
  {
    num: "9",
    title: "Modification des CGU",
    content:
      "MMC Go Développement se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs seront informés par notification dans l'application ou par email au moins 15 jours avant l'entrée en vigueur des modifications. L'utilisation continue du service après notification vaut acceptation des nouvelles conditions.",
  },
  {
    num: "10",
    title: "Droit Applicable et Juridiction",
    content:
      "Les présentes CGU sont soumises au droit français. En cas de litige, et après tentative de résolution amiable, les tribunaux français seront seuls compétents.",
  },
];

export default function ConditionsGenerales() {
  return (
    <div>
      {/* Header */}
      <section className="hero-gradient text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-14 h-14 bg-green-500/30 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-green-300">
              <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-3">Conditions Générales d&apos;Utilisation</h1>
          <p className="text-green-200">MMC Go Drivers — En vigueur depuis le 15 mai 2024</p>
          <p className="text-green-100 mt-3 max-w-xl mx-auto text-sm">
            En utilisant l&apos;application MMC Go Drivers, vous acceptez les présentes conditions générales d&apos;utilisation.
            Veuillez les lire attentivement avant toute utilisation.
          </p>
        </div>
      </section>

      {/* Table of contents */}
      <section className="py-8 px-4 bg-green-50 border-b border-green-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-green-700 uppercase tracking-wider mb-4">Sommaire</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {articles.map((article) => (
              <a
                key={article.num}
                href={`#article-${article.num}`}
                className="text-sm text-green-700 hover:text-green-900 hover:underline flex items-center gap-1.5"
              >
                <span className="w-5 h-5 bg-green-200 text-green-800 rounded text-xs flex items-center justify-center font-bold">
                  {article.num}
                </span>
                {article.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto space-y-10">
          {articles.map((article) => (
            <div
              key={article.num}
              id={`article-${article.num}`}
              className="scroll-mt-20 border-b border-green-100 pb-8 last:border-none"
            >
              <h2 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-3">
                <span className="w-9 h-9 bg-green-800 text-white rounded-xl flex items-center justify-center text-sm font-bold shrink-0">
                  {article.num}
                </span>
                {article.title}
              </h2>

              {"content" in article && article.content && (
                <p className="text-gray-700 leading-relaxed">{article.content}</p>
              )}

              {"bullets" in article && article.bullets && (
                <ul className="space-y-2.5">
                  {article.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2.5 text-gray-700 text-sm">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="text-green-500 shrink-0 mt-0.5"
                      >
                        <path d="M9 16.2l-3.5-3.5-1.4 1.4L9 19 19 9l-1.4-1.4L9 16.2z" />
                      </svg>
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}

              {"link" in article && article.link && (
                <a
                  href={article.link.href}
                  className="inline-flex items-center gap-1.5 text-green-700 hover:text-green-600 text-sm font-medium mt-3 transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                  </svg>
                  {article.link.label}
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 px-4 bg-green-50">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gray-600 mb-2">
            Des questions sur nos conditions d&apos;utilisation ?
          </p>
          <a
            href="mailto:support@mmcgo-drivers.com"
            className="inline-flex items-center gap-2 text-green-700 hover:text-green-600 font-semibold transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
            support@mmcgo-drivers.com
          </a>
        </div>
      </section>
    </div>
  );
}

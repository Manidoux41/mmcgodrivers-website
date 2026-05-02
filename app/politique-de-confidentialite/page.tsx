export const metadata = {
  title: "Politique de Confidentialité — MMC Go Drivers",
  description:
    "Comment MMC Go Drivers collecte, utilise et protège vos données personnelles.",
};

const sections = [
  {
    title: "1. Collecte des Données",
    content: [
      {
        subtitle: "Données de Localisation",
        text: "Nous collectons votre position GPS en arrière-plan pour permettre l'enregistrement des trajets et la navigation spécialisée Poids-Lourds.",
      },
      {
        subtitle: "Informations du Compte",
        text: "Nom, prénom, identifiant et mot de passe (créés par votre administrateur ou lors de l'inscription).",
      },
      {
        subtitle: "Informations Véhicule",
        text: "Immatriculation, dimensions et tonnage pour le calcul d'itinéraires.",
      },
      {
        subtitle: "Documents",
        text: "Photos ou fichiers importés par l'utilisateur (permis, attestations).",
      },
    ],
  },
  {
    title: "2. Utilisation des Données",
    text: "Vos données sont utilisées exclusivement pour :",
    bullets: [
      "Fournir les services de navigation et de planning.",
      "Assurer la conformité RSE (Réglementation Sociale Européenne).",
      "Permettre la gestion de flotte par votre employeur (si applicable).",
      "Traiter les paiements via Stripe.",
    ],
  },
  {
    title: "3. Partage des Données",
    text: "Nous ne vendons jamais vos données. Elles sont partagées uniquement avec :",
    bullets: [
      "Votre employeur (via la console d'administration entreprise).",
      "Stripe (pour le traitement sécurisé des paiements).",
      "OpenRouteService (pour le calcul anonymisé des itinéraires).",
    ],
  },
  {
    title: "4. Sécurité",
    text: "Toutes les données sont transmises via des protocoles sécurisés (HTTPS) et stockées sur des serveurs protégés. Nous appliquons les meilleures pratiques de sécurité pour protéger vos informations personnelles contre tout accès non autorisé.",
  },
  {
    title: "5. Vos Droits (RGPD)",
    text: "Conformément au RGPD, vous disposez des droits suivants concernant vos données personnelles :",
    bullets: [
      "Droit d'accès : obtenir une copie de vos données.",
      "Droit de rectification : corriger des données inexactes.",
      "Droit à l'effacement : demander la suppression de vos données.",
      "Droit à la portabilité : recevoir vos données dans un format lisible.",
      "Droit d'opposition : vous opposer au traitement de vos données.",
    ],
    footer:
      "Pour exercer ces droits, contactez-nous à support@mmcgo-drivers.com.",
  },
  {
    title: "6. Conservation des Données",
    text: "Vos données sont conservées pendant la durée de votre abonnement actif, plus une période de 30 jours après la résiliation de votre compte, afin de vous permettre de le réactiver. À l'issue de cette période, toutes vos données personnelles sont définitivement supprimées.",
  },
  {
    title: "7. Cookies",
    text: "L'application mobile n'utilise pas de cookies. Le site web peut utiliser des cookies techniques strictement nécessaires à son fonctionnement. Aucun cookie de traçage publicitaire n'est utilisé.",
  },
  {
    title: "8. Contact",
    text: "Pour toute question relative à cette politique de confidentialité ou pour exercer vos droits, contactez notre délégué à la protection des données :",
    contact: {
      email: "support@mmcgo-drivers.com",
      company: "MMC Go Développement",
    },
  },
];

export default function PolitiqueDeConfidentialite() {
  return (
    <div>
      {/* Header */}
      <section className="hero-gradient text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-14 h-14 bg-green-500/30 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-green-300">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4l5 2.18V11c0 3.5-2.33 6.79-5 7.93-2.67-1.14-5-4.43-5-7.93V7.18L12 5z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-3">Politique de Confidentialité</h1>
          <p className="text-green-200">Date d&apos;entrée en vigueur : 15 mai 2024</p>
          <p className="text-green-100 mt-3 max-w-xl mx-auto">
            Chez MMC Go Drivers, nous accordons une importance primordiale à la protection
            de vos données personnelles.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-green max-w-none space-y-10">
            {sections.map((section) => (
              <div key={section.title} className="border-b border-green-100 pb-8 last:border-none">
                <h2 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-green-100 text-green-700 rounded-lg flex items-center justify-center text-sm font-bold shrink-0">
                    {section.title.split(".")[0]}
                  </span>
                  {section.title.split(". ")[1]}
                </h2>

                {"content" in section && section.content && (
                  <div className="space-y-4">
                    {section.content.map((item) => (
                      <div key={item.subtitle} className="bg-green-50 rounded-xl p-4">
                        <h3 className="font-semibold text-green-800 mb-1">{item.subtitle}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
                      </div>
                    ))}
                  </div>
                )}

                {"text" in section && section.text && !("content" in section) && (
                  <p className="text-gray-700 leading-relaxed mb-3">{section.text}</p>
                )}

                {"bullets" in section && section.bullets && (
                  <ul className="space-y-2 mt-3">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2 text-gray-700 text-sm">
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

                {"footer" in section && section.footer && (
                  <p className="text-gray-600 text-sm mt-4 bg-green-50 rounded-xl p-4">
                    {section.footer}
                  </p>
                )}

                {"contact" in section && section.contact && (
                  <div className="bg-green-50 rounded-xl p-4 mt-3">
                    <p className="text-gray-700 font-medium">{section.contact.company}</p>
                    <a
                      href={`mailto:${section.contact.email}`}
                      className="text-green-700 hover:text-green-600 transition-colors"
                    >
                      {section.contact.email}
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Data deletion CTA */}
          <div className="mt-12 bg-green-900 text-white rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold mb-2">Demande de suppression de données</h3>
            <p className="text-green-200 text-sm mb-5">
              Vous souhaitez supprimer votre compte et toutes vos données personnelles ?
            </p>
            <a
              href="mailto:support@mmcgo-drivers.com?subject=Demande%20de%20suppression%20de%20compte"
              className="inline-flex items-center gap-2 bg-green-400 hover:bg-green-300 text-green-950 font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              Envoyer une demande de suppression
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

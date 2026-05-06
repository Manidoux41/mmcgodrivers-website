"use client";

import { useState } from "react";
import Link from "next/link";

const CATEGORIES = [
  { id: "localisation", label: "Données de localisation et trajets enregistrés" },
  { id: "compte", label: "Informations du compte (nom, prénom, identifiants)" },
  { id: "vehicule", label: "Informations véhicule (immatriculation, dimensions, tonnage)" },
  { id: "documents", label: "Documents importés (permis, attestations)" },
  { id: "planning", label: "Planning et missions" },
];

export default function SuppressionDonneesPage() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [typeSuppression, setTypeSuppression] = useState<"partiel" | "total">("partiel");
  const [categories, setCategories] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function toggleCategory(id: string) {
    setCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    if (typeSuppression === "partiel" && categories.length === 0) {
      setErrorMsg("Veuillez sélectionner au moins une catégorie de données à supprimer.");
      return;
    }

    setStatus("loading");

    const res = await fetch("/api/suppression-donnees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nom,
        email,
        type_suppression: typeSuppression,
        categories: typeSuppression === "partiel" ? categories : [],
        message: message || null,
      }),
    });

    if (res.ok) {
      setStatus("success");
    } else {
      const data = await res.json();
      setErrorMsg(data.error ?? "Une erreur s'est produite. Réessayez plus tard.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-green-600">
              <path d="M9 16.2l-3.5-3.5-1.4 1.4L9 19 19 9l-1.4-1.4L9 16.2z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-green-900 mb-3">Demande enregistrée</h1>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            Votre demande de suppression de données a bien été reçue. Notre équipe la traitera
            dans un délai maximum de <strong>30 jours</strong>, conformément au RGPD.
            Un e-mail de confirmation vous sera envoyé à <strong>{email}</strong>.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <section className="hero-gradient text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-14 h-14 bg-green-500/30 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-green-300">
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-3">Suppression de mes données</h1>
          <p className="text-green-100 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
            Conformément au RGPD, vous pouvez demander la suppression de tout ou partie de vos
            données personnelles sans avoir à supprimer votre compte.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-2xl mx-auto">

          {/* RGPD notice */}
          <div className="bg-green-50 border border-green-200 rounded-2xl p-5 mb-8 flex gap-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-green-600 shrink-0 mt-0.5">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
            </svg>
            <div>
              <p className="text-green-900 font-semibold text-sm mb-1">Droit à l&apos;effacement (RGPD – Art. 17)</p>
              <p className="text-green-800 text-sm leading-relaxed">
                Votre demande sera traitée dans un délai de <strong>30 jours</strong>. La suppression
                partielle n&apos;affecte pas les autres données ni votre accès à l&apos;application.
                La suppression totale est irréversible.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Identity */}
            <div className="bg-white border border-green-100 rounded-2xl shadow-sm p-6 space-y-4">
              <h2 className="font-bold text-green-900 text-lg">Vos informations</h2>
              <div>
                <label htmlFor="nom" className="block text-sm font-semibold text-gray-700 mb-1">
                  Nom et prénom <span className="text-red-500">*</span>
                </label>
                <input
                  id="nom"
                  type="text"
                  required
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder="Jean Dupont"
                  maxLength={100}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                  Adresse e-mail du compte <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder="jean.dupont@exemple.fr"
                />
                <p className="text-xs text-gray-400 mt-1">
                  L&apos;adresse associée à votre compte MMC Go Drivers.
                </p>
              </div>
            </div>

            {/* Type of deletion */}
            <div className="bg-white border border-green-100 rounded-2xl shadow-sm p-6 space-y-4">
              <h2 className="font-bold text-green-900 text-lg">Type de suppression</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                    typeSuppression === "partiel"
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 bg-white hover:border-green-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="type"
                    value="partiel"
                    checked={typeSuppression === "partiel"}
                    onChange={() => setTypeSuppression("partiel")}
                    className="mt-0.5 accent-green-600"
                  />
                  <div>
                    <p className="font-semibold text-sm text-gray-900">Suppression partielle</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Je souhaite supprimer certaines catégories de données uniquement.
                    </p>
                  </div>
                </label>
                <label
                  className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                    typeSuppression === "total"
                      ? "border-red-400 bg-red-50"
                      : "border-gray-200 bg-white hover:border-red-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="type"
                    value="total"
                    checked={typeSuppression === "total"}
                    onChange={() => { setTypeSuppression("total"); setCategories([]); }}
                    className="mt-0.5 accent-red-500"
                  />
                  <div>
                    <p className="font-semibold text-sm text-gray-900">Suppression totale</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Je souhaite supprimer l&apos;ensemble de mes données personnelles.
                    </p>
                  </div>
                </label>
              </div>

              {typeSuppression === "total" && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex gap-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-red-500 shrink-0 mt-0.5">
                    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
                  </svg>
                  <p className="text-red-700 text-sm leading-relaxed">
                    La suppression totale est <strong>irréversible</strong>. Toutes vos données
                    (trajets, documents, planning) seront définitivement effacées. Votre compte
                    restera actif sauf demande explicite de résiliation.
                  </p>
                </div>
              )}
            </div>

            {/* Categories (partial only) */}
            {typeSuppression === "partiel" && (
              <div className="bg-white border border-green-100 rounded-2xl shadow-sm p-6 space-y-3">
                <h2 className="font-bold text-green-900 text-lg">
                  Catégories à supprimer <span className="text-red-500">*</span>
                </h2>
                <p className="text-sm text-gray-500">Sélectionnez les données que vous souhaitez supprimer.</p>
                <div className="space-y-2">
                  {CATEGORIES.map((cat) => (
                    <label
                      key={cat.id}
                      className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-colors ${
                        categories.includes(cat.id)
                          ? "border-green-400 bg-green-50"
                          : "border-gray-200 hover:border-green-200"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={categories.includes(cat.id)}
                        onChange={() => toggleCategory(cat.id)}
                        className="accent-green-600 w-4 h-4 shrink-0"
                      />
                      <span className="text-sm text-gray-800">{cat.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Optional message */}
            <div className="bg-white border border-green-100 rounded-2xl shadow-sm p-6 space-y-3">
              <h2 className="font-bold text-green-900 text-lg">Message complémentaire</h2>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                maxLength={1000}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
                placeholder="Précisez ici toute information utile pour traiter votre demande (facultatif)…"
              />
              <p className="text-xs text-gray-400 text-right">{message.length}/1000</p>
            </div>

            {/* Error */}
            {(status === "error" || errorMsg) && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                {errorMsg}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "loading"}
              className={`w-full font-semibold py-3.5 rounded-xl transition-colors text-sm ${
                typeSuppression === "total"
                  ? "bg-red-500 hover:bg-red-400 disabled:bg-red-300 text-white"
                  : "bg-green-600 hover:bg-green-500 disabled:bg-green-300 text-white"
              }`}
            >
              {status === "loading"
                ? "Envoi en cours…"
                : typeSuppression === "total"
                ? "Envoyer la demande de suppression totale"
                : "Envoyer la demande de suppression partielle"}
            </button>

            <p className="text-xs text-gray-400 text-center">
              En soumettant ce formulaire, vous exercez votre droit à l&apos;effacement
              prévu par le RGPD (Art. 17). Consultez notre{" "}
              <Link href="/politique-de-confidentialite" className="text-green-600 underline">
                politique de confidentialité
              </Link>
              .
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}

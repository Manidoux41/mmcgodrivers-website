"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function BetaModal({ onClose }: { onClose: () => void }) {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [vehicule, setVehicule] = useState("");
  const [plateforme, setPlateforme] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/beta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom, email, vehicule, plateforme, message }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Une erreur est survenue.");
        setStatus("error");
      } else {
        setStatus("success");
      }
    } catch {
      setErrorMsg("Impossible de contacter le serveur. Veuillez réessayer.");
      setStatus("error");
    }
  }

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="bg-linear-to-r from-green-800 to-green-700 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            aria-label="Fermer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-500/30 rounded-xl flex items-center justify-center">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-green-300">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold">Devenir Bêta Testeur</h2>
              <p className="text-green-200 text-sm">Accédez à MMC Go Drivers en avant-première</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {status === "success" ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-green-600">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-green-900 mb-2">Demande envoyée !</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Merci pour votre intérêt. Nous avons bien reçu votre demande et vous contacterons dès que la bêta sera disponible.
              </p>
              <button
                onClick={onClose}
                className="bg-green-700 hover:bg-green-600 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors"
              >
                Fermer
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-green-900 mb-1.5">
                  Nom complet <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  minLength={2}
                  maxLength={100}
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  placeholder="Jean Dupont"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-green-900 mb-1.5">
                  Adresse e-mail <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  maxLength={200}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jean@exemple.fr"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-green-900 mb-1.5">
                  Type de véhicule <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={vehicule}
                  onChange={(e) => setVehicule(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                >
                  <option value="" disabled>Sélectionner...</option>
                  <option value="Poids Lourd">Poids Lourd</option>
                  <option value="Bus / Car">Bus / Car</option>
                  <option value="Taxi / VTC">Taxi / VTC</option>
                  <option value="Véhicule léger professionnel">Véhicule léger professionnel</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-green-900 mb-1.5">
                  Plateforme mobile <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(["iOS", "Android"] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPlateforme(p)}
                      className={`flex items-center justify-center gap-2 border-2 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                        plateforme === p
                          ? "border-green-600 bg-green-50 text-green-800"
                          : "border-gray-200 bg-white text-gray-600 hover:border-green-300"
                      }`}
                    >
                      {p === "iOS" ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                        </svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.39.07 2.35.77 3.16.78.96-.03 1.87-.77 3.24-.77 1.67.07 2.85.73 3.43 2.05-3.1 1.88-2.62 6.55.76 7.88-.53.98-1.05 1.95-2.59 2.94zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                        </svg>
                      )}
                      {p}
                    </button>
                  ))}
                </div>
                {/* champ caché pour la validation native du formulaire */}
                <input type="text" required value={plateforme} readOnly className="sr-only" tabIndex={-1} aria-hidden />
              </div>

              <div>
                <label className="block text-sm font-semibold text-green-900 mb-1.5">
                  Message <span className="text-gray-400 font-normal">(optionnel)</span>
                </label>
                <textarea
                  maxLength={500}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Partagez vos attentes ou votre contexte professionnel..."
                  rows={3}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                />
              </div>

              {status === "error" && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-green-700 hover:bg-green-600 disabled:bg-green-300 text-white font-bold px-6 py-3 rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
              >
                {status === "loading" ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Envoi en cours...
                  </>
                ) : (
                  "Envoyer ma candidature"
                )}
              </button>

              <p className="text-center text-xs text-gray-400">
                Vos données ne seront utilisées que dans le cadre du programme bêta.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

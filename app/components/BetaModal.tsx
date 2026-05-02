"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function BetaModal({ onClose }: { onClose: () => void }) {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [vehicule, setVehicule] = useState("");
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
        body: JSON.stringify({ nom, email, vehicule, message }),
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

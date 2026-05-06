"use client";

import { useState } from "react";

export default function AvisForm() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [note, setNote] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (note === 0) {
      setErrorMsg("Veuillez sélectionner une note.");
      return;
    }
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/avis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom: nom.trim(), email: email.trim() || null, message: message.trim(), note }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error ?? "Une erreur est survenue.");
      } else {
        setStatus("success");
        setNom(""); setEmail(""); setMessage(""); setNote(0);
      }
    } catch {
      setStatus("error");
      setErrorMsg("Impossible de contacter le serveur. Réessayez plus tard.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-green-100 shadow-sm p-8 space-y-5">
      <h2 className="text-xl font-bold text-green-900 mb-1">Laisser un avis</h2>
      <p className="text-sm text-gray-500">Votre commentaire sera publié après validation par notre équipe.</p>

      {/* Note étoiles */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Note *</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setNote(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              className="transition-transform hover:scale-110"
              aria-label={`${star} étoile${star > 1 ? "s" : ""}`}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill={(hovered || note) >= star ? "#16a34a" : "none"}
                stroke={(hovered || note) >= star ? "#16a34a" : "#d1d5db"}
                strokeWidth="1.5"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* Nom */}
      <div>
        <label htmlFor="avis-nom" className="block text-sm font-semibold text-gray-700 mb-1">
          Nom / Prénom *
        </label>
        <input
          id="avis-nom"
          type="text"
          required
          minLength={2}
          maxLength={80}
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          placeholder="Jean Dupont"
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      {/* Email (optionnel) */}
      <div>
        <label htmlFor="avis-email" className="block text-sm font-semibold text-gray-700 mb-1">
          Email <span className="text-gray-400 font-normal">(optionnel, non affiché)</span>
        </label>
        <input
          id="avis-email"
          type="email"
          maxLength={200}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="jean@exemple.fr"
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="avis-message" className="block text-sm font-semibold text-gray-700 mb-1">
          Commentaire * <span className="text-gray-400 font-normal">(10 – 1000 caractères)</span>
        </label>
        <textarea
          id="avis-message"
          required
          minLength={10}
          maxLength={1000}
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Partagez votre expérience avec MMC Go Drivers…"
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
        />
        <p className="text-xs text-gray-400 text-right mt-1">{message.length}/1000</p>
      </div>

      {errorMsg && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">{errorMsg}</p>
      )}

      {status === "success" ? (
        <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-green-800 text-sm font-medium">
          ✅ Merci ! Votre avis a bien été envoyé et sera publié après validation.
        </div>
      ) : (
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-green-600 hover:bg-green-500 disabled:bg-green-300 text-white font-semibold py-3 rounded-xl transition-colors"
        >
          {status === "loading" ? "Envoi en cours…" : "Envoyer mon avis"}
        </button>
      )}
    </form>
  );
}

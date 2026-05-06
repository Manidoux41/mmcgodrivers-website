"use client";

import { useState } from "react";
import Link from "next/link";
import type { Commentaire } from "@/lib/supabase";

type Props = {
  initialCommentaires: Commentaire[];
};

const STATUT_LABELS: Record<Commentaire["statut"], string> = {
  en_attente: "En attente",
  approuve: "Approuvé",
  rejete: "Rejeté",
};

const STATUT_COLORS: Record<Commentaire["statut"], string> = {
  en_attente: "bg-yellow-100 text-yellow-800",
  approuve: "bg-green-100 text-green-800",
  rejete: "bg-red-100 text-red-800",
};

function StarRating({ note }: { note: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width="14" height="14" viewBox="0 0 24 24"
          fill={s <= note ? "#16a34a" : "none"}
          stroke={s <= note ? "#16a34a" : "#d1d5db"}
          strokeWidth="1.5">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function AdminAvisClient({ initialCommentaires }: Props) {
  const [commentaires, setCommentaires] = useState<Commentaire[]>(initialCommentaires);
  const [filter, setFilter] = useState<"tous" | Commentaire["statut"]>("tous");
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [toast, setToast] = useState("");

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  }

  async function updateStatut(id: string, statut: Commentaire["statut"]) {
    setLoadingId(id);
    const res = await fetch(`/api/admin/avis/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ statut }),
    });
    if (res.ok) {
      setCommentaires((prev) =>
        prev.map((c) => (c.id === id ? { ...c, statut } : c))
      );
      showToast("Statut mis à jour ✓");
    } else {
      showToast("Erreur lors de la mise à jour.");
    }
    setLoadingId(null);
  }

  async function deleteComment(id: string) {
    if (!confirm("Supprimer définitivement cet avis ?")) return;
    setLoadingId(id);
    const res = await fetch(`/api/admin/avis/${id}`, { method: "DELETE" });
    if (res.ok) {
      setCommentaires((prev) => prev.filter((c) => c.id !== id));
      showToast("Avis supprimé ✓");
    } else {
      showToast("Erreur lors de la suppression.");
    }
    setLoadingId(null);
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin";
  }

  const filtered =
    filter === "tous" ? commentaires : commentaires.filter((c) => c.statut === filter);

  const counts = {
    tous: commentaires.length,
    en_attente: commentaires.filter((c) => c.statut === "en_attente").length,
    approuve: commentaires.filter((c) => c.statut === "approuve").length,
    rejete: commentaires.filter((c) => c.statut === "rejete").length,
  };

  return (
    <div className="min-h-screen bg-green-50">
      {/* Toast */}
      {toast && (
        <div className="fixed top-20 right-4 z-50 bg-green-900 text-white text-sm px-5 py-3 rounded-xl shadow-lg transition-all">
          {toast}
        </div>
      )}

      {/* Header panel */}
      <div className="bg-green-900 text-white px-4 py-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Panneau Admin — Avis</h1>
            <p className="text-green-300 text-sm mt-0.5">Modération des commentaires utilisateurs</p>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5-5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
            </svg>
            Déconnexion
          </button>
        </div>
      </div>

      {/* Nav tabs */}
      <div className="bg-green-800 px-4">
        <div className="max-w-6xl mx-auto flex gap-1">
          <span className="px-5 py-3 text-sm font-medium text-white border-b-2 border-green-400">
            Avis utilisateurs
          </span>
          <Link
            href="/admin/suppressions"
            className="px-5 py-3 text-sm font-medium text-green-300 hover:text-white transition-colors"
          >
            Suppressions RGPD
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {(["tous", "en_attente", "approuve", "rejete"] as const).map((key) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`rounded-2xl p-4 text-left border-2 transition-all ${
                filter === key
                  ? "border-green-600 bg-white shadow-md"
                  : "border-transparent bg-white shadow-sm hover:border-green-200"
              }`}
            >
              <p className="text-2xl font-extrabold text-green-900">{counts[key]}</p>
              <p className="text-sm text-gray-500 mt-0.5 capitalize">
                {key === "tous" ? "Total" : STATUT_LABELS[key as Commentaire["statut"]]}
              </p>
            </button>
          ))}
        </div>

        {/* Table */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-green-100 p-12 text-center text-gray-400">
            Aucun avis dans cette catégorie.
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((c) => (
              <div key={c.id} className="bg-white rounded-2xl border border-green-100 shadow-sm p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <span className="font-semibold text-gray-900">{c.nom}</span>
                      {c.email && (
                        <span className="text-xs text-gray-400">{c.email}</span>
                      )}
                      <StarRating note={c.note} />
                      <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${STATUT_COLORS[c.statut]}`}>
                        {STATUT_LABELS[c.statut]}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(c.created_at).toLocaleDateString("fr-FR", {
                          day: "numeric", month: "long", year: "numeric",
                        })}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">{c.message}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    {c.statut !== "approuve" && (
                      <button
                        onClick={() => updateStatut(c.id, "approuve")}
                        disabled={loadingId === c.id}
                        className="flex items-center gap-1.5 bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white text-xs font-semibold px-3 py-2 rounded-xl transition-colors"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 16.2l-3.5-3.5-1.4 1.4L9 19 19 9l-1.4-1.4L9 16.2z" />
                        </svg>
                        Approuver
                      </button>
                    )}
                    {c.statut !== "rejete" && (
                      <button
                        onClick={() => updateStatut(c.id, "rejete")}
                        disabled={loadingId === c.id}
                        className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-white text-xs font-semibold px-3 py-2 rounded-xl transition-colors"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                        </svg>
                        Rejeter
                      </button>
                    )}
                    {c.statut === "en_attente" && (
                      <button
                        onClick={() => deleteComment(c.id)}
                        disabled={loadingId === c.id}
                        className="flex items-center gap-1.5 bg-red-500 hover:bg-red-400 disabled:opacity-50 text-white text-xs font-semibold px-3 py-2 rounded-xl transition-colors"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                        </svg>
                        Supprimer
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import type { DemandeSupp } from "@/lib/supabase";

type Props = {
  initialDemandes: DemandeSupp[];
};

const STATUT_LABELS: Record<DemandeSupp["statut"], string> = {
  en_attente: "En attente",
  traite: "Traité",
  rejete: "Rejeté",
};

const STATUT_COLORS: Record<DemandeSupp["statut"], string> = {
  en_attente: "bg-yellow-100 text-yellow-800",
  traite: "bg-green-100 text-green-800",
  rejete: "bg-red-100 text-red-800",
};

const CATEGORIES_LABELS: Record<string, string> = {
  localisation: "Localisation & trajets",
  compte: "Informations du compte",
  vehicule: "Informations véhicule",
  documents: "Documents importés",
  planning: "Planning & missions",
};

export default function AdminSuppressionsClient({ initialDemandes }: Props) {
  const [demandes, setDemandes] = useState<DemandeSupp[]>(initialDemandes);
  const [filter, setFilter] = useState<"tous" | DemandeSupp["statut"]>("tous");
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [toast, setToast] = useState("");

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  }

  async function updateStatut(id: string, statut: DemandeSupp["statut"]) {
    setLoadingId(id);
    const res = await fetch(`/api/admin/suppressions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ statut }),
    });
    if (res.ok) {
      setDemandes((prev) => prev.map((d) => (d.id === id ? { ...d, statut } : d)));
      showToast("Statut mis à jour ✓");
    } else {
      showToast("Erreur lors de la mise à jour.");
    }
    setLoadingId(null);
  }

  async function deleteDemande(id: string) {
    if (!confirm("Supprimer définitivement cette demande ?")) return;
    setLoadingId(id);
    const res = await fetch(`/api/admin/suppressions/${id}`, { method: "DELETE" });
    if (res.ok) {
      setDemandes((prev) => prev.filter((d) => d.id !== id));
      showToast("Demande supprimée ✓");
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
    filter === "tous" ? demandes : demandes.filter((d) => d.statut === filter);

  const counts = {
    tous: demandes.length,
    en_attente: demandes.filter((d) => d.statut === "en_attente").length,
    traite: demandes.filter((d) => d.statut === "traite").length,
    rejete: demandes.filter((d) => d.statut === "rejete").length,
  };

  return (
    <div className="min-h-screen bg-green-50">
      {/* Toast */}
      {toast && (
        <div className="fixed top-20 right-4 z-50 bg-green-900 text-white text-sm px-5 py-3 rounded-xl shadow-lg">
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="bg-green-900 text-white px-4 py-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Panneau Admin — Suppressions</h1>
            <p className="text-green-300 text-sm mt-0.5">Demandes de suppression de données (RGPD)</p>
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
          <Link
            href="/admin/avis"
            className="px-5 py-3 text-sm font-medium text-green-300 hover:text-white transition-colors"
          >
            Avis utilisateurs
          </Link>
          <span className="px-5 py-3 text-sm font-medium text-white border-b-2 border-green-400">
            Suppressions RGPD
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {(["tous", "en_attente", "traite", "rejete"] as const).map((key) => (
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
                {key === "tous" ? "Total" : STATUT_LABELS[key as DemandeSupp["statut"]]}
              </p>
            </button>
          ))}
        </div>

        {/* List */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-green-100 p-12 text-center text-gray-400">
            Aucune demande dans cette catégorie.
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((d) => (
              <div key={d.id} className="bg-white rounded-2xl border border-green-100 shadow-sm p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <span className="font-semibold text-gray-900">{d.nom}</span>
                      <a
                        href={`mailto:${d.email}`}
                        className="text-xs text-green-600 underline"
                      >
                        {d.email}
                      </a>
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                          d.type_suppression === "total"
                            ? "bg-red-100 text-red-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {d.type_suppression === "total" ? "Suppression TOTALE" : "Suppression partielle"}
                      </span>
                      <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${STATUT_COLORS[d.statut]}`}>
                        {STATUT_LABELS[d.statut]}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(d.created_at).toLocaleDateString("fr-FR", {
                          day: "numeric", month: "long", year: "numeric",
                        })}
                      </span>
                    </div>

                    {d.type_suppression === "partiel" && d.categories.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {d.categories.map((cat) => (
                          <span
                            key={cat}
                            className="bg-green-50 text-green-800 border border-green-200 text-xs px-2.5 py-1 rounded-full"
                          >
                            {CATEGORIES_LABELS[cat] ?? cat}
                          </span>
                        ))}
                      </div>
                    )}

                    {d.message && (
                      <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 rounded-xl px-4 py-3">
                        {d.message}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0 flex-wrap">
                    {d.statut !== "traite" && (
                      <button
                        onClick={() => updateStatut(d.id, "traite")}
                        disabled={loadingId === d.id}
                        className="flex items-center gap-1.5 bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white text-xs font-semibold px-3 py-2 rounded-xl transition-colors"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 16.2l-3.5-3.5-1.4 1.4L9 19 19 9l-1.4-1.4L9 16.2z" />
                        </svg>
                        Marquer traité
                      </button>
                    )}
                    {d.statut !== "rejete" && (
                      <button
                        onClick={() => updateStatut(d.id, "rejete")}
                        disabled={loadingId === d.id}
                        className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-white text-xs font-semibold px-3 py-2 rounded-xl transition-colors"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                        </svg>
                        Rejeter
                      </button>
                    )}
                    <button
                      onClick={() => deleteDemande(d.id)}
                      disabled={loadingId === d.id}
                      className="flex items-center gap-1.5 bg-red-500 hover:bg-red-400 disabled:opacity-50 text-white text-xs font-semibold px-3 py-2 rounded-xl transition-colors"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z" />
                      </svg>
                      Supprimer
                    </button>
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

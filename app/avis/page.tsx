import { supabase, type Commentaire } from "@/lib/supabase";
import AvisForm from "@/app/components/AvisForm";

export const revalidate = 60; // Revalide toutes les 60 secondes

function StarRating({ note }: { note: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${note} étoiles sur 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} width="16" height="16" viewBox="0 0 24 24"
          fill={star <= note ? "#16a34a" : "none"}
          stroke={star <= note ? "#16a34a" : "#d1d5db"}
          strokeWidth="1.5">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function AvisPage() {
  const { data: avis, error } = await supabase
    .from("commentaires")
    .select("id, nom, message, note, created_at")
    .eq("statut", "approuve")
    .order("created_at", { ascending: false });

  const commentaires = (error ? [] : avis) as Pick<Commentaire, "id" | "nom" | "message" | "note" | "created_at">[];

  const moyenneNote =
    commentaires.length > 0
      ? (commentaires.reduce((sum, c) => sum + c.note, 0) / commentaires.length).toFixed(1)
      : null;

  return (
    <div>
      {/* Header */}
      <section className="hero-gradient text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Avis & Témoignages</h1>
          <p className="text-green-100 text-lg max-w-2xl mx-auto">
            Découvrez ce que nos utilisateurs pensent de MMC Go Drivers et partagez votre expérience.
          </p>
          {moyenneNote && (
            <div className="mt-6 inline-flex items-center gap-3 bg-white/10 backdrop-blur rounded-2xl px-6 py-3">
              <span className="text-3xl font-extrabold">{moyenneNote}</span>
              <div>
                <StarRating note={Math.round(parseFloat(moyenneNote))} />
                <p className="text-green-200 text-xs mt-0.5">
                  basé sur {commentaires.length} avis{commentaires.length > 1 ? "" : ""}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Formulaire */}
        <div className="lg:col-span-1">
          <AvisForm />
        </div>

        {/* Liste des avis */}
        <div className="lg:col-span-2 space-y-6">
          {commentaires.length === 0 ? (
            <div className="bg-green-50 border border-green-100 rounded-2xl p-10 text-center text-gray-500">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor"
                className="text-green-200 mx-auto mb-4">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
              </svg>
              <p className="font-medium text-green-800 mb-1">Aucun avis publié pour l&apos;instant.</p>
              <p className="text-sm">Soyez le premier à partager votre expérience !</p>
            </div>
          ) : (
            commentaires.map((c) => (
              <div key={c.id} className="bg-white border border-green-100 rounded-2xl p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 text-green-800 font-bold flex items-center justify-center text-lg shrink-0">
                      {c.nom.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{c.nom}</p>
                      <p className="text-xs text-gray-400">{formatDate(c.created_at)}</p>
                    </div>
                  </div>
                  <StarRating note={c.note} />
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{c.message}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

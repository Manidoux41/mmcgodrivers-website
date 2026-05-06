import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://jcoabqiqtuizbfjcpyrz.supabase.co",
  "sb_publishable_a2zphvfZnBIutLp513Yr7Q_QiLtP0nx"
);

const comments = [
  {
    nom: "Thomas Renard",
    email: null,
    message:
      "Enfin une appli pensée pour les chauffeurs poids lourds ! La navigation gabarit m'a évité plusieurs tunnels interdits. Je recommande vivement à tous mes collègues.",
    note: 5,
    statut: "approuve",
  },
  {
    nom: "Sylvie Marchand",
    email: null,
    message:
      "Très pratique pour gérer mon planning de taxi. Les alertes RSE en temps réel me permettent de rester en conformité sans stress. Interface claire et intuitive.",
    note: 5,
    statut: "approuve",
  },
  {
    nom: "Karim Benhaddou",
    email: null,
    message:
      "J'utilise le forfait Professionnel pour ma petite flotte de 3 véhicules. La gestion des documents et les feuilles de route PDF me font gagner un temps précieux chaque semaine.",
    note: 4,
    statut: "approuve",
  },
  {
    nom: "Christophe Lefèvre",
    email: null,
    message:
      "Application complète pour un conducteur indépendant comme moi. L'export GPX de mes trajets est top pour la comptabilité. Quelques petits bugs à corriger mais le support est réactif.",
    note: 4,
    statut: "approuve",
  },
  {
    nom: "Nadia Fournier",
    email: null,
    message:
      "Responsable d'exploitation pour une société de transport en commun. Le tableau de bord flotte nous a permis d'optimiser nos tournées. Très bon rapport qualité/prix sur le forfait Diamant.",
    note: 5,
    statut: "approuve",
  },
  {
    nom: "Julien Moreau",
    email: null,
    message:
      "Bonne application, la navigation adaptée au gabarit du bus est efficace. J'aurais aimé plus d'options pour les plans de la RATP mais dans l'ensemble je suis satisfait.",
    note: 4,
    statut: "approuve",
  },
];

const { data, error } = await supabase.from("commentaires").insert(comments).select("id");

if (error) {
  console.error("Erreur lors de l'insertion :", error.message);
  process.exit(1);
}

console.log(`✅ ${data.length} commentaires insérés avec succès.`);

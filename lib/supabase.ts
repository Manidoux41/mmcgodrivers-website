import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Commentaire = {
  id: string;
  nom: string;
  email: string | null;
  message: string;
  note: number;
  statut: "en_attente" | "approuve" | "rejete";
  created_at: string;
};

export type DemandeSupp = {
  id: string;
  nom: string;
  email: string;
  type_suppression: "partiel" | "total";
  categories: string[];
  message: string | null;
  statut: "en_attente" | "traite" | "rejete";
  created_at: string;
};

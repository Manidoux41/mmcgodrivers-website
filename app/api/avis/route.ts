import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("commentaires")
    .select("id, nom, message, note, created_at")
    .eq("statut", "approuve")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: "Erreur lors de la récupération des avis." }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Corps de requête invalide." }, { status: 400 });
  }

  const { nom, email, message, note } = body as Record<string, unknown>;

  if (!nom || typeof nom !== "string" || nom.trim().length < 2 || nom.trim().length > 80) {
    return NextResponse.json({ error: "Le nom doit contenir entre 2 et 80 caractères." }, { status: 400 });
  }
  if (email !== null && email !== undefined && email !== "") {
    if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Adresse e-mail invalide." }, { status: 400 });
    }
  }
  if (!message || typeof message !== "string" || message.trim().length < 10 || message.trim().length > 1000) {
    return NextResponse.json({ error: "Le commentaire doit contenir entre 10 et 1000 caractères." }, { status: 400 });
  }
  if (!note || typeof note !== "number" || !Number.isInteger(note) || note < 1 || note > 5) {
    return NextResponse.json({ error: "La note doit être un entier entre 1 et 5." }, { status: 400 });
  }

  const { error } = await supabase.from("commentaires").insert({
    nom: nom.trim(),
    email: email ? String(email).trim() : null,
    message: message.trim(),
    note,
    statut: "en_attente",
  });

  if (error) {
    return NextResponse.json({ error: "Impossible d'enregistrer votre avis. Réessayez plus tard." }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 201 });
}

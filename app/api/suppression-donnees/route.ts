import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const CATEGORIES_VALIDES = [
  "localisation",
  "compte",
  "vehicule",
  "documents",
  "planning",
];

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Corps de requête invalide." }, { status: 400 });
  }

  const { nom, email, type_suppression, categories, message } = body as Record<string, unknown>;

  if (!nom || typeof nom !== "string" || nom.trim().length < 2 || nom.trim().length > 100) {
    return NextResponse.json({ error: "Le nom doit contenir entre 2 et 100 caractères." }, { status: 400 });
  }

  if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return NextResponse.json({ error: "Adresse e-mail invalide." }, { status: 400 });
  }

  if (type_suppression !== "partiel" && type_suppression !== "total") {
    return NextResponse.json({ error: "Type de suppression invalide." }, { status: 400 });
  }

  if (type_suppression === "partiel") {
    if (!Array.isArray(categories) || categories.length === 0) {
      return NextResponse.json(
        { error: "Veuillez sélectionner au moins une catégorie de données." },
        { status: 400 }
      );
    }
    const invalidCats = (categories as unknown[]).filter(
      (c) => typeof c !== "string" || !CATEGORIES_VALIDES.includes(c)
    );
    if (invalidCats.length > 0) {
      return NextResponse.json({ error: "Catégorie invalide." }, { status: 400 });
    }
  }

  if (message !== null && message !== undefined && message !== "") {
    if (typeof message !== "string" || message.trim().length > 1000) {
      return NextResponse.json(
        { error: "Le message ne peut pas dépasser 1000 caractères." },
        { status: 400 }
      );
    }
  }

  const { error } = await supabase.from("demandes_suppression").insert({
    nom: nom.trim(),
    email: email.trim().toLowerCase(),
    type_suppression,
    categories: type_suppression === "partiel" ? categories : [],
    message: message ? String(message).trim() : null,
    statut: "en_attente",
  });

  if (error) {
    return NextResponse.json(
      { error: "Impossible d'enregistrer votre demande. Réessayez plus tard." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true }, { status: 201 });
}

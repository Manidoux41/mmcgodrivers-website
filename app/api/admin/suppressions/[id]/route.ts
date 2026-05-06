import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "crypto";
import { supabase } from "@/lib/supabase";

function isAdminAuthenticated(req: NextRequest): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminSecret = process.env.ADMIN_SECRET;
  if (!adminPassword || !adminSecret) return false;

  const expectedToken = createHmac("sha256", adminSecret).update(adminPassword).digest("hex");
  const cookie = req.cookies.get("mmcgo_admin_sess");
  return cookie?.value === expectedToken;
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdminAuthenticated(req)) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await params;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Corps de requête invalide." }, { status: 400 });
  }

  const { statut } = body as Record<string, unknown>;

  if (!statut || !["traite", "rejete", "en_attente"].includes(statut as string)) {
    return NextResponse.json({ error: "Statut invalide." }, { status: 400 });
  }

  const { error } = await supabase
    .from("demandes_suppression")
    .update({ statut })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: "Erreur lors de la mise à jour." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdminAuthenticated(req)) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await params;

  const { error } = await supabase
    .from("demandes_suppression")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: "Erreur lors de la suppression." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

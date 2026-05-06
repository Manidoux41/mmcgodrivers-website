import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";

function buildToken(password: string, secret: string) {
  return createHmac("sha256", secret).update(password).digest("hex");
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Corps de requête invalide." }, { status: 400 });
  }

  const { password } = body as Record<string, unknown>;

  if (!password || typeof password !== "string") {
    return NextResponse.json({ error: "Mot de passe manquant." }, { status: 400 });
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminSecret = process.env.ADMIN_SECRET;

  if (!adminPassword || !adminSecret) {
    return NextResponse.json({ error: "Configuration serveur manquante." }, { status: 500 });
  }

  const expected = buildToken(adminPassword, adminSecret);
  const provided = buildToken(password, adminSecret);

  // Comparaison en temps constant pour éviter les attaques temporelles
  const expectedBuf = Buffer.from(expected, "hex");
  const providedBuf = Buffer.from(provided, "hex");
  const match =
    expectedBuf.length === providedBuf.length &&
    timingSafeEqual(expectedBuf, providedBuf);

  if (!match) {
    return NextResponse.json({ error: "Mot de passe incorrect." }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set("mmcgo_admin_sess", expected, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 heures
  });
  return response;
}

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Corps de requête invalide." }, { status: 400 });
  }

  const { nom, email, vehicule, plateforme, message } = body as Record<string, string>;

  if (!nom || typeof nom !== "string" || nom.trim().length < 2) {
    return NextResponse.json({ error: "Nom invalide." }, { status: 400 });
  }
  if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Adresse e-mail invalide." }, { status: 400 });
  }
  if (!vehicule || typeof vehicule !== "string") {
    return NextResponse.json({ error: "Type de véhicule manquant." }, { status: 400 });
  }
  if (!plateforme || !(["iOS", "Android"] as string[]).includes(plateforme)) {
    return NextResponse.json({ error: "Plateforme invalide." }, { status: 400 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const htmlContent = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #f0fdf4; border-radius: 12px; overflow: hidden;">
      <div style="background: #14532d; color: white; padding: 24px 32px;">
        <h1 style="margin: 0; font-size: 22px;">🚀 Nouvelle demande bêta testeur</h1>
        <p style="margin: 6px 0 0; color: #bbf7d0; font-size: 14px;">MMC Go Drivers</p>
      </div>
      <div style="padding: 32px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; color: #166534; font-weight: bold; width: 160px;">Nom complet</td>
            <td style="padding: 10px 0; color: #1a1a1a;">${escapeHtml(nom.trim())}</td>
          </tr>
          <tr style="border-top: 1px solid #dcfce7;">
            <td style="padding: 10px 0; color: #166534; font-weight: bold;">Email</td>
            <td style="padding: 10px 0; color: #1a1a1a;"><a href="mailto:${escapeHtml(email.trim())}" style="color: #16a34a;">${escapeHtml(email.trim())}</a></td>
          </tr>
          <tr style="border-top: 1px solid #dcfce7;">
            <td style="padding: 10px 0; color: #166534; font-weight: bold;">Type de véhicule</td>
            <td style="padding: 10px 0; color: #1a1a1a;">${escapeHtml(vehicule)}</td>
          </tr>
          <tr style="border-top: 1px solid #dcfce7;">
            <td style="padding: 10px 0; color: #166534; font-weight: bold;">Plateforme</td>
            <td style="padding: 10px 0; color: #1a1a1a;">${escapeHtml(plateforme)}</td>
          </tr>
          ${message ? `
          <tr style="border-top: 1px solid #dcfce7;">
            <td style="padding: 10px 0; color: #166534; font-weight: bold; vertical-align: top;">Message</td>
            <td style="padding: 10px 0; color: #1a1a1a;">${escapeHtml(message.trim())}</td>
          </tr>` : ""}
        </table>
      </div>
      <div style="background: #dcfce7; padding: 16px 32px; font-size: 12px; color: #166534;">
        Demande reçue le ${new Date().toLocaleDateString("fr-FR", { dateStyle: "full" })} à ${new Date().toLocaleTimeString("fr-FR", { timeStyle: "short" })}
      </div>
    </div>
  `;

  try {
    const toEmail = process.env.RESEND_TO_EMAIL;
    if (!toEmail) {
      console.error("RESEND_TO_EMAIL non défini");
      return NextResponse.json(
        { error: "Impossible d'envoyer l'email. Veuillez réessayer plus tard." },
        { status: 500 }
      );
    }

    const { error } = await resend.emails.send({
      from: "MMC Go Drivers <onboarding@resend.dev>",
      to: toEmail,
      subject: `[Bêta Testeur] ${nom.trim()} souhaite rejoindre le programme`,
      html: htmlContent,
      replyTo: email.trim(),
    });

    if (error) {
      console.error("Erreur Resend (détail):", JSON.stringify(error));
      return NextResponse.json(
        { error: "Impossible d'envoyer l'email. Veuillez réessayer plus tard." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Erreur envoi email:", err);
    return NextResponse.json(
      { error: "Impossible d'envoyer l'email. Veuillez réessayer plus tard." },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

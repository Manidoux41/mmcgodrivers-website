import { cookies } from "next/headers";
import { createHmac } from "crypto";
import { redirect } from "next/navigation";
import { supabase, type Commentaire } from "@/lib/supabase";
import AdminAvisClient from "./AdminAvisClient";

async function isAdmin(): Promise<boolean> {
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminSecret = process.env.ADMIN_SECRET;
  if (!adminPassword || !adminSecret) return false;

  const expectedToken = createHmac("sha256", adminSecret).update(adminPassword).digest("hex");
  const cookieStore = await cookies();
  const cookie = cookieStore.get("mmcgo_admin_sess");
  return cookie?.value === expectedToken;
}

export default async function AdminAvisPage() {
  const authenticated = await isAdmin();
  if (!authenticated) {
    redirect("/admin");
  }

  const { data, error } = await supabase
    .from("commentaires")
    .select("*")
    .order("created_at", { ascending: false });

  const commentaires: Commentaire[] = error ? [] : (data as Commentaire[]);

  return <AdminAvisClient initialCommentaires={commentaires} />;
}

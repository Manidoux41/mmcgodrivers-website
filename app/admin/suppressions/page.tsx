import { cookies } from "next/headers";
import { createHmac } from "crypto";
import { redirect } from "next/navigation";
import { supabase, type DemandeSupp } from "@/lib/supabase";
import AdminSuppressionsClient from "./AdminSuppressionsClient";

async function isAdmin(): Promise<boolean> {
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminSecret = process.env.ADMIN_SECRET;
  if (!adminPassword || !adminSecret) return false;

  const expectedToken = createHmac("sha256", adminSecret).update(adminPassword).digest("hex");
  const cookieStore = await cookies();
  const cookie = cookieStore.get("mmcgo_admin_sess");
  return cookie?.value === expectedToken;
}

export default async function AdminSuppressionsPage() {
  const authenticated = await isAdmin();
  if (!authenticated) {
    redirect("/admin");
  }

  const { data, error } = await supabase
    .from("demandes_suppression")
    .select("*")
    .order("created_at", { ascending: false });

  const demandes: DemandeSupp[] = error ? [] : (data as DemandeSupp[]);

  return <AdminSuppressionsClient initialDemandes={demandes} />;
}

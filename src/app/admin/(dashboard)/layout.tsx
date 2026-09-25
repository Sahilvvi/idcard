import { redirect } from "next/navigation";
import { Sidebar } from "@/components/admin/Sidebar";
import { getCurrentProfile } from "@/lib/cms";
import { supabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  if (!supabaseConfigured) redirect("/admin/login");
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  const profile = await getCurrentProfile();
  if (!profile) redirect("/admin/no-access");

  const { count } = await supabase.from("idm_leads").select("id", { count: "exact", head: true }).eq("status", "new");

  return (
    <div className="flex min-h-dvh flex-col bg-surface lg:flex-row">
      <Sidebar email={profile.email} name={profile.full_name} newLeads={count ?? 0} />
      <div className="relative flex-1 overflow-x-hidden">
        <div aria-hidden className="bg-grid-light pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,#000_10%,transparent_60%)]" />
        <div className="relative mx-auto w-full max-w-[1200px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">{children}</div>
      </div>
    </div>
  );
}

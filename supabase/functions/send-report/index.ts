// Sends a bar report to the bar's own email address (Setup → Bar email) through Resend.
// Only signed-in logins of that bar can use it. Needs the RESEND_API_KEY secret;
// MAIL_FROM is optional (defaults to Resend's test sender, which can only mail the Resend account's own address).
import { createClient } from "jsr:@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (o: unknown, status = 200) =>
  new Response(JSON.stringify(o), { status, headers: { ...cors, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  try {
    const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: req.headers.get("Authorization") ?? "" } },
    });
    const { bar, subject, text, html, probe } = await req.json();
    const { data: role } = await sb.rpc("bar_role", { p_bar: bar });
    if (!role) return json({ ok: false, error: "no access" }, 403);
    const key = Deno.env.get("RESEND_API_KEY");
    if (!key) return json({ ok: false, error: "email service not set up" });
    if (probe) return json({ ok: true });
    const { data: st } = await sb.from("bar_docs").select("data").eq("bar_id", bar).eq("path", "settings").maybeSingle();
    const to = st?.data?.email;
    if (!to) return json({ ok: false, error: "no bar email in Setup" });
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: Deno.env.get("MAIL_FROM") ?? "Bar Counter <onboarding@resend.dev>",
        to: [to],
        subject: String(subject ?? "Bar report").slice(0, 200),
        text: String(text ?? ""),
        html: String(html ?? ""),
      }),
    });
    const out = await r.json().catch(() => ({}));
    if (!r.ok) return json({ ok: false, error: out?.message ?? "send failed" });
    return json({ ok: true, id: out.id });
  } catch (e) {
    return json({ ok: false, error: String(e) }, 500);
  }
});

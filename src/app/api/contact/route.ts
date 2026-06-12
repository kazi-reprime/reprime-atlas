import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(160),
  firm: z.string().max(160).optional().default(""),
  role: z.string().max(160).optional().default(""),
  message: z.string().max(2000).optional().default(""),
});

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const LEAD_INBOX_EMAIL = process.env.LEAD_INBOX_EMAIL;

export async function POST(req: Request) {
  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  const p = parsed.data;

  if (!RESEND_API_KEY || !LEAD_INBOX_EMAIL) {
    console.warn("[contact] RESEND env not set — accepting submission and logging only", { from: p.email });
    return NextResponse.json({ ok: true, mode: "log-only" });
  }

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "RePrime Terminal <terminal@reprime-atlas.vercel.app>",
        to: [LEAD_INBOX_EMAIL],
        reply_to: p.email,
        subject: `Terminal access request — ${p.firm || p.name}`,
        text: [
          `Name:    ${p.name}`,
          `Email:   ${p.email}`,
          `Firm:    ${p.firm || "—"}`,
          `Role:    ${p.role || "—"}`,
          "",
          "Message:",
          p.message || "(none)",
        ].join("\n"),
      }),
    });
    if (!r.ok) {
      const t = await r.text();
      console.error("[contact] Resend error", r.status, t);
      return NextResponse.json({ error: "Delivery failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[contact] Resend exception", e);
    return NextResponse.json({ error: "Delivery failed" }, { status: 502 });
  }
}

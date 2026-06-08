"use client";
import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErr(null);
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      firm: String(fd.get("firm") ?? ""),
      role: String(fd.get("role") ?? ""),
      message: String(fd.get("message") ?? ""),
    };
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) {
        setErr(j.error ?? "Submission failed");
        setStatus("err");
        return;
      }
      setStatus("ok");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Network error");
      setStatus("err");
    }
  }

  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <div className="text-xs uppercase tracking-wider text-orange">Access</div>
        <h1 className="mt-2 font-display text-5xl font-medium tracking-tight">Request access.</h1>
        <p className="mt-4 max-w-xl text-slate-700">
          Tell us a little about your firm and what you&apos;d use the Atlas for. We&apos;ll respond within two business days.
        </p>

        {status === "ok" ? (
          <div className="mt-10 rounded-lg border border-emerald-200 bg-emerald-50/60 p-6">
            <CheckCircle2 className="text-emerald-600" />
            <div className="mt-2 font-display text-xl font-medium">Thanks — we received your request.</div>
            <p className="mt-1 text-sm text-slate-700">We&apos;ll respond by email within two business days.</p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-10 grid gap-5 md:grid-cols-2">
            <Field name="name" label="Name" required />
            <Field name="email" label="Work email" type="email" required />
            <Field name="firm" label="Firm" />
            <Field name="role" label="Role" />
            <div className="md:col-span-2">
              <label className="text-xs uppercase tracking-wider text-slate-500" htmlFor="message">What would you use Atlas for?</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="mt-1.5 w-full rounded-lg border border-border bg-paper px-3 py-2.5 text-sm outline-none transition focus:border-orange focus:ring-2 focus:ring-orange/20"
                placeholder="A market thesis, a deal screen, a coverage gap…"
              />
            </div>
            {err && <div className="md:col-span-2 rounded bg-rose-50 px-3 py-2 text-xs text-rose-700">{err}</div>}
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition hover:bg-navy disabled:opacity-50"
              >
                {status === "sending" ? "Sending…" : "Request access"}
                <Send size={14} />
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

function Field({ name, label, type = "text", required = false }: { name: string; label: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-wider text-slate-500" htmlFor={name}>{label}{required && <span className="text-orange"> *</span>}</label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-1.5 w-full rounded-lg border border-border bg-paper px-3 py-2.5 text-sm outline-none transition focus:border-orange focus:ring-2 focus:ring-orange/20"
      />
    </div>
  );
}

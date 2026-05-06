"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const services = [
  "Construction",
  "Project Management",
  "Architecture",
  "Consultancy",
  "Facility Management",
  "Other",
];

const budgets = [
  "Under ₦5 million",
  "₦5m – ₦20m",
  "₦20m – ₦50m",
  "₦50m – ₦100m",
  "Over ₦100 million",
  "Prefer not to say",
];

type Status = "idle" | "loading" | "success" | "error";

interface FormState {
  name: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
}

const defaultForm: FormState = {
  name: "",
  email: "",
  phone: "",
  service: "",
  budget: "",
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(defaultForm);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.message) return;

    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      setForm(defaultForm);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <CheckCircle className="h-14 w-14 text-brand-orange" />
        <h3 className="font-condensed text-2xl font-black uppercase text-brand-charcoal">
          Message Received!
        </h3>
        <p className="max-w-sm text-sm text-brand-text-muted">
          Thank you for reaching out. Our team will get back to you within 24
          business hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-xs font-bold uppercase tracking-widest text-brand-orange underline underline-offset-4 hover:no-underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Name + Phone */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-brand-charcoal"
          >
            Full Name <span className="text-brand-orange">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="John Adeyemi"
            className="w-full border border-brand-gray-mid bg-white px-4 py-3.5 text-sm text-brand-charcoal placeholder:text-brand-gray-dark focus:border-brand-orange focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-brand-charcoal"
          >
            Phone Number <span className="text-brand-orange">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            value={form.phone}
            onChange={handleChange}
            placeholder="+234 800 000 0000"
            className="w-full border border-brand-gray-mid bg-white px-4 py-3.5 text-sm text-brand-charcoal placeholder:text-brand-gray-dark focus:border-brand-orange focus:outline-none"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-brand-charcoal"
        >
          Email Address <span className="text-brand-orange">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          placeholder="john@example.com"
          className="w-full border border-brand-gray-mid bg-white px-4 py-3.5 text-sm text-brand-charcoal placeholder:text-brand-gray-dark focus:border-brand-orange focus:outline-none"
        />
      </div>

      {/* Service + Budget */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="service"
            className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-brand-charcoal"
          >
            Service Interested In
          </label>
          <select
            id="service"
            name="service"
            value={form.service}
            onChange={handleChange}
            className="w-full border border-brand-gray-mid bg-white px-4 py-3.5 text-sm text-brand-charcoal focus:border-brand-orange focus:outline-none"
          >
            <option value="">Select a service</option>
            {services.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="budget"
            className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-brand-charcoal"
          >
            Estimated Budget
          </label>
          <select
            id="budget"
            name="budget"
            value={form.budget}
            onChange={handleChange}
            className="w-full border border-brand-gray-mid bg-white px-4 py-3.5 text-sm text-brand-charcoal focus:border-brand-orange focus:outline-none"
          >
            <option value="">Select budget range</option>
            {budgets.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-brand-charcoal"
        >
          Project Details <span className="text-brand-orange">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us about your project — location, size, timeline, and any specific requirements..."
          className="w-full resize-none border border-brand-gray-mid bg-white px-4 py-3.5 text-sm text-brand-charcoal placeholder:text-brand-gray-dark focus:border-brand-orange focus:outline-none"
        />
      </div>

      {/* Error */}
      {status === "error" && (
        <div className="flex items-center gap-2 text-sm text-red-600">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Send Enquiry
          </>
        )}
      </button>

      <p className="text-center text-xs text-brand-gray-dark">
        We typically respond within 24 business hours.
      </p>
    </form>
  );
}

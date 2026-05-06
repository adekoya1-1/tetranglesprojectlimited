import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { ContactForm } from "@/components/public/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { buildWhatsAppUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Tetrangles Projects Limited. Submit a project enquiry, call us, or chat directly on WhatsApp for a free consultation.",
};

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "+2348058358897";

export default function ContactPage() {
  const whatsappUrl = buildWhatsAppUrl(
    WHATSAPP,
    "Hello Tetrangles! I'd like to discuss a project. Can we talk?"
  );

  return (
    <>
      {/* ── Page Hero ── */}
      <section className="relative flex min-h-[45vh] items-end overflow-hidden bg-brand-charcoal pb-16 pt-32">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute bottom-0 left-0 h-1 w-1/4 bg-brand-orange" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>
        <div className="container-custom relative z-10">
          <p className="section-label">Get In Touch</p>
          <h1 className="section-title-light mt-2">Contact Us</h1>
          <p className="mt-4 max-w-xl text-lg text-white/50">
            Ready to start your project? Let&apos;s talk. Our team responds
            within 24 business hours.
          </p>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid items-start gap-16 lg:grid-cols-5">
            {/* Form — takes 3 cols */}
            <Reveal direction="left" className="lg:col-span-3">
              <p className="section-label">Send an Enquiry</p>
              <h2 className="section-title mt-2">Tell Us About Your Project</h2>
              <p className="mt-4 text-base text-brand-text-muted">
                Fill in the form below and one of our project advisors will get
                back to you shortly.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </Reveal>

            {/* Contact info sidebar — takes 2 cols */}
            <Reveal direction="right" delay={0.15} className="lg:col-span-2">
              {/* WhatsApp card */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 bg-[#25D366] p-7 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center bg-white/20">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-8 w-8 fill-white"
                    aria-hidden
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <p className="font-condensed text-xl font-black uppercase text-white">
                    Chat on WhatsApp
                  </p>
                  <p className="mt-0.5 text-sm text-white/80">
                    Fastest way to reach us — usually reply within the hour.
                  </p>
                </div>
              </a>

              {/* Contact details */}
              <div className="mt-6 space-y-5 border border-brand-gray-mid p-7">
                <h3 className="font-condensed text-lg font-bold uppercase text-brand-charcoal">
                  Contact Information
                </h3>

                <div className="flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-brand-orange/10">
                    <Phone className="h-4 w-4 text-brand-orange" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-brand-text-muted">
                      Phone
                    </p>
                    <a
                      href="tel:+2348058358897"
                      className="mt-0.5 block text-sm font-semibold text-brand-charcoal hover:text-brand-orange"
                    >
                      +234 805 835 8897
                    </a>
                    <a
                      href="tel:+2347018566447"
                      className="block text-sm font-semibold text-brand-charcoal hover:text-brand-orange"
                    >
                      +234 701 856 6447
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-brand-orange/10">
                    <Mail className="h-4 w-4 text-brand-orange" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-brand-text-muted">
                      Email
                    </p>
                    <a
                      href="mailto:tetrangleprojects@gmail.com"
                      className="mt-0.5 block text-sm font-semibold text-brand-charcoal hover:text-brand-orange"
                    >
                      tetrangleprojects@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-brand-orange/10">
                    <MapPin className="h-4 w-4 text-brand-orange" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-brand-text-muted">
                      Office
                    </p>
                    <address className="mt-0.5 text-sm not-italic text-brand-charcoal">
                      8A, Road 26, Ikota Villa Estate
                      <br />
                      Lagos, Nigeria
                    </address>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-brand-orange/10">
                    <Clock className="h-4 w-4 text-brand-orange" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-brand-text-muted">
                      Office Hours
                    </p>
                    <p className="mt-0.5 text-sm text-brand-charcoal">
                      Monday – Friday: 8am – 6pm
                      <br />
                      Saturday: 9am – 2pm
                    </p>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="mt-6 border border-brand-gray-mid p-7">
                <h3 className="font-condensed text-sm font-bold uppercase tracking-widest text-brand-text-muted">
                  Follow Us
                </h3>
                <div className="mt-4 flex gap-3">
                  <a
                    href="https://www.instagram.com/tetranglesprojectlimited"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center border border-brand-gray-mid text-brand-text-muted transition-all hover:border-brand-orange hover:bg-brand-orange hover:text-white"
                    aria-label="Instagram"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.facebook.com/Tetranglez"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center border border-brand-gray-mid text-brand-text-muted transition-all hover:border-brand-orange hover:bg-brand-orange hover:text-white"
                    aria-label="Facebook"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Map embed ── */}
      <section className="h-80 w-full bg-brand-gray">
        <iframe
          title="Tetrangles Projects Limited — Ikota Villa Estate, Lagos"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.7291706027143!2d3.552259!3d6.461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf6c0b1c7c4e7%3A0x0!2sIkota%20Villa%20Estate%2C%20Lagos!5e0!3m2!1sen!2sng!4v1620000000000!5m2!1sen!2sng"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </>
  );
}

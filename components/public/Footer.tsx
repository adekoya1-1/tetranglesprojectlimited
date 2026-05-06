import Link from "next/link";
import { Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";

const services = [
  { label: "Construction", href: "/services/construction" },
  { label: "Project Management", href: "/services/project-management" },
  { label: "Architecture", href: "/services/architecture" },
  { label: "Consultancy", href: "/services/consultancy" },
  { label: "Facility Management", href: "/services/facility-management" },
];

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Projects", href: "/projects" },
  { label: "Meet the Team", href: "/team" },
  { label: "Contact Us", href: "/contact" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-charcoal text-white">
      {/* Top CTA strip */}
      <div className="bg-brand-orange">
        <div className="container-custom py-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div>
              <p className="font-condensed text-2xl font-black uppercase text-white">
                Ready to Build Something Great?
              </p>
              <p className="text-sm text-white/80">
                Talk to our team today and get a free project consultation.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center gap-2 bg-white px-8 py-4 text-xs font-bold uppercase tracking-widest text-brand-orange transition-all duration-200 hover:bg-brand-charcoal hover:text-white"
            >
              Start Your Project
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <Link href="/" className="mb-6 inline-flex items-center gap-3">
              <div className="flex gap-0.5">
                <span className="block h-7 w-1.5 bg-brand-orange" />
                <span className="block h-7 w-1.5 bg-brand-orange opacity-65" />
                <span className="block h-7 w-1.5 bg-brand-orange opacity-30" />
              </div>
              <div>
                <span className="block font-condensed text-xl font-black uppercase leading-none tracking-tight text-white">
                  TETRANGLES
                </span>
                <span className="block text-[9px] uppercase tracking-[0.25em] text-white/40">
                  Projects Limited
                </span>
              </div>
            </Link>

            <p className="mb-4 text-sm italic text-brand-orange">
              ...Citadel Of Contemporary
            </p>
            <p className="text-sm leading-relaxed text-white/50">
              Nigeria&apos;s premier construction and real estate company.
              Delivering impeccable quality and exquisite results since 2010.
            </p>

            {/* Social links */}
            <div className="mt-6 flex gap-3">
              <a
                href="https://www.instagram.com/tetranglesprojectlimited"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="flex h-10 w-10 items-center justify-center bg-white/5 text-white/50 transition-all duration-200 hover:bg-brand-orange hover:text-white"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://www.facebook.com/Tetranglez"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
                className="flex h-10 w-10 items-center justify-center bg-white/5 text-white/50 transition-all duration-200 hover:bg-brand-orange hover:text-white"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-6 text-xs font-bold uppercase tracking-widest text-white/40">
              Our Services
            </h3>
            <ul className="space-y-3">
              {services.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group flex items-center gap-2 text-sm text-white/60 transition-colors duration-200 hover:text-brand-orange"
                  >
                    <span className="text-brand-orange opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      /
                    </span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-xs font-bold uppercase tracking-widest text-white/40">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group flex items-center gap-2 text-sm text-white/60 transition-colors duration-200 hover:text-brand-orange"
                  >
                    <span className="text-brand-orange opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      /
                    </span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-6 text-xs font-bold uppercase tracking-widest text-white/40">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+2348058358897"
                  className="flex items-start gap-3 text-sm text-white/60 transition-colors duration-200 hover:text-white"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                  <div>
                    <span className="block">+234 805 835 8897</span>
                    <span className="block">+234 701 856 6447</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="mailto:tetrangleprojects@gmail.com"
                  className="flex items-start gap-3 text-sm text-white/60 transition-colors duration-200 hover:text-white"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                  tetrangleprojects@gmail.com
                </a>
              </li>
              <li>
                <address className="flex items-start gap-3 text-sm not-italic text-white/60">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                  8A, Road 26, Ikota Villa Estate, Lagos, Nigeria
                </address>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="container-custom flex flex-col items-center justify-between gap-3 py-6 sm:flex-row">
          <p className="text-xs text-white/30">
            © {currentYear} Tetrangles Projects Limited. All rights reserved.
          </p>
          <p className="text-xs text-white/20">
            RC No. Incorporated 2014 · Lagos, Nigeria
          </p>
        </div>
      </div>
    </footer>
  );
}

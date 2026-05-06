"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-300",
          isScrolled
            ? "bg-brand-charcoal/95 shadow-lg backdrop-blur-md"
            : "bg-transparent"
        )}
      >
        <div className="container-custom">
          <div className="flex h-18 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="group flex items-center"
              aria-label="Tetrangles Projects Limited — Home"
            >
              <Image
                src="/logos.jpeg"
                alt="Tetrangles Projects Limited"
                width={140}
                height={56}
                className="h-14 w-auto object-contain transition-opacity duration-200 group-hover:opacity-80"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav
              className="hidden items-center gap-1 lg:flex"
              aria-label="Main navigation"
            >
              {navLinks.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "relative px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-colors duration-200",
                    isActive(href)
                      ? "text-brand-orange"
                      : "text-white/70 hover:text-white"
                  )}
                >
                  {label}
                  {isActive(href) && (
                    <span className="absolute bottom-0 left-4 right-4 h-px bg-brand-orange" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden items-center gap-4 lg:flex">
              <a
                href="tel:+2348058358897"
                className="flex items-center gap-2 text-xs font-semibold text-white/60 transition-colors hover:text-white"
                aria-label="Call us"
              >
                <Phone className="h-3.5 w-3.5" />
                +234 805 835 8897
              </a>
              <Link href="/contact" className="btn-primary py-3 text-xs">
                Get a Quote
              </Link>
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMenuOpen((v) => !v)}
              className="flex items-center justify-center rounded-none p-2 text-white transition-colors hover:text-brand-orange lg:hidden"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div
          id="mobile-menu"
          className={cn(
            "overflow-hidden transition-all duration-300 ease-in-out lg:hidden",
            isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          )}
          aria-hidden={!isMenuOpen}
        >
          <div className="bg-brand-charcoal/98 backdrop-blur-md">
            <nav
              className="container-custom flex flex-col py-4"
              aria-label="Mobile navigation"
            >
              {navLinks.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex items-center justify-between border-b border-white/5 py-4 text-sm font-semibold uppercase tracking-widest transition-colors duration-200",
                    isActive(href)
                      ? "text-brand-orange"
                      : "text-white/70 hover:text-white"
                  )}
                >
                  {label}
                  {isActive(href) && (
                    <span className="text-xs text-brand-orange">///</span>
                  )}
                </Link>
              ))}

              {/* Mobile CTA */}
              <div className="mt-6 space-y-3 pb-4">
                <a
                  href="tel:+2348058358897"
                  className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4" />
                  +234 805 835 8897
                </a>
                <Link href="/contact" className="btn-primary w-full text-xs">
                  Get a Free Quote
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}

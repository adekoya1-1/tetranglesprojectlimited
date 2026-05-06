import Link from "next/link";
import {
  Building2,
  ClipboardList,
  Compass,
  Lightbulb,
  Wrench,
  ArrowRight,
  type LucideProps,
} from "lucide-react";
import type { ServiceData } from "@/lib/data/services";
import type { FC } from "react";

const iconMap: Record<ServiceData["iconName"], FC<LucideProps>> = {
  Building2,
  ClipboardList,
  Compass,
  Lightbulb,
  Wrench,
};

interface ServiceCardProps {
  service: ServiceData;
  variant?: "default" | "compact";
}

export function ServiceCard({ service, variant = "default" }: ServiceCardProps) {
  const Icon = iconMap[service.iconName];

  if (variant === "compact") {
    return (
      <Link
        href={`/services/${service.slug}`}
        className="group flex items-start gap-4 border border-brand-gray-mid bg-white p-6 transition-all duration-300 hover:border-brand-orange hover:shadow-card"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-brand-orange/10 transition-colors duration-200 group-hover:bg-brand-orange">
          <Icon className="h-5 w-5 text-brand-orange transition-colors duration-200 group-hover:text-white" />
        </div>
        <div>
          <h3 className="font-condensed text-lg font-bold uppercase text-brand-charcoal transition-colors duration-200 group-hover:text-brand-orange">
            {service.title}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-brand-text-muted">
            {service.shortDesc}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <div className="group flex flex-col border border-brand-gray-mid bg-white transition-all duration-300 hover:border-brand-orange hover:shadow-card-hover">
      {/* Orange top accent */}
      <div className="h-1 w-0 bg-brand-orange transition-all duration-500 group-hover:w-full" />

      <div className="flex flex-1 flex-col p-8">
        {/* Icon */}
        <div className="mb-6 flex h-14 w-14 items-center justify-center bg-brand-orange/10 transition-colors duration-300 group-hover:bg-brand-orange">
          <Icon className="h-7 w-7 text-brand-orange transition-colors duration-300 group-hover:text-white" />
        </div>

        {/* Content */}
        <h3 className="font-condensed text-2xl font-black uppercase text-brand-charcoal">
          {service.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-text-muted">
          {service.shortDesc}
        </p>

        {/* Features */}
        <ul className="mt-5 space-y-1.5">
          {service.features.slice(0, 3).map((f) => (
            <li key={f} className="flex items-center gap-2 text-xs text-brand-text-muted">
              <span className="h-1 w-3 bg-brand-orange" />
              {f}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          href={`/services/${service.slug}`}
          className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-orange transition-all duration-200 hover:gap-4"
        >
          Learn More
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}

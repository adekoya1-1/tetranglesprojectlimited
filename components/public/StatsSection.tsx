"use client";

import { useEffect, useRef } from "react";
import { useInView, animate } from "framer-motion";

interface Stat {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

const stats: Stat[] = [
  {
    value: 15,
    suffix: "+",
    label: "Years Experience",
    description: "Delivering excellence since 2010",
  },
  {
    value: 50,
    suffix: "+",
    label: "Projects Completed",
    description: "Across Nigeria and Africa",
  },
  {
    value: 5,
    suffix: "",
    label: "Core Services",
    description: "End-to-end construction and real estate solutions",
  },
  {
    value: 100,
    suffix: "%",
    label: "Quality Assured",
    description: "Uncompromising standards on every project",
  },
];

function AnimatedNumber({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    const controls = animate(0, to, {
      duration: 2,
      ease: "easeOut",
      onUpdate(v) {
        el.textContent = Math.round(v).toString();
      },
    });
    return () => controls.stop();
  }, [inView, to]);

  return <span ref={ref}>0</span>;
}

export function StatsSection() {
  return (
    <section className="bg-brand-orange">
      <div className="container-custom py-16 md:py-20">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map(({ value, suffix, label, description }) => (
            <div key={label} className="text-center">
              <p className="font-condensed text-5xl font-black text-white md:text-6xl">
                <AnimatedNumber to={value} suffix={suffix} />
                {suffix}
              </p>
              <p className="mt-2 text-sm font-bold uppercase tracking-widest text-white">
                {label}
              </p>
              <p className="mt-1 text-xs text-white/70">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

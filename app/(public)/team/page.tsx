import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { db } from "@/lib/db";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the experienced professionals behind Tetrangles Projects Limited.",
};

export const revalidate = 60;

async function getTeam() {
  return db.teamMember.findMany({
    where: { isActive: true },
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });
}

export default async function TeamPage() {
  const members = await getTeam();

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-end overflow-hidden bg-brand-charcoal pb-16 pt-32">
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
          <p className="section-label">Our People</p>
          <h1 className="section-title-light mt-2 max-w-xl">Meet the Team</h1>
          <p className="mt-4 max-w-lg text-lg text-white/50">
            The professionals driving every Tetrangles project from concept to
            handover.
          </p>
        </div>
      </section>

      {/* Team grid */}
      <section className="section-padding bg-brand-gray">
        <div className="container-custom">
          {members.length === 0 ? (
            <Reveal>
              <div className="mx-auto max-w-xl py-16 text-center">
                <p className="font-condensed text-2xl font-black uppercase text-brand-charcoal">
                  Team profiles coming soon
                </p>
                <p className="mt-3 text-base text-brand-text-muted">
                  We're preparing full team profiles — check back shortly.
                </p>
                <Link href="/contact" className="btn-primary mt-8">
                  Contact Us
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          ) : (
            <>
              <Reveal>
                <p className="section-label">The People Behind the Work</p>
                <h2 className="section-title mt-2">
                  Our <span className="text-brand-orange">Experts</span>
                </h2>
                <p className="mt-4 max-w-xl text-base text-brand-text-muted">
                  A multidisciplinary team of engineers, architects, managers,
                  and consultants united by one standard — excellence.
                </p>
              </Reveal>

              <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {members.map((member, i) => (
                  <Reveal key={member.id} delay={i * 0.06}>
                    <div className="group bg-white shadow-sm transition-shadow hover:shadow-md">
                      {/* Photo */}
                      <div className="relative aspect-[4/3] overflow-hidden bg-brand-charcoal">
                        {member.imageUrl ? (
                          <Image
                            src={member.imageUrl}
                            alt={member.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <span className="font-condensed text-6xl font-black text-white/20">
                              {member.name[0]}
                            </span>
                          </div>
                        )}
                        {/* Orange accent bar */}
                        <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-brand-orange transition-all duration-300 group-hover:w-full" />
                      </div>

                      {/* Info */}
                      <div className="p-5">
                        <p className="font-condensed text-lg font-bold uppercase leading-tight text-brand-charcoal">
                          {member.name}
                        </p>
                        <p className="mt-0.5 text-xs font-semibold uppercase tracking-widest text-brand-orange">
                          {member.role}
                        </p>
                        {member.bio && (
                          <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-brand-text-muted">
                            {member.bio}
                          </p>
                        )}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-charcoal">
        <div className="container-custom py-14">
          <Reveal>
            <div className="flex flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
              <div>
                <h2 className="font-condensed text-3xl font-black uppercase text-white md:text-4xl">
                  Work with Our Team
                </h2>
                <p className="mt-2 text-base text-white/50">
                  Discuss your project with our experts — no obligation.
                </p>
              </div>
              <Link
                href="/contact"
                className="shrink-0 inline-flex items-center gap-2 bg-brand-orange px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90"
              >
                Get in Touch
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

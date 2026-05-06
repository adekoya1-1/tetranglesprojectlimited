import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ─── Admin User ────────────────────────────────────────────────────────────
  const hashedPassword = await bcrypt.hash("Admin@Tetrangles2024!", 12);

  const admin = await prisma.admin.upsert({
    where: { email: "admin@tetrangles.com.ng" },
    update: {},
    create: {
      email: "admin@tetrangles.com.ng",
      password: hashedPassword,
      name: "Tetrangles Admin",
    },
  });

  console.log(`✅ Admin created: ${admin.email}`);

  // ─── Site Settings ─────────────────────────────────────────────────────────
  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      whatsappNumber: "+2348058358897",
      phone2: "+2347018566447",
      email: "tetrangleprojects@gmail.com",
      address: "8A, Road 26, Ikota Villa Estate, Lagos",
      instagram: "@tetranglesprojectlimited",
      facebook: "Tetranglez project limited",
    },
  });

  console.log("✅ Site settings seeded");

  // ─── Services ──────────────────────────────────────────────────────────────
  const services = [
    {
      title: "Construction",
      slug: "construction",
      description:
        "High-rise, low-rise residential and commercial buildings, roads, canals and drainages.",
      longDesc:
        "We pride ourselves in our vast experience in the construction and real estate industry where we have constructed both high-rise, low-rise residential and commercial buildings, roads, canal and drainages.",
      icon: "building-2",
      order: 1,
    },
    {
      title: "Project Management",
      slug: "project-management",
      description:
        "Planning all phases of construction lifecycle from initiation to completion.",
      longDesc:
        "We help plan all the phases of construction lifecycle, from initiation to completion, obtain all needed permits, and ensure that projects align with agreed plans and construction practices.",
      icon: "clipboard-list",
      order: 2,
    },
    {
      title: "Architecture",
      slug: "architecture",
      description:
        "Licensed professionals equipped with experience to plan and design state-of-the-art structures.",
      longDesc:
        "Licensed professionals equipped with experience to plan and design. Oversee construction of clients cutting edge facilities. State of the art homes and structures.",
      icon: "drafting-compass",
      order: 3,
    },
    {
      title: "Consultancy",
      slug: "consultancy",
      description:
        "Value-adding advisory services leveraging deep insight and leading-edge expertise.",
      longDesc:
        "We provide value adding consultancy and advisory services by leveraging on our deep insight, leading edge expertise and broad range of capabilities in the construction and real estate industry.",
      icon: "briefcase",
      order: 4,
    },
    {
      title: "Facility Management",
      slug: "facility-management",
      description:
        "Responsive facility maintenance, equipment management and cleanliness standards.",
      longDesc:
        "Quick response to unexpected and arising issues like electrical faults and plumbing leaks. Efficiently managing routine of equipment and infrastructure to improve asset lifespan.",
      icon: "settings",
      order: 5,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: { ...service, updatedAt: new Date() },
    });
  }

  console.log(`✅ ${services.length} services seeded`);

  // ─── Team Members ──────────────────────────────────────────────────────────
  const team = [
    { name: "Adekoya Olawale N.", role: "Chief Executive Officer", order: 1 },
    { name: "Adesanya OluSegun", role: "General Manager", order: 2 },
    { name: "Bldr Olanigan A. Olaiwola", role: "Project Manager", order: 3 },
    { name: "Adekoya Olumayowa", role: "Operations Manager", order: 4 },
    { name: "Obaowo Olufemi Babajide", role: "Architect", order: 5 },
    {
      name: "Engr Onanibosi Onayemi Segun",
      role: "Structural Engineer",
      order: 6,
    },
    { name: "Folorunsho Samuel Ayo", role: "Site Supervisor", order: 7 },
    { name: "Idris Opeyemi. A", role: "Facility Manager", order: 8 },
    { name: "Alani Jumoke", role: "HR Personnel", order: 9 },
    { name: "Adekoya Precious. A", role: "Secretary", order: 10 },
  ];

  for (const member of team) {
    const existing = await prisma.teamMember.findFirst({
      where: { name: member.name },
    });
    if (!existing) {
      await prisma.teamMember.create({ data: member });
    }
  }

  console.log(`✅ ${team.length} team members seeded`);

  // ─── Projects ──────────────────────────────────────────────────────────────
  const projects = [
    {
      title: "Luxury 5-Bedroom Duplex",
      slug: "luxury-5-bedroom-duplex-lekki",
      description:
        "A premium 5-bedroom duplex with contemporary finishes, smart-home automation, and resort-style landscaping in one of Lekki's most sought-after addresses. The project delivered 650sqm of living space across two floors, featuring Italian marble floors, a private swimming pool, and a fully detached Boys' Quarters.",
      category: "RESIDENTIAL" as const,
      client: "Private Client",
      location: "Lekki Phase 1, Lagos",
      year: "2023",
      features: [
        "5 bedrooms all ensuite",
        "Private swimming pool",
        "Smart home automation",
        "1,200sqm landscaped compound",
        "3-car covered garage",
        "Fully detached Boys' Quarters",
        "Diesel generator + solar backup",
      ],
      featured: true,
      published: true,
      order: 1,
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80&auto=format&fit=crop",
            publicId: "seed/project-1-1",
            alt: "Luxury duplex exterior — Lekki Phase 1",
            isPrimary: true,
            order: 1,
          },
          {
            url: "https://images.unsplash.com/photo-1582407947304-fd86f28320c4?w=1200&q=80&auto=format&fit=crop",
            publicId: "seed/project-1-2",
            alt: "Swimming pool and rear garden",
            isPrimary: false,
            order: 2,
          },
        ],
      },
    },
    {
      title: "4-Bedroom Terrace Houses",
      slug: "4-bedroom-terrace-chevron-lekki",
      description:
        "A gated development of three 4-bedroom terrace houses with contemporary architecture and high-spec finishes. Each unit features ensuite bedrooms, a fitted kitchen, and a private rear garden. The estate includes shared infrastructure — perimeter fence, gatehouse, and paved access road.",
      category: "RESIDENTIAL" as const,
      client: "Private Developer",
      location: "Chevron Drive, Lekki, Lagos",
      year: "2022",
      features: [
        "3 units in gated estate",
        "4 bedrooms all ensuite",
        "Fitted kitchen with island",
        "Private rear garden per unit",
        "Perimeter fence + gatehouse",
        "Paved access road",
        "Pre-paid electricity metering",
      ],
      featured: true,
      published: true,
      order: 2,
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80&auto=format&fit=crop",
            publicId: "seed/project-2-1",
            alt: "Terrace houses exterior — Chevron Drive Lekki",
            isPrimary: true,
            order: 1,
          },
        ],
      },
    },
    {
      title: "6-Unit Apartment Block",
      slug: "6-unit-apartment-amuwo-odofin",
      description:
        "A six-storey residential apartment block comprising six 3-bedroom units. The project included piling works, reinforced concrete frame, block-work, and full internal and external finishes. Standout features include a rooftop terrace, dedicated car park, and a fully equipped gym.",
      category: "RESIDENTIAL" as const,
      client: "Private Investor",
      location: "Amuwo Odofin, Lagos",
      year: "2021",
      features: [
        "6 units, 3 bedrooms each",
        "Rooftop terrace",
        "Dedicated car park (2 spaces per unit)",
        "Fully equipped communal gym",
        "300KVA generator",
        "Water treatment plant",
        "CCTV security system",
      ],
      featured: false,
      published: true,
      order: 3,
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80&auto=format&fit=crop",
            publicId: "seed/project-3-1",
            alt: "6-unit apartment block — Amuwo Odofin",
            isPrimary: true,
            order: 1,
          },
        ],
      },
    },
    {
      title: "3-Bedroom Luxury Bungalow",
      slug: "3-bedroom-bungalow-sangotedo",
      description:
        "A detached 3-bedroom bungalow with a contemporary low-rise design, set on a 650sqm plot in Sangotedo. The project emphasised energy efficiency, incorporating solar panels, rainwater harvesting, and premium-grade insulation. Extensive landscaping includes a paved driveway, gazebo, and ornamental garden.",
      category: "RESIDENTIAL" as const,
      client: "Private Client",
      location: "Sangotedo, Ajah, Lagos",
      year: "2020",
      features: [
        "3 bedrooms all ensuite",
        "Solar power system (5kW)",
        "Rainwater harvesting tank",
        "Gazebo and ornamental garden",
        "Paved driveway",
        "Fitted wardrobes throughout",
        "Granite worktops and imported tiles",
      ],
      featured: false,
      published: true,
      order: 4,
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=1200&q=80&auto=format&fit=crop",
            publicId: "seed/project-4-1",
            alt: "Luxury bungalow — Sangotedo Ajah",
            isPrimary: true,
            order: 1,
          },
        ],
      },
    },
    {
      title: "Commercial Office Complex",
      slug: "commercial-office-complex-victoria-island",
      description:
        "A six-storey commercial office complex providing 2,400sqm of Grade-A lettable space on Victoria Island. The project included deep-strip foundations, a reinforced concrete frame, curtain-wall glazing, and full MEP fit-out. Amenities include a rooftop plant room, dedicated generator yard, and 30-space underground car park.",
      category: "COMMERCIAL" as const,
      client: "Corporate Client",
      location: "Victoria Island, Lagos",
      year: "2023",
      features: [
        "6 storeys, 2,400sqm GFA",
        "Curtain-wall glazing facade",
        "30-space underground car park",
        "500KVA standby generator",
        "Central air conditioning (VRF system)",
        "High-speed fibre infrastructure",
        "Rooftop plant room",
      ],
      featured: true,
      published: true,
      order: 5,
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80&auto=format&fit=crop",
            publicId: "seed/project-5-1",
            alt: "Commercial office complex — Victoria Island Lagos",
            isPrimary: true,
            order: 1,
          },
          {
            url: "https://images.unsplash.com/photo-1517581177520-b31fbecec3c8?w=1200&q=80&auto=format&fit=crop",
            publicId: "seed/project-5-2",
            alt: "Office interior fit-out",
            isPrimary: false,
            order: 2,
          },
        ],
      },
    },
    {
      title: "Silvergate Shopping Plaza",
      slug: "silvergate-shopping-plaza-ajah",
      description:
        "A 24-unit retail shopping plaza on a 1.2-hectare site along the Ajah Expressway. The two-storey development houses anchor tenants, a food court, and ancillary retail units. Tetrangles managed the full scope from substructure through to shop-front fit-outs and external landscaping.",
      category: "COMMERCIAL" as const,
      client: "Silvergate Properties Ltd",
      location: "Ajah Expressway, Lagos",
      year: "2021",
      features: [
        "24 retail units across 2 floors",
        "Dedicated food court (8 units)",
        "120-space surface car park",
        "Façade cladding and feature signage",
        "Centralised security control room",
        "Loading bay and service road",
        "LED external lighting",
      ],
      featured: false,
      published: true,
      order: 6,
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1555636222-cae831e670b3?w=1200&q=80&auto=format&fit=crop",
            publicId: "seed/project-6-1",
            alt: "Silvergate Shopping Plaza — Ajah Expressway",
            isPrimary: true,
            order: 1,
          },
        ],
      },
    },
    {
      title: "Corporate Headquarters Building",
      slug: "corporate-headquarters-lagos-island",
      description:
        "A four-storey corporate headquarters for a financial services firm on Lagos Island. The project comprised demolition of an existing structure, deep-raft foundation, RC-frame construction, and full interior fit-out to Grade-A specification. Highlights include a double-height reception, executive boardrooms, and a rooftop terrace.",
      category: "COMMERCIAL" as const,
      client: "Financial Services Company",
      location: "Lagos Island, Lagos",
      year: "2022",
      features: [
        "4 storeys, 1,800sqm GFA",
        "Double-height reception atrium",
        "Executive boardrooms (x3)",
        "Rooftop terrace and garden",
        "Data centre room",
        "Biometric access control",
        "Backup generator + UPS",
      ],
      featured: true,
      published: true,
      order: 7,
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80&auto=format&fit=crop",
            publicId: "seed/project-7-1",
            alt: "Corporate headquarters — Lagos Island",
            isPrimary: true,
            order: 1,
          },
        ],
      },
    },
    {
      title: "Ikorodu Road Rehabilitation",
      slug: "ikorodu-road-rehabilitation",
      description:
        "Rehabilitation and reconstruction of 3.2km of arterial road including sub-base preparation, concrete carriageway, kerb stones, and roadside drainage channels. The project also included installation of solar-powered street lighting at 50m intervals and road markings.",
      category: "INFRASTRUCTURE" as const,
      client: "Lagos State Government",
      location: "Ikorodu, Lagos",
      year: "2022",
      features: [
        "3.2km concrete carriageway",
        "Roadside drainage channels",
        "Solar-powered street lighting (64 poles)",
        "Road markings and signage",
        "Pedestrian walkways",
        "Speed breakers at junctions",
        "Contractor-managed traffic diversion",
      ],
      featured: true,
      published: true,
      order: 8,
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1503174971373-b1f69850bded?w=1200&q=80&auto=format&fit=crop",
            publicId: "seed/project-8-1",
            alt: "Road rehabilitation works — Ikorodu Lagos",
            isPrimary: true,
            order: 1,
          },
        ],
      },
    },
    {
      title: "Estate Road Network",
      slug: "estate-road-network-lekki-phase-2",
      description:
        "Design and construction of an internal road network for a 200-plot residential estate in Lekki Phase 2. Works included subgrade preparation, laterite compaction, hardcore base course, and 150mm concrete surfacing with expansion joints. Drainage sumps and manholes were installed throughout.",
      category: "INFRASTRUCTURE" as const,
      client: "Private Estate Developer",
      location: "Lekki Phase 2, Lagos",
      year: "2020",
      features: [
        "4.8km internal road network",
        "Concrete carriageway 150mm thick",
        "Storm drainage system",
        "Landscaped central reservations",
        "Estate boundary road",
        "Directional signage",
        "Street light conduit installation",
      ],
      featured: false,
      published: true,
      order: 9,
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=1200&q=80&auto=format&fit=crop",
            publicId: "seed/project-9-1",
            alt: "Estate road network — Lekki Phase 2",
            isPrimary: true,
            order: 1,
          },
        ],
      },
    },
    {
      title: "Canal & Drainage Rehabilitation",
      slug: "canal-drainage-rehabilitation-ikorodu",
      description:
        "Rehabilitation of 1.5km of open canal and associated drainage infrastructure in Ikorodu to alleviate annual flooding. Works included canal de-silting, concrete lining, retaining wall construction, and installation of trash screens at inlet points.",
      category: "INFRASTRUCTURE" as const,
      client: "Ikorodu Local Government",
      location: "Ikorodu, Lagos",
      year: "2021",
      features: [
        "1.5km canal rehabilitation",
        "Concrete canal lining",
        "Retaining walls both sides",
        "Trash screens at inlets",
        "Access road along canal",
        "Flood discharge modelling",
        "Post-works monitoring for 12 months",
      ],
      featured: false,
      published: true,
      order: 10,
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80&auto=format&fit=crop",
            publicId: "seed/project-10-1",
            alt: "Canal rehabilitation works — Ikorodu",
            isPrimary: true,
            order: 1,
          },
        ],
      },
    },
    {
      title: "Ikota Villa Estate — Facility Management",
      slug: "ikota-villa-estate-facility-management",
      description:
        "Ongoing facility management contract for a 150-unit gated residential estate in Ikota, covering planned preventive maintenance of all common-area infrastructure, security services, cleaning, landscaping, and emergency reactive works.",
      category: "FACILITY_MANAGEMENT" as const,
      client: "Ikota Villa Estate Management",
      location: "Ikota, Lagos",
      year: "2022",
      features: [
        "150-unit estate managed",
        "24/7 security services",
        "Planned preventive maintenance",
        "Common area cleaning daily",
        "Landscaping and lawn management",
        "Generator and electrical servicing",
        "Residents helpdesk",
      ],
      featured: false,
      published: true,
      order: 11,
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80&auto=format&fit=crop",
            publicId: "seed/project-11-1",
            alt: "Ikota Villa Estate — Facility Management",
            isPrimary: true,
            order: 1,
          },
        ],
      },
    },
    {
      title: "Graceland Courts — Real Estate Development",
      slug: "graceland-courts-ajah",
      description:
        "A 12-plot real estate development along the Ajah Expressway. Tetrangles provided full development management: land acquisition advisory, infrastructure installation (roads, drainage, electricity, borehole), title documentation, and plot-by-plot sales management. All 12 plots were sold within 6 months of launch.",
      category: "REAL_ESTATE" as const,
      client: "Graceland Properties Ltd",
      location: "Ajah Expressway, Lagos",
      year: "2023",
      features: [
        "12 residential plots (500–800sqm each)",
        "Concrete estate access road",
        "Underground drainage",
        "Communal borehole and water tank",
        "Electricity infrastructure",
        "Perimeter fence and gate",
        "Certificate of Occupancy per plot",
      ],
      featured: true,
      published: true,
      order: 12,
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1473177104440-ac22892422e5?w=1200&q=80&auto=format&fit=crop",
            publicId: "seed/project-12-1",
            alt: "Graceland Courts real estate development — Ajah",
            isPrimary: true,
            order: 1,
          },
        ],
      },
    },
  ];

  for (const { images, ...projectData } of projects) {
    const existing = await prisma.project.findUnique({
      where: { slug: projectData.slug },
    });
    if (!existing) {
      await prisma.project.create({ data: { ...projectData, images } });
    }
  }

  console.log(`✅ ${projects.length} projects seeded`);

  console.log("\n🎉 Database seeded successfully!");
  console.log("─────────────────────────────────");
  console.log("Admin email:    admin@tetrangles.com.ng");
  console.log("Admin password: Admin@Tetrangles2024!");
  console.log("─────────────────────────────────");
  console.log("⚠️  Change the admin password after first login!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export interface ServiceProcess {
  step: string;
  title: string;
  desc: string;
}

export interface ServiceData {
  slug: string;
  title: string;
  iconName: "Building2" | "ClipboardList" | "Compass" | "Lightbulb" | "Wrench";
  shortDesc: string;
  longDesc: string;
  features: string[];
  process: ServiceProcess[];
}

export const servicesData: ServiceData[] = [
  {
    slug: "construction",
    title: "Construction",
    iconName: "Building2",
    shortDesc:
      "From foundation to finishing — residential, commercial, and infrastructure projects delivered to the highest standards.",
    longDesc:
      "Tetrangles Projects Limited brings over 15 years of construction expertise to every project. Our skilled workforce and rigorous quality management systems ensure that every structure we build meets and exceeds industry standards. From luxury residential developments in Lekki to commercial complexes across Lagos, we deliver projects on time, within budget, and to specification.",
    features: [
      "Residential buildings & luxury homes",
      "Commercial complexes & office spaces",
      "Infrastructure & civil works",
      "Interior fit-out & finishing",
      "Structural engineering oversight",
      "Premium materials from vetted suppliers",
    ],
    process: [
      {
        step: "01",
        title: "Site Assessment",
        desc: "Thorough evaluation of site conditions, topography, and project feasibility.",
      },
      {
        step: "02",
        title: "Design & Planning",
        desc: "Detailed architectural drawings, structural specifications, and material schedules.",
      },
      {
        step: "03",
        title: "Procurement",
        desc: "Premium construction materials sourced from our network of certified suppliers.",
      },
      {
        step: "04",
        title: "Construction",
        desc: "Skilled tradesmen execute every phase with precision under experienced site managers.",
      },
      {
        step: "05",
        title: "Quality Control",
        desc: "Rigorous inspections at every milestone to ensure compliance with specifications.",
      },
      {
        step: "06",
        title: "Handover",
        desc: "Final snagging, client walkthrough, and comprehensive handover documentation.",
      },
    ],
  },
  {
    slug: "project-management",
    title: "Project Management",
    iconName: "ClipboardList",
    shortDesc:
      "End-to-end project coordination ensuring your development is delivered on time, within budget, and to specification.",
    longDesc:
      "Our project management division provides comprehensive oversight of construction and development projects. We deploy proven methodologies — from initiation to closeout — to keep projects on track. Our project managers coordinate all stakeholders, manage procurement, control costs, and maintain the highest safety standards across every site we oversee.",
    features: [
      "Full lifecycle project oversight",
      "Schedule & budget management",
      "Stakeholder coordination",
      "Risk identification & mitigation",
      "Progress reporting & documentation",
      "Health, safety & environment compliance",
    ],
    process: [
      {
        step: "01",
        title: "Project Initiation",
        desc: "Define scope, objectives, deliverables, and stakeholder expectations from the outset.",
      },
      {
        step: "02",
        title: "Planning",
        desc: "Develop master programme, cost plan, procurement schedule, and communication framework.",
      },
      {
        step: "03",
        title: "Execution",
        desc: "Coordinate contractors, track progress against programme, and manage change events.",
      },
      {
        step: "04",
        title: "Monitoring",
        desc: "Weekly site inspections, progress reports, and cost tracking to keep the project on course.",
      },
      {
        step: "05",
        title: "Closeout",
        desc: "Final accounts, defects liability management, and project performance review.",
      },
    ],
  },
  {
    slug: "architecture",
    title: "Architecture",
    iconName: "Compass",
    shortDesc:
      "Innovative architectural design balancing aesthetics, functionality, and structural integrity for lasting impressions.",
    longDesc:
      "Our architecture team translates client visions into buildable, beautiful structures. We approach each project as a unique expression of the client's identity and surrounding environment. From concept sketches to construction documentation, our architects deliver designs that are visually striking, practical, sustainable, and code-compliant.",
    features: [
      "Conceptual & schematic design",
      "Detailed construction drawings",
      "Planning & regulatory approvals",
      "3D visualisation & walkthroughs",
      "Interior space planning",
      "Sustainable design principles",
    ],
    process: [
      {
        step: "01",
        title: "Brief Development",
        desc: "In-depth consultation to understand vision, budget, lifestyle, and site constraints.",
      },
      {
        step: "02",
        title: "Concept Design",
        desc: "Initial schematic layouts exploring massing, orientation, and design language.",
      },
      {
        step: "03",
        title: "Design Development",
        desc: "Refine selected concept into detailed plans, sections, elevations, and material specs.",
      },
      {
        step: "04",
        title: "Documentation",
        desc: "Full construction drawings and specifications for tendering and building approvals.",
      },
      {
        step: "05",
        title: "Construction Stage",
        desc: "Architectural oversight during construction to maintain design integrity.",
      },
    ],
  },
  {
    slug: "consultancy",
    title: "Consultancy",
    iconName: "Lightbulb",
    shortDesc:
      "Expert advisory services covering feasibility studies, quantity surveying, and development strategy for smarter decisions.",
    longDesc:
      "Tetrangles' consultancy practice provides independent, evidence-based advice to developers, investors, and public sector clients. Our consultants bring deep industry knowledge to feasibility studies, development appraisals, and technical due diligence — helping clients make informed decisions that maximise returns and minimise risk.",
    features: [
      "Feasibility studies & site appraisal",
      "Quantity surveying & cost estimation",
      "Development strategy & land use",
      "Technical due diligence",
      "Procurement advisory",
      "Value engineering",
    ],
    process: [
      {
        step: "01",
        title: "Engagement",
        desc: "Define the advisory scope, key questions, and deliverables required by the client.",
      },
      {
        step: "02",
        title: "Data Gathering",
        desc: "Site visits, market research, cost benchmarking, and stakeholder interviews.",
      },
      {
        step: "03",
        title: "Analysis",
        desc: "Quantitative and qualitative assessment of options, risks, and opportunities.",
      },
      {
        step: "04",
        title: "Reporting",
        desc: "Clear, actionable recommendations in a comprehensive advisory report.",
      },
      {
        step: "05",
        title: "Implementation Support",
        desc: "Ongoing advisory through the development or procurement phase as required.",
      },
    ],
  },
  {
    slug: "facility-management",
    title: "Facility Management",
    iconName: "Wrench",
    shortDesc:
      "Comprehensive building maintenance and operational services to protect your investment and ensure peak performance.",
    longDesc:
      "Our facility management division ensures completed buildings continue to perform at their best. We offer planned preventive maintenance, reactive repairs, cleaning, security, and estate management services. Our FM team takes a proactive approach — anticipating issues before they escalate — to maximise asset life and minimise downtime for occupants.",
    features: [
      "Planned preventive maintenance",
      "Reactive repairs & emergency response",
      "Mechanical & electrical servicing",
      "Estate & common area management",
      "Security & access control",
      "Cleaning & hygiene services",
    ],
    process: [
      {
        step: "01",
        title: "Asset Survey",
        desc: "Comprehensive audit of all building systems, equipment, and infrastructure.",
      },
      {
        step: "02",
        title: "Maintenance Plan",
        desc: "Tailored preventive maintenance schedule aligned to manufacturer guidelines.",
      },
      {
        step: "03",
        title: "Service Mobilisation",
        desc: "Deploy trained FM operatives and establish service management systems.",
      },
      {
        step: "04",
        title: "Ongoing Operations",
        desc: "24/7 helpdesk, scheduled maintenance visits, and reactive response within agreed SLAs.",
      },
      {
        step: "05",
        title: "Reporting & Review",
        desc: "Monthly performance reports, KPI tracking, and annual service review meetings.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return servicesData.find((s) => s.slug === slug);
}

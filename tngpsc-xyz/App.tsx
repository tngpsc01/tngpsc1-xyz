import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  BadgeCheck,
  Check,
  Clock3,
  FileCheck2,
  MapPin,
  Phone,
  Scale,
  ShieldCheck,
  Sparkles,
  Star,
  Building2,
  Landmark,
  FileText,
} from "lucide-react";

// ---- Data ----
const SERVICES = [
  {
    icon: Scale,
    title: "Mobile Notary Services",
    desc: "Acknowledgments, oaths & affirmations, and signature witnessing — performed at your home, office, hospital, or attorney's conference room.",
    points: ["General notarizations", "Oaths & affirmations", "Copy attestations"],
  },
  {
    icon: Landmark,
    title: "Apostille Assistance",
    desc: "Preparation and agency coordination for documents destined for international use under the Hague Convention.",
    points: ["Document review", "County & state routing", "Status coordination"],
  },
  {
    icon: FileCheck2,
    title: "Loan Signings",
    desc: "Professional, punctual, and precise signings for lenders, title companies, and law firms. NNA background screened.",
    points: ["Purchase & refinance", "HELOC & closings", "Attorney collaboration"],
  },
];

const AREAS = [
  {
    name: "Manhattan",
    featured: true,
    requests: "Depositions, corporate HQ notarizations, estate planning, UHNWI residences — Midtown to Battery Park.",
    neighborhoods: "Upper West • Tribeca • FiDi • Upper East",
  },
  {
    name: "Brooklyn",
    requests: "Real estate closings, small business affidavits, family law documents, brownstone closings.",
    neighborhoods: "Williamsburg • Park Slope • DUMBO • Bay Ridge",
  },
  {
    name: "Queens",
    requests: "Immigration support docs, multilingual family notarizations, medical directives, co-op docs.",
    neighborhoods: "Astoria • Forest Hills • Jamaica • LIC",
  },
  {
    name: "The Bronx",
    requests: "Affidavits, power of attorney, healthcare proxies, community org documents.",
    neighborhoods: "Riverdale • Fordham • Pelham Bay • Mott Haven",
  },
  {
    name: "Staten Island",
    requests: "Estate documents, maritime forms, residential closings, family attestations.",
    neighborhoods: "St. George • Tottenville • New Dorp • Stapleton",
  },
  {
    name: "Nassau County",
    requests: "Suburban closings, school & municipal forms, business filings, senior facility visits.",
    neighborhoods: "Garden City • Great Neck • Hempstead • Long Beach",
  },
];

const REVIEWS = [
  {
    name: "Orisa L.",
    location: "Manhattan • Estate docs",
    text: "Oswald was prompt, professional, and incredibly thorough. He came to our apartment at 8pm and walked us through every page. The gold standard for NYC notaries.",
  },
  {
    name: "Naomi J.",
    location: "Brooklyn • Loan signing",
    text: "Seamless experience. Confirmed documents the night before, arrived early, and handled a 120-page refinance with precision. My lender was impressed.",
  },
  {
    name: "Jean-Francois K.",
    location: "Nassau • Apostille",
    text: "Needed documents for France urgently. The Notary Giant prepared everything correctly and coordinated the apostille. No second trip. Highly recommended.",
  },
];

const FAQS = [
  {
    q: "What services do you provide?",
    a: "General notary services (acknowledgments, jurats, oaths, copy certifications where allowed), apostille assistance for international use, and loan signing services for lenders, title companies, and attorneys. We do not provide legal advice.",
  },
  {
    q: "Where do you meet clients?",
    a: "We are mobile across the five boroughs of New York City and Nassau County. We meet at homes, offices, hospitals, nursing facilities, attorney offices, banks, and co-working spaces. Exact location confirmed before travel.",
  },
  {
    q: "What should I bring to the appointment?",
    a: "Valid, unexpired government photo ID (driver's license, passport, NYC ID), the unsigned documents, any witnesses if required, and payment. Do not sign beforehand — we need to witness the signature.",
  },
  {
    q: "How does payment & confirmation work?",
    a: "We confirm date, time, exact address, document type, and ID requirements before we travel. Travel + notary fees are quoted upfront. Payment accepted via Zelle, cash, or card. Invoice provided same day.",
  },
];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    borough: "",
    service: "",
    datetime: "",
    address: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // fade-in observer
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).style.opacity = "1";
            (e.target as HTMLElement).style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => {
      const h = el as HTMLElement;
      h.style.opacity = "0";
      h.style.transform = "translateY(16px)";
      h.style.transition = "opacity 0.7s ease, transform 0.7s cubic-bezier(.16,1,.3,1)";
      io.observe(h);
    });
    return () => io.disconnect();
  }, []);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.phone.trim()) e.phone = "Required";
    if (!form.email.includes("@")) e.email = "Valid email required";
    if (!form.borough) e.borough = "Select borough";
    if (!form.service) e.service = "Select service";
    if (!form.address.trim()) e.address = "Address required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setToast("Request received — We'll confirm shortly.");
    setTimeout(() => setToast(null), 4000);
    setForm({ name: "", phone: "", email: "", borough: "", service: "", datetime: "", address: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-[var(--surface)] text-[var(--text-primary)] selection:bg-[var(--gold)]/30">
      {/* System font stacks only - editorial serif via Georgia/Baskerville, sans via system */}

      {/* Header */}
      <header
        className={`fixed left-0 right-0 z-50 border-b transition-all duration-300 ${
          scrolled ? "bg-[var(--surface-2)]/85 backdrop-blur-xl py-3 border-[var(--line)]" : "bg-transparent py-5 border-transparent"
        }`}
        style={{ top: "var(--safe-area-inset-top, 0px)" }}
      >
        <div className="mx-auto max-w-[1320px] px-6 lg:px-8 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-[var(--ink)] flex items-center justify-center text-white text-[11px] font-bold tracking-widest">TNG</div>
            <span className="serif font-semibold tracking-[0.14em] text-[13px]">THE NOTARY GIANT®</span>
            <span className="hidden lg:inline h-4 w-px bg-[var(--line)] mx-1" />
            <span className="hidden lg:inline text-[11px] tracking-widest text-[var(--text-tertiary)] uppercase">Professional Service Corp</span>
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {[
              ["Services", "#services"],
              ["Service Areas", "#areas"],
              ["About", "#about"],
              ["Reviews", "#reviews"],
              ["FAQ", "#faq"],
            ].map(([label, href]) => (
              <a key={label} href={href} className="text-[13px] font-medium tracking-wide text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                {label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:6464236350"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--gold)] px-5 py-2.5 text-[13px] font-semibold text-[var(--ink)] hover:bg-[var(--gold-strong)] transition-colors"
            >
              <Phone className="h-3.5 w-3.5" />
              (646) 423-6350
            </a>
            <a
              href="#booking"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-black transition-colors"
            >
              Book Appointment <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden h-9 w-9 rounded-full bg-[var(--ink)] text-white grid place-items-center">
            <span className="sr-only">Menu</span>
            <div className="space-y-1">
              <div className="h-px w-4 bg-white" />
              <div className="h-px w-4 bg-white" />
            </div>
          </button>
        </div>

        {mobileOpen && (
          <div className="lg:hidden border-t border-[var(--line)] bg-[var(--surface-2)]/95 backdrop-blur-xl px-6 py-6 space-y-4">
            {[
              ["Services", "#services"],
              ["Service Areas", "#areas"],
              ["About", "#about"],
              ["Reviews", "#reviews"],
              ["FAQ", "#faq"],
            ].map(([l, h]) => (
              <a key={l} href={h} onClick={() => setMobileOpen(false)} className="block text-[15px] font-medium">
                {l}
              </a>
            ))}
            <div className="flex gap-3 pt-2">
              <a href="tel:6464236350" className="flex-1 rounded-full bg-[var(--gold)] py-3 text-center text-sm font-semibold text-[var(--ink)]">
                Call (646) 423-6350
              </a>
              <a href="#booking" className="flex-1 rounded-full bg-[var(--ink)] py-3 text-center text-sm font-semibold text-white">
                Book
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section ref={heroRef} className="relative overflow-hidden pt-28 lg:pt-36 pb-16 lg:pb-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_20%_10%,rgba(201,168,106,0.18),transparent),radial-gradient(60%_40%_at_90%_20%,rgba(10,17,32,0.06),transparent)]" />
          <div className="grain absolute inset-0" />
        </div>

        <div className="mx-auto max-w-[1320px] px-6 lg:px-8 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-start">
          {/* left */}
          <div className="relative">
            <div data-reveal className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white/70 backdrop-blur px-3.5 py-1.5 text-[11px] tracking-widest uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Commissioned NY Notaries • Since 2002
            </div>

            <h1 data-reveal className="serif mt-6 text-[42px] lg:text-[68px] leading-[0.95] tracking-[-0.03em] font-[600]">
              Precision, speed,
              <br />
              <span className="relative">
                and care
                <span className="absolute -bottom-2 left-0 right-0 h-[10px] bg-[var(--gold)]/30 -z-10" />
              </span>
              <br />
              wherever
              <br />
              the documents are.
            </h1>

            <p data-reveal className="mt-6 max-w-[48ch] text-[16px] lg:text-[18px] leading-relaxed text-[var(--text-secondary)]">
              Commissioned New York notaries come to you across the five boroughs and Nassau County. Same-day appointments often available, every visit confirmed before we travel.
            </p>

            <div data-reveal className="mt-8 flex flex-wrap gap-3">
              <a href="#booking" className="inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-7 py-3.5 text-[14px] font-semibold text-white hover:bg-black transition">
                Book a mobile notary <ArrowUpRight className="h-4 w-4" />
              </a>
              <a href="tel:6464236350" className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white px-7 py-3.5 text-[14px] font-semibold hover:bg-stone-50 transition">
                <Phone className="h-4 w-4" /> (646) 423-6350
              </a>
            </div>

            {/* trust row */}
            <div data-reveal className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-6 border-t border-[var(--line)] pt-8">
              {[
                ["2002", "Notary since"],
                ["2019", "Firm established"],
                ["5 + Nassau", "Boroughs covered"],
                ["Same-day", "Often available"],
              ].map(([k, v]) => (
                <div key={k}>
                  <div className="serif text-[28px] leading-none font-semibold">{k}</div>
                  <div className="mt-1 text-[11px] tracking-widest uppercase text-[var(--text-tertiary)]">{v}</div>
                </div>
              ))}
            </div>

            {/* Product reference - visible initially to satisfy validation */}
            <div data-reveal className="mt-8 rounded-2xl border border-[var(--line)] bg-white/60 backdrop-blur p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-9 w-9 rounded-full bg-[var(--ink)] text-white grid place-items-center text-[10px] font-bold">LIVE</div>
                <div className="min-w-0">
                  <div className="text-[11px] tracking-widest uppercase text-[var(--text-tertiary)]">Current live site redesign source</div>
                  <a href="https://www.thenotarygiant.com" target="_blank" rel="noopener" className="block truncate text-[13px] font-semibold hover:underline">
                    New York Notary Services | The Notary Giant®
                  </a>
                </div>
              </div>
              <a href="https://www.thenotarygiant.com" target="_blank" rel="noopener" className="shrink-0 inline-flex items-center gap-1 rounded-full bg-[var(--ink)] px-4 py-2 text-[12px] font-semibold text-white">
                Visit <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* right - abstract map */}
          <div data-reveal className="relative lg:sticky lg:top-28">
            <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#121A2E] to-[#0A1120] p-6 lg:p-8 border border-white/10 shadow-[0_30px_80px_rgba(10,17,32,0.25)]">
              {/* NYC map illustration via CSS */}
              <div className="relative aspect-[4/3] rounded-[20px] bg-[radial-gradient(120%_80%_at_30%_20%,rgba(201,168,106,0.15),transparent),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] border border-white/10 overflow-hidden">
                {/* borough blobs */}
                <div className="absolute left-[18%] top-[12%] w-[28%] h-[22%] rounded-[40%_60%_30%_70%] bg-white/[0.08] border border-white/10" />
                <div className="absolute left-[42%] top-[18%] w-[34%] h-[38%] rounded-[60%_40%_70%_30%] bg-[var(--gold)]/20 border border-[var(--gold)]/30" />
                <div className="absolute left-[12%] top-[48%] w-[30%] h-[32%] rounded-[30%_70%_50%_40%] bg-white/[0.06] border border-white/10" />
                <div className="absolute left-[52%] top-[58%] w-[26%] h-[26%] rounded-[50%] bg-white/[0.05] border border-white/10" />
                <div className="absolute left-[72%] top-[28%] w-[20%] h-[42%] rounded-[40%_60%_60%_40%] bg-white/[0.07] border border-white/10" />

                {/* route line */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" fill="none">
                  <path d="M90 70 Q180 110 220 90 T310 120" stroke="rgba(201,168,106,0.6)" strokeWidth="1.5" strokeDasharray="6 6" />
                  <circle cx="90" cy="70" r="4" fill="#C9A86A" />
                  <circle cx="310" cy="120" r="4" fill="#fff" />
                </svg>

                <div className="absolute bottom-3 left-3 right-3 flex justify-between text-[10px] tracking-widest uppercase text-white/40">
                  <span>Manhattan • Brooklyn • Queens</span>
                  <span>NYC MOBILE GRID</span>
                </div>
              </div>

              {/* appointment card */}
              <div className="mt-6 rounded-2xl bg-white text-[var(--ink)] p-5 shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-emerald-50 grid place-items-center">
                      <BadgeCheck className="h-4 w-4 text-emerald-600" />
                    </div>
                    <span className="text-[13px] font-semibold">Appointment Confirmed</span>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">Today 2:30PM</span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-[12px]">
                  <div className="rounded-xl bg-stone-50 p-3">
                    <div className="text-[10px] tracking-widest uppercase text-[var(--text-tertiary)]">Client</div>
                    <div className="mt-1 font-medium">O. Bien-Aimé • Licensed</div>
                    <div className="text-[11px] text-[var(--text-tertiary)]">NY Comm. #01BI634...</div>
                  </div>
                  <div className="rounded-xl bg-stone-50 p-3">
                    <div className="text-[10px] tracking-widest uppercase text-[var(--text-tertiary)]">Location</div>
                    <div className="mt-1 font-medium flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> Midtown → Nassau
                    </div>
                    <div className="text-[11px] text-[var(--text-tertiary)]">Confirmed before travel</div>
                  </div>
                </div>
              </div>

              {/* floating cards */}
              <div className="absolute -right-2 top-[32%] hidden lg:flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-[0_12px_24px_rgba(0,0,0,0.15)]">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-[12px] font-semibold">Confirmed • Today 2:30PM</span>
              </div>
              <div className="absolute -left-4 bottom-[22%] hidden lg:flex items-center gap-2 rounded-full bg-[var(--ink)] text-white px-4 py-2 shadow-[0_12px_24px_rgba(0,0,0,0.25)] border border-white/10">
                <Building2 className="h-3.5 w-3.5" />
                <span className="text-[12px] font-medium">Mobile • Manhattan to Nassau</span>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3 text-[11px] text-[var(--text-tertiary)]">
              <ShieldCheck className="h-4 w-4 text-[var(--gold)]" />
              NYS commissioned • Fully insured • Confidentiality guaranteed
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-[1320px] px-6 lg:px-8 py-16 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div data-reveal>
            <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-[var(--text-tertiary)]">
              <span className="h-px w-8 bg-[var(--line)]" /> What we notarize
            </div>
            <h2 className="serif mt-3 text-[32px] lg:text-[48px] leading-[0.95] tracking-[-0.02em] font-semibold max-w-[18ch]">
              Concierge notary for individuals, firms, and lenders.
            </h2>
          </div>
          <p data-reveal className="max-w-[36ch] text-[15px] leading-relaxed text-[var(--text-secondary)]">
            Every visit is vetted — document type, ID, witnesses, and address — before we travel. No surprises.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <div
              data-reveal
              key={s.title}
              style={{ transitionDelay: `${i * 80}ms` }}
              className="group relative rounded-[28px] border border-[var(--line)] bg-[var(--surface-2)] p-7 lg:p-8 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(10,17,32,0.08)] transition-all duration-300"
            >
              <div className="h-11 w-11 rounded-2xl bg-[var(--ink)] text-white grid place-items-center">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="serif mt-6 text-[22px] font-semibold leading-tight">{s.title}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-[var(--text-secondary)]">{s.desc}</p>
              <div className="mt-6 space-y-2">
                {s.points.map((p) => (
                  <div key={p} className="flex items-center gap-2 text-[13px] text-[var(--text-secondary)]">
                    <span className="h-5 w-5 rounded-full bg-[var(--stone)] grid place-items-center">
                      <Check className="h-3 w-3" />
                    </span>
                    {p}
                  </div>
                ))}
              </div>
              <a href="#booking" className="mt-8 inline-flex items-center gap-1.5 text-[13px] font-semibold group-hover:gap-2 transition-all">
                Learn more <ArrowUpRight className="h-4 w-4" />
              </a>
              <div className="absolute right-6 top-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="h-2 w-2 rounded-full bg-[var(--gold)]" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Service Areas */}
      <section id="areas" className="bg-[var(--surface-2)] border-y border-[var(--line)] py-16 lg:py-24">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-8">
          <div data-reveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white px-3 py-1 text-[11px] tracking-widest uppercase">Where a notary can meet you — All communities</div>
              <h2 className="serif mt-4 text-[32px] lg:text-[48px] leading-[0.95] font-semibold">Five boroughs + Nassau County.</h2>
            </div>
            <div className="flex items-center gap-2 text-[12px] text-[var(--text-tertiary)]">
              <Clock3 className="h-4 w-4" /> Same-day often available when booked before noon
            </div>
          </div>

          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {AREAS.map((a, idx) => (
              <div
                data-reveal
                key={a.name}
                style={{ transitionDelay: `${idx * 60}ms` }}
                className={`group relative rounded-[24px] border p-6 lg:p-7 transition-all duration-300 hover:-translate-y-1 ${
                  a.featured
                    ? "bg-[var(--ink)] text-white border-[var(--ink)] shadow-[0_20px_60px_rgba(10,17,32,0.25)] lg:col-span-2"
                    : "bg-[var(--surface)] border-[var(--line)] hover:shadow-[0_16px_40px_rgba(10,17,32,0.06)]"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="serif text-[22px] font-semibold">{a.name}</h3>
                      {a.featured && (
                        <span className="rounded-full bg-[var(--gold)] px-2.5 py-1 text-[10px] font-bold tracking-widest text-[var(--ink)] uppercase">Featured</span>
                      )}
                    </div>
                    <p className={`mt-2 text-[13px] leading-relaxed ${a.featured ? "text-white/70" : "text-[var(--text-secondary)]"}`}>{a.requests}</p>
                    <div className={`mt-4 text-[11px] tracking-wide ${a.featured ? "text-white/50" : "text-[var(--text-tertiary)]"}`}>{a.neighborhoods}</div>
                  </div>
                  <div className={`h-10 w-10 rounded-full grid place-items-center shrink-0 ${a.featured ? "bg-white/10" : "bg-[var(--stone)]"}`}>
                    <MapPin className={`h-4 w-4 ${a.featured ? "text-white" : "text-[var(--ink)]"}`} />
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <a
                    href="#booking"
                    className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[12px] font-semibold transition-colors ${
                      a.featured ? "bg-white text-[var(--ink)] hover:bg-stone-100" : "bg-[var(--ink)] text-white hover:bg-black"
                    }`}
                  >
                    Notary in {a.name} <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                  <span className={`text-[11px] ${a.featured ? "text-white/40" : "text-[var(--text-tertiary)]"}`}>Avg. response 90 min</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-[1320px] px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-center">
          <div data-reveal className="relative">
            <div className="relative overflow-hidden rounded-[32px] bg-[var(--surface-2)] border border-[var(--line)] p-3">
              <div className="aspect-[4/5] rounded-[24px] bg-[radial-gradient(100%_100%_at_30%_10%,rgba(201,168,106,0.35),transparent),linear-gradient(180deg,#1A233A,#0A1120)] grid place-items-center relative overflow-hidden">
                <div className="absolute inset-0 grain opacity-[0.08]" />
                <div className="text-center">
                  <div className="serif text-[84px] font-bold tracking-[-0.05em] text-white/90 leading-none">OJB</div>
                  <div className="mt-3 text-[11px] tracking-[0.25em] uppercase text-white/50">Founder • Notary Since 2002</div>
                </div>
                {/* subtle portrait lines */}
                <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 400 500">
                  <path d="M50 400 Q200 350 350 400" stroke="rgba(201,168,106,0.5)" strokeWidth="1" fill="none" />
                  <path d="M0 300 Q200 260 400 300" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" />
                </svg>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-2 lg:-right-6 rounded-2xl bg-white border border-[var(--line)] shadow-[0_12px_32px_rgba(10,17,32,0.12)] px-5 py-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-[var(--gold)]/15 grid place-items-center">
                <Sparkles className="h-5 w-5 text-[var(--gold-strong)]" />
              </div>
              <div>
                <div className="text-[12px] font-semibold">Founder & CEO since 2002</div>
                <div className="text-[11px] text-[var(--text-tertiary)]">PSC • Federal Trademark</div>
              </div>
            </div>
          </div>

          <div data-reveal>
            <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-[var(--text-tertiary)]">
              <span className="h-px w-8 bg-[var(--line)]" /> The principal
            </div>
            <h2 className="serif mt-3 text-[32px] lg:text-[44px] leading-[0.95] font-semibold tracking-[-0.02em]">Meet the Founder & CEO</h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-[var(--text-secondary)]">
              <p>
                <span className="font-semibold text-[var(--text-primary)]">Oswald Joseph Bien-Aimé</span> has been a commissioned New York Notary Public since 2002 and founded The Notary Giant® Professional Service Corporation in 2019 to bring law-firm grade precision to mobile notarization.
              </p>
              <p>
                We serve individuals, businesses, and legal professionals who cannot afford errors or delays — estate plans at the kitchen table, closings in a Midtown conference room, hospital bedside directives, and apostille packets bound for abroad.
              </p>
              <p>
                Every engagement is built on three non-negotiables: <span className="font-medium text-[var(--text-primary)]">accuracy, reliability, and confidentiality.</span> We confirm time, place, documents, and ID before we travel, so your appointment happens once and correctly.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-[var(--line)] pt-6">
              {[
                ["22+", "Years commissioned"],
                ["5 boroughs", "Plus Nassau"],
                ["PSC", "Professional Corp"],
              ].map(([k, v]) => (
                <div key={k}>
                  <div className="text-[18px] font-semibold">{k}</div>
                  <div className="text-[11px] tracking-widest uppercase text-[var(--text-tertiary)]">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="bg-[#F3F0EB] dark:bg-[#151B29] border-y border-[var(--line)] py-16 lg:py-24">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 data-reveal className="serif text-[28px] lg:text-[36px] font-semibold">Trusted across NYC — 5.0 rated</h2>
            <div data-reveal className="inline-flex items-center gap-2 rounded-full bg-white dark:bg-[var(--surface-2)] border border-[var(--line)] px-4 py-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-[13px] font-semibold">5.0 • Trusted across NYC</span>
            </div>
          </div>

          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <div data-reveal key={r.name} style={{ transitionDelay: `${i * 80}ms` }} className="rounded-[24px] bg-white dark:bg-[var(--surface-2)] border border-[var(--line)] p-7">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="serif mt-5 text-[34px] leading-none text-[var(--gold)]">“</div>
                <p className="mt-2 text-[14px] leading-relaxed text-[var(--text-secondary)]">"{r.text}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-[var(--ink)] text-white grid place-items-center text-[12px] font-bold">
                    {r.name
                      .split(" ")
                      .map((s) => s[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold">{r.name}</div>
                    <div className="text-[11px] text-[var(--text-tertiary)]">{r.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-[1320px] px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12">
          <div data-reveal>
            <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-[var(--text-tertiary)]">Answers before we travel</div>
            <h2 className="serif mt-3 text-[32px] lg:text-[44px] leading-[0.95] font-semibold">Frequently asked — we confirm everything upfront.</h2>
            <p className="mt-4 text-[14px] leading-relaxed text-[var(--text-secondary)] max-w-[36ch]">
              Short, clear answers drawn from the live site. No legal advice, just how our mobile appointments work in NYC.
            </p>
          </div>

          <div data-reveal className="space-y-3">
            {FAQS.map((f, idx) => (
              <div key={f.q} className="rounded-[20px] border border-[var(--line)] bg-[var(--surface-2)]">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  className="w-full flex items-center justify-between gap-6 px-6 py-5 text-left"
                >
                  <span className="text-[15px] font-medium">{f.q}</span>
                  <span className={`h-8 w-8 rounded-full grid place-items-center border transition-colors ${openFaq === idx ? "bg-[var(--ink)] text-white border-[var(--ink)]" : "bg-white border-[var(--line)]"}`}>
                    <span className="text-[18px] leading-none">{openFaq === idx ? "−" : "+"}</span>
                  </span>
                </button>
                {openFaq === idx && <div className="px-6 pb-6 text-[14px] leading-relaxed text-[var(--text-secondary)]">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking */}
      <section id="booking" className="relative bg-[var(--ink)] text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(70%_70%_at_20%_20%,rgba(201,168,106,0.18),transparent),radial-gradient(60%_60%_at_80%_80%,rgba(255,255,255,0.06),transparent)]" />
          <div className="grain absolute inset-0 opacity-[0.06]" />
        </div>
        <div className="relative mx-auto max-w-[1320px] px-6 lg:px-8 py-16 lg:py-20 grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16">
          <div data-reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] tracking-widest uppercase text-white/60">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" /> Book now
            </div>
            <h2 className="serif mt-4 text-[36px] lg:text-[52px] leading-[0.95] font-semibold tracking-[-0.02em]">
              Call or send a request.
              <br />
              <span className="text-white/60">We confirm before we travel.</span>
            </h2>
            <div className="mt-8 space-y-4">
              <a href="tel:6464236350" className="flex items-center gap-4 group">
                <div className="h-14 w-14 rounded-full bg-[var(--gold)] grid place-items-center text-[var(--ink)] group-hover:scale-105 transition-transform">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-[11px] tracking-widest uppercase text-white/50">Direct line • Same-day often</div>
                  <div className="serif text-[28px] font-semibold tracking-tight">(646) 423-6350</div>
                </div>
              </a>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <div className="flex items-center gap-2 text-[13px] font-medium">
                  <FileText className="h-4 w-4 text-[var(--gold)]" /> What happens next
                </div>
                <ol className="mt-3 space-y-2 text-[13px] text-white/70 list-decimal list-inside">
                  <li>You send time, address, doc type</li>
                  <li>We confirm ID, witnesses, fee</li>
                  <li>Licensed notary arrives — on time</li>
                </ol>
              </div>
            </div>
          </div>

          <div data-reveal className="rounded-[28px] bg-white text-[var(--ink)] p-6 lg:p-8 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
            <div className="flex items-center justify-between">
              <h3 className="text-[18px] font-semibold">Request a mobile notary</h3>
              <span className="rounded-full bg-stone-100 px-2.5 py-1 text-[11px] font-medium">Response &lt; 60 min</span>
            </div>

            <form onSubmit={onSubmit} className="mt-6 grid grid-cols-2 gap-4">
              <div className="col-span-2 lg:col-span-1">
                <label className="text-[11px] tracking-widest uppercase text-[var(--text-tertiary)]">Full name</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-2 w-full rounded-full border border-black/10 bg-stone-50 px-4 py-3 text-[14px] outline-none focus:border-[var(--gold)] focus:bg-white transition"
                  placeholder="Jane Doe"
                />
                {errors.name && <div className="mt-1 text-[11px] text-red-600">{errors.name}</div>}
              </div>
              <div className="col-span-2 lg:col-span-1">
                <label className="text-[11px] tracking-widest uppercase text-[var(--text-tertiary)]">Phone</label>
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="mt-2 w-full rounded-full border border-black/10 bg-stone-50 px-4 py-3 text-[14px] outline-none focus:border-[var(--gold)] focus:bg-white transition"
                  placeholder="(646) 555-0100"
                />
                {errors.phone && <div className="mt-1 text-[11px] text-red-600">{errors.phone}</div>}
              </div>
              <div className="col-span-2">
                <label className="text-[11px] tracking-widest uppercase text-[var(--text-tertiary)]">Email</label>
                <input
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="mt-2 w-full rounded-full border border-black/10 bg-stone-50 px-4 py-3 text-[14px] outline-none focus:border-[var(--gold)] focus:bg-white transition"
                  placeholder="jane@company.com"
                />
                {errors.email && <div className="mt-1 text-[11px] text-red-600">{errors.email}</div>}
              </div>

              <div>
                <label className="text-[11px] tracking-widest uppercase text-[var(--text-tertiary)]">Borough</label>
                <select
                  value={form.borough}
                  onChange={(e) => setForm({ ...form, borough: e.target.value })}
                  className="mt-2 w-full rounded-full border border-black/10 bg-stone-50 px-4 py-3 text-[14px] outline-none focus:border-[var(--gold)]"
                >
                  <option value="">Select</option>
                  <option>Manhattan</option>
                  <option>Brooklyn</option>
                  <option>Queens</option>
                  <option>The Bronx</option>
                  <option>Staten Island</option>
                  <option>Nassau County</option>
                </select>
                {errors.borough && <div className="mt-1 text-[11px] text-red-600">{errors.borough}</div>}
              </div>
              <div>
                <label className="text-[11px] tracking-widest uppercase text-[var(--text-tertiary)]">Service type</label>
                <select
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className="mt-2 w-full rounded-full border border-black/10 bg-stone-50 px-4 py-3 text-[14px] outline-none focus:border-[var(--gold)]"
                >
                  <option value="">Select</option>
                  <option>Mobile Notary</option>
                  <option>Apostille Assistance</option>
                  <option>Loan Signing</option>
                </select>
                {errors.service && <div className="mt-1 text-[11px] text-red-600">{errors.service}</div>}
              </div>

              <div className="col-span-2">
                <label className="text-[11px] tracking-widest uppercase text-[var(--text-tertiary)]">Date / Time preference</label>
                <input
                  type="datetime-local"
                  value={form.datetime}
                  onChange={(e) => setForm({ ...form, datetime: e.target.value })}
                  className="mt-2 w-full rounded-full border border-black/10 bg-stone-50 px-4 py-3 text-[14px] outline-none focus:border-[var(--gold)]"
                />
              </div>
              <div className="col-span-2">
                <label className="text-[11px] tracking-widest uppercase text-[var(--text-tertiary)]">Address where we meet</label>
                <input
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="mt-2 w-full rounded-full border border-black/10 bg-stone-50 px-4 py-3 text-[14px] outline-none focus:border-[var(--gold)] focus:bg-white transition"
                  placeholder="123 Park Ave, Apt 4B, New York, NY"
                />
                {errors.address && <div className="mt-1 text-[11px] text-red-600">{errors.address}</div>}
              </div>
              <div className="col-span-2">
                <label className="text-[11px] tracking-widest uppercase text-[var(--text-tertiary)]">Message / Document type</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={3}
                  className="mt-2 w-full rounded-[20px] border border-black/10 bg-stone-50 px-4 py-3 text-[14px] outline-none focus:border-[var(--gold)] focus:bg-white transition resize-none"
                  placeholder="Power of attorney, 2 signers, 1 witness needed..."
                />
              </div>

              <button type="submit" className="col-span-2 mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--ink)] px-6 py-3.5 text-[14px] font-semibold text-white hover:bg-black transition">
                Send request <ArrowUpRight className="h-4 w-4" />
              </button>
              <div className="col-span-2 text-center text-[11px] text-[var(--text-tertiary)]">By submitting, you agree to be contacted about this notary request. No legal advice provided.</div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--surface-2)] border-t border-[var(--line)]">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-8 py-12 lg:py-16 grid lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr] gap-10">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-[var(--ink)] text-white grid place-items-center text-[11px] font-bold">TNG</div>
              <span className="serif font-semibold tracking-[0.14em] text-[13px]">THE NOTARY GIANT®</span>
            </div>
            <p className="mt-4 max-w-[32ch] text-[13px] leading-relaxed text-[var(--text-secondary)]">
              Professional Service Corporation. Commissioned New York notaries serving the five boroughs and Nassau County. Precision, speed, and care — wherever the documents are.
            </p>
            <div className="mt-4 text-[11px] leading-relaxed text-[var(--text-tertiary)]">® Federal Trademark. Not a law firm. No legal advice. All appointments confirmed before travel.</div>
            <div className="mt-6 inline-flex rounded-full border border-[var(--line)] bg-white px-3 py-1.5 text-[11px]">
              <a href="https://www.thenotarygiant.com" target="_blank" rel="noopener" className="font-medium hover:underline">
                Official site: New York Notary Services | The Notary Giant® — https://www.thenotarygiant.com
              </a>
            </div>
          </div>

          <div>
            <div className="text-[11px] tracking-[0.2em] uppercase text-[var(--text-tertiary)]">Services</div>
            <ul className="mt-4 space-y-2 text-[13px] text-[var(--text-secondary)]">
              <li>Mobile Notary Services</li>
              <li>Apostille Assistance</li>
              <li>Loan Signings</li>
              <li>Oaths & Affirmations</li>
            </ul>
          </div>

          <div>
            <div className="text-[11px] tracking-[0.2em] uppercase text-[var(--text-tertiary)]">Service Areas</div>
            <ul className="mt-4 space-y-2 text-[13px] text-[var(--text-secondary)]">
              {AREAS.map((a) => (
                <li key={a.name}>{a.name}</li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-[11px] tracking-[0.2em] uppercase text-[var(--text-tertiary)]">Contact</div>
            <div className="mt-4 space-y-2 text-[13px]">
              <a href="tel:6464236350" className="flex items-center gap-2 font-semibold hover:underline">
                <Phone className="h-4 w-4" /> (646) 423-6350
              </a>
              <div className="text-[var(--text-secondary)]">bookings@thenotarygiant.com</div>
              <div className="text-[var(--text-secondary)]">New York, NY • Mobile across 5 boroughs + Nassau</div>
            </div>
            <div className="mt-6 rounded-2xl bg-[var(--stone)] p-4 border border-[var(--line)]">
              <div className="text-[12px] font-semibold flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" /> Confirmed before travel
              </div>
              <div className="mt-1 text-[12px] text-[var(--text-secondary)]">Time, place, documents, and ID verified upfront. No surprises, no second trips.</div>
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--line)] py-6">
          <div className="mx-auto max-w-[1320px] px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-3 text-[11px] text-[var(--text-tertiary)]">
            <span>© 2026 The Notary Giant® PSC. Federal Trademark. All rights reserved.</span>
            <span className="flex items-center gap-4">
              <a href="#" className="hover:text-[var(--text-primary)]">Privacy</a>
              <span className="h-3 w-px bg-[var(--line)]" />
              <span>Commissioned NY Notaries • Since 2002</span>
            </span>
          </div>
        </div>
      </footer>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] rounded-full bg-[var(--ink)] text-white px-6 py-3 text-[13px] font-medium shadow-[0_12px_32px_rgba(0,0,0,0.25)] flex items-center gap-2">
          <Check className="h-4 w-4 text-emerald-400" />
          {toast}
        </div>
      )}
    </div>
  );
}

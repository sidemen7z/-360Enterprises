import { useState, useEffect, useRef, useCallback, Suspense, lazy } from "react";
import Spline from "@splinetool/react-spline";

/* ─── Data ─────────────────────────────────────────────────── */
const NAV_LINKS = ["Home", "About", "Services", "Contact"];

const WHATSAPP_NUMBER = "919139459221"; // Primary WhatsApp number

const SERVICES = [
  {
    icon: "💻",
    title: "Laptop Repair",
    desc: "Expert diagnosis for all brands. Motherboard-level repairs, screen replacement, keyboard fixes, hinge repair and more.",
    category: "repair",
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800",
  },
  {
    icon: "📱",
    title: "Mobile Repair",
    desc: "Screen replacements, battery swaps, water damage recovery, charging port repair, and software fixes for all smartphones.",
    category: "repair",
    image: "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&q=80&w=800",
  },
  {
    icon: "🖥️",
    title: "Screen Replacement",
    desc: "Cracked or broken screens replaced with OEM-quality parts. LCD & LED panels for laptops and desktops. Same-day service available.",
    category: "repair",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800",
  },
  {
    icon: "📷",
    title: "CCTV Installation",
    desc: "Professional CCTV setup for homes and businesses. HD cameras, DVR/NVR setup, remote viewing, and 24/7 monitoring solutions.",
    category: "installation",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=800",
  },
  {
    icon: "🪟",
    title: "Windows Formatting & Software Installation",
    desc: "Fast OS reinstallation (Windows/Linux), driver setup, MS Office, software configuration to bring your device back to peak performance.",
    category: "software",
    image: "/services/windows-formatting.png",
  },
  {
    icon: "🔧",
    title: "Motherboard Repair",
    desc: "Advanced PCB-level diagnostics and micro-soldering repairs for laptops & desktops. We fix what others can't.",
    category: "repair",
    image: "/services/motherboard-repair.png",
  },
  {
    icon: "🔌",
    title: "All Type of Accessories",
    desc: "Chargers, cables, adapters, laptop bags, mouse, keyboards, headphones, phone cases, screen guards and all types of computer & mobile accessories.",
    category: "sales",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800",
  },
  {
    icon: "📶",
    title: "All SIM Card & Recharge",
    desc: "New SIM cards for Jio, Airtel, Vi, BSNL and all networks. Mobile & DTH recharge services available. Quick activation guaranteed.",
    category: "services",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=800",
  },
  {
    icon: "📄",
    title: "Xerox & Printing",
    desc: "Black & white and color photocopy, printing, scanning, and document services. Affordable rates with quick turnaround.",
    category: "services",
    image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80&w=800",
  },
  {
    icon: "💸",
    title: "Money Transfer",
    desc: "Quick and secure money transfer services. Send money anywhere in India through trusted platforms. Instant confirmation.",
    category: "services",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=800",
  },
  {
    icon: "🛡️",
    title: "Antivirus Sale & Support",
    desc: "Licensed antivirus software installation and support. Protection from viruses, malware, ransomware. Quick Heal, Kaspersky, Norton available.",
    category: "software",
    image: "/services/antivirus-support.png",
  },
  {
    icon: "💼",
    title: "Second Hand Laptops & Computers",
    desc: "Best condition refurbished laptops from HP, Dell, Lenovo, Apple and more. Tested, certified, and warranty included. Budget-friendly options.",
    category: "sales",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
  },
  {
    icon: "⚙️",
    title: "Laptop Accessories & Spare Parts",
    desc: "Genuine spare parts — batteries, keyboards, screens, RAM, SSD, HDD, hinges, adapters for all laptop brands. Quick delivery.",
    category: "sales",
    image: "https://images.unsplash.com/photo-1588505794453-847247c7674d?auto=format&fit=crop&q=80&w=800",
  },
  {
    icon: "🖱️",
    title: "Desktop & Laptop Hardware Support",
    desc: "RAM upgrades, SSD installation, graphic card setup, fan cleaning, thermal paste replacement, and complete hardware diagnostics.",
    category: "repair",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
  },
  {
    icon: "🏪",
    title: "System Sales & Purchase",
    desc: "Buy & sell new and pre-owned desktop systems, laptop assemblies, and complete computer setups. Best market rates guaranteed.",
    category: "sales",
    image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&q=80&w=800",
  },
];

const STATS = [
  { num: "5000+", label: "Devices Repaired" },
  { num: "4+", label: "Years Experience" },
  { num: "98%", label: "Satisfaction Rate" },
  { num: "150+", label: "Clients/Month" },
];

const TESTIMONIALS = [
  {
    name: "Afsar Shaikh",
    text: "Excellent service! Got my laptop fixed in just 2 hours. Very professional team. They also helped me with Windows formatting at a very reasonable price.",
    rating: 5,
  },
  {
    name: "Rahul Deshmukh",
    text: "Best repair center in Pune. Fair pricing and quick turnaround. Bought a second-hand laptop from them — it's running perfectly! Highly recommended!",
    rating: 5,
  },
  {
    name: "Priya Kulkarni",
    text: "They replaced my phone screen perfectly. Great quality parts and customer service. Also got my SIM activated here — truly a one-stop shop!",
    rating: 5,
  },
  {
    name: "Sanket Patil",
    text: "Got CCTV installed for my shop. Very neat wiring, great camera quality, and they set up the mobile app for remote viewing. Professional work!",
    rating: 5,
  },
  {
    name: "Neha Joshi",
    text: "My laptop motherboard was dead, other shops said it can't be fixed. 360 Enterprises repaired it in 2 days. Amazing technicians!",
    rating: 5,
  },
];

const SERVICE_CATEGORIES = [
  { key: "all", label: "All Services" },
  { key: "repair", label: "Repair" },
  { key: "sales", label: "Sales" },
  { key: "software", label: "Software" },
  { key: "services", label: "Services" },
  { key: "installation", label: "Installation" },
];

/* ─── Hooks ─────────────────────────────────────────────────── */
function useWindowSize() {
  const [w, setW] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return w;
}

function useIntersect(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function AnimatedNumber({ target, visible }) {
  const [count, setCount] = useState(0);
  const num = parseInt(target);
  const suffix = target.replace(/[0-9]/g, "");
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1800, 1);
      setCount(Math.floor(p * num));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, num]);
  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

/* ─── WhatsApp Message Builder ─── */
function buildWhatsAppMessage({ name, phone, service, device, message }) {
  const lines = [
    `🔧 *NEW SERVICE REQUEST*`,
    `━━━━━━━━━━━━━━━━━━`,
    ``,
    `👤 *Name:* ${name}`,
    `📞 *Phone:* ${phone}`,
    `🛠️ *Service:* ${service || "Not specified"}`,
    `💻 *Device:* ${device || "Not specified"}`,
    ``,
    `📝 *Message:*`,
    message || "No additional details provided.",
    ``,
    `━━━━━━━━━━━━━━━━━━`,
    `📍 Via 360 Enterprises Website`,
    `🕐 ${new Date().toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    })}`,
  ];
  return lines.join("\n");
}

/* ─── Main Component ──────────────────────────────────────────── */
export default function App() {
  const w = useWindowSize();
  const isMobile = w < 640;
  const isTablet = w < 1024;

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeCategory, setActiveCategory] = useState("all");
  const [showAllServices, setShowAllServices] = useState(false);

  // Contact form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    device: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [statsRef, statsVisible] = useIntersect(0.2);
  const [servicesRef, servicesVisible] = useIntersect(0.05);
  const [aboutRef, aboutVisible] = useIntersect(0.1);
  const [testimonialRef, testimonialVisible] = useIntersect(0.1);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      for (const s of ["home", "about", "services", "contact"]) {
        const el = document.getElementById(s);
        if (el) {
          const { top, bottom } = el.getBoundingClientRect();
          if (top <= 120 && bottom >= 120) {
            setActiveSection(s);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const iv = setInterval(
      () => setActiveTestimonial((a) => (a + 1) % TESTIMONIALS.length),
      4000
    );
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const msg = buildWhatsAppMessage(formData);
      const encodedMsg = encodeURIComponent(msg);
      const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`;
      window.open(waUrl, "_blank");
      setFormSubmitted(true);
      setTimeout(() => setFormSubmitted(false), 5000);
    },
    [formData]
  );

  /* Filter services by category */
  const filteredServices =
    activeCategory === "all"
      ? SERVICES
      : SERVICES.filter((s) => s.category === activeCategory);

  const displayedServices = showAllServices
    ? filteredServices
    : filteredServices.slice(0, isMobile ? 6 : 9);

  /* ── Responsive helpers ── */
  const px = isMobile ? "16px" : isTablet ? "32px" : "5%";
  const secPad = isMobile
    ? "60px 16px"
    : isTablet
      ? "80px 32px"
      : "100px 5%";
  const h2Size = isMobile ? 38 : isTablet ? 48 : 56;
  const heroSize = isMobile ? 44 : isTablet ? 60 : 78;

  const TICKER_ITEMS = [
    "LAPTOP REPAIR",
    "MOBILE REPAIR",
    "CCTV INSTALLATION",
    "WINDOWS FORMATTING",
    "ACCESSORIES",
    "SIM CARD & RECHARGE",
    "XEROX",
    "MONEY TRANSFER",
    "ANTIVIRUS",
    "SECOND HAND LAPTOPS",
    "SPARE PARTS",
    "HARDWARE SUPPORT",
    "SYSTEM SALES",
    "SCREEN REPLACEMENT",
    "MOTHERBOARD REPAIR",
  ];

  return (
    <div
      style={{
        fontFamily: "var(--font-body)",
        background: "var(--bg-dark)",
        color: "#fff",
        overflowX: "hidden",
      }}
    >
      {/* ══ NAVBAR ══ */}
      <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            cursor: "pointer",
          }}
          onClick={() => scrollTo("home")}
        >
          <div
            style={{
              width: 36,
              height: 36,
              background: "var(--primary)",
              clipPath:
                "polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              fontWeight: 700,
              fontFamily: "var(--font-heading)",
              color: "#fff",
              flexShrink: 0,
            }}
          >
            360
          </div>
          <div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: isMobile ? 17 : 22,
                letterSpacing: 3,
                lineHeight: 1,
              }}
            >
              ENTERPRISES
            </div>
            {!isMobile && (
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 9,
                  color: "var(--accent)",
                  letterSpacing: 2,
                  textTransform: "uppercase",
                }}
              >
                Every Solution At One Destination
              </div>
            )}
          </div>
        </div>

        {!isTablet && (
          <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
            {NAV_LINKS.map((l) => (
              <button
                key={l}
                className={`nav-link${activeSection === l.toLowerCase() ? " active" : ""
                  }`}
                onClick={() => scrollTo(l.toLowerCase())}
              >
                {l}
              </button>
            ))}
            <button
              className="btn-primary"
              onClick={() => scrollTo("contact")}
            >
              Book Service
            </button>
          </div>
        )}

        {isTablet && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              gap: 5,
              padding: 8,
            }}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  width: 24,
                  height: 2,
                  background: "#fff",
                  display: "block",
                  transition: "all .3s",
                  transform: menuOpen
                    ? i === 0
                      ? "rotate(45deg) translate(5px,5px)"
                      : i === 2
                        ? "rotate(-45deg) translate(5px,-5px)"
                        : "scaleX(0)"
                    : "none",
                }}
              />
            ))}
          </button>
        )}
      </nav>

      {/* ── Mobile Menu ── */}
      {isTablet && menuOpen && (
        <div className="mobile-menu">
          {NAV_LINKS.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l.toLowerCase())}
              className="mobile-menu-link"
              style={{ fontSize: isMobile ? 36 : 48 }}
            >
              {l}
            </button>
          ))}
          <button className="btn-primary" onClick={() => scrollTo("contact")}>
            Book Service
          </button>
        </div>
      )}

      {/* ══ HERO ══ */}
      <section id="home" className="hero" style={{
        backgroundImage: `linear-gradient(rgba(5, 5, 5, 0.85), rgba(5, 5, 5, 0.95)), url(https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&q=80&w=1600)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="hero-grid-bg" />
        <div
          style={{
            position: "absolute",
            top: "-20%",
            right: "-10%",
            width: "60vw",
            height: "80vh",
            background:
              "radial-gradient(ellipse,rgba(255,45,45,.12) 0%,transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-10%",
            left: "-10%",
            width: "40vw",
            height: "50vh",
            background:
              "radial-gradient(ellipse,rgba(255,107,0,.07) 0%,transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            width: "100%",
            maxWidth: 1200,
            margin: "0 auto",
            padding: isMobile
              ? "100px 16px 60px"
              : isTablet
                ? "110px 32px 80px"
                : "120px 5% 80px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isTablet ? "1fr" : "1fr 1fr",
              gap: isTablet ? 40 : 60,
              alignItems: "center",
            }}
          >
            <div>
              <div className="anim-up-0 badge" style={{ marginBottom: 20 }}>
                <span className="badge-dot" />
                <span className="badge-text">
                  Open Now · Pune, Maharashtra
                </span>
              </div>

              <h1
                className="anim-up-1"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: heroSize,
                  lineHeight: 0.92,
                  letterSpacing: 2,
                  marginBottom: 18,
                }}
              >
                Your Complete
                <br />
                <span className="gradient-text">IT Solution</span>
                <br />
                Center
              </h1>

              <p
                className="anim-up-2"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 300,
                  fontSize: isMobile ? 15 : 17,
                  color: "var(--text-muted)",
                  lineHeight: 1.7,
                  marginBottom: 32,
                  maxWidth: 480,
                }}
              >
                Pune's most trusted center for laptop & mobile repairs, CCTV
                installation, accessories, second-hand laptops, SIM cards,
                xerox, money transfer & more — all under one roof!
              </p>

              <div
                className="anim-up-3"
                style={{ display: "flex", gap: 14, flexWrap: "wrap" }}
              >
                <button
                  className="btn-primary"
                  onClick={() => window.open("tel:9139459221")}
                >
                  📞 Call Now
                </button>
                <button
                  className="btn-outline"
                  onClick={() => scrollTo("services")}
                >
                  View Services
                </button>
              </div>

              <div
                className="anim-up-3"
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  gap: isMobile ? 10 : 28,
                  marginTop: 36,
                  flexWrap: "wrap",
                }}
              >
                {[
                  ["📍", "Wadgaon Sheri, Pune"],
                  ["⏰", "Mon–Sat: 10AM – 8PM"],
                  ["📞", "+91 91394 59221"],
                ].map(([icon, text]) => (
                  <div
                    key={text}
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <span>{icon}</span>
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 12,
                        color: "var(--text-dim)",
                      }}
                    >
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {!isTablet && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                  overflow: "visible",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    maxWidth: 550,
                    height: 500,
                  }}
                >
                  <Suspense
                    fallback={
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "rgba(255,255,255,.3)",
                          fontSize: 14,
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        Loading 3D...
                      </div>
                    }
                  >
                    <Spline
                      scene="https://prod.spline.design/GnHmmYaecwIV0ptE/scene.splinecode"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </Suspense>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Ticker ── */}
      <div className="ticker-bar">
        <div className="tkr">
          {[0, 1].map((k) => (
            <span key={k} className="ticker-text">
              {TICKER_ITEMS.join("  ✦  ")}  ✦
            </span>
          ))}
        </div>
      </div>

      {/* ══ STATS ══ */}
      <section
        ref={statsRef}
        style={{
          padding: isMobile ? "50px 16px" : "70px 5%",
          background: "#0d0d0d",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)",
              gap: 2,
            }}
          >
            {STATS.map(({ num, label }, i) => (
              <div
                key={label}
                className="stat-item"
                style={{
                  borderLeft:
                    (isMobile ? i % 2 !== 0 : i > 0)
                      ? "1px solid var(--border)"
                      : "none",
                  borderTop:
                    isMobile && i >= 2 ? "1px solid var(--border)" : "none",
                  opacity: statsVisible ? 1 : 0,
                  transform: statsVisible ? "none" : "translateY(30px)",
                  transition: `all .6s ${i * 0.12}s ease`,
                }}
              >
                <div className="stat-number">
                  <AnimatedNumber target={num} visible={statsVisible} />
                </div>
                <div className="stat-label">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SERVICES ══ */}
      <section id="services" style={{ padding: secPad, background: "#0a0a0a" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            ref={servicesRef}
            style={{
              marginBottom: isMobile ? 24 : 40,
              opacity: servicesVisible ? 1 : 0,
              transform: servicesVisible ? "none" : "translateY(30px)",
              transition: "all .6s",
            }}
          >
            <div className="section-line" style={{ marginBottom: 14 }} />
            <div className="section-tag">What We Do</div>
            <h2
              className="section-title"
              style={{ fontSize: h2Size, marginBottom: isMobile ? 20 : 28 }}
            >
              Our Services
            </h2>

            {/* Category Filter */}
            <div
              style={{
                display: "flex",
                gap: isMobile ? 6 : 10,
                flexWrap: "wrap",
              }}
            >
              {SERVICE_CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => {
                    setActiveCategory(cat.key);
                    setShowAllServices(false);
                  }}
                  style={{
                    background:
                      activeCategory === cat.key
                        ? "var(--primary)"
                        : "rgba(255,255,255,.05)",
                    color:
                      activeCategory === cat.key
                        ? "#fff"
                        : "rgba(255,255,255,.6)",
                    border:
                      activeCategory === cat.key
                        ? "1px solid var(--primary)"
                        : "1px solid rgba(255,255,255,.1)",
                    padding: isMobile ? "7px 14px" : "8px 20px",
                    borderRadius: 100,
                    fontFamily: "var(--font-heading)",
                    fontSize: isMobile ? 11 : 12,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "all .3s",
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : isTablet
                  ? "1fr 1fr"
                  : "repeat(3,1fr)",
              gap: isMobile ? 14 : 18,
            }}
          >
            {displayedServices.map((s, i) => (
              <div
                key={s.title}
                className="service-card"
                style={{
                  opacity: servicesVisible ? 1 : 0,
                  transform: servicesVisible ? "none" : "translateY(40px)",
                  transition: `all .6s ${i * 0.06}s ease`,
                  backgroundImage: `linear-gradient(to bottom, rgba(10, 10, 10, 0.3), rgba(10, 10, 10, 0.85)), url(${s.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  minHeight: "280px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                }}
                onClick={() => {
                  setFormData((prev) => ({ ...prev, service: s.title }));
                  scrollTo("contact");
                }}
              >
                <div style={{ position: "relative", zIndex: 2 }}>
                  <div className="service-icon" style={{ background: "var(--primary)", color: "#fff" }}>{s.icon}</div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <div className="learn-more">
                    Get Quote →
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Show More/Less */}
          {filteredServices.length > (isMobile ? 6 : 9) && (
            <div style={{ textAlign: "center", marginTop: 32 }}>
              <button
                className="btn-outline"
                onClick={() => setShowAllServices(!showAllServices)}
              >
                {showAllServices
                  ? "Show Less"
                  : `Show All ${filteredServices.length} Services`}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ══ ABOUT ══ */}
      <section
        id="about"
        style={{
          padding: secPad,
          background: "#0d0d0d",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "50%",
            height: "100%",
            background:
              "radial-gradient(ellipse at right,rgba(255,45,45,.06) 0%,transparent 60%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            ref={aboutRef}
            style={{
              display: "grid",
              gridTemplateColumns: isTablet ? "1fr" : "1fr 1fr",
              gap: isTablet ? 44 : 80,
              alignItems: "center",
            }}
          >
            <div
              style={{
                opacity: aboutVisible ? 1 : 0,
                transform: aboutVisible ? "none" : "translateX(-40px)",
                transition: "all .8s ease",
              }}
            >
              <div className="section-line" style={{ marginBottom: 14 }} />
              <div className="section-tag">Our Story</div>
              <h2
                className="section-title"
                style={{ fontSize: h2Size, marginBottom: 22 }}
              >
                About 360
                <br />
                Enterprises
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 300,
                  color: "var(--text-muted)",
                  lineHeight: 1.9,
                  fontSize: 15,
                  marginBottom: 16,
                }}
              >
                Located in Wadgaon Sheri, Pune, 360 Enterprises has been Pune's
                go-to destination for everything IT — for over 4 years. We're
                not just a repair shop; we're a complete solution center
                offering laptop & mobile repairs, CCTV installation, all types
                of accessories, SIM cards, recharge, xerox, money transfer,
                second-hand laptops, and much more.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 300,
                  color: "var(--text-muted)",
                  lineHeight: 1.9,
                  fontSize: 15,
                  marginBottom: 30,
                }}
              >
                Our certified technicians use genuine parts and follow strict
                quality control. We believe in transparent pricing, quick
                turnarounds, and making technology accessible for everyone.
                Whether you need a quick repair or a full system setup — we've
                got you covered!
              </p>
              <div
                style={{ display: "flex", gap: 14, flexWrap: "wrap" }}
              >
                <button
                  className="btn-primary"
                  onClick={() => scrollTo("contact")}
                >
                  Get In Touch
                </button>
                <button
                  className="btn-outline"
                  onClick={() =>
                    window.open(
                      "https://instagram.com/360_enterprises",
                      "_blank"
                    )
                  }
                >
                  📸 Instagram
                </button>
              </div>
            </div>

            <div
              style={{
                opacity: aboutVisible ? 1 : 0,
                transform: aboutVisible ? "none" : "translateX(40px)",
                transition: "all .8s .2s ease",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                {[
                  [
                    "🏆",
                    "Quality Parts",
                    "OEM & genuine replacement parts only",
                  ],
                  ["⚡", "Fast Service", "Most repairs done same day"],
                  ["💰", "Fair Pricing", "Transparent quotes, no hidden fees"],
                  ["🏠", "Doorstep", "Home service available on request"],
                  [
                    "🔒",
                    "Warranty",
                    "Service warranty on all repairs & products",
                  ],
                  [
                    "🎯",
                    "One Stop Shop",
                    "15+ services all under one roof",
                  ],
                ].map(([icon, title, desc]) => (
                  <div
                    key={title}
                    className="feature-card"
                    style={{ padding: isMobile ? 16 : 22 }}
                  >
                    <div style={{ fontSize: 26, marginBottom: 10 }}>
                      {icon}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: 15,
                        fontWeight: 600,
                        letterSpacing: 1,
                        marginBottom: 5,
                      }}
                    >
                      {title}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 13,
                        color: "var(--text-dim)",
                        lineHeight: 1.6,
                      }}
                    >
                      {desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section style={{ padding: secPad, background: "#0a0a0a" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            ref={testimonialRef}
            style={{
              textAlign: "center",
              marginBottom: isMobile ? 32 : 52,
              opacity: testimonialVisible ? 1 : 0,
              transform: testimonialVisible ? "none" : "translateY(30px)",
              transition: "all .6s",
            }}
          >
            <div
              className="section-line"
              style={{ margin: "0 auto 14px" }}
            />
            <div className="section-tag">What People Say</div>
            <h2 className="section-title" style={{ fontSize: h2Size }}>
              Customer Reviews
            </h2>
          </div>

          <div
            style={{
              maxWidth: 660,
              margin: "0 auto",
              textAlign: "center",
              opacity: testimonialVisible ? 1 : 0,
              transition: "all .8s .3s",
            }}
          >
            <div className="testimonial-card">
              <div
                style={{
                  fontSize: 52,
                  color: "var(--primary)",
                  fontFamily: "Georgia",
                  lineHeight: 1,
                  marginBottom: 14,
                  opacity: 0.4,
                }}
              >
                "
              </div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 300,
                  fontSize: isMobile ? 15 : 18,
                  color: "rgba(255,255,255,.8)",
                  lineHeight: 1.8,
                  marginBottom: 22,
                }}
              >
                {TESTIMONIALS[activeTestimonial].text}
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 4,
                  marginBottom: 10,
                }}
              >
                {Array(5)
                  .fill(null)
                  .map((_, i) => (
                    <span key={i} style={{ color: "#ff8c00", fontSize: 17 }}>
                      ★
                    </span>
                  ))}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: 15,
                  letterSpacing: 2,
                  color: "var(--accent)",
                }}
              >
                — {TESTIMONIALS[activeTestimonial].name}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 8,
                marginTop: 18,
              }}
            >
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  style={{
                    width: i === activeTestimonial ? 26 : 8,
                    height: 8,
                    borderRadius: 4,
                    background:
                      i === activeTestimonial ? "var(--primary)" : "#333",
                    border: "none",
                    cursor: "pointer",
                    transition: "all .3s",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ CONTACT ══ */}
      <section id="contact" style={{ padding: secPad, background: "#0d0d0d" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: isMobile ? 32 : 52 }}>
            <div className="section-line" style={{ marginBottom: 14 }} />
            <div className="section-tag">Reach Out</div>
            <h2 className="section-title" style={{ fontSize: h2Size }}>
              Contact Us
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 300,
                color: "var(--text-muted)",
                fontSize: 15,
                marginTop: 12,
                maxWidth: 500,
                lineHeight: 1.7,
              }}
            >
              Fill in your details below and hit send — it will directly open
              WhatsApp with a pre-filled message to our number. Quick &
              convenient!
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isTablet ? "1fr" : "1fr 1fr",
              gap: isTablet ? 44 : 60,
            }}
          >
            {/* Left: Contact Info */}
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 18,
                  marginBottom: 28,
                }}
              >
                {[
                  {
                    icon: "📍",
                    label: "Address",
                    val: "Ganesh Nagar Rd, Hanuman Nagar, Wadgaon Sheri, Pune 411014",
                    href: "https://www.google.com/maps/search/360+Enterprises+Wadgaon+Sheri+Pune/@18.5533,73.9308,15z",
                  },
                  {
                    icon: "📞",
                    label: "Phone",
                    val: "+91 91394 59221",
                    href: "tel:9139459221",
                  },
                  {
                    icon: "⏰",
                    label: "Hours",
                    val: "Mon – Sat: 10:00 AM – 8:00 PM",
                    href: null,
                  },
                  {
                    icon: "📸",
                    label: "Instagram",
                    val: "@360_enterprises",
                    href: "https://instagram.com/360_enterprises",
                  },
                  {
                    icon: "💬",
                    label: "WhatsApp",
                    val: "+91 82084 79621",
                    href: `https://wa.me/${WHATSAPP_NUMBER}`,
                  },
                ].map(({ icon, label, val, href }) => {
                  const Row = (
                    <div
                      className="contact-info-row"
                      style={{
                        cursor: href ? "pointer" : "default",
                        borderRadius: 10,
                        padding: "10px 12px",
                        margin: "-10px -12px",
                        transition: "background 0.25s",
                      }}
                      onMouseEnter={(e) => {
                        if (href) e.currentTarget.style.background = "rgba(255,45,45,0.07)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <div className="contact-icon-box">{icon}</div>
                      <div>
                        <div
                          style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: 11,
                            letterSpacing: 2,
                            color: "var(--text-dim)",
                            textTransform: "uppercase",
                            marginBottom: 3,
                          }}
                        >
                          {label}
                        </div>
                        <div
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: 14,
                            color: href ? "rgba(255,255,255,.9)" : "rgba(255,255,255,.8)",
                            lineHeight: 1.5,
                            textDecoration: "none",
                          }}
                        >
                          {val}
                          {href && (
                            <span style={{ marginLeft: 6, fontSize: 11, color: "var(--primary)", verticalAlign: "middle" }}>
                              ↗
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );

                  return href ? (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith("tel") ? "_self" : "_blank"}
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none", color: "inherit", display: "block" }}
                    >
                      {Row}
                    </a>
                  ) : (
                    <div key={label}>{Row}</div>
                  );
                })}
              </div>
              <button
                className="btn-primary"
                onClick={() => window.open("tel:9139459221")}
                style={{ width: "100%", marginBottom: 12, justifyContent: "center" }}
              >
                📞 Call Now
              </button>
              <button
                className="btn-whatsapp"
                onClick={() =>
                  window.open(
                    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                      "Hi! I'm interested in your services. Please share more details."
                    )}`,
                    "_blank"
                  )
                }
              >
                💬 WhatsApp Us Directly
              </button>

              {/* Google Maps Embed */}
              <div
                style={{
                  marginTop: 24,
                  borderRadius: "var(--radius)",
                  overflow: "hidden",
                  border: "1px solid var(--border-light)",
                }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.5!2d73.93!3d18.56!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDMzJzM2LjAiTiA3M8KwNTUnNDguMCJF!5e0!3m2!1sen!2sin!4v1700000000000"
                  width="100%"
                  height="200"
                  style={{ border: 0, display: "block", filter: "invert(90%) hue-rotate(180deg)" }}
                  loading="lazy"
                  title="360 Enterprises Location"
                />
              </div>
            </div>

            {/* Right: Contact Form */}
            {formSubmitted ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div className="form-success">
                  <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                  <p>Message sent to WhatsApp!</p>
                  <p
                    style={{
                      marginTop: 8,
                      fontSize: 14,
                      color: "var(--text-muted)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    We'll reply within a few minutes.
                  </p>
                  <button
                    className="btn-outline"
                    onClick={() => setFormSubmitted(false)}
                    style={{ marginTop: 20 }}
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleFormSubmit}
                style={{ display: "flex", flexDirection: "column", gap: 14 }}
              >
                {/* Name */}
                <div>
                  <label className="form-label">Your Name *</label>
                  <input
                    className="contact-input"
                    type="text"
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={(e) => handleFormChange("name", e.target.value)}
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="form-label">Phone Number *</label>
                  <input
                    className="contact-input"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => handleFormChange("phone", e.target.value)}
                    required
                  />
                </div>

                {/* Service Selection */}
                <div>
                  <label className="form-label">Service Required *</label>
                  <select
                    className="contact-input"
                    style={{ cursor: "pointer" }}
                    value={formData.service}
                    onChange={(e) =>
                      handleFormChange("service", e.target.value)
                    }
                    required
                  >
                    <option value="">Select a service</option>
                    {SERVICES.map((s) => (
                      <option key={s.title} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Device Type */}
                <div>
                  <label className="form-label">Device / Brand</label>
                  <input
                    className="contact-input"
                    type="text"
                    placeholder="e.g. HP EliteBook 840, Samsung Galaxy S22"
                    value={formData.device}
                    onChange={(e) => handleFormChange("device", e.target.value)}
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="form-label">Describe Your Issue *</label>
                  <textarea
                    className="contact-input"
                    rows={isMobile ? 3 : 4}
                    placeholder="Tell us about your issue or what you need..."
                    value={formData.message}
                    onChange={(e) =>
                      handleFormChange("message", e.target.value)
                    }
                    style={{ resize: "vertical" }}
                    required
                  />
                </div>

                {/* WhatsApp Submit Button */}
                <button
                  type="submit"
                  className="btn-whatsapp"
                  style={{ marginTop: 4 }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Send via WhatsApp →
                </button>

                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 12,
                    color: "var(--text-faint)",
                    textAlign: "center",
                    lineHeight: 1.6,
                    marginTop: 4,
                  }}
                >
                  💡 Clicking "Send via WhatsApp" will open WhatsApp with your
                  message pre-filled and send it directly to our team.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="footer">
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 14,
            textAlign: isMobile ? "center" : "left",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 28,
                height: 28,
                background: "var(--primary)",
                clipPath:
                  "polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
                fontFamily: "var(--font-heading)",
                color: "#fff",
                flexShrink: 0,
              }}
            >
              360
            </div>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 16,
                letterSpacing: 3,
              }}
            >
              ENTERPRISES
            </span>
          </div>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              color: "var(--text-faint)",
            }}
          >
            © 2025 360 Enterprises, Pune. All rights reserved.
          </div>
          <div
            style={{
              display: "flex",
              gap: 16,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {["📞 Call", "💬 WhatsApp", "📸 Instagram"].map((item, i) => (
              <button
                key={item}
                onClick={() => {
                  if (i === 0) window.open("tel:9139459221");
                  else if (i === 1)
                    window.open(`https://wa.me/${WHATSAPP_NUMBER}`, "_blank");
                  else
                    window.open(
                      "https://instagram.com/360_enterprises",
                      "_blank"
                    );
                }}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  color: "var(--text-dim)",
                  transition: "color .3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--accent)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--text-dim)")
                }
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </footer>

      {/* ── Floating WhatsApp ── */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
          "Hi! I'm interested in your services at 360 Enterprises. Please share details."
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Chat on WhatsApp"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="white"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
}

import React from "react";

/**
 * PUBLIC_INTERFACE
 * LandingPage - Modern, adaptive React landing for ChatEase
 */
function LandingPage() {
  // Scroll to a target section smoothly by ID
  const scrollToSection = (id) => (e) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target)
      target.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  // Feature card data
  const features = [
    {
      icon: "💬",
      title: "Natural, Human-like Chat",
      desc: "Converse with an AI that feels like texting a real friend. Experience fluid, intuitive interactions.",
    },
    {
      icon: "⚡",
      title: "Instant Start, No Login",
      desc: "Jump into the conversation—no registration or sign-up needed. Privacy and ease by default.",
    },
    {
      icon: "🌗",
      title: "Light & Dark Mode",
      desc: "Switch styles instantly for comfort, day or night. Adaptive gradients, fonts, and colors.",
    },
    {
      icon: "✨",
      title: "Brainstorm & Learn",
      desc: "Generate ideas, boost your English, or get quick answers—your smart AI partner helps you grow.",
    }
  ];

  // Footer links
  const footerLinks = [
    { label: "About", href: "#about" },
    { label: "Privacy", href: "#privacy" },
    { label: "Contact", href: "mailto:feedback@chatease.app" }
  ];

  // Hero illustration - chat bubble with spark
  function HeroIllo() {
    return (
      <svg
        viewBox="0 0 130 105"
        width="180"
        height="115"
        aria-label="Chat bubble with spark"
        style={{
          filter: "drop-shadow(0 6px 40px #4F8CFF33)",
          display: "block"
        }}
      >
        <defs>
          <linearGradient id="bg-grad" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#4F8CFF" />
            <stop offset="1" stopColor="#26d0ff" />
          </linearGradient>
        </defs>
        <ellipse cx="65" cy="48" rx="58" ry="41"
          fill="url(#bg-grad)"
          opacity="0.89"
        />
        <ellipse
          cx="65"
          cy="54"
          rx="47"
          ry="32"
          fill="#fff"
          opacity="0.9"
        />
        {/* Chat tail */}
        <path d="M40 78 Q45 95 62 88 Q54 83 62 75 L50 75 Q45 75 40 78"
              fill="#fff" opacity="0.91" />
        {/* Spark */}
        <circle cx="105" cy="25" r="7" fill="#26d0ff" opacity="0.75" />
        <circle cx="105" cy="25" r="4" fill="#fff" opacity="0.8" />
        {/* Text dots */}
        <circle cx="58" cy="64" r="4" fill="#B8D8FF" />
        <circle cx="72" cy="65" r="4" fill="#4F8CFF" />
        <circle cx="86" cy="64" r="4" fill="#B8D8FF" />
      </svg>
    );
  }

  // Inline extra style for the LandingPage
  const extraLandingCSS = `
  .cease-bg-gradient {
    min-height: 100vh;
    width: 100vw;
    background: linear-gradient(120deg, #172144 0%, #3058b9 60%, #00e8ff 100%);
    transition: background 0.36s;
  }
  body.light .cease-bg-gradient {
    background: linear-gradient(120deg, #f7fbff 3%, #ddebfa 60%, #85e6ff 100%);
  }
  .cease-content-main {
    min-height: 100vh;
    display: flex; flex-direction: column;
    justify-content: center; align-items: center;
    width: 100vw;
    padding-top: 94px;
    box-sizing: border-box;
    font-family: 'Inter','Segoe UI', 'Arial', sans-serif;
    transition: color 0.34s;
  }
  .cease-hero {
    display: flex; flex-direction: column; align-items: center; text-align: center;
    justify-content: center;
    margin-bottom: 64px;
    gap: 32px;
  }
  .cease-hero-headline {
    font-size: 2.86rem;
    font-weight: 800;
    letter-spacing: -0.025em;
    line-height: 1.12;
    color: #fff;
    text-shadow: 0 2px 18px #1a7fff23;
    transition: color 0.3s;
  }
  body.light .cease-hero-headline {
    color: #162743;
    text-shadow: 0 2px 9px #71c8ffe2;
  }
  .cease-hero-sub {
    color: #e0ebff;
    font-size: 1.17rem;
    margin-bottom: 9px;
    transition: color 0.3s;
    font-weight: 500;
    line-height: 1.52; max-width: 650px; margin-left:auto; margin-right:auto;
  }
  body.light .cease-hero-sub {
    color: #537eb2;
  }
  .cease-hero-btn {
    font-size: 1.18rem;
    font-weight: 700;
    padding: 15px 46px;
    border-radius: 32px;
    background: linear-gradient(90deg,#2253ff 10%,#10deff 80%);
    border: none;
    color: #fff;
    box-shadow: 0 4px 32px #16bfff22;
    margin-top: 8px;
    letter-spacing: 0.01em;
    cursor: pointer;
    outline: none;
    transition: background .17s, box-shadow .23s, color .17s;
  }
  .cease-hero-btn:focus, .cease-hero-btn:hover {
    background: linear-gradient(85deg, #0051e1 20%, #03bcff 90%);
    color: #083a62;
    box-shadow: 0 7px 41px #3cecff3a, 0 1.4px 0 #2253ff33;
  }
  .cease-hero-illo-wrap {
    margin: 0 auto 0.5em;
    animation: cease-float 4.1s ease-in-out infinite alternate;
    will-change: transform, filter;
    max-width: 196px;
  }
  @keyframes cease-float { 0% { transform:translateY(8px); } 43% {transform:translateY(-14px);} 70%{transform:translateY(-7px);} 100%{transform:translateY(13px);} }
  .cease-features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit,minmax(215px,1fr));
    gap: 2em;
    margin: 0 auto;
    padding: 43px 0 30px 0;
    width: 100%;
    max-width: 1020px;
  }
  .cease-feature-card {
    background: rgba(255,255,255,0.10);
    border-radius: 20px;
    box-shadow: 0 4px 24px #4F8CFF15;
    border: 2px solid #4F8CFF21;
    padding: 34px 27px 24px 27px;
    display: flex; flex-direction: column; align-items: center;
    transition: border-color 0.21s, box-shadow 0.19s;
    position: relative;
    z-index: 1;
    min-height: 176px;
    font-size: 1.1rem;
  }
  .cease-feature-card:hover, .cease-feature-card:focus {
    border-color: #00e0ff;
    box-shadow: 0 9px 35px #009be52d,0 4px 18px #1cc7e648, 0 1px 0 #307fff22;
    z-index: 2;
  }
  .cease-feature-ico {
    font-size: 2.3em;
    margin-bottom: 10px;
    margin-top: -10px;
    text-shadow: 0 2px 12px #10c8ff27;
    user-select:none;
  }
  .cease-feature-title {
    font-size: 1.13em;
    font-weight: 700;
    margin-bottom: 5px;
    color: #fff;
    letter-spacing: -0.4px;
    text-align:center;
  }
  body.light .cease-feature-title {
    color: #2253ff;
  }
  .cease-feature-desc {
    font-size: 1.05em;
    color: #daeaf7;
    opacity: 0.90;
    text-align:center;
  }
  body.light .cease-feature-desc { color:#183a53; opacity: 0.90;}

  .cease-footer {
    padding: 10px 0 6px;
    width: 100vw;
    background: transparent;
    text-align: center;
    font-size: 1.06em;
    border-top: 2px solid #31e0ff23;
    margin-top: auto;
    color: #e0ebff;
    transition: color 0.22s, background 0.3s, border-top 0.22s;
    flex-shrink: 0;
  }
  body.light .cease-footer {
    background: #f6fbff;
    border-top: 1.5px solid #b7ddff7e;
    color: #2853b7;
  }
  .cease-footer-links {
    margin-bottom: 0.11em;
    font-size:0.97em;
  }
  .cease-footer-link {
    color: #51d0ff;
    text-decoration: none;
    margin-right: 1.3em;
    font-weight: 500;
    transition: color 0.17s;
  }
  .cease-footer-link:last-child {
    margin-right: 0;
  }
  .cease-footer-link:hover, .cease-footer-link:focus {
    text-decoration: underline dashed;
    color:#1979c6;
  }
  .cease-footer-copyright {
    letter-spacing: 0.01em;
    opacity: 0.85;
    margin-bottom: 0;
    padding-bottom: 0;
  }
  /* Make footer always stick to bottom using flex model on background wrapper */
  .cease-bg-gradient {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .cease-content-main {
    flex: 1 0 auto;
  }
  @media (max-width: 900px) {
    .cease-hero-headline { font-size: 2.1rem;}
    .cease-content-main { padding-top: 74px;}
    .cease-features-grid { gap:1.4em; }
    .cease-feature-card { padding:21px 11px 16px;}
  }
  @media (max-width: 580px) {
    .cease-content-main { padding-top: 68px;}
    .cease-hero-headline { font-size: 1.54rem;}
    .cease-hero-illo-wrap{ max-width: 94vw;}
    .cease-features-grid { grid-template-columns:1fr; gap:0.7em;}
    .cease-footer { font-size: 0.92em; }
  }
  `;

  return (
    <>
      <style>{extraLandingCSS}</style>
      {/* Background and Layout Wrapper */}
      <div className="cease-bg-gradient">
        <main className="cease-content-main">
          {/* HERO section */}
          <section className="cease-hero" id="hero">
            <div className="cease-hero-illo-wrap" aria-hidden="true">
              <HeroIllo />
            </div>
            <h1 className="cease-hero-headline">
              Meet <span style={{ color: "#4F8CFF", filter: "brightness(1.25)" }}>ChatEase</span>
              <div style={{
                fontSize: "0.53em",
                fontWeight: 500,
                color: "var(--text-secondary, #b8eaff)",
                marginTop: "0.31em",
                letterSpacing: "0.02em"
              }}>
                Your always-available English conversation partner<br />for practicing, brainstorming, and fun.
              </div>
            </h1>
            <div className="cease-hero-sub">
              Practice English, get quick answers, or simply chat with a friendly AI—instantly, comfortably, and without any sign-up.
            </div>
            <button className="cease-hero-btn"
              aria-label="Scroll to chat section"
              onClick={scrollToSection("chat")}
            >
              <span role="img" aria-label="chat">💬</span> Start Chatting
            </button>
          </section>
          {/* FEATURES GRID */}
          <section className="cease-features" id="features" aria-label="Features">
            <div className="cease-features-grid" role="list">
              {features.map((f, idx) => (
                <div
                  key={f.title}
                  className="cease-feature-card"
                  tabIndex={0}
                  aria-label={f.title + " feature"}
                  role="listitem"
                >
                  <div className="cease-feature-ico" aria-hidden="true">{f.icon}</div>
                  <div className="cease-feature-title">{f.title}</div>
                  <div className="cease-feature-desc">{f.desc}</div>
                </div>
              ))}
            </div>
          </section>
        </main>
        {/* FOOTER */}
        <footer className="cease-footer">
          <div className="cease-footer-links">
            {footerLinks.map((l, i) => (
              <a
                key={l.label}
                href={l.href}
                className="cease-footer-link"
                onClick={l.href.startsWith("#") ? scrollToSection(l.href.substring(1)) : undefined}
              >{l.label}</a>
            ))}
          </div>
          <div className="cease-footer-copyright">
            &copy; {new Date().getFullYear()} <strong>ChatEase</strong> by Kavia &middot; Powered by OpenAI
          </div>
        </footer>
      </div>
    </>
  );
}

export default LandingPage;

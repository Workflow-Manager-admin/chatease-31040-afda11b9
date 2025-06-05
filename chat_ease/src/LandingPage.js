import React from "react";

// PUBLIC_INTERFACE
function LandingPage() {
  /**
   * TalkBuddy full-featured marketing landing page, as per requirements.
   * Includes: Hero, Features, How it Works, Try It Now (w/ animated button), Footer,
   * color-animated background gradient, icons/illustrations, placeholder for bot animation,
   * light/dark mode styling, modern accessibility, and scroll-to section behaviors.
   */

  // Scroll to a given section by selector ID
  const scrollToSection = (id) => (e) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Animated button attention style
  const tryButtonPulseKeyframes = `
    @keyframes trybtn-pulse {
      0% { box-shadow: 0 0 0px 0 var(--tb-glow); }
      70% { box-shadow: 0 0 24px 16px var(--tb-glow-light); }
      100% { box-shadow: 0 0 0px 0 var(--tb-glow); }
    }
  `;

  // Feature list
  const features = [
    {
      icon: "💡",
      title: "Human-like Chat",
      desc: "Flows naturally – like texting a friend, not a bot.",
    },
    {
      icon: "⚡",
      title: "No Login Required",
      desc: "Start instantly – no sign-ups or account creation.",
    },
    {
      icon: "🌗",
      title: "Light & Dark Mode",
      desc: "Switch to your preferred look for eye comfort, day or night.",
    },
    {
      icon: "✨",
      title: "Brainstorm & Learn",
      desc: "Spark ideas, get instant answers, and practice English fluency.",
    },
  ];

  // How It Works steps
  const howSteps = [
    {
      step: 1, icon: "🚀", title: "Open TalkBuddy", desc: "Just load the web app — no install needed.",
    },
    {
      step: 2, icon: "💬", title: "Start Chatting", desc: "Type your message to start a conversation anytime.",
    },
    {
      step: 3, icon: "🤖", title: "Get Instant Replies", desc: "Our AI partner responds like a real friend, immediately.",
    },
    {
      step: 4, icon: "🌓", title: "Switch Themes", desc: "Choose Light or Dark mode for your environment.",
    },
  ];

  // Placeholder SVG for animated bot illustration
  function BotSVG() {
    return (
      <svg
        width="148"
        height="148"
        viewBox="0 0 148 148"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Animated TalkBuddy Bot illustration"
        className="tb-bot-svg"
        style={{ display: "block", margin: "0 auto", maxWidth: 148, filter: "drop-shadow(0 8px 42px #4F8CFF22)" }}
      >
        <defs>
          <radialGradient id="bgcir" cx="50%" cy="60%" r="90%">
            <stop offset="0%" stopColor="#70E7F9" />
            <stop offset="100%" stopColor="#408CFF22" />
          </radialGradient>
        </defs>
        <circle cx="74" cy="74" r="58" fill="url(#bgcir)" />
        <ellipse cx="74" cy="73" rx="38" ry="32" fill="#fff" opacity="0.92" />
        <ellipse cx="74" cy="79" rx="28" ry="24" fill="#4F8CFF" opacity="0.47" />
        <ellipse cx="74" cy="79" rx="19" ry="15" fill="#fff" opacity="0.64" />
        <ellipse cx="56" cy="66" rx="6" ry="8" fill="#222" />
        <ellipse cx="92" cy="66" rx="6" ry="8" fill="#222" />
        <rect x="65" y="95" width="18" height="6.9" rx="3.2" fill="#222B45" />
        <ellipse cx="85" cy="67.5" rx="1.8" ry="2.3" fill="#fff" opacity="0.7" />
        <ellipse cx="67" cy="67.5" rx="1.8" ry="2.3" fill="#fff" opacity="0.7" />
      </svg>
    );
  }

  // css custom properties for gradient and glow
  const colorVars = `
    :root {
      --tb-glow: #4F8CFF44;
      --tb-glow-light: #afcaff52;
      --tb-grad1: #4F8CFF 0%, #33E3FF 100%;
      --tb-grad2: #11163b 0%, #233866 70%, #222B45 100%;
      --tb-grad-light1: #E3F2FF 0%, #C4F5FF 100%;
      --tb-grad-light2: #ffffff 0%, #ECF5FF 80%, #d2e7ff 100%;
    }
    .tb-section-hero {
      background: linear-gradient(108deg, var(--tb-grad1));
      color: #fff;
    }
    body.talkbuddy-light .tb-section-hero {
      background: linear-gradient(110deg, var(--tb-grad-light1));
      color: #1a2133;
    }
    .tb-section-features {
      background: linear-gradient(102deg, var(--tb-grad2));
      color: #fff;
    }
    body.talkbuddy-light .tb-section-features {
      background: linear-gradient(101deg, var(--tb-grad-light2));
      color: #182132;
    }
    .tb-feature-card {
      background: rgba(255,255,255,0.12);
      border-radius: 16px;
      padding: 24px;
      margin: 0.67em 0;
      box-shadow: 0 2px 24px #4F8CFF12;
      border: 1.5px solid #4F8CFF18;
      min-width: 230px;
      min-height: 128px;
      display: flex; flex-direction: column; align-items: flex-start;
      transition: border 0.18s, box-shadow 0.2s;
    }
    .tb-feature-card:hover {
      border: 2.2px solid #4F8CFF77;
      box-shadow: 0 6px 30px #222b4566;
      z-index: 2;
    }
    .tb-feature-icon {
      font-size: 2.2em;
      margin-bottom: 10px;
      text-shadow: 0 3px 14px #4f8cff15;
    }
    .tb-feature-title {
      font-size: 1.18em;
      font-weight: 700;
      margin-bottom: 5px;
      letter-spacing: -0.5px;
    }
    .tb-feature-desc {
      font-size: 1.02em;
      opacity: 0.91;
      color: inherit;
    }
    .tb-section-how {
      background: transparent;
      margin: 0 auto;
      color: inherit;
    }
    .tb-how-step {
      display: flex;
      align-items: flex-start;
      gap: 15px;
      margin: 18px 0;
      padding: 18px 0 10px 0;
      border-bottom: 1px solid #4f8cff19;
    }
    .tb-how-step:last-child { border-bottom: 0; }
    .tb-how-step-icon {
      font-size: 1.65em;
    }
    .tb-try-section {
      background: linear-gradient(108deg, #4F8CFF 0%, #33E3FF 100%);
      color: #fff;
      text-align: center;
      min-height: 230px;
      padding: 64px 0 40px 0;
      box-shadow: 0 4px 48px #4f8cff35;
      border-radius: 24px;
      margin-top: 2em;
      margin-bottom: 1.7em;
      position: relative;
      overflow: hidden;
    }
    body.talkbuddy-light .tb-try-section {
      background: linear-gradient(109deg, #e4f2fe 0%, #c7e9ff 100%);
      color: #213170;
    }
    .tb-try-btn {
      margin: 30px auto 0 auto;
      font-size: 1.23em;
      font-weight: 700;
      padding: 18px 48px;
      border-radius: 42px;
      background: linear-gradient(95deg, #2253ff 7%, #4F8CFF 80%);
      color: #fff;
      border: none;
      box-shadow: 0 2px 24px #4F8CFF14, 0 1.2px 0 #2253ff33;
      cursor: pointer;
      animation: trybtn-pulse 1.65s infinite ease-in-out;
      outline: none;
      letter-spacing: 0.04em;
      transition: background 0.2s, box-shadow 0.18s;
      will-change: box-shadow;
    }
    body.talkbuddy-light .tb-try-btn {
      background: linear-gradient(98deg, #4F8CFF 9%, #3fa2ed 90%);
      color: #fff;
    }
    .tb-try-btn:focus,
    .tb-try-btn:hover {
      background: linear-gradient(96deg, #1749e7 7%, #32d6ff 97%);
      box-shadow: 0 3px 38px #33e3ff33, 0 1.4px 0 #2253ff33;
      outline: 2.2px dotted #4F8CFF82;
    }
    .tb-bot-svg {
      animation: bot-float 4s ease-in-out infinite alternate;
    }
    @keyframes bot-float {
      0% { transform: translateY(5px) scale(1) }
      38% { transform: translateY(-9px) scale(1.01);}
      70% { transform: translateY(-8px) scale(1.001);}
      100% { transform: translateY(10px) scale(1);}
    }
    .tb-footer {
      padding: 25px 0 18px 0;
      color: #fff;
      text-align: center;
      font-size: 1.04em;
      opacity: 0.88;
      margin-top: 2em;
      border-top: 1.5px solid #4f8cff31;
    }
    body.talkbuddy-light .tb-footer {
      background: #f8fbff;
      color: #2a3751;
      border-top: 1.5px solid #b7ddff61;
      opacity: 0.94;
    }
    .tb-section-header {
      font-size: 2.2em;
      font-weight: 700;
      margin: 0 0 1.2em 0;
      letter-spacing: -0.5px;
      color: #4F8CFF;
      text-align: center;
    }
    body.talkbuddy-light .tb-section-header { color: #18429F; }
    .tb-separator {
      border: none;
      border-top: 2px solid #4F8CFF17;
      margin: 48px 0 32px 0;
      width: 100%;
    }
    @media (max-width: 720px) {
      .tb-section-header { font-size: 1.42em; }
      .tb-section-hero, .tb-section-features, .tb-section-how, .tb-try-section { padding-left: 6px; padding-right: 6px; }
      .tb-try-btn { font-size: 1.03em; padding: 15px 18vw; }
    }
    @media (max-width:470px) {
      .tb-feature-card { min-width:120px; padding: 14px;}
      .tb-section-header { font-size: 1.13em; }
      .tb-try-btn { font-size: 1em; padding: 10px 7vw;}
    }
  ` + tryButtonPulseKeyframes;

  return (
    <>
      <style>{colorVars}</style>
      {/* Hero Section */}
      <section className="tb-section-hero" id="hero" style={{ padding: "90px 0 36px 0", minHeight: 390 }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
          <div className="subtitle" style={{ color: "#33e3ff", fontWeight: 500, fontSize: "1.15rem", marginBottom: "1.2em" }}>
            AI Conversation Partner · Human-like · No Account Needed
          </div>
          <h1 className="title" style={{ fontWeight: 700, fontSize: "3em", lineHeight: 1.1, maxWidth: 670 }}>
            Meet <span style={{ color: "#4F8CFF" }}>TalkBuddy</span>
            <span style={{ display: "block", fontWeight: 500, fontSize: "0.63em", letterSpacing: "0.05em", color: "var(--text-secondary)", marginTop: "0.22em" }}>
              Your always-available English conversation partner for practicing, brainstorming, and fun.
            </span>
          </h1>
          <div className="description" style={{ margin: "22px 0 33px", fontSize: "1.17em", color: "var(--text-secondary)", maxWidth: 540 }}>
            Practice English, get quick answers, or simply chat with a friendly AI—instantly, comfortably, and without any sign-up.
          </div>
          <div style={{ margin: "25px 0 12px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <BotSVG />
            <div style={{ fontSize: "1em", color: "var(--text-secondary)", marginTop: "7px" }}>
              <em>Animated TalkBuddy Bot – always ready to chat</em>
            </div>
          </div>
          <button
            className="tb-try-btn"
            tabIndex={0}
            aria-label="Jump to Try TalkBuddy now"
            onClick={scrollToSection("try-now")}
          >
            <span role="img" aria-label="Sparkle">✨</span> Try It Now <span role="img" aria-label="Arrow">→</span>
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="tb-section-features" id="features" style={{ padding: "64px 0 38px 0" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div className="tb-section-header">Why TalkBuddy?</div>
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "2em",
            justifyContent: "center",
            width: "100%",
            maxWidth: 1050,
            margin: "0 auto"
          }}>
            {features.map((f, idx) => (
              <div className="tb-feature-card" key={f.title} tabIndex={0} aria-label={f.title + " feature"}>
                <div className="tb-feature-icon" aria-hidden="true">{f.icon}</div>
                <div className="tb-feature-title">{f.title}</div>
                <div className="tb-feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="tb-section-how" id="how" style={{ padding: "36px 0 0 0" }}>
        <div className="container">
          <div className="tb-section-header" style={{ marginBottom: 10 }}>How It Works</div>
          <div style={{ maxWidth: 600, margin: "0 auto 4px auto" }}>
            {howSteps.map((s, idx) =>
              <div className="tb-how-step" key={s.step}>
                <span className="tb-how-step-icon" aria-hidden="true">{s.icon}</span>
                <div>
                  <div style={{ fontWeight: 600 }}>{s.title}</div>
                  <div style={{ fontSize: "1em", color: "var(--text-secondary)" }}>{s.desc}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <hr className="tb-separator" />

      {/* Try It Now Section (button scrolls chat into view) */}
      <section className="tb-try-section" id="try-now">
        <div className="container">
          <div style={{ fontSize: "2em", fontWeight: 600, marginBottom: 15, letterSpacing: "-1px" }}>
            Ready to chat with your AI buddy?
          </div>
          <button
            className="tb-try-btn"
            tabIndex={0}
            aria-label="Scroll to chat area now"
            onClick={scrollToSection("chat")}
          >
            <span role="img" aria-label="Chat">💬</span> Start Chatting Instantly <span role="img" aria-label="Arrow">↓</span>
          </button>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="tb-footer">
        <div>
          &copy; {new Date().getFullYear()} TalkBuddy &middot; By Kavia. <span style={{ color: "#4F8CFF" }}>AI for everyone.</span>
        </div>
        <div style={{ fontSize: "0.95em" }}>
          <a href="#features" style={{ color: "#4F8CFF", textDecoration: "none", marginRight: 8 }}>Features</a>
          <a href="#how" style={{ color: "#4F8CFF", textDecoration: "none", marginRight: 8 }}>How It Works</a>
          <a href="#try-now" style={{ color: "#4F8CFF", textDecoration: "none" }}>Try It Now</a>
        </div>
      </footer>
    </>
  );
}

export default LandingPage;

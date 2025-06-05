import React from "react";

// PUBLIC_INTERFACE
function LandingPage() {
  /**
   * TalkBuddy landing page:
   * - Hero (big title, catchphrase, description, animated bot, Start Chatting with smooth scroll)
   * - Features (cards with highlight icons)
   * - How It Works (3-step, illustrated format)
   * - Try It Now (glowing/animated button with smooth scroll)
   * - Footer (About, Credits, OpenAI, feedback/contact links)
   * - Support both light/dark gradients, fonts, strong visual polish/animation
   */

  // Smooth scroll to a target section by ID
  const scrollToSection = (id) => (e) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target)
      target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Animated glowing gradient for CTA button & section backgrounds
  const extraStyles = `
    :root {
      --tb-primary: #4F8CFF;
      --tb-primary-light: #E3F2FF;
      --tb-gradient-dark: linear-gradient(111deg, #192857 0%, #4F8CFF 80%);
      --tb-gradient-light: linear-gradient(107deg, #E3F2FF 0%, #C4F5FF 100%);
      --tb-cta-glow: #4F8CFF49;
      --tb-btn-glow: #afd3ff64;
    }
    .talkbuddy-section-hero {
      background: var(--tb-gradient-dark);
      color: #fff;
      position: relative;
      overflow: hidden;
      min-height: 420px;
    }
    body.talkbuddy-light .talkbuddy-section-hero {
      background: var(--tb-gradient-light);
      color: #1A2133;
    }

    .tb-hero-bot {
      margin: 0 auto 0.5em auto;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .tb-bot-svg {
      animation: tb-bot-float 3.7s ease-in-out infinite alternate;
      max-width: 164px;
      filter: drop-shadow(0 8px 52px #4F8CFF2a);
    }
    @keyframes tb-bot-float {
      0% { transform: translateY(6px) }
      47% { transform: translateY(-16px)}
      70% { transform: translateY(-14px);}
      100% { transform: translateY(9px)}
    }

    .talkbuddy-section-features {
      background: linear-gradient(105deg, #213377 0%, #222B45 90%);
      color: #fff;
      z-index: 1;
    }
    body.talkbuddy-light .talkbuddy-section-features {
      background: linear-gradient(110deg, #f0f8ff 0%, #ECF5FF 80%, #d2e7ff 100%);
      color: #182132;
    }
    .tb-features-row {
      display: flex;
      flex-wrap: wrap;
      gap: 2em;
      justify-content: center;
      margin: 1em auto 0 auto;
      width: 100%;
      max-width: 1050px;
    }
    .tb-feature-card {
      background: rgba(255,255,255,0.09);
      border-radius: 16px;
      padding: 30px 20px 22px 22px;
      min-width: 228px;
      min-height: 132px;
      box-shadow: 0 4px 24px #4F8CFF18;
      border: 1.5px solid #4F8CFF21;
      display: flex; flex-direction: column; align-items: flex-start;
      transition: border 0.18s, box-shadow 0.22s;
      text-align: left;
      position: relative;
      z-index: 1;
    }
    .tb-feature-card:hover {
      border: 2.4px solid #4F8CFFEE;
      box-shadow: 0 10px 30px #4F8CFF25, 0 4px 12px #222B4550;
      z-index: 2;
    }
    .tb-feature-ico {
      font-size: 2.2em;
      margin-bottom: 8px;
      text-shadow: 0 2px 13px #4F8CFF20;
    }
    .tb-feature-title {
      font-size: 1.17em;
      font-weight: 700;
      margin-bottom: 4px;
      letter-spacing: -0.5px;
    }
    .tb-feature-desc {
      font-size: 1.03em;
      opacity: 0.91;
      color: inherit;
      font-weight: 400;
    }

    .talkbuddy-section-how {
      background: transparent; margin: 0 auto;
      color: inherit;
    }
    .tb-how-steps-list {
      max-width: 680px;
      margin: 0 auto;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 1.4em;
      justify-content: space-between;
    }
    .tb-how-step {
      background: rgba(255,255,255,0.12);
      border-radius: 14px;
      min-width: 183px;
      flex: 1 1 32%;
      margin: 0.5em 0.25em;
      padding: 22px 18px;
      display: flex;
      align-items: flex-start;
      box-shadow: 0 2.5px 17px #4F8CFF0e;
      border: 1px solid #4F8CFF12;
      gap: 14.5px;
      min-height: 108px;
    }
    .tb-how-step-icon {
      font-size: 2em;
      margin-right: 7px;
      flex-shrink: 0;
      opacity: 0.82;
      margin-top: 2px;
    }
    .tb-how-step-main {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
    .tb-how-step-title {
      font-weight: 600;
      font-size: 1.07em;
      margin-bottom: 3px;
    }
    .tb-how-step-desc {
      font-size: 0.98em;
      color: var(--text-secondary);
    }
    .tb-try-section {
      background: linear-gradient(107deg, #4F8CFF 0%, #33E3FF 100%);
      color: #fff;
      text-align: center;
      min-height: 190px;
      padding: 60px 0 40px 0;
      box-shadow: 0 4px 48px #4F8CFF35;
      border-radius: 22px;
      margin-top: 2em;
      margin-bottom: 1.7em;
      position: relative;
      overflow: hidden;
      z-index: 5;
    }
    body.talkbuddy-light .tb-try-section {
      background: linear-gradient(109deg, #e4f2fe 0%, #c7e9ff 100%);
      color: #183170;
    }

    .tb-try-btn {
      margin: 38px auto 0 auto;
      font-size: 1.28em;
      font-weight: 700;
      padding: 19px 55px;
      border-radius: 42px;
      background: linear-gradient(95deg, #2253ff 7%, #4F8CFF 80%);
      color: #fff;
      border: none;
      box-shadow: 0 2px 24px #4F8CFF18, 0 1px 0 #2253ff33;
      cursor: pointer;
      animation: tb-trybtn-pulse 1.75s infinite ease-in-out;
      outline: none;
      letter-spacing: 0.03em;
      transition: background 0.18s, box-shadow 0.18s;
      will-change: box-shadow;
      position: relative;
      z-index: 7;
    }

    @keyframes tb-trybtn-pulse {
      0% { box-shadow: 0 0 0px 0 var(--tb-btn-glow); }
      68% { box-shadow: 0 0 18px 11px var(--tb-btn-glow);}
      100% { box-shadow: 0 0 0px 0 var(--tb-btn-glow);}
    }

    .tb-try-btn:focus, .tb-try-btn:hover {
      background: linear-gradient(90deg, #184dd7 7%, #35e2ff 97%);
      box-shadow: 0 5px 38px #33e3ff33, 0 1.4px 0 #2253ff33;
      outline: 2.3px dotted #4F8CFF82;
    }

    .tb-footer {
      padding: 28px 0 18px 0;
      color: #fff;
      text-align: center;
      font-size: 1.03em;
      opacity: 0.87;
      margin-top: 2.6em;
      border-top: 1.5px solid #4f8cff27;
      background: transparent;
    }
    body.talkbuddy-light .tb-footer {
      background: #f8fbff;
      color: #2a3751;
      border-top: 1.5px solid #b7ddff5e;
      opacity: 0.94;
    }
    .tb-footer-links {
      font-size: 0.91em;
      margin-bottom: 0.3em;
      margin-top: 0.5em;
    }
    .tb-footer-link {
      color: #4F8CFF;
      text-decoration: none;
      margin-right: 1em;
      transition: color 0.18s;
      font-weight: 500;
    }
    .tb-footer-link:hover,.tb-footer-link:focus {
      color: #144199;
      text-decoration: underline dashed;
    }
    .tb-footer-credits {
      margin-top: 4px;
      opacity: 0.74;
      font-size: 0.95em;
      color: inherit;
    }
    .tb-footer-openai {
      color: #1096eb;
      font-weight: 700;
      font-size: 0.98em;
      margin-left: 5px;
    }
    .tb-section-header {
      font-size: 2.17em;
      font-weight: 700;
      margin: 0 0 1.1em 0;
      letter-spacing: -0.5px;
      color: #4F8CFF;
      text-align: center;
      line-height: 1.3;
    }
    body.talkbuddy-light .tb-section-header { color: #18429F; }

    .tb-separator {
      border: none;
      border-top: 2px solid #4F8CFF18;
      margin: 43px 0 34px 0;
      width: 100%;
    }

    @media (max-width: 940px) {
      .tb-features-row { gap: 1.2em; }
      .tb-feature-card { min-width: 180px; padding: 17px; }
    }
    @media (max-width: 720px) {
      .tb-section-header { font-size: 1.35em;}
      .talkbuddy-section-hero, .talkbuddy-section-features, .talkbuddy-section-how, .tb-try-section { padding-left: 8px; padding-right: 8px; }
      .tb-try-btn { font-size: 1.06em; padding: 13px 13vw;}
      .tb-features-row { flex-direction: column;}
      .tb-how-steps-list { flex-direction: column; gap: 0.3em; }
    }
    @media (max-width:470px) {
      .tb-feature-card { min-width:120px; padding: 12px 5px;}
      .tb-section-header { font-size: 0.97em;}
      .tb-try-btn { font-size: 0.98em; padding: 8px 7vw;}
      .tb-footer { font-size: 0.9em; }
    }
  `;

  // Data for sections
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
  const steps = [
    {
      icon: "🚀",
      title: "Open TalkBuddy",
      desc: "Just load the web app — no install needed.",
    },
    {
      icon: "💬",
      title: "Start Chatting",
      desc: "Type your message to start a conversation anytime.",
    },
    {
      icon: "🤖",
      title: "Get Instant Replies",
      desc: "AI responds like a real friend, immediately.",
    },
  ];

  // Animated/SVG TalkBuddy bot illustration (placeholder, accessible)
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
      >
        <defs>
          <radialGradient id="tb-bot-cir" cx="50%" cy="60%" r="100%">
            <stop offset="0%" stopColor="#70E7F9" />
            <stop offset="100%" stopColor="#58B3FF10" />
          </radialGradient>
        </defs>
        <circle cx="74" cy="74" r="58" fill="url(#tb-bot-cir)" />
        <ellipse cx="74" cy="73" rx="38" ry="32" fill="#fff" opacity="0.91" />
        <ellipse cx="74" cy="79" rx="28" ry="23" fill="#4F8CFF" opacity="0.47" />
        <ellipse cx="74" cy="79" rx="19" ry="14" fill="#fff" opacity="0.67" />
        <ellipse cx="57" cy="66" rx="6" ry="8.3" fill="#222" />
        <ellipse cx="91" cy="66" rx="6" ry="8.3" fill="#222" />
        <rect x="65" y="95" width="18" height="6.9" rx="3.2" fill="#222B45" />
        <ellipse cx="86" cy="67.8" rx="1.7" ry="2.2" fill="#fff" opacity="0.7" />
        <ellipse cx="63" cy="67.8" rx="1.7" ry="2.2" fill="#fff" opacity="0.7" />
      </svg>
    );
  }

  return (
    <>
      <style>{extraStyles}</style>
      {/* HERO SECTION */}
      <section className="talkbuddy-section-hero" id="hero" style={{padding: "90px 0 36px 0", minHeight: 390, display:"flex", alignItems:"center"}}>
        <div className="container" style={{display:"flex",flexDirection:"column",alignItems:"center", position:"relative"}}>
          <div className="subtitle" style={{
            color: "#33e3ff", fontWeight:500, fontSize:"1.13rem",marginBottom:"1.17em"
          }}>
            AI Conversation Partner · Human-like · No Account Needed
          </div>
          <h1 className="title" style={{fontWeight:700,fontSize:"3em",lineHeight:1.1,maxWidth:680}}>
            Meet <span style={{color:"#4F8CFF"}}>TalkBuddy</span>
            <span style={{display:"block",fontWeight:500,fontSize:"0.62em",letterSpacing:"0.03em",color:"var(--text-secondary)",marginTop:"0.17em"}}>
              Your always-available English conversation partner for practicing, brainstorming, and fun.
            </span>
          </h1>
          <div className="description" style={{margin:"24px 0 34px 0",fontSize:"1.19em",color:"var(--text-secondary)",maxWidth:550}}>
            Practice English, get quick answers, or simply chat with a friendly AI—instantly, comfortably, and without any sign-up.
          </div>
          <div className="tb-hero-bot" style={{margin:"21px 0 13px", flexDirection:"column",alignItems:"center"}}>
            <BotSVG />
            <div style={{fontSize: "1em", color:"var(--text-secondary)",marginTop:"7.8px"}}>
              <em>Animated TalkBuddy Bot &mdash; always ready to chat</em>
            </div>
          </div>
          <button
            className="tb-try-btn"
            tabIndex={0}
            aria-label="Scroll to chat section"
            onClick={scrollToSection("chat")}
            style={{marginTop: 10}}
          >
            <span role="img" aria-label="chat">💬</span> Start Chatting <span role="img" aria-label="arrow">↓</span>
          </button>
        </div>
      </section>
      {/* FEATURES SECTION */}
      <section className="talkbuddy-section-features" id="features" style={{padding: "62px 0 38px 0"}}>
        <div className="container" style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
          <div className="tb-section-header">Why TalkBuddy?</div>
          <div className="tb-features-row">
            {features.map((f, idx) => (
              <div className="tb-feature-card" key={f.title}
                tabIndex={0} aria-label={f.title + " feature"}
              >
                <div className="tb-feature-ico" aria-hidden="true">{f.icon}</div>
                <div className="tb-feature-title">{f.title}</div>
                <div className="tb-feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* HOW IT WORKS SECTION */}
      <section className="talkbuddy-section-how" id="how" style={{padding:"37px 0 0 0"}}>
        <div className="container">
          <div className="tb-section-header" style={{marginBottom:14}}>
            How It Works
          </div>
          <div className="tb-how-steps-list">
            {steps.map((step, idx) => (
              <div className="tb-how-step" key={step.title}>
                <span className="tb-how-step-icon" aria-hidden="true">{step.icon}</span>
                <div className="tb-how-step-main">
                  <div className="tb-how-step-title">{step.title}</div>
                  <div className="tb-how-step-desc">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="tb-separator" />

      {/* TRY IT NOW SECTION */}
      <section className="tb-try-section" id="try-now">
        <div className="container">
          <div style={{
            fontSize: "2em",
            fontWeight: 600,
            marginBottom: 13,
            letterSpacing: "-1px"
          }}>
            Ready to chat with your AI buddy?
          </div>
          <button
            className="tb-try-btn"
            tabIndex={0}
            aria-label="Go to chat area now"
            onClick={scrollToSection("chat")}
          >
            <span role="img" aria-label="Chat">💬</span> Talk to AI Now <span role="img" aria-label="Arrow">→</span>
          </button>
        </div>
      </section>
      {/* FOOTER SECTION */}
      <footer className="tb-footer">
        <div className="tb-footer-links">
          <a href="#hero" className="tb-footer-link" onClick={scrollToSection("hero")}>Home</a>
          <a href="#features" className="tb-footer-link" onClick={scrollToSection("features")}>Features</a>
          <a href="#how" className="tb-footer-link" onClick={scrollToSection("how")}>How It Works</a>
          <a href="#try-now" className="tb-footer-link" onClick={scrollToSection("try-now")}>Try Now</a>
          <a href="mailto:feedback@talkbuddy.ai" className="tb-footer-link">Feedback / Contact</a>
        </div>
        <div className="tb-footer-credits">
          &copy; {new Date().getFullYear()} <strong>TalkBuddy</strong> by Kavia &middot; Inspired by OpenAI GPT models
          <span className="tb-footer-openai">Powered by OpenAI</span>
        </div>
      </footer>
    </>
  );
}

export default LandingPage;

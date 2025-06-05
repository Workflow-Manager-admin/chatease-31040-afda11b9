import React, { useState, useEffect } from "react";

// PUBLIC_INTERFACE
function NavBar() {
  /**
   * NavBar component for TalkBuddy/TalkEase.
   * - Left: App logo/name ("💬 TalkBuddy")
   * - Center/Right: Navigation links
   * - Far right: Light/Dark mode toggle
   * - Responsive, fixed at top, color & shadow per mode, beautiful transitions
   */
  const [darkMode, setDarkMode] = useState(() => {
    // Try to load mode from localStorage, else prefer dark by default
    const stored = window.localStorage.getItem("talkbuddy-theme");
    if (stored) return stored === "dark";
    return window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Apply theme to document.body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("talkbuddy-dark");
      document.body.classList.remove("talkbuddy-light");
    } else {
      document.body.classList.add("talkbuddy-light");
      document.body.classList.remove("talkbuddy-dark");
    }
    window.localStorage.setItem("talkbuddy-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Navigation stub: scroll to top (can be replaced with router)
  const handleNav = (to) => (e) => {
    e.preventDefault();
    // Stub: simulate navigation
    if (to === "home") window.scrollTo({ top: 0, behavior: "smooth" });
    // Could be extended for more navigation.
  };

  return (
    <>
      <nav className="talkbuddy-navbar" style={navBarStyle(darkMode)}>
        <div className="talkbuddy-navbar-inner">
          <div className="talkbuddy-nav-left">
            <span className="talkbuddy-logo-symbol" aria-label="TalkBuddy Logo" role="img">
              💬
            </span>
            <span className="talkbuddy-logo-text">
              TalkBuddy
            </span>
          </div>
          <div className="talkbuddy-nav-links">
            <a
              href="#home"
              className="talkbuddy-link"
              onClick={handleNav("home")}
            >
              Home
            </a>
            <a
              href="#chat"
              className="talkbuddy-link"
              onClick={handleNav("chat")}
            >
              Chat
            </a>
            <a
              href="#about"
              className="talkbuddy-link"
              onClick={handleNav("about")}
            >
              About
            </a>
          </div>
          <button
            className="talkbuddy-toggler"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            onClick={() => setDarkMode((d) => !d)}
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            tabIndex={0}
            type="button"
          >
            {darkMode ? (
              <span className="tb-theme-ico" role="img" aria-label="Light Mode">
                {/* Sun icon */}
                <svg width="22" height="22" viewBox="0 0 22 22" style={{verticalAlign:"middle"}} fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="11" cy="11" r="5" fill="#f2c94c" />
                  <g stroke="#f2c94c" strokeWidth="1.5">
                    <line x1="11" y1="1.5" x2="11" y2="4"/>
                    <line x1="11" y1="18" x2="11" y2="20.5"/>
                    <line x1="1.5" y1="11" x2="4" y2="11"/>
                    <line x1="18" y1="11" x2="20.5" y2="11"/>
                    <line x1="4.52" y1="4.52" x2="6.25" y2="6.25"/>
                    <line x1="15.75" y1="15.75" x2="17.48" y2="17.48"/>
                    <line x1="15.75" y1="6.25" x2="17.48" y2="4.52"/>
                    <line x1="4.52" y1="17.48" x2="6.25" y2="15.75"/>
                  </g>
                </svg>
              </span>
            ) : (
              <span className="tb-theme-ico" role="img" aria-label="Dark Mode">
                {/* Moon icon */}
                <svg width="22" height="22" viewBox="0 0 22 22" style={{verticalAlign:"middle"}} fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M17.63,14.82A7.43,7.43,0,0,1,7.12,4.37,1,1,0,0,0,6.12,5,9,9,0,1,0,17,15.87a1,1,0,0,0,.63-1.05Z"
                    fill="#fff"
                  />
                </svg>
              </span>
            )}
          </button>
        </div>
      </nav>
      {/* Scoped styles */}
      <style>
        {navBarCSS}
      </style>
    </>
  );
}

// --- Styles Logic ---

// Get current colors and shadows depending on theme mode
function navBarStyle(darkMode) {
  return {
    background: darkMode
      ? "linear-gradient(90deg, #000, #1A1A1A 50%, #333 100%)"
      : "rgb(208, 204, 199)",
    color: darkMode ? "#fff" : "#181622",
    boxShadow: darkMode
      ? "0 2px 22px 0 #0a0e20b0, 0 1.5px 0 #19162b"
      : "0 2px 10px 0 #b9b2a333",
    borderBottom: darkMode ? "1.5px solid #222" : "1.5px solid #e6e6e6",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    zIndex: 99,
    transition: "background 0.27s, color 0.22s, box-shadow 0.22s"
  };
}

// CSS as a template string (uses BEM-like classes to avoid conflicts)
const navBarCSS = `
.talkbuddy-navbar { min-height: 58px; font-family: 'Inter', 'Segoe UI', Arial, sans-serif; }
.talkbuddy-navbar-inner {
  width: 100%;
  margin: 0 auto;
  max-width: 1122px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.4rem;
}
.talkbuddy-nav-left {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 1.5rem;
  letter-spacing: -0.5px;
  user-select: none;
}
.talkbuddy-logo-symbol { font-size: 1.6em; filter: drop-shadow(0 2px 2px #44a6ee10); }
.talkbuddy-logo-text {
  font-size: 1.23em;
  font-weight: 800;
  letter-spacing: -0.7px;
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
}
.talkbuddy-nav-links {
  display: flex;
  align-items: center;
  gap: 2.2em;
}
.talkbuddy-link {
  text-decoration: none;
  font-size: 1.09rem;
  font-weight: 500;
  padding: 0.45em 0px;
  color: inherit;
  position: relative;
  transition: color 0.19s;
}
.talkbuddy-link:after {
  content: "";
  display: block;
  height: 2px;
  width: 0%;
  background: #4F8CFF;
  transition: width 0.19s cubic-bezier(.4,0,.2,1), box-shadow 0.23s;
  border-radius: 22px;
  margin-top: 2px;
}
.talkbuddy-link:hover, .talkbuddy-link:focus {
  color: #4F8CFF;
  outline: none;
}
.talkbuddy-link:hover:after, .talkbuddy-link:focus:after {
  width: 47%;
  box-shadow: 0 2px 8px #4f8cff44;
}
.talkbuddy-toggler {
  background: none;
  border: none;
  outline: none;
  margin-left: 1.2em;
  cursor: pointer;
  border-radius: 50%;
  padding: 7px;
  min-width: 36px;
  min-height: 36px;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.14s;
}
.talkbuddy-toggler:active, .talkbuddy-toggler:focus {
  outline: 1.5px dotted #7ad6ff55;
  background: #008cff11;
}
.tb-theme-ico {
  display: inline-block; line-height: 0;
  filter: drop-shadow(0 1px 7px #2d495888);
}


/* Responsive design */
@media (max-width: 720px) {
  .talkbuddy-navbar-inner { padding: 0 0.5em; }
  .talkbuddy-nav-links { gap: 1em; }
  .talkbuddy-logo-text { font-size: 1em; }
}
@media (max-width: 494px) {
  .talkbuddy-navbar-inner { padding: 0 0.1em; }
  .talkbuddy-logo-text { display: none; } /* Symbol only on mobile */
  .talkbuddy-nav-links { gap: 0.67em; }
}

/* Add global theme classes for dark/light mode color variables */
body.talkbuddy-dark {
  --tb-bg: linear-gradient(90deg, #000, #1A1A1A 50%, #333 100%);
  --tb-fg: #fff;
  --tb-shadow: 0 2px 22px 0 #0a0e20b0, 0 1.5px 0 #19162b;
}
body.talkbuddy-light {
  --tb-bg: rgb(208, 204, 199);
  --tb-fg: #181622;
  --tb-shadow: 0 2px 10px 0 #b9b2a333;
}

/* Ensure page content below nav */
body { padding-top: 65px; transition: background 0.22s, color 0.22s;}
`;

export default NavBar;

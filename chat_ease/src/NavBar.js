import React, { useState, useEffect } from "react";

/**
 * PUBLIC_INTERFACE
 * NavBar for ChatEase - modern, fixed, adaptive styling, theme toggle, smooth transitions.
 */
function NavBar() {
  // Store theme as "light" or "dark" instead of boolean
  const [theme, setTheme] = useState(() => {
    const stored = window.localStorage.getItem("chatease-theme");
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark" : "light";
  });

  // Actual theme mode: update body class reactively for CSS, and vars for inner section styling
  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    } else {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    }
    window.localStorage.setItem("chatease-theme", theme);
  }, [theme]);

  // Smooth scroll handler for nav links
  const smoothTo = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <>
      <nav className="cease-navbar" style={navBarStyle(theme)}>
        <div className="cease-navbar-inner">
          <span className="cease-logo" tabIndex={0}>
            <span className="cease-logo-ico" role="img" aria-label="ChatEase logo">💬</span>
            <span className="cease-logo-txt">ChatEase</span>
          </span>
          <div className="cease-nav-links">
            <a
              href="#chat"
              className="cease-nav-link"
              onClick={smoothTo("chat")}
            >Chat</a>
            <a
              href="#about"
              className="cease-nav-link"
              onClick={smoothTo("hero")}
            >About</a>
          </div>
          <button
            className="cease-theme-toggle"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            tabIndex={0}
            type="button"
          >
            <span
              className="cease-theme-ico"
              role="img"
              aria-label={theme === "dark" ? "Dark mode (show moon)" : "Light mode (show sun)"}
            >
              {theme === "dark" ? "🌙" : "☀️"}
            </span>
          </button>
        </div>
      </nav>
      <style>{ceaseNavBarCSS}</style>
    </>
  );
}

// NavBar styles for light/dark
function navBarStyle(theme) {
  return {
    background: theme === "dark"
      ? "linear-gradient(91deg, #090f24 0%, #202f50 90%)"
      : "linear-gradient(90deg, #f8fbff 30%, #d6e5fa 100%)",
    color: theme === "dark" ? "#fff" : "#194474",
    borderBottom: theme === "dark" ? "1.5px solid #193a55" : "1.5px solid #c7e7ff",
    boxShadow: theme === "dark"
      ? "0 2px 22px 0 #12345922, 0 1.5px 0 #0a223b"
      : "0 2px 7px 0 #9fcef9b1",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    minHeight: "61px",
    zIndex: 101,
    transition: "background 0.3s, color 0.19s, box-shadow 0.19s, border-bottom 0.19s"
  };
}

// New NavBar CSS, BEM-style class names for isolation
const ceaseNavBarCSS = `
.cease-navbar {
  font-family: 'Inter','Segoe UI',Arial,sans-serif;
  min-height:61px;
  padding:0;
  width:100vw;
}
.cease-navbar-inner {
  width:100%;
  max-width:1190px;
  margin:0 auto;
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:0 1.5em;
}
.cease-logo {
  display:flex;align-items:center;gap:10px;
  font-size:1.43em;
  font-weight:800;
  letter-spacing:-0.6px;
  color:#4F8CFF;
  user-select:none;
}
.cease-logo-ico {font-size:1.7em;filter:drop-shadow(0 2px 2px #00cfff10);}
.cease-logo-txt {font-size:1em;font-weight:760;letter-spacing:-0.7px; color:inherit;}
.cease-nav-links {
  display:flex;align-items:center;gap:2em;
}
.cease-nav-link {
  text-decoration:none;
  font-size:1.10rem;
  font-weight:500;
  padding:0.45em 0.3em;
  color:inherit;
  position: relative;
  transition: color 0.18s;
}
.cease-nav-link:after {
  content:"";
  display:block;
  height:2px;
  width:0%;
  background:#4F8CFF;
  border-radius:18px;
  margin-top:2.3px;
  transition: width 0.17s, box-shadow 0.19s;
}
.cease-nav-link:hover, .cease-nav-link:focus {
  color:#13d9ff;
  outline:none;
}
.cease-nav-link:hover:after, .cease-nav-link:focus:after {
  width:62%;
  box-shadow:0 2px 9px #60edff41;
}
.cease-theme-toggle {
  background:none;
  border:none;
  outline:none;
  margin-left:1.5em;
  cursor:pointer;
  border-radius:50%;
  padding:8px;
  min-width:34px; min-height:34px;
  display:flex;align-items:center;justify-content:center;
  transition:background 0.17s;
}
.cease-theme-toggle:focus,.cease-theme-toggle:active {
  outline:1.5px dotted #12defe88;
  background:#47cfff15;
}
.cease-theme-ico{display:inline-block;font-size:1.38em;line-height:0;filter:drop-shadow(0 1px 7px #18e3e388);}
@media (max-width:720px){
  .cease-navbar-inner{padding:0 0.4em;}
  .cease-nav-links{gap:1em;}
  .cease-logo-txt{font-size:0.93em;}
}
@media (max-width:494px){
  .cease-navbar-inner{padding:0 0.1em;}
  .cease-logo-txt{display:none;}
  .cease-nav-links{gap:0.53em;}
}
body.dark{ --nav-fg:#fff;}
body.light{ --nav-fg:#183a53;}
body{ transition:background 0.23s, color 0.21s;}
`;

export default NavBar;

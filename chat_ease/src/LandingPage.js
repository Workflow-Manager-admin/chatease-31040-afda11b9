import React from "react";

// PUBLIC_INTERFACE
function LandingPage() {
  /**
   * LandingPage - TalkBuddy visual introduction and call-to-action.
   * Hero headline, benefit bullet points, 'Start Chatting' button.
   */
  const handleStartChat = (e) => {
    e.preventDefault();
    const chatEl = document.getElementById("chat");
    if (chatEl) {
      chatEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="container" style={{ paddingTop: 120, paddingBottom: 64 }}>
      <section className="hero">
        <div className="subtitle" style={{ color: "var(--base-light)", fontWeight: 500, fontSize: "1.2rem" }}>
          AI Conversation Partner · Fast, Human-like, No Login
        </div>
        <h1 className="title" style={{ fontSize: "3.1rem", fontWeight: 700 }}>
          Meet TalkBuddy
        </h1>
        <div className="description" style={{ fontSize: "1.15rem", marginBottom: 12 }}>
          Effortless English conversation, brainstorming, and idea generation. Practice with an instantly responsive AI.
        </div>
        <ul style={{
          listStyle: "none",
          padding: 0,
          margin: "0 0 20px 0",
          color: "var(--text-secondary)",
          fontSize: "1.05rem",
          textAlign: "left",
          maxWidth: "460px",
          display: "inline-block",
          lineHeight: 1.6,
        }}>
          <li>💡 <strong>Human-like chat:</strong> Flows naturally, just like texting a friend.</li>
          <li>🔥 <strong>No sign up:</strong> Start chatting instantly—no registration ever.</li>
          <li>🌑 <strong>Custom themes:</strong> Switch Light/Dark mode for visual comfort.</li>
          <li>⚡ <strong>Brainstorm & learn:</strong> Spark ideas, get answers, or practice English fluency.</li>
        </ul>
        <button
          className="btn btn-large"
          style={{ marginTop: 10, backgroundColor: "var(--base-light)", color: "#1A1A1A", fontWeight: 600, border: "none" }}
          onClick={handleStartChat}
        >
          Start Chatting
        </button>
      </section>
    </div>
  );
}

export default LandingPage;

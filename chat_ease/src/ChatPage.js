import React, { useState, useRef, useEffect } from "react";
import "./ChatPage.css";

/**
 * PUBLIC_INTERFACE
 * ChatPage - Main Conversational UI for TalkBuddy/ChatEase.
 */
function ChatPage({ openAIApiKey = "" }) {
  // Chat message log: { sender: "user"|"ai", text: string, error?: string, id: string }
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hi! 👋 I'm your TalkBuddy. Practice English, brainstorm ideas or chat about anything. How can I help today?",
      id: "init-ai"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [typing, setTyping] = useState(false); // Typing animation for bot
  const [error, setError] = useState(null);
  const [retryMsg, setRetryMsg] = useState(null); // To hold last message to retry
  const [showKeyWarning, setShowKeyWarning] = useState(false);
  const chatContainerRef = useRef(null);

  // For light/dark mode adaptation via body class, used for bubble gradient.
  const [theme, setTheme] = useState(() =>
    document.body.classList.contains("light") ? "light" : "dark"
  );

  useEffect(() => {
    // Listen and update theme if outside toggled
    const observer = new MutationObserver(() => {
      if (document.body.classList.contains("light")) setTheme("light");
      else setTheme("dark");
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // Scroll chat to bottom when message log changes
  useEffect(() => {
    if (chatContainerRef.current)
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages, isLoading, typing]);

  // Helpers
  const canSend = input.trim().length > 0 && !isLoading && !typing;

  // Handle message send (user action)
  // PUBLIC_INTERFACE
  const handleSend = async (overrideText) => {
    if (!canSend && !overrideText) return;
    const prompt = overrideText ?? input.trim();
    setInput("");
    setError(null);
    setTyping(false);
    setRetryMsg(null);

    const newMessages = [
      ...messages,
      { sender: "user", text: prompt, id: `u-${Date.now()}` }
    ];
    setMessages(newMessages);
    setIsLoading(true);

    // Security caution: in real apps, sensitive keys should NOT be sent client side!
    if (!openAIApiKey) {
      setTimeout(() => {
        setIsLoading(false);
        setError(
          "No API key provided. (In actual deployments, the OpenAI key should be stored securely and not exposed in client code.)"
        );
      }, 850);
      return;
    }

    // Show "AI is typing..." feedback
    setTyping(true);

    // Typing animation stepper variables
    let displayResponse = "";
    let messageTimer;
    let aiId = `ai-${Date.now()}`;

    try {
      // Compose OpenAI API call (gpt-3.5-turbo, proof of concept)
      const apiURL = "https://api.openai.com/v1/chat/completions";
      const body = {
        model: "gpt-3.5-turbo",
        messages: [
          // Give basic context for the bot's role in the conversation
          {
            role: "system",
            content:
              "You are TalkBuddy, a friendly AI English partner. Be positive, helpful, concise, and easy to understand for any English learner. Don't provide medical or legal advice. Always keep responses under 120 words."
          },
          ...newMessages.map(m => ({
            role: m.sender === "user" ? "user" : "assistant",
            content: m.text
          }))
        ],
        max_tokens: 256,
        temperature: 0.8
      };
      const resp = await fetch(apiURL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${openAIApiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });

      // If API error, throw
      if (!resp.ok) {
        let errMsg = "AI API error";
        try {
          const data = await resp.json();
          errMsg = data.error?.message || data.error?.type || JSON.stringify(data);
        } catch (e) { /** ignore */ }
        throw new Error(errMsg || "Could not generate reply.");
      }
      const data = await resp.json();
      let reply =
        data.choices?.[0]?.message?.content?.trim() ||
        "Sorry, I couldn't find a reply just now.";

      // Animate typing AI response as if it types (with fade in)
      let idx = 0;
      setTyping(true);
      function stepType() {
        displayResponse = reply.slice(0, idx + 1);
        setMessages(prev =>
          prev.some(m => m.id === aiId)
            ? prev.map(
                m => m.id === aiId
                  ? { ...m, text: displayResponse }
                  : m
              )
            : [...prev, { sender: "ai", text: displayResponse, id: aiId }]
        );
        idx++;
        if (idx < reply.length) {
          messageTimer = setTimeout(stepType, 16 + Math.random() * 24);
        } else {
          setTyping(false);
          clearTimeout(messageTimer);
        }
      }
      stepType();

    } catch (err) {
      setError(
        err.message.startsWith("Failed to fetch")
          ? "Network error: Unable to reach OpenAI. Check your connection and try again."
          : err.message ||
              "Sorry, there was a problem. You can retry or reset the chat."
      );
      setRetryMsg(prompt);
      setTyping(false);
    }
    setIsLoading(false);
  };

  // Handler: Retry last failed message
  const handleRetry = () => {
    if (retryMsg) handleSend(retryMsg);
  };

  // Handler: Clear all chat
  const handleClear = () => {
    setMessages([
      {
        sender: "ai",
        text: "Hi! 👋 I'm your TalkBuddy. Practice English, brainstorm ideas or chat about anything. How can I help today?",
        id: "init-ai"
      }
    ]);
    setInput("");
    setError(null);
    setRetryMsg(null);
    setTyping(false);
  };

  // Handler: On input enter key
  const handleInputKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey && canSend) {
      e.preventDefault();
      handleSend();
    }
  };

  // PUBLIC_INTERFACE
  // UI: Render bubble for user or AI
  function ChatBubble({ msg, align, aiAvatar }) {
    return (
      <div
        className={
          `c-bubble-row ${align === "left" ? "align-left" : "align-right"}`
        }
        aria-live={align === "left" ? "polite" : undefined}
        aria-label={
          msg.sender === "ai" ? "AI message" : "Your message"
        }
      >
        {msg.sender === "ai" && (
          <div className="c-avatar">{aiAvatar || <DefaultBotAvatar />}</div>
        )}
        <div
          className={
            `c-bubble c-bubble-${msg.sender} ${msg.text === "" ? "dimmed" : ""}`
          }
        >
          {/* show fade typing effect, error as warning */}
          {msg.error ? (
            <span className="c-bubble-error">{msg.error}</span>
          ) : (
            <span>
              <BubbleAnimatedText text={msg.text} isTyping={msg.id.startsWith("ai-") && typing} />
            </span>
          )}
        </div>
      </div>
    );
  }

  // Bubble text with fade typing effect (non-cursor for now)
  function BubbleAnimatedText({ text, isTyping }) {
    return (
      <span className={isTyping ? "c-type-anim" : ""}>
        {text}
        {isTyping ? <span className="c-type-cursor" /> : null}
      </span>
    );
  }

  // PUBLIC_INTERFACE
  // Floating AI bot avatar (optional, floating for context)
  function DefaultBotAvatar() {
    return (
      <span
        className="c-bot-avatar"
        title="AI Bot"
        aria-label="Bot"
      >
        <svg
          width="40" height="40" viewBox="0 0 44 44"
          aria-hidden="true"
          style={{ filter: theme === "dark" ? "drop-shadow(0 2px 5px #2aefff66)" : "drop-shadow(0 2px 7px #6afeff44)" }}
        >
          <ellipse cx="22" cy="22" rx="20" ry="19.7"
            fill={theme === "dark" ? "url(#bot-grad-dark)" : "url(#bot-grad-light)"}
            opacity="1"
          />
          <defs>
            <radialGradient id="bot-grad-dark" cx="50%" cy="50%" r="88%">
              <stop offset="0%" stopColor="#71f3ff" />
              <stop offset="80%" stopColor="#0cc3e1" />
              <stop offset="100%" stopColor="#2253ff" />
            </radialGradient>
            <radialGradient id="bot-grad-light" cx="45%" cy="55%" r="88%">
              <stop offset="0%" stopColor="#caf7ff" />
              <stop offset="70%" stopColor="#8dd6ff" />
              <stop offset="100%" stopColor="#3aa6ff" />
            </radialGradient>
          </defs>
          <ellipse cx="22" cy="21.8" rx="11.7" ry="10.2" fill="#fff" opacity="0.93" />
          {/* Eyes */}
          <ellipse cx="18" cy="23.2" rx="1.7" ry="2.1" fill="#2adfff" /><ellipse cx="28" cy="23.2" rx="1.7" ry="2.1" fill="#2adfff" />
          {/* Smile */}
          <path d="M18.5 28.2 Q22 31.1 25.5 28.2"
                fill="none" stroke="#249fff" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </span>
    );
  }

  // PUBLIC_INTERFACE
  // Main chat UI render
  return (
    <div className={`c-chat-bg${theme === "light" ? " c-chat-bg-light" : ""}`} style={{ minHeight: "100vh" }}>
      {/* Chat container */}
      <div className="c-chat-main-container">
        <div className="c-chat-bubbles" ref={chatContainerRef}>
          {/* Floating bot avatar when at top */}
          <div className="c-chat-bot-float">
            <DefaultBotAvatar />
          </div>
          {messages.map((msg, idx) => (
            <ChatBubble
              key={msg.id || idx}
              msg={msg}
              align={msg.sender === "user" ? "right" : "left"}
              aiAvatar={msg.sender === "ai" ? <DefaultBotAvatar /> : null}
            />
          ))}

          {isLoading && (
            <div className="c-bubble-row align-left">
              <div className="c-avatar"><DefaultBotAvatar /></div>
              <div className="c-bubble c-bubble-ai">
                <span className="c-dot-flash"><span></span><span></span><span></span></span>
                <span className="thinking-txt">Thinking...</span>
              </div>
            </div>
          )}
        </div>

        {/* Error display */}
        {error && (
          <div className="c-chat-error-banner" role="alert">
            <span>⚠️ {error}</span>
            {retryMsg && (
              <button
                className="c-btn c-btn-error"
                onClick={handleRetry}
                tabIndex={0}
              >Retry</button>
            )}
            <button
              className="c-btn c-btn-clear"
              onClick={handleClear}
              tabIndex={0}
            >Reset</button>
          </div>
        )}

        {/* Message entry */}
        <form
          className="c-chat-entry-row"
          onSubmit={e => { e.preventDefault(); handleSend(); }}
          autoComplete="off"
        >
          <button
            type="button"
            className="c-btn c-btn-clear"
            title="Clear chat"
            aria-label="Clear chat"
            onClick={handleClear}
            tabIndex={0}
            style={{ marginRight: 8 }}
          >
            🗑
          </button>
          <input
            className="c-chat-input"
            type="text"
            name="text"
            aria-label="Type your message here"
            placeholder="Type a message (English) and press Enter…"
            value={input}
            spellCheck={true}
            disabled={isLoading || typing}
            autoFocus
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleInputKey}
            minLength={1}
            maxLength={512}
          />
          <button
            type="submit"
            className="c-btn c-btn-send"
            aria-label="Send message"
            disabled={!canSend}
            tabIndex={0}
          >
            <span className="c-plane-ico" aria-hidden="true">
              {/* paper plane SVG, accessible */}
              <svg width="25" height="25" viewBox="0 0 28 28" fill="none"><path d="M3.5 14.684l21-7.682a1 1 0 011.28 1.264l-4.37 17.06a1 1 0 01-1.668.53l-6.022-6.137-3.656-3.777z" stroke="#4F8CFF" strokeWidth="2.0" fill={theme === "dark" ? "#caf7ff" : "#4F8CFF"} /></svg>
            </span>
          </button>
        </form>
        {/* Info security display if using exposed key */}
        {!showKeyWarning && openAIApiKey && (
          <div
            className="c-chat-key-caution"
            style={{ fontSize: "0.91em", color: "#ffb532", textAlign: "center" }}
          >
            <span role="img" aria-label="Security">🔑</span>
            {" "}API key is for demo only. Never store keys in client code in real apps.
            <button style={{ marginLeft: 8, fontSize: "0.93em" }} onClick={() => setShowKeyWarning(true)}>
              Dismiss
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatPage;

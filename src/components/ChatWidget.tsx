import { useState, useRef, useEffect } from "react";
import { Chat, SendFilled } from "@carbon/icons-react";

interface Message {
  sender: "user" | "bot";
  text: string;
}

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  const handleToggleChat = () => {
    if (isOpen) {
      // Reset session on close
      setMessages([]);
      setInputValue("");
      setHasStarted(false);
    }
    setIsOpen((prev) => !prev);
  };

  const fetchBotReply = async (userMessage: string): Promise<string> => {
    try {
      const response = await fetch("/cortex_analyst", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_input: userMessage }), // adjust key name if backend expects different one
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      return data.result?.modelreply || "Sorry, no response from server.";
    } catch (error) {
      console.error("Error fetching from /cortex_analyst:", error);
      return "There was an error contacting DIP Chat. Please try again.";
    }
  };

  const handleSendMessage = async () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    const userMsg: Message = { sender: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setHasStarted(true);

    const botReply = await fetchBotReply(trimmed);
    setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={handleToggleChat}
        title={isOpen ? "Close Chat" : "Open Chat"}
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          backgroundColor: "#1a3673",
          color: "white",
          border: "none",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          zIndex: 1000,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "28px",
        }}
      >
        {isOpen ? "×" : <Chat size={24} />}
      </button>

      {/* Chat Popup */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "100px",
            right: "30px",
            width: "750px",
            height: "100%",
            maxHeight: "740px",
            backgroundColor: "white",
            borderRadius: "12px",
            boxShadow: "0 4px 24px rgba(0, 0, 0, 0.2)",
            zIndex: 9999,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <div style={{ backgroundColor: "#1a3673", color: "#fff", padding: "1rem", fontWeight: "bold" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "10px",
                }}
              >
                <span style={{ fontWeight: 800, color: "#1a3673" }}>
                  <Chat />
                </span>
              </div>
              DIP Chat
            </div>
          </div>

          {/* Messages */}
          <div style={{ padding: "1rem", flex: 1, overflowY: "auto" }}>
            {!hasStarted && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  marginBottom: "1rem",
                }}
              >
                <div
                  style={{
                    background: "#e8f0fe",
                    padding: "0.5rem 0.75rem",
                    borderRadius: "12px",
                    fontSize: "14px",
                    maxWidth: "80%",
                    wordWrap: "break-word",
                  }}
                >
                  Hey there! Solutions team at DIP Chat here. What do you need help with?
                </div>
              </div>
            )}

            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                  marginBottom: "0.75rem",
                }}
              >
                <div
                  style={{
                    backgroundColor: msg.sender === "user" ? "#1a3673" : "#e8f0fe",
                    color: msg.sender === "user" ? "#fff" : "#000",
                    padding: "0.5rem 0.75rem",
                    borderRadius: "16px",
                    fontSize: "14px",
                    maxWidth: "80%",
                    wordWrap: "break-word",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>

          {/* Input Box */}
          <div style={{ padding: "0.75rem", borderTop: "1px solid #eee", display: "flex", alignItems: "center" }}>
            <input
              placeholder="Write a message"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{
                flex: 1,
                padding: "0.5rem 0.75rem",
                borderRadius: "24px",
                border: "1px solid #ccc",
                fontSize: "14px",
                marginRight: "0.5rem",
              }}
            />
            <button
              onClick={handleSendMessage}
              style={{
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
              }}
              title="Send"
            >
              <SendFilled size={20} style={{ fill: "#1a3673" }} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatWidget;

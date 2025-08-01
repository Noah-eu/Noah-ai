"use client";

import { useState, useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import { askNoah } from "../../utils/openai";

type Message = {
  sender: "user" | "noah";
  text: string;
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("noah-history");
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("noah-history", JSON.stringify(messages));
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend() {
    if (!input.trim()) return;
    const userMsg: Message = { sender: "user", text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const answer = await askNoah(input);
      setMessages((msgs) => [...msgs, { sender: "noah", text: answer }]);
    } catch {
      setMessages((msgs) => [
        ...msgs,
        { sender: "noah", text: "Omlouvám se, něco se pokazilo. Zkuste to prosím znovu." }
      ]);
    }
    setLoading(false);
  }

  function handleClearChat() {
    setMessages([]);
    localStorage.removeItem("noah-history");
  }

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-b from-gray-100 to-gray-300 py-4">
      <div style={{ background: "yellow", color: "red", padding: 10 }}>TESTOVACÍ PRVEK - JSEM TADY?</div>
      {/* Chat box */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl flex flex-col h-[85vh] max-h-[700px] p-4">
        {/* Noahova fotka a jméno */}
        <div className="flex flex-col items-center mb-4">
          <img src="/noah.jpg" alt="Noah" className="w-16 h-16 rounded-full shadow-md" />
          <div className="font-semibold text-gray-700 mt-2 text-xl">Noah</div>
        </div>
        {/* Chatovací okno */}
        <div className="flex-1 overflow-y-auto mb-2">
          {messages.map((msg, i) => (
            <MessageBubble key={i} sender={msg.sender} text={msg.text} />
          ))}
          {loading && (
            <MessageBubble sender="noah" text="Noah přemýšlí..." />
          )}
          <div ref={chatBottomRef} />
        </div>
        {/* Input a Odeslat */}
        <div className="flex gap-2">
          <input
            className="flex-1 border border-gray-300 rounded-xl p-2"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSend()}
            placeholder="Napiš zprávu Noahovi…"
            disabled={loading}
          />
          <button
            className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold"
            onClick={handleSend}
            disabled={loading}
          >
            Odeslat
          </button>
        </div>
        {/* Tlačítko na smazání chatu */}
        <button
          className="mt-2 w-full py-2 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-700 transition"
          onClick={handleClearChat}
          disabled={loading}
        >
          Vymazat chat
        </button>
      </div>
    </div>
  );
}


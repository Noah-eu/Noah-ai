"use client";

import { useState, useEffect, useRef } from "react";
import { askNoah } from "../../utils/openai";

type Message = {
  sender: "user" | "noah";
  text: string;
};

const HISTORY_KEY = "chat_history";

function MessageBubble({ sender, text }: Message) {
  return (
    <div className={`flex mb-2 ${sender === "user" ? "justify-end" : "justify-start"}`}>
      {sender === "noah" && (
        <img
          src="/noah.jpg"
          alt="Noah"
          className="w-8 h-8 rounded-full mr-2 self-end"
          style={{ alignSelf: "flex-end" }}
        />
      )}
      {sender === "user" && (
        <img
          src="/user.png"
          alt="Ty"
          className="w-8 h-8 rounded-full ml-2 self-end"
          style={{ alignSelf: "flex-end" }}
        />
      )}
      <div
        className={`rounded-2xl px-4 py-2 max-w-xs
          ${sender === "user"
            ? "bg-blue-500 text-white self-end"
            : "bg-gray-200 text-gray-900 self-start"}
        `}
      >
        {text}
      </div>
    </div>
  );
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  // Načtení historie z localStorage při načtení komponenty
  useEffect(() => {
    const saved = localStorage.getItem(HISTORY_KEY);
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  // Uložení historie do localStorage a scroll na konec
  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(messages));
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend() {
    if (!input.trim()) return;
    const userMsg: Message = { sender: "user", text: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const answer = await askNoah(input, newMessages);
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
    localStorage.removeItem(HISTORY_KEY);
  }

  return (
    <div className="max-w-md w-full mx-auto flex flex-col h-[90vh] max-h-[700px] bg-white rounded-2xl shadow-xl p-4">
      {/* Hlavička */}
      <div className="flex flex-col items-center mb-4">
        <img src="/noah.jpg" alt="Noah" className="w-16 h-16 rounded-full shadow-md" />
        <div className="font-semibold text-gray-700 mt-2">Noah</div>
      </div>
      {/* Chat bubliny */}
      <div className="flex-1 overflow-y-auto mb-2">
        {messages.map((msg, i) => (
          <MessageBubble key={i} sender={msg.sender} text={msg.text} />
        ))}
        {loading && (
          <MessageBubble sender="noah" text="Noah přemýšlí..." />
        )}
        <div ref={chatBottomRef} />
      </div>
      {/* Odesílací pole */}
      <div className="flex gap-2">
        <input
          className="flex-1 border border-gray-300 rounded-xl p-2"

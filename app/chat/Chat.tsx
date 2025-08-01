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

  // Načti historii po načtení stránky
  useEffect(() => {
    const saved = localStorage.getItem("noah-history");
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  // Ukládej historii a scrolluj dolů
  useEffect(() => {
    localStorage.setItem("noah-history", JSON.stringify(messages));
    if (chatBottomRef.current) chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
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
    <div className="max-w-md w-full mx-auto flex flex-col h-[92vh] max-h-[750px] bg-white rounded-2xl shadow-xl p-4">
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
          <MessageBubble sender="noah" text="Noah přem

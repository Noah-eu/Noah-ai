"use client";

import { useState } from "react";
import MessageBubble from "./MessageBubble";
import { askNoah } from "../../utils/openai";

type Message = {
  sender: 'user' | 'noah';
  text: string;
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    if (!input.trim()) return;

    // Klíčové: typový náznak nebo "as const"
    const userMsg: Message = { sender: 'user', text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const answer = await askNoah(input);
      setMessages((msgs) => [
        ...msgs,
        { sender: 'noah' as const, text: answer }
      ]);
    } catch {
      setMessages((msgs) => [
        ...msgs,
        { sender: 'noah' as const, text: "Omlouvám se, něco se pokazilo. Zkuste to prosím znovu." }
      ]);
    }
    setLoading(false);
  }

  return (
    <div className="max-w-md w-full mx-auto flex flex-col h-[500px] bg-white rounded-2xl shadow-xl p-4">
      <div className="flex-1 overflow-y-auto mb-2">
        {messages.map((msg, i) => (
          <MessageBubble key={i} sender={msg.sender} text={msg.text} />
        ))}
        {loading && (
          <MessageBubble sender="noah" text="Noah přemýšlí..." />
        )}
      </div>
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
    </div>
  );
}

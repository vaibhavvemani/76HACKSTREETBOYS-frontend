import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

import ReactMarkdown from "react-markdown"
import remarkBreaks from "remark-breaks"

export default function FloatingChat() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMessage = { sender: "user", text: query };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const formData = new FormData();
      formData.append("query", query);

      const response = await fetch("http://127.0.0.1:5000/retreive_data", {
        method: "POST",
        body: formData,
      });

      const data = await response.text();
      const aiMessage = { sender: "ai", text: data };
      setMessages((prev) => [...prev, aiMessage]);
      setQuery("");
    } catch (err) {
      console.error("❌ Error fetching:", err);
    }
  };

  return (
    <>
      {/* 🔲 Mini Chat Launcher */}
      <div className="z-50 w-500">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-muted shadow-md rounded-full px-4 py-2"
        >
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask about a fund..."
            className="border-none bg-transparent focus:ring-0 text-sm"
          />
          <Button size="sm" className="rounded-full" type="submit">
            Open
          </Button>
        </form>
      </div>

      {/* 🧊 Modal Chat Window */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white w-[90%] max-w-[60rem] h-[600px] rounded-2xl shadow-lg flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-3 border-b bg-gray-100">
              <h2 className="font-medium text-lg">Finance Chat</h2>
              <button onClick={() => setShowModal(false)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`max-w-[60%] p-3 rounded-xl text-sm prose prose-sm ${
                    msg.sender === "user"
                      ? "bg-primary text-white ml-auto"
                      : "bg-muted text-black mr-auto"
                  }`}
                >
                  <ReactMarkdown 
                   remarkPlugins={[remarkBreaks]}>
                    {msg.text}
                  </ReactMarkdown>
                </div>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSearch} className="p-4 border-t flex gap-2">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask anything..."
                className="flex-1 rounded-full"
              />
              <Button type="submit" className="rounded-full">
                Send
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

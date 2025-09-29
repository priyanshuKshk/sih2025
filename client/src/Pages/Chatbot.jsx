import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Send } from "lucide-react"; // Make sure lucide-react is installed

export default function Chatbot() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleSend = () => {
    if (message.trim() === "") return;
    setChatHistory([...chatHistory, { type: "user", text: message }]);
    setMessage("");

    // Dummy bot response (can be replaced with real logic)
    setTimeout(() => {
      setChatHistory(prev => [
        ...prev,
        { type: "bot", text: t("chatbot_response") }
      ]);
    }, 500);
  };

  return (
    <div className="fixed top-20 right-4 z-[9999]">
      {/* Floating Icon */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 z-[9999] bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 text-2xl flex items-center justify-center"
        >
          💬
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 md:w-96 h-[80vh] bg-white shadow-2xl border rounded-tl-2xl flex flex-col">
          {/* Header */}
          <div className="bg-green-600 text-white flex justify-between items-center px-4 py-3 rounded-tl-2xl">
            <h2 className="font-bold">{t("chatbot_title")}</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white text-lg"
              >
                ➖
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white text-lg"
              >
                ❌
              </button>
            </div>
          </div>

          {/* Body */}
          {!isMinimized && (
            <div className="flex-1 flex flex-col justify-between">
              <div className="flex-1 overflow-y-auto p-4 text-gray-700 space-y-3">
                {/* Default messages */}
                <p className="text-sm bg-gray-100 p-3 rounded-lg">
                  {t("chatbot_greeting")}
                </p>
                <p className="text-sm bg-gray-100 p-3 rounded-lg">
                  {t("chatbot_intro")}
                </p>
                <p className="text-sm bg-gray-100 p-3 rounded-lg">
                  {t("chatbot_notes")}
                </p>

                {/* User / Bot chat history */}
                {chatHistory.map((msg, idx) => (
                  <p
                    key={idx}
                    className={`text-sm p-3 rounded-lg ${
                      msg.type === "user" ? "bg-green-100 text-right" : "bg-gray-100"
                    }`}
                  >
                    {msg.text}
                  </p>
                ))}
              </div>

              {/* Input Box */}
              <div className="flex border-t p-2 gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder={t("chatbot_input_placeholder")}
                  className="flex-1 border rounded-lg px-3 py-2 focus:outline-none"
                  onKeyDown={e => e.key === "Enter" && handleSend()}
                />
                <button
                  onClick={handleSend}
                  className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

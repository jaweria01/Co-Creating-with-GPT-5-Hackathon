import React, { useState } from "react";
import ChatBox from "../components/chatbot/ChatBox";
import VoiceButton from "../components/chatbot/VoiceButton";
import { sendChatQuery, sendVoiceQuery } from "../utils/api";

function Chatbot() {
  const [messages, setMessages] = useState([]);

  const handleTextSubmit = async (text) => {
    const response = await sendChatQuery(text);
    setMessages((prev) => [...prev, { user: text, bot: response }]);
  };

  const handleVoiceSubmit = async (audioBlob) => {
    const response = await sendVoiceQuery(audioBlob);
    setMessages((prev) => [...prev, { user: "Voice Query", bot: response }]);
  };

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold text-eco-green">
        Eco-Buddy Chatbot 🤖
      </h1>
      <div className="bg-white p-4 rounded-lg shadow-md h-96 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div key={index}>
            <p className="text-right text-eco-blue">
              <strong>You:</strong> {msg.user}
            </p>
            <p className="text-left text-eco-green">
              <strong>Eco-Buddy:</strong> {msg.bot}
            </p>
          </div>
        ))}
      </div>
      <ChatBox onSubmit={handleTextSubmit} />
      <VoiceButton onVoiceSubmit={handleVoiceSubmit} />
    </section>
  );
}

export default Chatbot;

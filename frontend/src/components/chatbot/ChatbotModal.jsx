import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatBox from "./ChatBox";
import VoiceButton from "./VoiceButton";
import {
  sendChatQuery,
  sendVoiceQuery,
  saveChatHistory,
  fetchChatHistory,
} from "../../utils/api";
import { logActivity } from "../../utils/api"; // For bot actions

function ChatbotModal({ isOpen, onClose, loggedIn }) {
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      fetchChatHistory().then(setMessages); // Load from backend
    }
  }, [loggedIn]);

  const handleResponse = (response, userInput) => {
    setMessages((prev) => {
      const newMessages = [...prev, { user: userInput, bot: response }];
      saveChatHistory(newMessages); // Save to backend
      return newMessages;
    });
    speakResponse(response);
  };

  const processQuery = async (text) => {
    if (text.toLowerCase().includes("about the website")) {
      const response =
        "EcoTrack is an AI for sustainable living. Features: Personalized actions, dashboard, chatbot. Login to access full features.";
      handleResponse(response, text);
      return;
    }

    // Bot actions if logged in
    if (text.includes("switch to dashboard")) {
      navigate("/dashboard");
      handleResponse("Switching to dashboard!", text);
      return;
    } else if (text.includes("log activity")) {
      const activity = text.split("log activity")[1].trim();
      await logActivity(activity);
      handleResponse(`Activity logged: ${activity}. Points awarded!`, text);
      return;
    }

    // Default query
    const response = await sendChatQuery(text);
    handleResponse(response, text);
  };

  const handleTextSubmit = (text) => processQuery(text);

  const handleVoiceSubmit = async (audioBlob, transcribedText) => {
    const response = await sendVoiceQuery(audioBlob);
    handleResponse(response, transcribedText || "Voice Query");
  };

  const speakResponse = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(
        text.replace("Eco-Buddy: ", "")
      );
      speechSynthesis.speak(utterance);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 right-4 z-50 bg-white w-80 h-96 rounded-lg shadow-xl border border-eco-green overflow-hidden flex flex-col">
      <div className="bg-eco-green text-white p-2 flex justify-between items-center">
        <h2 className="text-lg font-bold">Eco-Buddy Chatbot 🤖</h2>
        <button onClick={onClose} className="text-xl">
          &times;
        </button>
      </div>
      <div className="flex-grow p-4 overflow-y-auto space-y-4">
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
      <div className="p-4 border-t">
        <ChatBox onSubmit={handleTextSubmit} />
        <VoiceButton onVoiceSubmit={handleVoiceSubmit} />
      </div>
    </div>
  );
}

export default ChatbotModal;

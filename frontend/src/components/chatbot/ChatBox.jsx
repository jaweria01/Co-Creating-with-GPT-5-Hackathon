import React, { useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import SendIcon from "../../assets/send-icon.png";

function ChatBox({ onSubmit }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(input);
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="chat-input flex w-full">
      <Input
        placeholder="Ask Eco-Buddy how to save energy, water, or money..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-grow p-3.5 text-base bg-light-blue border-none outline-none text-gray-800 placeholder-gray-400 dark:bg-dark-blue dark:text-gray-200 dark:placeholder-gray-400"
      />
      <Button
        text={<img className="w-6" src={SendIcon} alt="Send" />}
        type="submit"
        className="bg-none p-3.5"
      />
    </form>
  );
}

export default ChatBox;

import React, { useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";

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
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <Input
        placeholder="Ask Eco-Buddy..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-grow"
      />
      <Button text="Send" type="submit" />
    </form>
  );
}

export default ChatBox;

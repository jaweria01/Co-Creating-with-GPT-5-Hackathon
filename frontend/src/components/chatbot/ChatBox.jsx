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
    <form onSubmit={handleSubmit} className="chat-input flex w-full">
      <Input
        placeholder="Ask Eco-Buddy how to save energy, water, or money..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-grow p-3.5 text-base bg-light-blue border-none outline-none text-gray-800 placeholder-gray-400 dark:bg-dark-blue dark:text-gray-200 dark:placeholder-gray-400"
      />
      <Button
        text="Send"
        type="submit"
        className="bg-primary-3 text-white p-3.5 px-5 text-base font-medium hover:bg-primary-2 transition-colors dark:bg-gray-700 dark:hover:bg-gray-600"
      />
    </form>
  );
}

export default ChatBox;

// import React, { useState } from "react";
// import Input from "../common/Input";
// import Button from "../common/Button";

// function ChatBox({ onSubmit }) {
//   const [input, setInput] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (input.trim()) {
//       onSubmit(input);
//       setInput("");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex space-x-2">
//       <Input
//         placeholder="Ask Eco-Buddy..."
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         className="flex-grow"
//       />
//       <Button text="Send" type="submit" />
//     </form>
//   );
// }

// export default ChatBox;

import React from "react";

function Text({ children }) {
  return <p className="text-sm text-gray-600 dark:text-gray-400">{children}</p>;
}

export default Text;

import React from "react";

function Label({ children, ...props }) {
  return (
    <label
      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      {...props}
    >
      {children}
    </label>
  );
}

export default Label;

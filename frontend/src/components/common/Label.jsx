import React from "react";

function Label({ children, ...props }) {
  return (
    <label
      className="block text-sm font-medium text-neutral-950 dark:text-gray-300"
      {...props}
    >
      {children}
    </label>
  );
}

export default Label;

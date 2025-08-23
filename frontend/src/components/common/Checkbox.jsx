import React from "react";

function Checkbox({ name, ...props }) {
  return (
    <input
      type="checkbox"
      name={name}
      className="h-4 w-4 text-primary-3 focus:ring-primary-2 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
      {...props}
    />
  );
}

export default Checkbox;

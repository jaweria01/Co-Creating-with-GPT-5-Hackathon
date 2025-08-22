import React from "react";

function Select({ children, name, ...props }) {
  return (
    <select
      name={name}
      className="w-full p-3 border border-primary-3/30 rounded focus:outline-none focus:ring-2 focus:ring-primary-3 dark:bg-gray-700 dark:text-white dark:border-gray-600"
      {...props}
    >
      {children}
    </select>
  );
}

export default Select;

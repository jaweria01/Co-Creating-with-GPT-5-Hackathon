import React from "react";

function Heading({ children }) {
  return (
    <h2 className="text-2xl font-bold text-neutral-950 dark:text-primary-1">
      {children}
    </h2>
  );
}

export default Heading;

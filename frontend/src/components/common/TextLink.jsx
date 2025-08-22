import React from "react";
import { Link } from "react-router-dom";

function TextLink({ to, children }) {
  return (
    <Link
      to={to}
      className="text-primary-3 hover:underline dark:text-primary-1"
    >
      {children}
    </Link>
  );
}

export default TextLink;

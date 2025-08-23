import React from "react";

function Button({
  text,
  onClick,
  className = "",
  disabled = false,
  ariaLabel,
  children,
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`button bg-eco-green text-white hover:bg-eco-green/80 ${className}`}
      aria-label={ariaLabel || text}
    >
      {children || text}
    </button>
  );
}

export default Button;

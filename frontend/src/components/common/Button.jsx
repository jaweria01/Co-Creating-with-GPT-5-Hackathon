import React from "react";

function Button({
  text,
  onClick,
  className = "",
  disabled = false,
  ariaLabel,
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`button bg-eco-green text-white hover:bg-eco-green/80 ${className}`}
      aria-label={ariaLabel || text}
    >
      {text}
    </button>
  );
}

export default Button;

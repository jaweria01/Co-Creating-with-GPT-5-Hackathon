import React from "react";

function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
  autoComplete = "",
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`input ${className}`}
      autoComplete={autoComplete}
    />
  );
}

export default Input;

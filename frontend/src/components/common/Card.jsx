import React from "react";

function Card({ title, children, className = "" }) {
  return (
    <div className={`card ${className}`}>
      {title && (
        <h3 className="text-xl font-semibold text-eco-green mb-4">{title}</h3>
      )}
      {children}
    </div>
  );
}

export default Card;

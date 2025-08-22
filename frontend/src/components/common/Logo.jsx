import React from "react";
import logo from "../../assets/logo-trans1.png";

function Logo({ className }) {
  return (
    <img
      src={logo}
      alt="EcoTrack Logo"
      className={`text-2xl font-bold ${className}`}
    />
  );
}

export default Logo;

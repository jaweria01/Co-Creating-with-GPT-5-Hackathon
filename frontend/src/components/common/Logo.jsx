import React from "react";
import logo from "../../assets/logo-trans1.png";

function Logo({ className }) {
  return <img src={logo} alt="EcoTrack Logo" className={`w-24 ${className}`} />;
}

export default Logo;

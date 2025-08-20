import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="bg-eco-green text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          EcoTrack 🌍
        </Link>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className="hover:underline">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/chatbot" className="hover:underline">
              Chatbot
            </Link>
          </li>
          <li>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;

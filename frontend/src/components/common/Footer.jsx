import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-primary-3 text-white py-6 mt-12 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-bold mb-4">EcoTrack</h3>
            <p>AI-powered sustainable living.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Links</h3>
            <ul className="space-y-2">
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
                <Link to="/gamification" className="hover:underline">
                  Gamification
                </Link>
              </li>
              <li>
                <Link to="/devices" className="hover:underline">
                  Devices
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:underline">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <p>Email: support@ecotrack.com</p>
            <p>Phone: +1-800-ECO-TRACK</p>
          </div>
        </div>
        <p className="text-center mt-6">
          &copy; 2025 EcoTrack. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;

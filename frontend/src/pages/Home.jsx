import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/common/Button";

function Home() {
  return (
    <section className="text-center py-12 md:py-20 fade-in">
      <h1 className="text-4xl md:text-5xl font-bold text-eco-green mb-6">
        Welcome to EcoTrack 🌍
      </h1>
      <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        AI-powered sustainable living: Track your carbon footprint, get
        personalized eco-tips, and join community challenges for a greener
        planet.
      </p>
      <div className="space-x-4">
        <Link to="/login">
          <Button text="Get Started" />
        </Link>
        <Link to="/dashboard">
          <Button
            text="View Dashboard"
            className="bg-eco-blue text-white hover:bg-eco-blue/80"
          />
        </Link>
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-eco-light rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-2">Personalized Actions</h2>
          <p>AI analyzes your habits for real tips.</p>
        </div>
        <div className="p-6 bg-eco-light rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-2">Interactive Dashboard</h2>
          <p>Visual graphs and progress tracking.</p>
        </div>
        <div className="p-6 bg-eco-light rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-2">Gamification</h2>
          <p>Earn badges and compete on leaderboards.</p>
        </div>
      </div>
    </section>
  );
}

export default Home;

import React from "react";

function About() {
  return (
    <section className="space-y-8 dark:text-gray-300">
      <h1 className="text-3xl font-bold text-primary-2 dark:text-primary-1">
        About EcoTrack
      </h1>
      <p>
        EcoTrack is an AI-powered platform for sustainable living. It analyzes
        household data to provide personalized eco-actions, tracks carbon
        footprint with visual dashboards, and engages users through gamification
        and rewards.
      </p>
      <p>Features include:</p>
      <ul className="list-disc pl-6 dark:text-gray-400">
        <li>Personalized tips based on bills and habits</li>
        <li>Interactive chatbot with voice queries</li>
        <li>Device tracking for real-time suggestions</li>
        <li>Community leaderboards and badges</li>
      </ul>
      <p>Our mission is to make sustainability accessible and fun.</p>
    </section>
  );
}

export default About;

import React, { useEffect, useState } from "react";
import { fetchGamificationData } from "../utils/api";

function Gamification() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchGamificationData().then(setData);
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <section className="space-y-8">
      <h1 className="text-3xl font-bold text-eco-green">
        Your Gamification 🌟
      </h1>
      <p>Points: {data.points}</p>
      <p>Badges: {data.badges.join(", ")}</p>
      <h2>History</h2>
      <ul>
        {data.history.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export default Gamification;

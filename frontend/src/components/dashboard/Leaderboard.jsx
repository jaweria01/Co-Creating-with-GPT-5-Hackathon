import React from "react";

function Leaderboard({ users }) {
  return (
    <ul className="space-y-2">
      {users.map((user, index) => (
        <li
          key={index}
          className="flex justify-between items-center p-2 bg-eco-light rounded"
        >
          <span>
            {user.name}{" "}
            {user.badge && (
              <span className="text-eco-green">({user.badge} 🌳)</span>
            )}
          </span>
          <span className="font-bold">{user.score} pts</span>
        </li>
      ))}
    </ul>
  );
}

export default Leaderboard;

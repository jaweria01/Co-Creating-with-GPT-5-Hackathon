import React, { useEffect, useState } from "react";
import CarbonPieChart from "../components/dashboard/CarbonPieChart";
import ProgressBar from "../components/dashboard/ProgressBar";
import SavingsLineChart from "../components/dashboard/SavingsLineChart";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import { fetchCarbonData, logActivity } from "../utils/api";

function Dashboard() {
  const [data, setData] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [action, setAction] = useState("");

  useEffect(() => {
    // Carbon data helper hi rakha hai
    fetchCarbonData().then(setData);

    // ✅ Leaderboard direct fetch
    fetch("https://ae163ea1e651.ngrok-free.app/leaderboard")
      .then(async (res) => {
        const contentType = res.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          return res ;
        } else {
          const text = await res.text();
          console.error("⚠️ Expected JSON, got:", text.slice(0, 200));
          return null;
        }
      })
      .then((data) => {
        if (data?.leaderboard) {
          setLeaderboard(
            data.leaderboard.map((u) => ({
              name: u.user_id,
              badge: u.badges?.length ? u.badges[u.badges.length - 1] : "",
              score: u.points || 0,
              streak: u.streak || 0,
            }))
          );
        }
      })
      .catch((err) => console.error("Leaderboard fetch error:", err));
  }, []);

  const handleLogActivity = async () => {
    if (action) {
      const response = await logActivity(action);
      if (response) {
        alert(
          `Activity logged! +${response.points} points. New badge: ${response.newBadge}`
        );
        fetchCarbonData().then(setData);

        // Refresh leaderboard after logging
        fetch("https://ae163ea1e651.ngrok-free.app/leaderboard")
          .then((res) => res.json())
          .then((data) => {
            if (data?.leaderboard) {
              setLeaderboard(
                data.leaderboard.map((u) => ({
                  name: u.user_id,
                  badge: u.badges?.length ? u.badges[u.badges.length - 1] : "",
                  score: u.points || 0,
                  streak: u.streak || 0,
                }))
              );
            }
          });

        setAction("");
      }
    }
  };

  if (!data)
    return (
      <div className="text-center py-10 dark:text-gray-400">
        Loading Dashboard...
      </div>
    );

  return (
    <div className="space-y-8 mt-10 text-center dark:text-gray-300">
      <h1 className="text-4xl font-bold text-primary-2 dark:text-primary-1">
        Your Eco Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card title="Carbon Footprint Breakdown" className="dark:bg-gray-800">
          <CarbonPieChart data={data.carbonPie} />
        </Card>
        <Card title="Green Score" className="dark:bg-gray-800">
          <ProgressBar score={data.greenScore} />
        </Card>
        <Card title="Savings Over Time" className="dark:bg-gray-800">
          <SavingsLineChart data={data.savingsLine} />
        </Card>

        {/* ✅ Direct Leaderboard render */}
        <Card
          title="Community Leaderboard"
          className="col-span-1 md:col-span-2 lg:col-span-3 dark:bg-gray-800"
        >
          <ul className="space-y-2">
            {leaderboard.map((user, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-2 bg-eco-light rounded"
              >
                <span>
                  {user.name}{" "}
                  {user.badge && (
                    <span className="text-eco-green">({user.badge} 🌳)</span>
                  )}
                  <span className="ml-2 text-xs text-gray-500">
                    🔥 {user.streak}d streak
                  </span>
                </span>
                <span className="font-bold">{user.score} pts</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Log an action (e.g., Switched to LED)"
          value={action}
          onChange={(e) => setAction(e.target.value)}
          className="input flex-grow dark:bg-gray-700 dark:text-white"
        />
        <Button
          text="Log Activity"
          onClick={handleLogActivity}
          className="bg-primary-3 text-white hover:bg-primary-2 dark:bg-gray-700 dark:hover:bg-gray-600"
        />
      </div>
    </div>
  );
}

export default Dashboard;

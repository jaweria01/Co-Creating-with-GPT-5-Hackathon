import React, { useEffect, useState } from "react";
import CarbonPieChart from "../components/dashboard/CarbonPieChart";
import ProgressBar from "../components/dashboard/ProgressBar";
import SavingsLineChart from "../components/dashboard/SavingsLineChart";
import Leaderboard from "../components/dashboard/Leaderboard";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import { fetchCarbonData, logActivity } from "../utils/api";

function Dashboard() {
  const [data, setData] = useState(null);
  const [action, setAction] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCarbonData()
      .then(setData)
      .catch((err) => {
        console.error("Failed to fetch carbon data:", err);
        setError("Unable to load dashboard data. Please try again.");
      });
  }, []);

  const handleLogActivity = async () => {
    if (action) {
      try {
        const response = await logActivity(action);
        if (response) {
          alert(
            `Activity logged! +${response.points} points. New badge: ${response.newBadge}`
          );
          fetchCarbonData().then(setData);
          setAction("");
        }
      } catch (err) {
        console.error("Failed to log activity:", err);
        setError("Failed to log activity. Please try again.");
      }
    }
  };

  if (error) {
    return (
      <section className="text-center py-10">
        <h1 className="text-3xl font-bold text-eco-green">Eco Dashboard 🌱</h1>
        <p className="text-red-600">{error}</p>
      </section>
    );
  }

  if (!data) {
    return <div className="text-center py-10">Loading Dashboard...</div>;
  }

  return (
    <section className="space-y-8">
      <h1 className="text-3xl font-bold text-eco-green">
        Your Eco Dashboard 🌱
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card title="Carbon Footprint Breakdown">
          <CarbonPieChart data={data.carbonPie} />
        </Card>
        <Card title="Green Score">
          <ProgressBar score={data.greenScore} />
        </Card>
        <Card title="Savings Over Time">
          <SavingsLineChart data={data.savingsLine} />
        </Card>
        <Card
          title="Community Leaderboard"
          className="col-span-1 md:col-span-2 lg:col-span-3"
        >
          <Leaderboard users={data.leaderboard} />
        </Card>
      </div>
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Log an action (e.g., Switched to LED)"
          value={action}
          onChange={(e) => setAction(e.target.value)}
          className="input flex-grow"
        />
        <Button text="Log Activity" onClick={handleLogActivity} />
      </div>
    </section>
  );
}

export default Dashboard;

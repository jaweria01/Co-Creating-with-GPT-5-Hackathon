import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function CarbonPieChart({ data }) {
  return (
    <div className="w-full h-64">
      <Pie
        data={data}
        options={{ responsive: true, maintainAspectRatio: false }}
      />
    </div>
  );
}

export default CarbonPieChart;

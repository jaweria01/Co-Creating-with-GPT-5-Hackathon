// import React from "react";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   Tooltip,
//   Legend
// );

// function SavingsLineChart({ data }) {
//   return (
//     <div className="w-full h-64">
//       <Line
//         data={data}
//         options={{ responsive: true, maintainAspectRatio: false }}
//       />
//     </div>
//   );
// }

// export default SavingsLineChart;

import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

function SavingsLineChart({ data }) {
  return (
    <div className="w-full h-64">
      <Line
        data={data}
        options={{ responsive: true, maintainAspectRatio: false }}
      />
    </div>
  );
}

export default SavingsLineChart;

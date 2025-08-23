// import React from "react";

// function ProgressBar({ score }) {
//   return (
//     <div className="w-full bg-gray-200 rounded-full h-4">
//       <div
//         className="bg-eco-green items-center h-4 rounded-full transition-all duration-500"
//         style={{ width: `${score}%` }}
//       >
//         <span className="text-white text-xs font-bold pl-2">
//           {score}% Green
//         </span>
//       </div>
//     </div>
//   );
// }

// export default ProgressBar;

import React from "react";

function ProgressBar({ score }) {
  return (
    <div className="relative w-full rounded-full">
      <progress
        className="progress items-center w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 [&::-webkit-progress-bar]:bg-gray-200 [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-value]:bg-primary-3 [&::-webkit-progress-value]:rounded-full [&::-moz-progress-bar]:bg-primary-3 dark:[&::-webkit-progress-value]:bg-primary-1 dark:[&::-moz-progress-bar]:bg-primary-1 transition-all duration-500"
        value={score}
        max="100"
      ></progress>
      <span className="absolute top-0 right-0 -mt-6 text-xs font-bold text-gray-800 dark:text-gray-200">
        {score}% Green
      </span>
    </div>
  );
}

export default ProgressBar;

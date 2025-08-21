import React from "react";

function ProgressBar({ score }) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-4">
      <div
        className="bg-eco-green h-4 rounded-full transition-all duration-500"
        style={{ width: `${score}%` }}
      >
        <span className="text-white text-xs font-bold pl-2">
          {score}% Green
        </span>
      </div>
    </div>
  );
}

export default ProgressBar;

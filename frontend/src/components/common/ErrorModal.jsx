import React from "react";
import Button from "./Button";

function ErrorModal({ error, onClose }) {
  if (!error) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-tertiary-1 dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-lg font-semibold text-primary-3 dark:text-primary-1">
          Error
        </h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{error}</p>
        <Button
          text="Close"
          onClick={onClose}
          className="mt-4 w-full bg-primary-3 text-white hover:bg-primary-2 dark:bg-gray-700 dark:hover:bg-gray-600"
        />
      </div>
    </div>
  );
}

export default ErrorModal;

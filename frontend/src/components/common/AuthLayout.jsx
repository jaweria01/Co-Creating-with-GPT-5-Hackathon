import React from "react";

function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-1 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">{children}</div>
    </div>
  );
}

export default AuthLayout;

import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import "./styles/custom.css";

// Lazy load pages for production optimization
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Chatbot = lazy(() => import("./pages/Chatbot"));

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-eco-light text-gray-800">
        <Header />
        <Suspense
          fallback={<div className="text-center py-10">Loading...</div>}
        >
          <main className="container mx-auto p-4 md:p-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/chatbot" element={<Chatbot />} />
            </Routes>
          </main>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;

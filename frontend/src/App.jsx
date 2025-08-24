// src/App.jsx
import React, { Suspense, lazy, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import ChatbotModal from "./components/chatbot/ChatbotModal";
import ProfileModal from "./components/common/ProfileModal";
import Button from "./components/common/Button";
import ChatIcon from "./assets/chat-bot.png";
import { setupWakeWordListener } from "./utils/voice";
import {
  isLoggedIn,
  getUserName,
  loginUser,
  signupUser,
  logoutUser,
} from "./utils/auth";
import { API_BASE_URL } from "./constants";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Gamification = lazy(() => import("./pages/Gamification"));
const Devices = lazy(() => import("./pages/Devices"));
const About = lazy(() => import("./pages/About"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));

function App() {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());
  const [userName, setUserName] = useState(getUserName());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return (
      localStorage.getItem("darkMode") === "true" ||
      (!("darkMode" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });
  let recognition = null;

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const handleAuth = async (action, data) => {
    try {
      if (action === "login" || action === "google-login") {
        const response = await loginUser(data);
        if (response.ok) {
          setLoggedIn(true);
          setUserName(data.username || data.name);
          window.location.href = "/";
        } else {
          throw new Error(response.error || "Login failed");
        }
      } else if (action === "signup" || action === "google-signup") {
        const response = await signupUser(data);
        if (response.ok) {
          setLoggedIn(true);
          setUserName(data.username || data.name);
          window.location.href = "/";
        } else {
          throw new Error(response.error || "Signup failed");
        }
      } else if (action === "logout") {
        await logoutUser();
        setLoggedIn(false);
        setUserName("");
        window.location.href = "/";
      } else if (action === "reset-password") {
        const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: data.email }),
        });
        if (response.ok) {
          return { ok: true };
        } else {
          const errorData = await response.json();
          throw new Error(errorData.error || "Reset password failed");
        }
      }
    } catch (err) {
      console.error("Auth error:", err);
      return { error: err.message };
    }
  };

  useEffect(() => {
    recognition = setupWakeWordListener({
      onWakeWordDetected: () => {
        if (isModalOpen) {
          document.dispatchEvent(new CustomEvent("startVoiceRecording"));
        } else {
          setIsAnimating(true);
          setTimeout(() => setIsAnimating(false), 3000);
        }
      },
    });
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        if (recognition) recognition.start();
      } else {
        if (recognition) recognition.stop();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isModalOpen]);

  return (
    <Router>
      <div
        className={`min-h-screen text-gray-800 flex flex-col ${
          darkMode ? "dark bg-gray-900 text-white" : "bg-gray-100"
        }`}
      >
        <Header
          loggedIn={loggedIn}
          userName={userName}
          toggleChatbotModal={toggleModal}
          onLogout={() => handleAuth("logout")}
          toggleProfile={toggleProfile}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
        <Suspense
          fallback={
            <div className="animate-pulse container mx-auto p-4 md:p-6">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="h-64 bg-gray-200 rounded-lg"></div>
                <div className="h-64 bg-gray-200 rounded-lg"></div>
                <div className="h-64 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          }
        >
          <main className="container mx-auto p-4 md:p-6 flex-grow">
            <Routes>
              <Route path="/" element={<Home loggedIn={loggedIn} />} />
              <Route path="/login" element={<Login onAuth={handleAuth} />} />
              <Route path="/signup" element={<Signup onAuth={handleAuth} />} />
              <Route
                path="/dashboard"
                element={loggedIn ? <Dashboard /> : <Navigate to="/login" />}
              />
              <Route
                path="/gamification"
                element={loggedIn ? <Gamification /> : <Navigate to="/login" />}
              />
              <Route
                path="/devices"
                element={loggedIn ? <Devices /> : <Navigate to="/login" />}
              />
              <Route path="/about" element={<About />} />
              <Route
                path="/reset-password"
                element={<ResetPassword onAuth={handleAuth} />}
              />
            </Routes>
          </main>
        </Suspense>
        <Button
          text=""
          onClick={toggleModal}
          className={`fixed bottom-4 right-4 z-50 w-12 h-12 rounded-full bg-primary-3 text-white shadow-lg flex items-center justify-center text-2xl hover:bg-primary-2 dark:bg-gray-700 dark:hover:bg-gray-600 ${
            isAnimating ? "animate-spin-light" : ""
          }`}
        >
          <img className="" src={ChatIcon} alt="Chat Bot" />
        </Button>
        <ChatbotModal
          isOpen={isModalOpen}
          onClose={toggleModal}
          loggedIn={loggedIn}
        />
        <ProfileModal
          isOpen={isProfileOpen}
          onClose={toggleProfile}
          onUpdate={handleAuth}
        />
        <Footer />
      </div>
    </Router>
  );
}

export default App;

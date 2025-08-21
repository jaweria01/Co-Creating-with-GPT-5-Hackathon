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
import { setupWakeWordListener } from "./utils/voice";
import {
  isLoggedIn,
  getUserName,
  loginUser,
  signupUser,
  logoutUser,
} from "./utils/auth";
import "./styles/custom.css";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Gamification = lazy(() => import("./pages/Gamification"));
const Devices = lazy(() => import("./pages/Devices"));

function App() {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());
  const [userName, setUserName] = useState(getUserName());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  let recognition = null;

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  const handleAuth = async (action, data) => {
    try {
      if (action === "login") {
        await loginUser(data);
        setLoggedIn(true);
        setUserName(data.username);
      } else if (action === "signup") {
        await signupUser(data);
        setLoggedIn(true);
        setUserName(data.username);
      } else if (action === "logout") {
        await logoutUser();
        setLoggedIn(false);
        setUserName("");
      }
      window.location.href = "/"; // Force redirect
    } catch (err) {
      console.error("Auth error:", err);
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
      <div className="min-h-screen bg-eco-light text-gray-800 flex flex-col">
        <Header
          loggedIn={loggedIn}
          userName={userName}
          toggleChatbotModal={toggleModal}
          onLogout={() => handleAuth("logout")}
          toggleProfile={toggleProfile}
        />
        <Suspense
          fallback={<div className="text-center py-10">Loading...</div>}
        >
          <main className="container mx-auto p-4 md:p-6 flex-grow">
            <Routes>
              <Route path="/" element={<Home loggedIn={loggedIn} />} />
              <Route
                path="/login"
                element={<Login onAuth={(data) => handleAuth("login", data)} />}
              />
              <Route
                path="/signup"
                element={
                  <Signup onAuth={(data) => handleAuth("signup", data)} />
                }
              />
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
            </Routes>
          </main>
        </Suspense>
        <Button
          text="🤖"
          onClick={toggleModal}
          className={`fixed bottom-4 right-4 z-50 w-12 h-12 rounded-full bg-eco-green text-white shadow-lg flex items-center justify-center text-2xl hover:bg-eco-green/80 ${
            isAnimating ? "animate-spin-light" : ""
          }`}
        />
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

// import React, { Suspense, lazy } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Header from "./components/common/Header";
// import "./styles/custom.css";

// // Lazy load pages for production optimization
// const Home = lazy(() => import("./pages/Home"));
// const Login = lazy(() => import("./pages/Login"));
// const Dashboard = lazy(() => import("./pages/Dashboard"));
// const Chatbot = lazy(() => import("./pages/Chatbot"));

// function App() {
//   return (
//     <Router>
//       <div className="min-h-screen bg-eco-light text-gray-800">
//         <Header />
//         <Suspense
//           fallback={<div className="text-center py-10">Loading...</div>}
//         >
//           <main className="container mx-auto p-4 md:p-6">
//             <Routes>
//               <Route path="/" element={<Home />} />
//               <Route path="/login" element={<Login />} />
//               <Route path="/dashboard" element={<Dashboard />} />
//               <Route path="/chatbot" element={<Chatbot />} />
//             </Routes>
//           </main>
//         </Suspense>
//       </div>
//     </Router>
//   );
// }

// export default App;

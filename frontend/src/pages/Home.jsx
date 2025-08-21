import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import { fetchGamificationData } from "../utils/api";

function Home({ loggedIn }) {
  const [gamification, setGamification] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const slides = [
    { image: "/assets/slide1.jpg", text: "Track your eco-impact" },
    { image: "/assets/slide2.jpg", text: "Get personalized tips" },
    { image: "/assets/slide3.jpg", text: "Join challenges" },
  ];

  useEffect(() => {
    if (loggedIn) {
      fetchGamificationData().then(setGamification);
    }
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [loggedIn]);

  return (
    <section className="text-center py-12 md:py-20 fade-in dark:text-gray-300">
      <div className="relative w-full h-64 mb-8 overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === slideIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.text}
              className="w-full h-full object-cover"
            />
            <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-2xl font-bold">
              {slide.text}
            </p>
          </div>
        ))}
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-primary-2 mb-6 dark:text-primary-1">
        Welcome to EcoTrack 🌍
      </h1>
      <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto dark:text-gray-400">
        AI-powered sustainable living: Track your carbon footprint, get
        personalized eco-tips, and join community challenges.
      </p>
      <div className="space-x-4 mb-8">
        {!loggedIn && (
          <Link to="/login">
            <Button
              text="Get Started"
              className="bg-primary-3 text-white hover:bg-primary-2 dark:bg-gray-700 dark:hover:bg-gray-600"
            />
          </Link>
        )}
        {loggedIn && (
          <Link to="/dashboard">
            <Button
              text="View Dashboard"
              className="bg-secondary-4 text-white hover:bg-secondary-3 dark:bg-gray-700 dark:hover:bg-gray-600"
            />
          </Link>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="p-6 bg-tertiary-1 rounded-lg shadow dark:bg-gray-800">
          <h2 className="text-2xl font-semibold mb-2 dark:text-gray-200">
            Personalized Actions
          </h2>
          <p className="dark:text-gray-400">
            AI analyzes your habits for real tips.
          </p>
        </div>
        <div className="p-6 bg-tertiary-1 rounded-lg shadow dark:bg-gray-800">
          <h2 className="text-2xl font-semibold mb-2 dark:text-gray-200">
            Interactive Dashboard
          </h2>
          <p className="dark:text-gray-400">
            Visual graphs and progress tracking.
          </p>
        </div>
        <div className="p-6 bg-tertiary-1 rounded-lg shadow dark:bg-gray-800">
          <h2 className="text-2xl font-semibold mb-2 dark:text-gray-200">
            Gamification
          </h2>
          <p className="dark:text-gray-400">
            Earn badges and compete on leaderboards.
          </p>
        </div>
      </div>
      {loggedIn && gamification && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold dark:text-gray-200">Your Scores</h2>
          <p className="dark:text-gray-400">Points: {gamification.points}</p>
          <p className="dark:text-gray-400">
            Badges: {gamification.badges.join(", ")}
          </p>
          <Link to="/gamification">
            <Button
              text="View Full Gamification"
              className="bg-primary-3 text-white hover:bg-primary-2 dark:bg-gray-700 dark:hover:bg-gray-600"
            />
          </Link>
        </div>
      )}
      {!loggedIn && (
        <p className="mt-8 dark:text-gray-400">
          Login to see your scores and badges!
        </p>
      )}
      <div className="mt-12">
        <h2 className="text-3xl font-bold dark:text-gray-200">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="p-4 bg-tertiary-1 rounded shadow dark:bg-gray-800">
            <img
              src="/assets/member1.jpg"
              alt="John Doe"
              className="w-32 h-32 rounded-full mx-auto"
            />
            <h3 className="dark:text-gray-200">John Doe</h3>
            <p className="dark:text-gray-400">CEO</p>
          </div>
          <div className="p-4 bg-tertiary-1 rounded shadow dark:bg-gray-800">
            <img
              src="/assets/member2.jpg"
              alt="Jane Smith"
              className="w-32 h-32 rounded-full mx-auto"
            />
            <h3 className="dark:text-gray-200">Jane Smith</h3>
            <p className="dark:text-gray-400">CTO</p>
          </div>
          <div className="p-4 bg-tertiary-1 rounded shadow dark:bg-gray-800">
            <img
              src="/assets/member3.jpg"
              alt="Alex Johnson"
              className="w-32 h-32 rounded-full mx-auto"
            />
            <h3 className="dark:text-gray-200">Alex Johnson</h3>
            <p className="dark:text-gray-400">Designer</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Button from "../components/common/Button";
// import { fetchGamificationData } from "../utils/api";

// function Home({ loggedIn }) {
//   const [gamification, setGamification] = useState(null);
//   const [slideIndex, setSlideIndex] = useState(0);
//   const slides = [
//     { image: "/assets/slide1.jpg", text: "Track your eco-impact" },
//     { image: "/assets/slide2.jpg", text: "Get personalized tips" },
//     { image: "/assets/slide3.jpg", text: "Join challenges" },
//   ];

//   useEffect(() => {
//     if (loggedIn) {
//       fetchGamificationData().then(setGamification);
//     }
//     const interval = setInterval(() => {
//       setSlideIndex((prev) => (prev + 1) % slides.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [loggedIn]);

//   return (
//     <section className="text-center py-12 md:py-20 fade-in">
//       <div className="relative w-full h-64 mb-8 overflow-hidden">
//         {slides.map((slide, index) => (
//           <div
//             key={index}
//             className={`absolute inset-0 transition-opacity duration-1000 ${
//               index === slideIndex ? "opacity-100" : "opacity-0"
//             }`}
//           >
//             <img
//               src={slide.image}
//               alt={slide.text}
//               className="w-full h-full object-cover"
//             />
//             <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-2xl font-bold">
//               {slide.text}
//             </p>
//           </div>
//         ))}
//       </div>
//       <h1 className="text-4xl md:text-5xl font-bold text-eco-green mb-6">
//         Welcome to EcoTrack 🌍
//       </h1>
//       <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
//         AI-powered sustainable living: Track your carbon footprint, get
//         personalized eco-tips, and join community challenges.
//       </p>
//       <div className="space-x-4 mb-8">
//         {!loggedIn && (
//           <Link to="/login">
//             <Button text="Get Started" />
//           </Link>
//         )}
//         {loggedIn && (
//           <Link to="/dashboard">
//             <Button
//               text="View Dashboard"
//               className="bg-eco-blue text-white hover:bg-eco-blue/80"
//             />
//           </Link>
//         )}
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//         <div className="p-6 bg-eco-light rounded-lg shadow">
//           <h2 className="text-2xl font-semibold mb-2">Personalized Actions</h2>
//           <p>AI analyzes your habits for real tips.</p>
//         </div>
//         <div className="p-6 bg-eco-light rounded-lg shadow">
//           <h2 className="text-2xl font-semibold mb-2">Interactive Dashboard</h2>
//           <p>Visual graphs and progress tracking.</p>
//         </div>
//         <div className="p-6 bg-eco-light rounded-lg shadow">
//           <h2 className="text-2xl font-semibold mb-2">Gamification</h2>
//           <p>Earn badges and compete on leaderboards.</p>
//         </div>
//       </div>
//       {loggedIn && gamification && (
//         <div className="mt-8">
//           <h2 className="text-2xl font-bold">Your Scores</h2>
//           <p>Points: {gamification.points}</p>
//           <p>Badges: {gamification.badges.join(", ")}</p>
//           <Link to="/gamification">
//             <Button text="View Full Gamification" />
//           </Link>
//         </div>
//       )}
//       {!loggedIn && (
//         <p className="mt-8">Login to see your scores and badges!</p>
//       )}
//       <div className="mt-12">
//         <h2 className="text-3xl font-bold">Our Team</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//           <div className="p-4 bg-eco-light rounded shadow">
//             <img
//               src="/assets/member1.jpg"
//               alt="John Doe"
//               className="w-32 h-32 rounded-full mx-auto"
//             />
//             <h3>John Doe</h3>
//             <p>CEO</p>
//           </div>
//           <div className="p-4 bg-eco-light rounded shadow">
//             <img
//               src="/assets/member2.jpg"
//               alt="Jane Smith"
//               className="w-32 h-32 rounded-full mx-auto"
//             />
//             <h3>Jane Smith</h3>
//             <p>CTO</p>
//           </div>
//           <div className="p-4 bg-eco-light rounded shadow">
//             <img
//               src="/assets/member3.jpg"
//               alt="Alex Johnson"
//               className="w-32 h-32 rounded-full mx-auto"
//             />
//             <h3>Alex Johnson</h3>
//             <p>Designer</p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Home;

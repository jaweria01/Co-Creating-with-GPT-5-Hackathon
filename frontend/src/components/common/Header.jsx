import React, { useState } from "react";
import { Link } from "react-router-dom";

function Header({
  toggleChatbotModal,
  loggedIn,
  userName,
  onLogout,
  toggleProfile,
  darkMode,
  toggleDarkMode,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const profileLetter = userName ? userName.charAt(0).toUpperCase() : "";

  return (
    <nav className="fixed top-0 w-full z-50 bg-primary-3 text-neutral-950 dark:text-white shadow-md dark:bg-gray-800">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          EcoTrack 🌍
        </Link>
        <button
          className="md:hidden text-3xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
        <ul className="hidden md:flex space-x-6 items-center">
          <li>
            <Link to="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className="hover:underline">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/gamification" className="hover:underline">
              Gamification
            </Link>
          </li>
          <li>
            <Link to="/devices" className="hover:underline">
              Devices
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:underline">
              About
            </Link>
          </li>
          {!loggedIn && (
            <li>
              <Link to="/signup" className="hover:underline">
                Create Account
              </Link>
            </li>
          )}
          {!loggedIn && (
            <li>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
            </li>
          )}
          {loggedIn && (
            <li>
              <button onClick={onLogout} className="hover:underline">
                Logout
              </button>
            </li>
          )}
          {loggedIn && (
            <li
              className="cursor-pointer w-8 h-8 rounded-full bg-white text-primary-3 flex items-center justify-center font-bold dark:bg-gray-700 dark:text-white"
              onClick={toggleProfile}
            >
              {profileLetter}
            </li>
          )}
          <li>
            <button onClick={toggleDarkMode} className="hover:underline">
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </li>
        </ul>
        {isMenuOpen && (
          <ul className="absolute top-16 left-0 w-full bg-primary-3 flex flex-col space-y-4 p-4 md:hidden dark:bg-gray-800">
            <li>
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/gamification" onClick={() => setIsMenuOpen(false)}>
                Gamification
              </Link>
            </li>
            <li>
              <Link to="/devices" onClick={() => setIsMenuOpen(false)}>
                Devices
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
            </li>
            {!loggedIn && (
              <li>
                <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                  Signup
                </Link>
              </li>
            )}
            {!loggedIn && (
              <li>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
              </li>
            )}
            {loggedIn && (
              <li>
                <button
                  onClick={() => {
                    onLogout();
                    setIsMenuOpen(false);
                  }}
                >
                  Logout
                </button>
              </li>
            )}
            <li>
              <button
                onClick={() => {
                  toggleDarkMode();
                  setIsMenuOpen(false);
                }}
              >
                {darkMode ? "Light Mode" : "Dark Mode"}
              </button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Header;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// function Header({
//   toggleChatbotModal,
//   loggedIn,
//   userName,
//   onLogout,
//   toggleProfile,
// }) {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const profileLetter = userName ? userName.charAt(0).toUpperCase() : "";

//   return (
//     <nav className="fixed top-0 w-full z-50 bg-eco-green-3 text-white shadow-md">
//       <div className="container mx-auto px-4 py-3 flex justify-between items-center">
//         <Link to="/" className="text-2xl font-bold">
//           EcoTrack 🌍
//         </Link>
//         <button
//           className="md:hidden text-3xl"
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//         >
//           ☰
//         </button>
//         <ul className="hidden md:flex space-x-6 items-center">
//           <li>
//             <Link to="/" className="hover:underline">
//               Home
//             </Link>
//           </li>
//           <li>
//             <Link to="/dashboard" className="hover:underline">
//               Dashboard
//             </Link>
//           </li>
//           <li>
//             <Link to="/gamification" className="hover:underline">
//               Gamification
//             </Link>
//           </li>
//           <li>
//             <Link to="/devices" className="hover:underline">
//               Devices
//             </Link>
//           </li>
//           <li>
//             <button onClick={toggleChatbotModal} className="hover:underline">
//               Chatbot
//             </button>
//           </li>
//           {!loggedIn && (
//             <li>
//               <Link to="/signup" className="hover:underline">
//                 Create Account
//               </Link>
//             </li>
//           )}
//           {!loggedIn && (
//             <li>
//               <Link to="/login" className="hover:underline">
//                 Login
//               </Link>
//             </li>
//           )}
//           {loggedIn && (
//             <li>
//               <button onClick={onLogout} className="hover:underline">
//                 Logout
//               </button>
//             </li>
//           )}
//           {loggedIn && (
//             <li
//               className="cursor-pointer w-8 h-8 rounded-full bg-white text-eco-green flex items-center justify-center font-bold"
//               onClick={toggleProfile}
//             >
//               {profileLetter}
//             </li>
//           )}
//         </ul>
//         {isMenuOpen && (
//           <ul className="absolute top-16 left-0 w-full bg-eco-green flex flex-col space-y-4 p-4 md:hidden">
//             <li>
//               <Link to="/" onClick={() => setIsMenuOpen(false)}>
//                 Home
//               </Link>
//             </li>
//             <li>
//               <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
//                 Dashboard
//               </Link>
//             </li>
//             <li>
//               <Link to="/gamification" onClick={() => setIsMenuOpen(false)}>
//                 Gamification
//               </Link>
//             </li>
//             <li>
//               <Link to="/devices" onClick={() => setIsMenuOpen(false)}>
//                 Devices
//               </Link>
//             </li>

//             {!loggedIn && (
//               <li>
//                 <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
//                   Create Account
//                 </Link>
//               </li>
//             )}
//             {!loggedIn && (
//               <li>
//                 <Link to="/login" onClick={() => setIsMenuOpen(false)}>
//                   Login
//                 </Link>
//               </li>
//             )}
//             {loggedIn && (
//               <li>
//                 <button
//                   onClick={() => {
//                     onLogout();
//                     setIsMenuOpen(false);
//                   }}
//                 >
//                   Logout
//                 </button>
//               </li>
//             )}
//           </ul>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Header;

// import React from "react";
// import { Link } from "react-router-dom";

// function Header() {
//   return (
//     <nav className="bg-eco-green text-white shadow-md">
//       <div className="container mx-auto px-4 py-3 flex justify-between items-center">
//         <Link to="/" className="text-2xl font-bold">
//           EcoTrack 🌍
//         </Link>
//         <ul className="flex space-x-6">
//           <li>
//             <Link to="/" className="hover:underline">
//               Home
//             </Link>
//           </li>
//           <li>
//             <Link to="/dashboard" className="hover:underline">
//               Dashboard
//             </Link>
//           </li>
//           <li>
//             <Link to="/chatbot" className="hover:underline">
//               Chatbot
//             </Link>
//           </li>
//           <li>
//             <Link to="/login" className="hover:underline">
//               Login
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// }

// export default Header;

import React, { useEffect, useState } from "react";
import { fetchGamificationData } from "../utils/api";
import Button from "../components/common/Button";

function Gamification() {
  const [gamification, setGamification] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGamificationData().then((data) => {
      setGamification(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse py-12 sm:py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-2"></div>
          <div className="h-10 bg-gray-200 rounded w-2/3 mx-auto mb-10"></div>
          <div className="grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
            <div className="h-96 bg-gray-200 rounded-lg lg:row-span-2"></div>
            <div className="h-64 bg-gray-200 rounded-lg"></div>
            <div className="h-64 bg-gray-200 rounded-lg"></div>
            <div className="h-96 bg-gray-200 rounded-lg lg:row-span-2"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 py-12 sm:py-16 dark:bg-gray-900 animate-fade-in">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-center text-base font-semibold text-primary-2 dark:text-primary-1">
          Your Eco Achievements
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-center text-3xl sm:text-4xl font-semibold tracking-tight text-gray-800 dark:text-white">
          Track your progress and earn rewards
        </p>
        <div className="mt-10 grid gap-4 sm:mt-12 lg:grid-cols-3 lg:grid-rows-2">
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-tertiary-1 lg:rounded-l-eco-lg dark:bg-gray-800" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-eco-lg lg:rounded-l-[calc(1rem+1px)]">
              <div className="px-6 pt-6 pb-3 sm:px-8 sm:pt-8 sm:pb-0">
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-800 max-lg:text-center dark:text-white">
                  Your Points
                </p>
                <p className="mt-2 max-w-lg text-sm text-gray-600 max-lg:text-center dark:text-gray-400">
                  Earn points by completing eco-friendly actions like reducing
                  energy usage or participating in challenges.
                </p>
              </div>
              <div className="relative min-h-[30rem] w-full grow max-lg:mx-auto max-lg:max-w-sm">
                <div className="absolute inset-x-8 top-8 bottom-0 overflow-hidden rounded-t-eco-md border-x-2 border-t-2 border-gray-700 bg-gray-900 shadow-eco-shadow-lg dark:shadow-none dark:outline dark:outline-white/20">
                  <div className="flex items-center justify-center h-full">
                    <p className="text-4xl font-bold text-white">
                      {gamification ? gamification.points : "0"} Points
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-eco-shadow outline outline-black/5 lg:rounded-l-eco-lg dark:outline-white/15" />
          </div>
          <div className="relative max-lg:row-start-1">
            <div className="absolute inset-px rounded-lg bg-tertiary-1 max-lg:rounded-t-eco-lg dark:bg-gray-800" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-eco-lg max-lg:rounded-t-[calc(1rem+1px)]">
              <div className="px-6 pt-6 sm:px-8 sm:pt-8">
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-800 max-lg:text-center dark:text-white">
                  Your Badges
                </p>
                <p className="mt-2 max-w-lg text-sm text-gray-600 max-lg:text-center dark:text-gray-400">
                  Unlock badges for your sustainable efforts and showcase your
                  commitment.
                </p>
              </div>
              <div className="flex flex-1 items-center justify-center px-6 max-lg:pt-8 max-lg:pb-10 sm:px-8 lg:pb-2">
                <div className="text-center">
                  {gamification && gamification.badges.length > 0 ? (
                    gamification.badges.map((badge, index) => (
                      <p
                        key={index}
                        className="text-sm text-gray-800 dark:text-gray-300"
                      >
                        🏅 {badge}
                      </p>
                    ))
                  ) : (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      No badges yet
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-eco-shadow outline outline-black/5 max-lg:rounded-t-eco-lg dark:outline-white/15" />
          </div>
          <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
            <div className="absolute inset-px rounded-lg bg-tertiary-1 dark:bg-gray-800" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-eco-lg">
              <div className="px-6 pt-6 sm:px-8 sm:pt-8">
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-800 max-lg:text-center dark:text-white">
                  Leaderboard
                </p>
                <p className="mt-2 max-w-lg text-sm text-gray-600 max-lg:text-center dark:text-gray-400">
                  Compete with others to become the top eco-warrior in your
                  community.
                </p>
              </div>
              <div className="flex flex-1 items-center justify-center px-6 max-lg:py-6 lg:pb-2">
                <div className="text-center">
                  {gamification && gamification.history.length > 0 ? (
                    gamification.history.slice(0, 3).map((entry, index) => (
                      <p
                        key={index}
                        className="text-sm text-gray-800 dark:text-gray-300"
                      >
                        {entry}
                      </p>
                    ))
                  ) : (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      No history yet
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-eco-shadow outline outline-black/5 dark:outline-white/15" />
          </div>
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-tertiary-1 max-lg:rounded-b-eco-lg lg:rounded-r-eco-lg dark:bg-gray-800" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-eco-lg max-lg:rounded-b-[calc(1rem+1px)] lg:rounded-r-[calc(1rem+1px)]">
              <div className="px-6 pt-6 pb-3 sm:px-8 sm:pt-8 sm:pb-0">
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-800 max-lg:text-center dark:text-white">
                  Take Action
                </p>
                <p className="mt-2 max-w-lg text-sm text-gray-600 max-lg:text-center dark:text-gray-400">
                  Complete challenges to earn more points and climb the
                  leaderboard.
                </p>
              </div>
              <div className="relative min-h-[30rem] w-full grow">
                <div className="absolute top-8 right-0 bottom-0 left-8 overflow-hidden rounded-tl-eco-md bg-gray-900 shadow-eco-shadow-lg dark:bg-gray-900/60 dark:shadow-none">
                  <div className="flex items-center justify-center h-full">
                    <Button
                      text="Start a Challenge"
                      className="bg-primary-3 text-white hover:bg-primary-2 dark:bg-gray-700 dark:hover:bg-gray-600"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-eco-shadow outline outline-black/5 max-lg:rounded-b-eco-lg lg:rounded-r-eco-lg dark:outline-white/15" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gamification;

// import React, { useEffect, useState } from "react";
// import { fetchGamificationData } from "../utils/api";

// function Gamification() {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     fetchGamificationData().then(setData);
//   }, []);

//   if (!data) return <div>Loading...</div>;

//   return (
//     <section className="space-y-8">
//       <h1 className="text-3xl font-bold text-eco-green">
//         Your Gamification 🌟
//       </h1>
//       <p>Points: {data.points}</p>
//       <p>Badges: {data.badges.join(", ")}</p>
//       <h2>History</h2>
//       <ul>
//         {data.history.map((item, index) => (
//           <li key={index}>{item}</li>
//         ))}
//       </ul>
//     </section>
//   );
// }

// export default Gamification;

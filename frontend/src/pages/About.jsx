import React from "react";

const links = [
  { name: "Sustainability Tips", href: "/tips" },
  { name: "Community Challenges", href: "/gamification" },
  { name: "EcoTrack Blog", href: "https://ecotrack-blog.example.com" },
  { name: "Our Mission", href: "#mission" },
];

const stats = [
  { name: "Users Worldwide", value: "10K+" },
  { name: "Carbon Saved", value: "500T" },
  { name: "Devices Connected", value: "1K+" },
  { name: "Eco-Actions Taken", value: "50K+" },
];

function About() {
  return (
    <div className="relative isolate overflow-hidden bg-light-blue py-24 sm:py-32 dark:bg-dark-blue animate-fade-in mg-t-eco-xs">
      <img
        alt="Eco-friendly background"
        src=""
        className="absolute inset-0 -z-10 size-full object-cover object-right md:object-center"
      />
      <div
        aria-hidden="true"
        className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-primary-2 to-primary-3 opacity-20"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:-top-112 sm:ml-16 sm:translate-x-0"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-primary-2 to-primary-3 opacity-20"
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-5xl font-semibold tracking-tight text-primary-3 dark:text-primary-1 sm:text-7xl">
            About EcoTrack
          </h2>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-800 dark:text-gray-300 sm:text-xl/8">
            EcoTrack is an AI-powered platform for sustainable living. It
            analyzes household data to provide personalized eco-actions, tracks
            carbon footprint with visual dashboards, and engages users through
            gamification and rewards.
          </p>
          <p className="mt-4 text-lg text-gray-800 dark:text-gray-300">
            Our mission is to make sustainability accessible and fun for
            everyone.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base/7 font-semibold text-primary-3 dark:text-primary-1 sm:grid-cols-2 md:flex lg:gap-x-10">
            {links.map((link) => (
              <a key={link.name} href={link.href} className="hover:underline">
                {link.name} <span aria-hidden="true">&rarr;</span>
              </a>
            ))}
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.name} className="flex flex-col-reverse gap-1">
                <dt className="text-base/7 text-gray-800 dark:text-gray-300">
                  {stat.name}
                </dt>
                <dd className="text-4xl font-semibold tracking-tight text-primary-3 dark:text-primary-1">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-10">
            <p className="text-lg text-gray-800 dark:text-gray-300">
              Features include:
            </p>
            <ul className="list-disc pl-6 mt-2 text-gray-800 dark:text-gray-400">
              <li>Personalized tips based on bills and habits</li>
              <li>Interactive chatbot with voice queries</li>
              <li>Device tracking for real-time suggestions</li>
              <li>Community leaderboards and badges</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;

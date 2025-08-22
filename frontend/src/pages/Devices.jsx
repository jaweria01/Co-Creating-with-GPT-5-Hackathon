import React, { useState, useEffect } from "react";
import { fetchDeviceData, connectDevice } from "../utils/api";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

function Devices() {
  const [devices, setDevices] = useState([]);
  const [deviceId, setDeviceId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDeviceData().then((data) => {
      setDevices(data);
      setLoading(false);
    });
  }, []);

  const handleConnect = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (deviceId) {
      try {
        const newDevice = await connectDevice(deviceId);
        setDevices([...devices, newDevice]);
        setDeviceId("");
      } catch (err) {
        console.error("Device connection failed:", err);
      }
    }
    setLoading(false);
  };

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
          Manage Your Devices
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-center text-3xl sm:text-4xl font-semibold tracking-tight text-gray-800 dark:text-white">
          Monitor and optimize your eco-devices
        </p>
        <div className="mt-10 grid gap-4 sm:mt-12 lg:grid-cols-3 lg:grid-rows-2">
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-tertiary-1 lg:rounded-l-eco-lg dark:bg-gray-800" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-eco-lg lg:rounded-l-[calc(1rem+1px)]">
              <div className="px-6 pt-6 pb-3 sm:px-8 sm:pt-8 sm:pb-0">
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-800 max-lg:text-center dark:text-white">
                  Connect a Device
                </p>
                <p className="mt-2 max-w-lg text-sm text-gray-600 max-lg:text-center dark:text-gray-400">
                  Add a new eco-device to monitor its usage and get optimization
                  tips.
                </p>
              </div>
              <div className="relative min-h-[30rem] w-full grow max-lg:mx-auto max-lg:max-w-sm">
                <div className="absolute inset-x-8 top-8 bottom-0 overflow-hidden rounded-t-eco-md border-x-2 border-t-2 border-gray-700 bg-gray-900 shadow-eco-shadow-lg dark:shadow-none dark:outline dark:outline-white/20">
                  <div className="flex items-center justify-center h-full p-6">
                    <form onSubmit={handleConnect} className="w-full space-y-4">
                      <Input
                        name="deviceId"
                        placeholder="Enter Device ID"
                        value={deviceId}
                        onChange={(e) => setDeviceId(e.target.value)}
                        className="w-full"
                      />
                      <Button
                        type="submit"
                        text="Connect Device"
                        className="w-full bg-primary-3 text-white hover:bg-primary-2 dark:bg-gray-700 dark:hover:bg-gray-600"
                      />
                    </form>
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
                  Device Status
                </p>
                <p className="mt-2 max-w-lg text-sm text-gray-600 max-lg:text-center dark:text-gray-400">
                  Check the current status of your connected devices.
                </p>
              </div>
              <div className="flex flex-1 items-center justify-center px-6 max-lg:pt-8 max-lg:pb-10 sm:px-8 lg:pb-2">
                <div className="text-center">
                  {devices.length > 0 ? (
                    devices.slice(0, 2).map((device) => (
                      <p
                        key={device.id}
                        className="text-sm text-gray-800 dark:text-gray-300"
                      >
                        {device.id}: {device.status}
                      </p>
                    ))
                  ) : (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      No devices connected
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
                  Energy Usage
                </p>
                <p className="mt-2 max-w-lg text-sm text-gray-600 max-lg:text-center dark:text-gray-400">
                  Monitor your devices' energy consumption to optimize
                  efficiency.
                </p>
              </div>
              <div className="flex flex-1 items-center justify-center px-6 max-lg:py-6 lg:pb-2">
                <div className="text-center">
                  {devices.length > 0 ? (
                    devices.slice(0, 2).map((device) => (
                      <p
                        key={device.id}
                        className="text-sm text-gray-800 dark:text-gray-300"
                      >
                        {device.id}: {device.usage} kWh
                      </p>
                    ))
                  ) : (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      No usage data
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
                  Eco Suggestions
                </p>
                <p className="mt-2 max-w-lg text-sm text-gray-600 max-lg:text-center dark:text-gray-400">
                  Get personalized tips to reduce your environmental impact.
                </p>
              </div>
              <div className="relative min-h-[30rem] w-full grow">
                <div className="absolute top-8 right-0 bottom-0 left-8 overflow-hidden rounded-tl-eco-md bg-gray-900 shadow-eco-shadow-lg dark:bg-gray-900/60 dark:shadow-none">
                  <div className="flex items-center justify-center h-full p-6">
                    <div className="text-center">
                      {devices.length > 0 ? (
                        devices.slice(0, 2).map((device) => (
                          <p key={device.id} className="text-sm text-white">
                            {device.suggestion}
                          </p>
                        ))
                      ) : (
                        <p className="text-sm text-white">
                          Connect a device to see suggestions
                        </p>
                      )}
                    </div>
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

export default Devices;

// import React, { useEffect, useState } from "react";
// import { fetchDeviceData, connectDevice } from "../utils/api";

// function Devices() {
//   const [devices, setDevices] = useState([]);
//   const [newDevice, setNewDevice] = useState("");

//   useEffect(() => {
//     fetchDeviceData().then(setDevices);
//   }, []);

//   const handleConnect = async () => {
//     if (newDevice) {
//       const data = await connectDevice(newDevice);
//       setDevices([...devices, data]);
//       setNewDevice("");
//     }
//   };

//   return (
//     <section className="space-y-8 dark:text-gray-300">
//       <h1 className="text-3xl font-bold text-primary-2 dark:text-primary-1">
//         Device Tracking
//       </h1>
//       <div className="flex space-x-2">
//         <input
//           placeholder="Device ID"
//           value={newDevice}
//           onChange={(e) => setNewDevice(e.target.value)}
//           className="input flex-grow dark:bg-gray-700 dark:text-white"
//         />
//         <Button
//           text="Connect"
//           onClick={handleConnect}
//           className="bg-primary-3 text-white hover:bg-primary-2 dark:bg-gray-700 dark:hover:bg-gray-600"
//         />
//       </div>
//       <ul className="space-y-4">
//         {devices.map((device, index) => (
//           <li
//             key={index}
//             className="p-4 bg-tertiary-1 rounded shadow dark:bg-gray-800"
//           >
//             <p className="dark:text-gray-400">Device: {device.id}</p>
//             <p className="dark:text-gray-400">Status: {device.status}</p>
//             <p className="dark:text-gray-400">Usage: {device.usage} kWh</p>
//             <p className="dark:text-gray-400">
//               Suggestion: {device.suggestion}
//             </p>
//           </li>
//         ))}
//       </ul>
//     </section>
//   );
// }

// export default Devices;

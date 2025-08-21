import React, { useEffect, useState } from "react";
import { fetchDeviceData, connectDevice } from "../utils/api";

function Devices() {
  const [devices, setDevices] = useState([]);
  const [newDevice, setNewDevice] = useState("");

  useEffect(() => {
    fetchDeviceData().then(setDevices);
  }, []);

  const handleConnect = async () => {
    if (newDevice) {
      const data = await connectDevice(newDevice);
      setDevices([...devices, data]);
      setNewDevice("");
    }
  };

  return (
    <section className="space-y-8 dark:text-gray-300">
      <h1 className="text-3xl font-bold text-primary-2 dark:text-primary-1">
        Device Tracking
      </h1>
      <div className="flex space-x-2">
        <input
          placeholder="Device ID"
          value={newDevice}
          onChange={(e) => setNewDevice(e.target.value)}
          className="input flex-grow dark:bg-gray-700 dark:text-white"
        />
        <Button
          text="Connect"
          onClick={handleConnect}
          className="bg-primary-3 text-white hover:bg-primary-2 dark:bg-gray-700 dark:hover:bg-gray-600"
        />
      </div>
      <ul className="space-y-4">
        {devices.map((device, index) => (
          <li
            key={index}
            className="p-4 bg-tertiary-1 rounded shadow dark:bg-gray-800"
          >
            <p className="dark:text-gray-400">Device: {device.id}</p>
            <p className="dark:text-gray-400">Status: {device.status}</p>
            <p className="dark:text-gray-400">Usage: {device.usage} kWh</p>
            <p className="dark:text-gray-400">
              Suggestion: {device.suggestion}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Devices;

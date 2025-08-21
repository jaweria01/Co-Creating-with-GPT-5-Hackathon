import React, { useEffect, useState } from "react";
import { fetchDeviceData, connectDevice } from "../utils/api";

function Devices() {
  const [devices, setDevices] = useState([]);
  const [newDevice, setNewDevice] = useState("");

  useEffect(() => {
    fetchDeviceData().then(setDevices); // Mock test data or real backend
  }, []);

  const handleConnect = () => {
    connectDevice(newDevice).then((data) => {
      setDevices([...devices, data]);
      setNewDevice("");
    });
  };

  return (
    <section className="space-y-8">
      <h1 className="text-3xl font-bold text-eco-green">Device Tracking</h1>
      <div className="flex space-x-2">
        <input
          placeholder="Device ID"
          value={newDevice}
          onChange={(e) => setNewDevice(e.target.value)}
          className="input flex-grow"
        />
        <Button text="Connect" onClick={handleConnect} />
      </div>
      <ul className="space-y-4">
        {devices.map((device, index) => (
          <li key={index} className="p-4 bg-eco-light rounded shadow">
            <p>Device: {device.id}</p>
            <p>Status: {device.status}</p>
            <p>Usage: {device.usage} kWh</p>
            <p>Suggestion: {device.suggestion}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Devices;

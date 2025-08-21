import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { updateProfile } from "../../utils/api";

function ProfileModal({ isOpen, onClose, onUpdate }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({ password });
      onClose();
    } catch (err) {
      setError("Update failed");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-eco-green mb-6">
          Profile Settings
        </h2>
        {error && <p className="text-red-600">{error}</p>}
        <form onSubmit={handleSubmit}>
          <Input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button text="Update" className="w-full mt-4" type="submit" />
        </form>
        <button onClick={onClose} className="mt-4 text-eco-green">
          Close
        </button>
      </div>
    </div>
  );
}

export default ProfileModal;

import React, { useState, useRef } from "react";
import Button from "../common/Button";
import { startVoiceRecording } from "../../utils/voice";

function VoiceButton({ onVoiceSubmit }) {
  const [isRecording, setIsRecording] = useState(false);
  let recorder = useRef(null);

  const toggleRecording = async () => {
    if (isRecording) {
      recorder.stop();
    } else {
      recorder = await startVoiceRecording((blob) => {
        setIsRecording(false);
        onVoiceSubmit(blob);
      });
      if (recorder) setIsRecording(true);
    }
  };

  return (
    <Button
      text={isRecording ? "Stop Recording" : "🎤 Voice Query"}
      onClick={toggleRecording}
      className={
        isRecording
          ? "bg-red-600 hover:bg-red-700"
          : "bg-eco-blue hover:bg-eco-blue/80"
      }
      ariaLabel="Voice Query Button"
    />
  );
}

export default VoiceButton;

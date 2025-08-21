import React, { useState, useEffect } from "react";
import Button from "../common/Button";
import { startVoiceRecordingWithSilenceDetection } from "../../utils/voice";

function VoiceButton({ onVoiceSubmit }) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcribedText, setTranscribedText] = useState("");
  let recorder = null;
  let recognition = null;

  const toggleRecording = async () => {
    if (isRecording) {
      recorder.stop();
      if (recognition) recognition.stop();
    } else {
      recorder = await startVoiceRecordingWithSilenceDetection((blob) => {
        setIsRecording(false);
        onVoiceSubmit(blob, transcribedText);
        setTranscribedText("");
      });
      if (recorder) {
        setIsRecording(true);
        if (
          "SpeechRecognition" in window ||
          "webkitSpeechRecognition" in window
        ) {
          const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;
          recognition = new SpeechRecognition();
          recognition.continuous = true;
          recognition.interimResults = true;
          recognition.onresult = (event) => {
            const transcript = Array.from(event.results)
              .map((result) => result[0].transcript)
              .join("");
            setTranscribedText(transcript);
          };
          recognition.start();
        }
      }
    }
  };

  useEffect(() => {
    const handleStartRecording = () => toggleRecording();
    document.addEventListener("startVoiceRecording", handleStartRecording);
    return () =>
      document.removeEventListener("startVoiceRecording", handleStartRecording);
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState !== "visible" && isRecording) {
        toggleRecording();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isRecording]);

  return (
    <Button
      text={isRecording ? "Stop Recording" : "🎤 Voice Query"}
      onClick={toggleRecording}
      className={`mt-4 w-full ${
        isRecording
          ? "bg-red-600 hover:bg-red-700"
          : "bg-secondary-4 hover:bg-secondary-3 dark:bg-gray-700 dark:hover:bg-gray-600"
      }`}
      ariaLabel="Voice Query Button"
    />
  );
}

export default VoiceButton;

// import React, { useState, useEffect } from "react";
// import Button from "../common/Button";
// import { startVoiceRecordingWithSilenceDetection } from "../../utils/voice";

// function VoiceButton({ onVoiceSubmit }) {
//   const [isRecording, setIsRecording] = useState(false);
//   const [transcribedText, setTranscribedText] = useState("");
//   let recorder = null;
//   let recognition = null;

//   const toggleRecording = async () => {
//     if (isRecording) {
//       recorder.stop();
//       recognition.stop();
//     } else {
//       recorder = await startVoiceRecordingWithSilenceDetection((blob) => {
//         setIsRecording(false);
//         onVoiceSubmit(blob, transcribedText);
//         setTranscribedText("");
//       });
//       if (recorder) {
//         setIsRecording(true);
//         // Start transcription
//         if (
//           "SpeechRecognition" in window ||
//           "webkitSpeechRecognition" in window
//         ) {
//           const SpeechRecognition =
//             window.SpeechRecognition || window.webkitSpeechRecognition;
//           recognition = new SpeechRecognition();
//           recognition.continuous = true;
//           recognition.interimResults = true;
//           recognition.onresult = (event) => {
//             const transcript = Array.from(event.results)
//               .map((result) => result[0].transcript)
//               .join("");
//             setTranscribedText(transcript);
//           };
//           recognition.start();
//         }
//       }
//     }
//   };

//   useEffect(() => {
//     const handleStartRecording = () => toggleRecording();
//     document.addEventListener("startVoiceRecording", handleStartRecording);
//     return () =>
//       document.removeEventListener("startVoiceRecording", handleStartRecording);
//   }, []);

//   return (
//     <Button
//       text={isRecording ? "Stop Recording" : "🎤 Voice Query"}
//       onClick={toggleRecording}
//       className={`mt-4 w-full ${
//         isRecording
//           ? "bg-red-600 hover:bg-red-700"
//           : "bg-eco-blue hover:bg-eco-blue/80"
//       }`}
//       ariaLabel="Voice Query Button"
//     />
//   );
// }

// export default VoiceButton;

// import React, { useState, useRef } from "react";
// import Button from "../common/Button";
// import { startVoiceRecording } from "../../utils/voice";

// function VoiceButton({ onVoiceSubmit }) {
//   const [isRecording, setIsRecording] = useState(false);
//   let recorder = useRef(null);

//   const toggleRecording = async () => {
//     if (isRecording) {
//       recorder.stop();
//     } else {
//       recorder = await startVoiceRecording((blob) => {
//         setIsRecording(false);
//         onVoiceSubmit(blob);
//       });
//       if (recorder) setIsRecording(true);
//     }
//   };

//   return (
//     <Button
//       text={isRecording ? "Stop Recording" : "🎤 Voice Query"}
//       onClick={toggleRecording}
//       className={
//         isRecording
//           ? "bg-red-600 hover:bg-red-700"
//           : "bg-eco-blue hover:bg-eco-blue/80"
//       }
//       ariaLabel="Voice Query Button"
//     />
//   );
// }

// export default VoiceButton;

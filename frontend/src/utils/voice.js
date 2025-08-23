export function setupWakeWordListener({ onWakeWordDetected }) {
    if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
        console.warn('SpeechRecognition not supported');
        return null;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
        if (transcript.includes('hey eco buddy')) {
            onWakeWordDetected();
        }
    };

    recognition.onend = () => {
        if (document.visibilityState === 'visible') recognition.start();
    };

    recognition.start();
    return recognition;
}

export async function startVoiceRecordingWithSilenceDetection(onStop) {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        const chunks = [];
        let silenceTimer = null;
        const SILENCE_THRESHOLD = -50;
        const SILENCE_DURATION = 2000;

        const audioContext = new AudioContext();
        const source = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048;
        source.connect(analyser);

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Float32Array(bufferLength);

        const checkSilence = () => {
            analyser.getFloatFrequencyData(dataArray);
            const maxDecibels = Math.max(...dataArray);
            if (maxDecibels < SILENCE_THRESHOLD) {
                if (!silenceTimer) {
                    silenceTimer = setTimeout(() => {
                        recorder.stop();
                    }, SILENCE_DURATION);
                }
            } else {
                clearTimeout(silenceTimer);
                silenceTimer = null;
            }
            if (recorder.state === 'recording') {
                requestAnimationFrame(checkSilence);
            }
        };

        checkSilence();

        recorder.ondataavailable = (e) => chunks.push(e.data);
        recorder.onstop = () => {
            const blob = new Blob(chunks, { type: 'audio/wav' });
            onStop(blob);
            stream.getTracks().forEach((track) => track.stop());
            audioContext.close();
        };

        recorder.start();
        return recorder;
    } catch (error) {
        console.error('Voice recording error:', error);
        return null;
    }
}


// // Wake Word Detection
// export function setupWakeWordListener({ onWakeWordDetected }) {
//     if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
//         console.warn('SpeechRecognition not supported');
//         return null;
//     }

//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     const recognition = new SpeechRecognition();
//     recognition.continuous = true;
//     recognition.interimResults = true;
//     recognition.lang = 'en-US';

//     recognition.onresult = (event) => {
//         const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
//         if (transcript.includes('hey eco buddy')) {
//             onWakeWordDetected();
//         }
//     };

//     recognition.onend = () => {
//         if (document.visibilityState === 'visible') recognition.start();
//     };

//     recognition.start();
//     return recognition;
// }

// // Voice Recording with Silence Detection
// export async function startVoiceRecordingWithSilenceDetection(onStop) {
//     try {
//         const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//         const recorder = new MediaRecorder(stream);
//         const chunks = [];
//         let silenceTimer = null;
//         const SILENCE_THRESHOLD = -50; // dB
//         const SILENCE_DURATION = 2000; // 2 seconds

//         // Setup Web Audio API for silence detection
//         const audioContext = new AudioContext();
//         const source = audioContext.createMediaStreamSource(stream);
//         const analyser = audioContext.createAnalyser();
//         analyser.fftSize = 2048;
//         source.connect(analyser);

//         const bufferLength = analyser.frequencyBinCount;
//         const dataArray = new Float32Array(bufferLength);

//         const checkSilence = () => {
//             analyser.getFloatFrequencyData(dataArray);
//             const maxDecibels = Math.max(...dataArray);
//             if (maxDecibels < SILENCE_THRESHOLD) {
//                 if (!silenceTimer) {
//                     silenceTimer = setTimeout(() => {
//                         recorder.stop();
//                     }, SILENCE_DURATION);
//                 }
//             } else {
//                 clearTimeout(silenceTimer);
//                 silenceTimer = null;
//             }
//             requestAnimationFrame(checkSilence);
//         };

//         checkSilence();

//         recorder.ondataavailable = (e) => chunks.push(e.data);
//         recorder.onstop = () => {
//             const blob = new Blob(chunks, { type: 'audio/wav' });
//             onStop(blob);
//             stream.getTracks().forEach((track) => track.stop());
//             audioContext.close();
//         };

//         recorder.start();
//         return recorder;
//     } catch (error) {
//         console.error('Voice recording error:', error);
//         return null;
//     }
// }


// export async function startVoiceRecording(onStop) {
//     try {
//         const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//         const recorder = new MediaRecorder(stream);
//         const chunks = [];

//         recorder.ondataavailable = (e) => chunks.push(e.data);
//         recorder.onstop = () => {
//             const blob = new Blob(chunks, { type: 'audio/wav' });
//             onStop(blob);
//             stream.getTracks().forEach((track) => track.stop());
//         };

//         recorder.start();
//         return recorder;
//     } catch (error) {
//         console.error('Voice recording error:', error);
//         return null;
//     }
// }
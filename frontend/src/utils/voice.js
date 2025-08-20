export async function startVoiceRecording(onStop) {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        const chunks = [];

        recorder.ondataavailable = (e) => chunks.push(e.data);
        recorder.onstop = () => {
            const blob = new Blob(chunks, { type: 'audio/wav' });
            onStop(blob);
            stream.getTracks().forEach((track) => track.stop());
        };

        recorder.start();
        return recorder;
    } catch (error) {
        console.error('Voice recording error:', error);
        return null;
    }
}
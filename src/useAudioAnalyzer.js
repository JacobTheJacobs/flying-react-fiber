import { useEffect, useState } from 'react';

export function useAudioAnalyzer() {
  const [audioData, setAudioData] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    let audioContext;
    let analyser;
    let dataArray;
    let source;

    const handleSuccess = (stream) => {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      analyser = audioContext.createAnalyser();
      dataArray = new Uint8Array(analyser.frequencyBinCount);

      source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);
      analyser.fftSize = 256;

      const bufferLength = analyser.frequencyBinCount;

      const update = () => {
        analyser.getByteFrequencyData(dataArray);
        const sum = dataArray.reduce((a, b) => a + b, 0);
        const average = sum / bufferLength;
        setAudioData(average);
        console.log('Audio Data:', average);

        requestAnimationFrame(update);
      };
      update();
    };

    const handleError = (err) => {
      console.error('Error accessing microphone:', err);
      setError('Error accessing microphone');
    };

    navigator.mediaDevices.getUserMedia({ audio: true }).then(handleSuccess).catch(handleError);

    return () => {
      if (audioContext) {
        audioContext.close();
      }
    };
  }, []);

  return { audioData, error };
}

export default useAudioAnalyzer;

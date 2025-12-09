import { useEffect, useRef, useState } from 'react';

export default function useVoiceRecorder() {
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]); // <-- теперь ref, а не state!

  const [recorderState, setRecorderState] = useState('idle');
  const [latestAudioBlob, setLatestAudioBlob] = useState(null);

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        try {
          mediaRecorderRef.current.stop();
        } catch (e) {}
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      mediaRecorderRef.current = mr;

      chunksRef.current = []; // очищаем с самого начала

      mr.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          chunksRef.current.push(e.data); // ⚡ мгновенно обновляется
        }
      };

      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });

        setLatestAudioBlob(blob); // передаём готовый blob
        chunksRef.current = []; // очищаем для следующей записи

        stream.getTracks().forEach((t) => t.stop());
        setRecorderState('idle');
      };

      mr.start();
      setRecorderState('recording');
    } catch (e) {
      console.error('Microphone access denied or error', e);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setRecorderState('stopped');
  };

  return { recorderState, startRecording, stopRecording, latestAudioBlob };
}

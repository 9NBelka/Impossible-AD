import { useState, useRef, useEffect } from 'react';
import styles from './VoiceMessage.module.scss';
import { BsFillPlayFill, BsPauseFill } from 'react-icons/bs';
import { GiSoundWaves } from 'react-icons/gi';

export default function VoiceMessage({ src }) {
  const audioRef = useRef(null);
  const progressRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => setDuration(audio.duration || 0);
    const updateTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener('loadedmetadata', setAudioData);
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      setCurrentTime(0);
    });

    if (audio.readyState >= 2) setDuration(audio.duration);

    return () => {
      audio.removeEventListener('loadedmetadata', setAudioData);
      audio.removeEventListener('timeupdate', updateTime);
    };
  }, [src]);

  const togglePlay = (e) => {
    e.stopPropagation(); // важно! чтобы не сработала перемотка
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Перемотка по клику на прогресс-бар
  const handleProgressClick = (e) => {
    const progress = progressRef.current;
    if (!progress || !duration) return;

    const rect = progress.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const clickPercent = x / width;
    const seekTime = clickPercent * duration;

    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className={styles.voice}
      onClick={handleProgressClick}
      ref={progressRef}
      role='button'
      tabIndex={0}
      style={{ cursor: 'pointer' }}>
      {/* Фон прогресса */}
      <div className={styles.progressFill} style={{ width: `${progressPercent}%` }} />

      <button className={styles.playBtn} onClick={togglePlay}>
        {isPlaying ? (
          <BsPauseFill className={styles.playPauseIcon} />
        ) : (
          <BsFillPlayFill className={styles.playPauseIcon} />
        )}
      </button>

      <div className={`${styles.bars} ${isPlaying ? styles.playing : ''}`}>
        <GiSoundWaves className={styles.iconWave} />
      </div>

      <div className={styles.timer}>
        <span className={styles.current}>{formatTime(currentTime)}</span>
        <span className={styles.separator}> / </span>
        <span className={styles.total}>{duration ? formatTime(duration) : '--'}</span>
      </div>

      <audio ref={audioRef} src={src} preload='metadata' />
    </div>
  );
}

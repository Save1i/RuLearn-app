import { useState } from "react";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import styles from "../styles/audioQ.module.css";

interface AudioProp {
  audio_q: string;
}

const AudioQuestion: React.FC<AudioProp> = ({ audio_q }) => {
  const [audio] = useState(new Audio(import.meta.env.VITE_API_URL + audio_q));

  const playAudio = () => {
    audio.currentTime = 0; // Сбрасываем в начало
    audio.play().catch((err) => console.error("Ошибка воспроизведения:", err));
  };

  return (
    <button className={styles.question__btn} onClick={playAudio}>
      <HiOutlineSpeakerWave className={styles.question__svg} />
    </button>
  );
};

export default AudioQuestion;

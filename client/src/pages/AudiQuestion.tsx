import { useState } from "react";

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
    <div className="question">
      <button className="question__btn" onClick={playAudio}>
        🎵 Воспроизвести
      </button>
    </div>
  );
};

export default AudioQuestion;

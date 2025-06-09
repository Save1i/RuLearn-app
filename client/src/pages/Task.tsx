import styles from "../styles/task.module.css";
import { useNavigate } from "react-router-dom";
import { TEST_ROUTE } from "../utils/consts";
import { FaArrowRight } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { useState } from "react";

interface TaskProps {
  taskP: {
    id?: number;
    name: string;
    type: string;
    duration: string;
    sectionId: number;
    learned: boolean;
    availability: boolean;
  };
}

const Task: React.FC<TaskProps> = ({ taskP }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    if (taskP.availability) {
      navigate(TEST_ROUTE + "/" + taskP.id);
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      <div
        className={`${styles.task} ${
          !taskP.availability ? styles.task__locked : ""
        }`}
        style={taskP.learned ? { background: "#bfdbfe" } : { background: "#DBEAFE" }}
        onClick={handleClick}
      >
        <div className={styles.task__up}>
          <div className={styles.task__info}>
            <span className={styles.task__type}>{taskP.type}</span>
            <span className={styles.task__duration}>{taskP.duration}</span>
          </div>
          <div className={styles.task__decore}>
            {taskP.learned ? <FaCheck /> : <FaArrowRight />}
          </div>
        </div>
        <p className={styles.task__title}>{taskP.name}</p>
      </div>

      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <h2 style={{marginBottom: "10px"}}>Задание недоступно</h2>
            <p style={{fontSize: "15px", marginBottom: "10px"}}>Это задание доступно только в платной версии. Пожалуйста, приобретите доступ.</p>
            <button onClick={() => setShowModal(false)}>Закрыть</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Task;

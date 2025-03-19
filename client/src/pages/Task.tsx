import styles from "../styles/task.module.css";
import { useNavigate } from "react-router-dom";
import { TEST_ROUTE } from "../utils/consts";

interface TaskProps {
  taskP: {
    id?: number;
    name: string;
    type: string;
    duration: string;
    sectionId: number;
    learned: boolean;
  };
}

const Task: React.FC<TaskProps> = ({ taskP }) => {
  const navigate = useNavigate();
  return (
    <div
      className={styles.task}
      style={taskP.learned ? { background: "green" } : { background: "blue" }}
      onClick={() => navigate(TEST_ROUTE + "/" + taskP.id)}
    >
      <div className={styles.task__up}>
        <div className={styles.task__info}>
          <span className={styles.task__type}>{taskP.type}</span>
          <span className={styles.task__duration}>{taskP.duration}</span>
        </div>
        <div className={styles.task__decore}></div>
      </div>
      <p className={styles.task__title}>{taskP.name}</p>
    </div>
  );
};

export default Task;

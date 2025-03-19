import styles from "../styles/task.module.css";
import { useNavigate } from "react-router-dom";
import { TEST_ROUTE } from "../utils/consts";

interface TaskProps {
  task: {
    id?: number;
    name: string;
    type: string;
    duration: string;
  };
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.task} onClick={() => navigate(TEST_ROUTE + "/" + task.id)}>
      <div className={styles.task__up}>
        <div className={styles.task__info}>
          <span className={styles.task__type}>{task.type}</span>
          <span className={styles.task__duration}>{task.duration}</span>
        </div>
        <div className={styles.task__decore}></div>
      </div>
      <p className={styles.task__title}>{task.name}</p>
    </div>
  );
};

export default Task;

import { observer } from "mobx-react-lite";
import Task from "./Task";
import styles from "../styles/sections.module.css";

interface isTaskP {
  id: number;
  name: string;
  type: string;
  duration: string;
  sectionId: number;
  learned: boolean;
  availability: boolean;
}

interface SectionProps {
  section: {
    id: number;
    name: string;
  };
  tasksP: Array<isTaskP>;
}

const Section: React.FC<SectionProps> = observer(({ section, tasksP }) => {
  const sectionTasks = tasksP
    .filter((taskP) => taskP.sectionId === section.id)
    .sort((a, b) => a.id - b.id);

  return (
    <div className={styles.section}>
      <div className={styles.section__inner}>
        <h2 className={styles.section__title}>{section.name}</h2>
        <div className={styles.tasks__container}>
          {sectionTasks.length > 0 ? (
            sectionTasks.map((task) => <Task key={task.id} taskP={task} />)
          ) : (
            <p className={styles.tasks__empty}>Задач пока нет</p>
          )}
        </div>
      </div>
    </div>
  );
});

export default Section;

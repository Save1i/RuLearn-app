import { observer } from "mobx-react-lite";
import Task from "./Task";

interface isTask {
  id: number;
  name: string;
  type: string;
  duration: string;
  sectionId: number;
}

interface SectionProps {
  section: {
    id: number;
    name: string;
  };
  tasks: Array<isTask>;
}

const Section: React.FC<SectionProps> = observer(({ section, tasks }) => {
  const sectionTasks = tasks.filter((task) => task.sectionId === section.id);

  return (
    <div className="section">
      <div className="section__inner">
        <h2 className="section__title">{section.name}</h2>
        <div className="tasks__container">
          {sectionTasks.length > 0 ? (
            sectionTasks.map((task) => <Task key={task.id} task={task} />)
          ) : (
            <p>Задач пока нет</p>
          )}
        </div>
      </div>
    </div>
  );
});

export default Section;

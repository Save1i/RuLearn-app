import { observer } from "mobx-react-lite";
import Task from "./Task";
// import { useContext, useEffect } from "react";
// import { Context } from "../main";
// import { fetchTaskProgress } from "../http/homeAPI";
// import { getUserId } from "../http/getUserId";

interface isTaskP {
  id: number;
  name: string;
  type: string;
  duration: string;
  sectionId: number;
  learned: boolean;
}

interface SectionProps {
  section: {
    id: number;
    name: string;
  };
  tasksP: Array<isTaskP>;
}

const Section: React.FC<SectionProps> = observer(({ section, tasksP }) => {
  const sectionTasks = tasksP.filter((taskP) => taskP.sectionId === section.id);

  return (
    <div className="section">
      <div className="section__inner">
        <h2 className="section__title">{section.name}</h2>
        <div className="tasks__container">
          {sectionTasks.length > 0 ? (
            sectionTasks.map((task) => <Task key={task.id} taskP={task} />)
          ) : (
            <p>Задач пока нет</p>
          )}
        </div>
      </div>
    </div>
  );
});

export default Section;

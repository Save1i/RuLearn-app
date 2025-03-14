import { useContext } from "react";
import { Context } from "../main";
import Task from "./Task";

interface SectionProps {
  section: {
    id: number;
    name: string;
  };
}

const Section: React.FC<SectionProps> = ({ section }) => {
  const context = useContext(Context);

  if (!context) {
    console.error("context не найден!");
    return null;
  }

  const { home } = context;

  return (
    <div className="section">
      <div className="section__inner">
        <h2 className="section__title">{section.name}</h2>
        <div className="tasks__container">
          {home.isTasks.length > 0 ? (
            home.isTasks.map((task) =>
              task.sectionId === section.id ? <Task key={task.id} task={task} /> : false
            )
          ) : (
            <p>Задач пока нет</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Section;

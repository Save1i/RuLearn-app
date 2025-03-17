import { useContext, useEffect } from "react";
import Section from "./Section";
import { Context } from "../main";
import styles from "../styles/home.module.css";
import LogInLogOut from "./LogInLogOut";
import { fetchSections, fetchTasks } from "../http/homeAPI";
import { observer } from "mobx-react-lite";

const Home = observer(() => {
  const { home } = useContext(Context);

  useEffect(() => {
    fetchSections().then((data) => home.setSection(data));
    fetchTasks().then((data) => home.setTask(data));
  }, []);

  return (
    <div className={styles.home}>
      <div className={styles.home__inner}>
        <LogInLogOut />
        <div className={styles.sections__container}>
          {home.isSections.length > 0 ? (
            home.isSections.map((section) => (
              <Section key={section.id} section={section} tasks={home.isTasks} />
            ))
          ) : (
            <p>Разделов пока нет</p>
          )}
        </div>
      </div>
    </div>
  );
});

export default Home;

import { useContext, useEffect } from "react";
import Section from "./Section";
import { Context } from "../main";
import styles from "../styles/home.module.css";
import LogInLogOut from "./LogInLogOut";
import { fetchSections, fetchTaskProgress } from "../http/homeAPI";
import { observer } from "mobx-react-lite";
import { getUserId } from "../http/getUserId";

const Home = observer(() => {
  const { home, user } = useContext(Context);
  const { id } = getUserId();

  useEffect(() => {
    fetchSections().then((data) => home.setSection(data));
    fetchTaskProgress(id).then((data) => home.setTaskProgress(data));
  }, [user.isAuth]);

  return (
    <div className={styles.home}>
      <div className={styles.home__inner}>
        <LogInLogOut />
        <div className={styles.sections__container}>
          {home.isSections.length > 0 ? (
            home.isSections.map((section) => (
              <Section key={section.id} section={section} tasksP={home.isTaskProgress} />
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

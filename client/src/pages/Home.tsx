import { useContext } from "react";
import Section from "./Section";
import { Context } from "../main";
import styles from "../styles/home.module.css";

const Home = () => {
  const context = useContext(Context);

  if (!context) {
    console.error("context не найден!");
    return null;
  }

  const { home } = context;

  return (
    <div className={styles.home}>
      <div className={styles.home__inner}>
        <div className={styles.sections__container}>
          {home.isTasks.length > 0 ? (
            home.isSections.map((section) => <Section key={section.id} section={section} />)
          ) : (
            <p>Задач пока нет</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

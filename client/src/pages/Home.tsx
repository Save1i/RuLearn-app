import { useContext, useEffect, useRef, useState } from "react";
import Section from "./Section";
import { Context } from "../main";
import styles from "../styles/home.module.css";
import { fetchSections, fetchTaskProgress } from "../http/homeAPI";
import { observer } from "mobx-react-lite";
import { getUserId } from "../http/getUserId";
import NavBarBottom from "../components/NavBarBottom";
import Header from "../components/Header";
import Statistics from "../components/Statistics";
import LogInLogOut from "../components/LogInLogOut";
import { CSSTransition } from "react-transition-group";

const Home = observer(() => {
  const { home, user } = useContext(Context);

  const nodeRef = useRef(null);
  const [showHome, setShowHome] = useState(false)

  const { id } = getUserId();
  


  useEffect(() => {
    fetchSections().then((data) => home.setSection(data));
    fetchTaskProgress(id).then((data) => home.setTaskProgress(data)
  ).finally(() => setShowHome(true));
  }, [user.isAuth]);

  return (
    <CSSTransition nodeRef={nodeRef} in={showHome} timeout={200} classNames={{
      enterActive: styles.homeEnterActive,
      enterDone: styles.homeEnterDone,
      exit: styles.homeExit,
      exitActive: styles.homeExitActive
    }}>
    <div ref={nodeRef} className={styles.home}>
      {user.isAuth ? (
        <>
          <Header />
          <div className={styles.home__inner}>
            <Statistics />

            <div className={styles.sections}>
              <h1 className={styles.sections__title}>Задания и практика</h1>
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
            <NavBarBottom />
          </div>
        </>
      ) : (
        <div
          style={{
            height: "100vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LogInLogOut />
        </div>
      )}
    </div>
    </CSSTransition>
  );
});

export default Home;

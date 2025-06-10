import { CSSTransition } from "react-transition-group";
import LogInLogOut from "../components/LogInLogOut";
import NavBarBottom from "../components/NavBarBottom";
import { useRef, useState } from "react";
import styles from "../styles/profile.module.css"

const ProfileUser = () => {
  const nodeRef = useRef(null);
  const [showProfile, setShowProfile] = useState<boolean>(false)

  setTimeout(() => {
    setShowProfile(true)
  }, 200)

  return (
    <>
    <CSSTransition nodeRef={nodeRef} in={showProfile} timeout={200} classNames={{
      enterActive: styles.profileEnterActive,
      enterDone: styles.profileEnterDone,
      exit: styles.profileExit,
      exitActive: styles.profileExitActive
    }}>
    <div>
        <div
        ref={nodeRef}
        className={styles.profile}
          style={{
            height: "100vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <LogInLogOut />
            <p className={styles.info}>Это бета-версия приложения, разработанная Савелием Косевичем в рамках дипломного проекта. Благодарю за использование!</p>
        </div>
    </div>
    </CSSTransition>
    <NavBarBottom />
    </>
  );
};

export default ProfileUser;

import styles from "../styles/navBarBottom.module.css";
import { FiHome } from "react-icons/fi";
import { TbSwipe } from "react-icons/tb";
import { LuNotebookPen } from "react-icons/lu";
import { GoPerson } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { HOME_ROUTE, PROFILE_ROUTE, SWIPE_ROUTE } from "../utils/consts";

const NavBarBottom = () => {
  const navigate = useNavigate();
  const path = window.location.pathname;
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navBar__container}>
        <li className={styles.navBar__el}>
          <FiHome
            onClick={() => navigate(HOME_ROUTE)}
            id="/"
            style={path === "/" ? { color: "#ff6f04" } : { color: "#899bb5" }}
            className={`${styles.navBar__el_svg} `}
          />
        </li>
        <li className={styles.navBar__el}>
          <TbSwipe
            onClick={() => navigate(SWIPE_ROUTE)}
            id="/swipe"
            style={path === "/swipe" ? { color: "#ff6f04" } : { color: "#899bb5" }}
            className={`${styles.navBar__el_svg} ${styles.full} ${styles.bold_l}`}
          />
        </li>
        <li className={styles.navBar__el}>
          <LuNotebookPen
            id="/words"
            style={path === "/words" ? { color: "#ff6f04" } : { color: "#899bb5" }}
            className={styles.navBar__el_svg}
          />
        </li>
        <li className={styles.navBar__el}>
          <GoPerson
            onClick={() => navigate(PROFILE_ROUTE)}
            id="/profile"
            style={path === "/profile" ? { color: "#ff6f04" } : { color: "#899bb5" }}
            className={`${styles.navBar__el_svg} ${styles.bold} ${styles.full}`}
          />
        </li>
      </ul>
    </nav>
  );
};

export default NavBarBottom;

import styles from "../styles/navBarBottom.module.css";
import { FiHome } from "react-icons/fi";
import { TbSwipe } from "react-icons/tb";
import { LuNotebookPen } from "react-icons/lu";
import { GoPerson } from "react-icons/go";

const NavBarBottom = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navBar__container}>
        <li className={styles.navBar__el}>
          <FiHome className={`${styles.navBar__el_svg} `} />
        </li>
        <li className={styles.navBar__el}>
          <TbSwipe className={`${styles.navBar__el_svg} ${styles.full} ${styles.bold_l}`} />
        </li>
        <li className={styles.navBar__el}>
          <LuNotebookPen className={styles.navBar__el_svg} />
        </li>
        <li className={styles.navBar__el}>
          <GoPerson className={`${styles.navBar__el_svg} ${styles.bold} ${styles.full}`} />
        </li>
      </ul>
    </nav>
  );
};

export default NavBarBottom;

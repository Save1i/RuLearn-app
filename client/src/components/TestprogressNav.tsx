import { useContext } from "react";
import styles from "../styles/testProgressNav.module.css";
import { Context } from "../context";
import { observer } from "mobx-react-lite";

const TestprogressNav = observer(() => {
  const { home } = useContext(Context);
  const pageCount = Math.ceil(home.isTotalCount / home.isLimit);
  const progress = (100 / pageCount) * (home.isPage - 1);

  return (
    <div className={styles.progress}>
      <div className={styles.progress__line} style={{ width: `${progress}%` }}></div>
    </div>
  );
});

export default TestprogressNav;

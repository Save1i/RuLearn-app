import styles from "../styles/testProgressNav.module.css";
import { observer } from "mobx-react-lite";

interface Proms {
  totalCount: number;
  isPage: number;
}

const TestprogressNav = observer(({totalCount, isPage}: Proms) => {

  const pageCount = Math.ceil(totalCount / 1);
  const progress = (100 / pageCount) * (isPage - 1);

  return (
    <div className={styles.progress}>
      <div className={styles.progress__line} style={{ width: `${progress}%` }}></div>
    </div>
  );
});

export default TestprogressNav;

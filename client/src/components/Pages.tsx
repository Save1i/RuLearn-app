import { observer } from "mobx-react-lite";
import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../main";
import { postTaskProgress } from "../http/postTaskProgress";
import { useNavigate } from "react-router-dom";
import { HOME_ROUTE } from "../utils/consts";
import styles from "../styles/pages.module.css";
import { IoIosCloseCircle } from "react-icons/io";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { CSSTransition } from 'react-transition-group';

interface AnswersProps {
  answer: string;
  correctAnswer: string;
  userId: number;
  taskId: string | undefined;
}

const Pages: React.FC<AnswersProps> = observer(({ answer, correctAnswer, userId, taskId }) => {
  const { home } = useContext(Context);
  const pageCount = Math.ceil(home.isTotalCount / home.isLimit);

  const navigate = useNavigate();

  const nodeRef = useRef(null);
  const [showPages, setShowPages] = useState(false)

  useEffect(() => {
    setShowPages(true)
  }, [answer])

  const completeTask = () => {
    postTaskProgress(userId, Number(taskId), home);
    home.setPage(1);
    navigate(HOME_ROUTE);
  };

  // Проверяем, есть ли следующая страница
  const hasNextPage = home.isPage < pageCount;

  console.log(pageCount, hasNextPage);

  const nextPage = () => {
    if (hasNextPage) {
      home.setPage(home.isPage + 1);
    }
  };

  console.log(home.isPage);

  return (
    <CSSTransition nodeRef={nodeRef} in={showPages} timeout={300} classNames={{
      enterActive: styles.pagesEnterActive,
      enterDone: styles.pagesEnterDone,
      exit: styles.pagesExit,
      exitActive: styles.pagesExitActive
    }}>
    <div ref={nodeRef} className={styles.pages}>
      <div className={styles.pages__header}>
        {answer === "Ошибка" ? (
          <>
            <IoIosCloseCircle className={`${styles.pages__svg} ${styles.incorrect}`} />
            <p className={`${styles.pages__answer} ${styles.incorrect}`}>{answer}</p>
          </>
        ) : (
          <>
            <IoIosCheckmarkCircle className={`${styles.pages__svg} ${styles.correct}`} />
            <p className={`${styles.pages__answer} ${styles.correct}`}>{answer}</p>
          </>
        )}
      </div>

      {answer === "Ошибка" && (
        <div className="">
          <p className={styles.pages__answer}>Правильный ответ:</p>
          <p className={styles.pages_text}>{correctAnswer}</p>
        </div>
      )}
      <button className={styles.pages__btn} onClick={hasNextPage ? nextPage : completeTask}>
        {hasNextPage ? "ПРОДОЛЖИТЬ" : "ЗАВЕРШИТЬ"}
      </button>
    </div>
    </CSSTransition>
  );
});

export default Pages;

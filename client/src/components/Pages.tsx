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
  showTest: React.Dispatch<React.SetStateAction<boolean>>;
}

const Pages: React.FC<AnswersProps> = observer(({ answer, correctAnswer, userId, taskId, showTest }) => {
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

    showTest(false);
    setTimeout(() => {
      home.setPage(1);
      navigate(HOME_ROUTE);
    }, 200)
  };

  // Проверяем, есть ли следующая страница
  const hasNextPage = home.isPage < pageCount;

  console.log(pageCount, hasNextPage);

  const nextPage = () => {
    if (hasNextPage) {
      setShowPages(false)
      showTest(false)
      setTimeout(() => {
        home.setPage(home.isPage + 1);
      }, 200)

    }
  };

  const isIncorrect = answer === "Ошибка";
  const Icon = isIncorrect ? IoIosCloseCircle : IoIosCheckmarkCircle;
  const statusClass = isIncorrect ? styles.incorrect : styles.correct;

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
          <>
            <Icon className={`${styles.pages__svg} ${statusClass}`} />
            <p className={`${styles.pages__answer} ${statusClass}`}>{answer}</p>
          </>
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

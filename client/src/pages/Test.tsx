import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchTests } from "../http/homeAPI";
import { observer } from "mobx-react-lite";
import AudioQuestion from "../components/AudiQuestion";
import Pages from "../components/Pages";
import { Context } from "../main";
import { getUserId } from "../http/getUserId";
import styles from "../styles/test.module.css";
import TestprogressNav from "../components/TestprogressNav";
import CloseToHomeBtn from "../components/CloseToHomeBtn";
import { CSSTransition } from 'react-transition-group';

console.log(import.meta.env.VITE_API_URL);

const Test = observer(() => {
  const { taskId } = useParams();
  const { home } = useContext(Context);

  const [answer, setAnswer] = useState("");

  const nodeRef = useRef(null);
  const [showTest, setShowTest] = useState(false)
  


  useEffect(() => {
    fetchTests(taskId, home.isPage, 1).then((data) => {
      setShowTest(true)

      home.setTest(data.rows);
      home.setTotalCount(data.count);
      setAnswer("");
    });
  }, [home.isPage]);

  const { id } = getUserId();

  const result = (selectedOption: string, correctAnswer: string) => {
    if (answer) return;
    if (selectedOption === correctAnswer) {
      setAnswer("Правильно!");
    } else {
      setAnswer("Ошибка");
    }
  };

  return (
    <CSSTransition nodeRef={nodeRef} in={showTest} timeout={200} classNames={{
      enterActive: styles.testEnterActive,
      enterDone: styles.testEnterDone,
      exit: styles.testExit,
      exitActive: styles.exitActive
    }}>
    <div ref={nodeRef} className={styles.test}>
      <div className={styles.test__header}>
        <CloseToHomeBtn showTest={setShowTest}/>
        <TestprogressNav />
      </div>

      {home.isTests.map((el) => (
        <div key={el.id} className={styles.test__inner}>
          <p className={styles.test__title}>{el.text_q}</p>
          <div className={styles.test__container}>
            <img width={100} height={125} src={import.meta.env.VITE_API_URL + el.img} alt="" />{" "}
            {el.audio_q ? (
              <AudioQuestion audio_q={el.audio_q} />
            ) : (
              <p className={styles.test__text}>{el.text_q}</p>
            )}
          </div>
          <div className={styles.options}>
            {el.options.map((opt, index) => (
              <button
                key={index}
                className={styles.options__btn}
                onClick={() => result(opt, el.correct_answer)}
              >
                {opt}
              </button>
            ))}
          </div>
          {answer ? (
            <Pages userId={id} taskId={taskId} answer={answer} correctAnswer={el.correct_answer} />
          ) : (
            false
          )}
        </div>
      ))}
    </div>
    </CSSTransition>
  );
});

export default Test;

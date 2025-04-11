import { useContext, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { observer } from "mobx-react-lite";
// import AudioQuestion from "../components/AudiQuestion";
import Pages from "../components/Pages";
import { Context } from "../main";
import { getUserId } from "../http/getUserId";
import styles from "../styles/test.module.css";
import TestprogressNav from "../components/TestprogressNav";
import CloseToHomeBtn from "../components/CloseToHomeBtn";
import { CSSTransition } from 'react-transition-group';
import { supabase } from "../http/supabaseClient";

const Test = observer(() => {
  const { home } = useContext(Context);
  const [answer, setAnswer] = useState("");
  const nodeRef = useRef(null);
  const { taskId } = useParams();
  const [showTest, setShowTest] = useState(false);


  async function getImage(img: string) {
    const {data, error} = await supabase.storage.from("static").download(`${img}`)
    console.log(data)
    console.log(error)
  }

  getImage("27d76878-c55b-492f-8c6e-a2ef1969da62.png")


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
          <CloseToHomeBtn showTest={setShowTest} />
          <TestprogressNav />
        </div>

        {home.isTests.map((el) => (
          <div key={el.id} className={styles.test__inner}>
            <p className={styles.test__title}>{el.name}</p>
            <div className={styles.test__container}>

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
              <Pages
                userId={id}
                taskId={taskId}
                answer={answer}
                correctAnswer={el.correct_answer}
                showTest={setShowTest}
              />
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

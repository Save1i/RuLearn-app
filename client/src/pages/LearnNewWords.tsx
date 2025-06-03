import SwipeCard from "../components/SwipeCard";
import HeaderNav from '../components/HeaderNav';
import TestprogressNav from '../components/TestprogressNav';
import styles from '../styles/learnNewWord.module.css';
import ConfettiExplosion from 'react-confetti-explosion';
import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../context";
import { observer } from "mobx-react-lite";
import { CSSTransition } from 'react-transition-group';
import { fetchNewWords } from "../http/homeAPI";
import { getUserId } from "../http/getUserId";

const LearnNewWords = observer(() => {
  const { home } = useContext(Context);
  const { id } = getUserId();

  const [isExploding, setIsExploding] = useState(false);
  const [wasExploded, setWasExploded] = useState(false);
  const [showPage, setShowPage] = useState(false);

  const nodeRef = useRef(null);

  useEffect(() => {
    const loadWords = async () => {
      const data = await fetchNewWords(id, 1, 10);
      home.setWord(data.rows);
      home.setTotalCount(data.rows.length);
      setShowPage(true);
    };

    loadWords();
  }, [home, id]);

  useEffect(() => {
    if (!wasExploded && home.isTotalCount > 0 && home.isTotalCount < home.isPage) {
      setTimeout(() => {
        setIsExploding(true);
        setWasExploded(true);
      }, 300);
    }
  }, [home.isTotalCount, home.isPage]);

  return (
      <div className={styles.learn__word}>
      <HeaderNav name='Учить новые слова' />
      <CSSTransition
      nodeRef={nodeRef}
      in={showPage}
      timeout={200}
      classNames={{
        enterActive: styles.learnEnterActive,
        enterDone: styles.learnEnterDone,
        exit: styles.learnExit,
        exitActive: styles.exitActive
      }}
      unmountOnExit>
        <>
        <div className={styles.learn__progress} ref={nodeRef}>
          {isExploding ? (
            <ConfettiExplosion
              force={0.1}
              particleCount={25}
              width={450}
              particleSize={6}
              duration={2500}
              style={{
                position: 'absolute',
                top: '45px',
                left: '50%',
                zIndex: '1',
                transform: 'translate(-50%, -50%)'
              }}
            />
          ) : (
            <TestprogressNav totalCount={home.isTotalCount} isPage={home.isPage} />
          )}
        </div>
        <SwipeCard />
        </>
      </CSSTransition>
      </div>
  );
});

export default LearnNewWords;

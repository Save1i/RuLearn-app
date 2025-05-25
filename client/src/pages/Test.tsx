import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchTests } from "../http/homeAPI";
import { observer } from "mobx-react-lite";
import AudioQuestion from "../components/AudiQuestion";
import Pages from "../components/Pages";
import { Context } from "../context";
import { getUserId } from "../http/getUserId";
import styles from "../styles/test.module.css";
import TestprogressNav from "../components/TestprogressNav";
import CloseToHomeBtn from "../components/CloseToHomeBtn";
import { CSSTransition } from 'react-transition-group';
import { supabase } from "../http/supabaseClient";

import DndTest from "../components/DndTest";
import Options from "../components/Options";


const Test = observer(() => {
  const { home } = useContext(Context);
  const [answer, setAnswer] = useState("");
  const nodeRef = useRef(null);
  const { taskId } = useParams();
  const [loadTest, setLoadTest] = useState(false);
  const [loadData, setLoadData] = useState(false);
  const [showTest, setShowTest] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const [mediaUrls, setMediaUrls] = useState<Record<string, { image?: string; audio?: string }>>({});
  
  useEffect(() => {
    
    const loadMediaUrls = () => {
      const newUrls: Record<string, { image?: string; audio?: string }> = {};

      for (const test of home.isTests) {
        if (test.img) {
          const { data: { publicUrl: imageUrl } } = supabase
            .storage
            .from('static')
            .getPublicUrl(test.img);
          newUrls[test.id] = { ...newUrls[test.id], image: imageUrl };
          setImageLoaded(true);
        }

        if (test.audio_q) {
          const { data: { publicUrl: audioUrl } } = supabase
            .storage
            .from('static')
            .getPublicUrl(test.audio_q);
          newUrls[test.id] = { ...newUrls[test.id], audio: audioUrl };
        }

        setLoadData(true)
      }
      setMediaUrls(newUrls);
    };

    loadMediaUrls();
  },[home.isTests] )

    useEffect(() => {
      // Здесь fetchTests, например, загрузка данных
    fetchTests(taskId, home.isPage, 1).then((data) => {
      setImageLoaded(false)
      home.setTest(data.rows);
      home.setTotalCount(data.count);
      setAnswer("");
    }).finally(() => setLoadTest(true));
  }, [taskId, home.isPage]);

useEffect(() => {
  if (loadData && loadTest && imageLoaded) {
    console.log("show");
      setShowTest(true);
  } else {
    setShowTest(false)
  }
}, [loadData, loadTest, imageLoaded]);

  const { id } = getUserId();

  return (
    <CSSTransition nodeRef={nodeRef} in={showTest} timeout={200} classNames={{
      enterActive: styles.testEnterActive,
      enterDone: styles.testEnterDone,
      exit: styles.testExit,
      exitActive: styles.exitActive
    }}>
    <div className={styles.test}>
        <div className={styles.test__header}>
          <CloseToHomeBtn showTest={setShowTest} />
          <TestprogressNav totalCount={home.isTotalCount} isPage={home.isPage}/>
        </div>
      <div ref={nodeRef} className={styles.test__content}>
        {home.isTests.map((el) => (
          <div key={el.id} className={styles.test__inner}>
            <p className={styles.test__title}>{el.name}</p>
            <div className={styles.test__container}>
            {mediaUrls[el.id]?.image && (
              <img 
                width={100} 
                height={125} 
                src={mediaUrls[el.id].image} 
                alt={el.name}
                onError={(e) => {
                  e.currentTarget.src = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/static//default_image.png`;
                }}
              />
            )}
            {mediaUrls[el.id]?.audio && (
              <AudioQuestion audio_q={mediaUrls[el.id].audio} />
            )}
            </div>

            {el.test_type === "quiz" ? 
            <Options options={el.options} el={el.correct_answer} setAnswer={setAnswer} /> 
            : 
            <DndTest options={el.options} el={el.correct_answer} setAnswer={setAnswer}/>
            }
           
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
      </div>
    </CSSTransition>
  );
});

export default Test;

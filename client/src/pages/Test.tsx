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
import { supabase } from "../http/supabaseClient";

const Test = observer(() => {
  const { home } = useContext(Context);
  const [answer, setAnswer] = useState("");
  const nodeRef = useRef(null);
  const { taskId } = useParams();
  const [imageUrl, setImageUrl] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [loadTest, setLoadTest] = useState(false);
  const [loadData, setLoadData] = useState(false);
  const [showTest, setShowTest] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);


  useEffect(() => {
    // Получаем подписанные URL для изображения и аудио
    getSignedUrls(['cat1.png', 'hi.mp3']).then(urls => {
      const imgUrl = urls.find(url => url.filePath === 'cat1.png')?.url;
      const audioUrl = urls.find(url => url.filePath === 'hi.mp3')?.url;
    
      if (imgUrl) {
        const img = new Image();
        img.src = imgUrl;
        img.onload = () => {
          setImageLoaded(true);
          setImageUrl(imgUrl);
        };
      } else {
        setImageLoaded(true); // даже если нет картинки — не ждем вечно
      }
    
      setAudioUrl(audioUrl || '');
    }).finally(() => setLoadData(true));
    

    // Здесь fetchTests, например, загрузка данных
    fetchTests(taskId, home.isPage, 1).then((data) => {
      home.setTest(data.rows);
      home.setTotalCount(data.count);
      setAnswer("");
    }).finally(() => setLoadTest(true));
  }, [taskId, home.isPage]);

useEffect(() => {
  if (loadData && loadTest && imageLoaded) {
    console.log("show");
    setShowTest(true);
  }
}, [loadData, loadTest, imageLoaded]);



  const { id } = getUserId();

  async function getSignedUrls(filePaths: string[]) {
    const signedUrls = [];

    for (const filePath of filePaths) {
      const { data, error } = await supabase
        .storage
        .from('test-images')  // Укажите ваше хранилище
        .createSignedUrl(filePath, 3600);  // Время истечения действия ссылки (1 час)

      if (error) {
        console.error(`Ошибка при получении подписанного URL для файла ${filePath}:`, error.message);
        signedUrls.push({ filePath, url: null });
      } else {
        signedUrls.push({ filePath, url: data.signedUrl });
      }
    }

    return signedUrls;
  }

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
            {imageUrl && <img width={100} height={125} src={imageUrl} alt="" />}
              {audioUrl && <AudioQuestion audio_q={audioUrl} />}
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

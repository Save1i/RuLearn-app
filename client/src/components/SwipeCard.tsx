
import { useContext, useEffect, useState } from 'react'
import { animated, useSpring } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import styles from '../styles/swipeCard.module.css'
import { Context } from '../context'
import { getUserId } from '../http/getUserId'
import { fetchNewWords } from '../http/homeAPI'

type Word = {
  id: number;
  name: string;
  word_source: string;
  word_target: string;
}


const SwipeCard = () => {
  const {home} = useContext(Context)
  const {id} = getUserId()
  const [words, setWords] = useState<Word[]>([])
  const [pagesCount, setPageCount] = useState(1)

// const [cards, setCards] = useState(initialCards);

  const [springProps, api] = useSpring(() => ({
    x: 0,
    y: 0,
    rot: 0,
    scale: 1,
    opacity: 1,
    config: { tension: 300, friction: 30 },
  }));

  useEffect(() => {
    fetchNewWords(id, 1, 10).then((data) => {
    home.setWord(data.rows)
    home.setTotalCount(data.rows.length)
    console.log(data.rows.length)
    setWords(home.isWord)
  })}, [id, home])

  console.log(words[0])


  const AnimatedDiv = animated('div')

  const handleSwipe = (dir: number) => {
  if (!words.length) return;
  api.start({
    x: dir * 1000,
    rot: dir * 20,
    opacity: 0,
    config: { tension: 200, friction: 20 },
    onRest: () => {
      setWords(prev => prev.slice(1));
      api.set({ x: 0, rot: 0, opacity: 1 });
    },
  });
  setPageCount( prev => prev + 1)
};


useEffect(() => {
  home.setPage(pagesCount)
}, [pagesCount, home])


 const bind = useDrag(({ down, movement: [mx] }) => {
  const swipeDistance = Math.abs(mx);
  const dir = mx < 0 ? -1 : 1;
  const threshold = 150;

  if (!down && swipeDistance > threshold) {

    setPageCount( prev => prev + 1)
    home.setPage(pagesCount)

    api.start({
      x: dir * 1000,
      rot: dir * 20,
      opacity: 0,
      config: { tension: 200, friction: 20 },
      onRest: () => {
        setWords(prev => prev.slice(1));
        api.set({ x: 0, rot: 0, opacity: 1 });
      }
    });
  } else {
    api.start({
      x: down ? mx : 0,
      rot: down ? mx / 10 : 0,
      opacity: 1,
      config: { tension: 300, friction: 30 }
    });
  }
});



  return (
    <>
    <div className={styles['card-stack']}>
      {words.length > 0 ? (
        <AnimatedDiv
          {...bind()}
          className={styles['card']}
          style={{
            x: springProps.x,
            rotateZ: springProps.rot,
            opacity: springProps.opacity,
            touchAction: 'none',
          }}
        >
          {words[0].word_source}
        </AnimatedDiv>
         ) : (
        <div className={styles['card']}>🎉 Все карточки просмотрены</div>
      )}

    </div>
    <div className={styles['buttons']}>
      <button className={styles.swipe__btn} onClick={() => handleSwipe(-1)}>← Назад</button>
      <button className={styles.swipe__btn} onClick={() => handleSwipe(1)}>Вперёд →</button>
    </div>
  </>
)
}

export default SwipeCard

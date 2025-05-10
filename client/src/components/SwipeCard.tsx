
import { useContext, useEffect, useState } from 'react'
import { animated, useSpring } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import styles from '../styles/swipeCard.module.css'
import { Context } from '../context'
import { getUserId } from '../http/getUserId'
import { fetchNewWords } from '../http/homeAPI'
import ButtonsLeftRignt from './ButtonsLeftRignt'

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

    const [flipped, setFlipped] = useState(false)

  // разворот карточки на 180
  const { transform } = useSpring({
    transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  })

  const rightBtn = document.querySelector('.rignt__btn') as HTMLElement | null;
  const leftBtn = document.querySelector('.left__btn') as HTMLElement | null;

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
      if(leftBtn && rightBtn) {
      leftBtn.classList.remove('active');
      rightBtn.classList.remove('active');
      }
    },
  });
  setPageCount( prev => prev + 1)
};

const buttonActive = (distance: number) => { 
  if(distance > 80) {
    if (rightBtn) {
      rightBtn.classList.add('active');
    }
  } else {
    if (rightBtn) {
      rightBtn.classList.remove('active');
  }
  }
  if(distance < -80) {
    if (leftBtn) {
      leftBtn.classList.add('active');
    }
  } else {
    if (leftBtn) {
      leftBtn.classList.remove('active');
  }
  }




}


useEffect(() => {
  home.setPage(pagesCount)
}, [pagesCount, home])


 const bind = useDrag(({ down, movement: [mx] }) => {
  const swipeDistance = Math.abs(mx);
  const dir = mx < 0 ? -1 : 1;
  const threshold = 80;
  buttonActive(mx)
  console.log(mx)

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
        if(leftBtn && rightBtn) {
        leftBtn.classList.remove('active');
        rightBtn.classList.remove('active');
      }
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
          className={styles['card__container']}
          onClick={() => setFlipped(f=> !f)}
          style={{
            x: springProps.x,
            rotateZ: springProps.rot,
            opacity: springProps.opacity,
            touchAction: 'none',
            transform
          }}
        >
          <div className={`${styles.card__el} ${styles.card__front}`}>
            {words[0].word_source}
          </div>
          <div className={`${styles.card__el} ${styles.card__back}`}>
            {words[0].word_target}
          </div>
        </AnimatedDiv>
         ) : (
        <div className={styles['card__text']}>🎉 Все карточки просмотрены</div>
      )}
    </div>
      <div className={styles.buttons__container}>
      <ButtonsLeftRignt func={handleSwipe}/>
      </div>
  </>
)
}

export default SwipeCard

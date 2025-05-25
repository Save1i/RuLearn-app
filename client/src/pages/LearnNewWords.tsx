import SwipeCard from "../components/SwipeCard"
import HeaderNav from '../components/HeaderNav'
import TestprogressNav from '../components/TestprogressNav'
import styles from '../styles/learnNewWord.module.css'
import ConfettiExplosion from 'react-confetti-explosion';
import { useContext, useEffect, useState } from "react";
import { Context } from "../context";
import { observer } from "mobx-react-lite";



const LearnNewWords = observer(() => {
  const { home } = useContext(Context);

  const [isExploding, setIsExploding] = useState(false);
  const [wasExploded, setWasExploded] = useState(false);

useEffect(() => {
  if (!wasExploded && home.isTotalCount > 0 && home.isTotalCount < home.isPage) {
    setTimeout(() => {
      setIsExploding(true);
      setWasExploded(true);
    }, 300);
  }
}, [home.isTotalCount, home.isPage]);

  return (
    <div>
      <HeaderNav name='Учить новые слова'/>
        <div className={styles.learn__progress}>
          {
          isExploding ? <ConfettiExplosion 
          force={0.1} 
          particleCount={20}
          width={450}
          particleSize={4}
          duration={2500}
          style={{
  position: 'absolute',
  top: '45px',
  left: '50%',
  zIndex: '1',
  transform: 'translate(-50%, -50%)'
}}
          /> : <TestprogressNav totalCount={home.isTotalCount} isPage={home.isPage}/>
          }
        </div>
      <SwipeCard/>
    </div>
  )
});

export default LearnNewWords

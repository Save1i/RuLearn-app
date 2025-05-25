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

  useEffect(() => {
    console.log(home.isTotalCount)
    console.log(home.isPage)
    if(home.isTotalCount > 0 && home.isTotalCount < home.isPage) {
      setTimeout(() => {
        setIsExploding(true)
      }, 500)
    }
}, [home.isTotalCount, home.isPage])

  return (
    <div>
      <HeaderNav name='Учить новые слова'/>
        <div className={styles.learn__progress}>
          {
          isExploding ? <ConfettiExplosion 
          force={0.1} 
          particleCount={50}
          width={600}
          particleSize={10}
          duration={4500}
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

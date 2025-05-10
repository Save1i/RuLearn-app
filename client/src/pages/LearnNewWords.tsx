import SwipeCard from "../components/SwipeCard"
import HeaderNav from '../components/HeaderNav'
import TestprogressNav from '../components/TestprogressNav'
import styles from '../styles/learnNewWord.module.css'


const LearnNewWords = () => {
  return (
    <div>
    <HeaderNav name='Учить новые слова'/>
    <div className={styles.learn__progress}>
      <TestprogressNav />
    </div>
      <SwipeCard/>
    </div>
  )
}

export default LearnNewWords

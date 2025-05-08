import NavBarBottom from "../components/NavBarBottom";
import Header from "../components/Header";
import ChooseSwipeComponent from "../components/ChooseSwipeComponent";
import styles from "../styles/learnWords.module.css"

const LearnWords = () => {
  return (
    <>  
    <Header />
    <main className={styles.main}>
      <div className={styles.navigate__buttons}>
        <ChooseSwipeComponent icon="GoPencil" title="Выбрать категорию"/>
        <ChooseSwipeComponent icon="IoAddCircleOutline" title="Учить новые слова" info="Заучено сегодня: 0 из 10"/>
        <ChooseSwipeComponent icon="RxCounterClockwiseClock" title="Повторить слова" info="Слов для повтора: 52"/>
      </div>
    </main>
    <NavBarBottom />
    </>
  )
}

export default LearnWords

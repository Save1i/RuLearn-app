import { PiArrowBendUpLeft } from "react-icons/pi";
import { PiArrowBendUpRight } from "react-icons/pi";
import styles from "../styles/buttonsLeftRight.module.css"

type GenericFn = (input: number) => void;

interface isProps {
    func: GenericFn;
}

const ButtonsLeftRignt = ({func}: isProps) => {
  return (
    <div className={styles['buttons']}>
      <button className={styles.swipe__btn} onClick={() => func(-1)}>
        <PiArrowBendUpLeft className={styles.button__icon}/>
        <p className={styles.button__text}>Знаю</p>
      </button>
      <button className={styles.swipe__btn} onClick={() => func(1)}>
        <PiArrowBendUpRight className={styles.button__icon}/>
        <p className={styles.button__text}>Учить</p>
        <div className={styles.effect}></div>
      </button>
    </div>
  )
}

export default ButtonsLeftRignt

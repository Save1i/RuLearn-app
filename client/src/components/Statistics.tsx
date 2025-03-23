import statImg from "../img/stat.png";
import styles from "../styles/statistics.module.css";
const Statistics = () => {
  return (
    <div className={styles.stat}>
      <div className={styles.stat__text}>
        <p className={styles.stat__title}>Так держать!</p>
        <p className={styles.stat__info}>Ваша серия длится 10 дней</p>
      </div>
      <img className={styles.stat__img} src={statImg} alt="" />
    </div>
  );
};

export default Statistics;

import styles from "../styles/header.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.header__inner}>
        <h1 className={styles.header__logo}>RuLearn</h1>
        <button className={styles.header__btn}>ПРЕМИУМ</button>
      </div>
    </div>
  );
};

export default Header;

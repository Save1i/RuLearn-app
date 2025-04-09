import styles from "../styles/header.module.css";

const Header = () => {

  const scrollToTop = () => {
    window.scrollBy(0, 0);
  };
  

  return (
    <div className={styles.header}>
      <div className={styles.header__inner}>
        <h1 className={styles.header__logo} onClick={scrollToTop}>RuLearn</h1>
        <button className={styles.header__btn}>ПРЕМИУМ</button>
      </div>
    </div>
  );
};

export default Header;

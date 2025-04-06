import styles from "../styles/header.module.css";

const Header = () => {

  const scrollToTop = () => {
    const scrollStep = -window.scrollY / 20;
    const interval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(interval);
      }
    }, 10);
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

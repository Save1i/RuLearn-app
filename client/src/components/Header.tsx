import { useState } from "react";
import styles from "../styles/header.module.css";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.header__inner}>
          <h1 className={styles.header__logo} onClick={scrollToTop}>RuLearn</h1>
          <button className={styles.header__btn} onClick={openModal}>ПРЕМИУМ</button>
        </div>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.title}>Функция ещё не реализована</h2>
            <button className={styles.closeBtn} onClick={closeModal}>Закрыть</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;

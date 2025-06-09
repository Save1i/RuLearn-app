import { GoPencil } from "react-icons/go";
import { IoAddCircleOutline } from "react-icons/io5";
import { RxCounterClockwiseClock } from "react-icons/rx";
import styles from "../styles/ChooseSwipeComponent.module.css"
import { useNavigate } from "react-router-dom";
import { CHOOSECATEGORY_ROUTE, NEWWORD_ROUTE } from "../utils/consts";
import { useState } from "react";

interface isProps {
  icon: string;
  title: string;
  info?: string;
}

const ChooseSwipeComponent = ({ icon, title, info }: isProps) => {
    const navigate = useNavigate()

    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const openModal = () => {
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
      };

    const renderIcon = () => {
        switch (icon) {
        case "GoPencil":
            return <GoPencil className={styles.icon} style={{color:"#8B8B8B"}}/>;
        case "IoAddCircleOutline":
            return <IoAddCircleOutline className={styles.icon} style={{color:"#FF6F04"}}/>;
        case "RxCounterClockwiseClock":
            return <RxCounterClockwiseClock className={styles.icon} style={{color:"#0077B6"}}/>;
        default:
            return null;
        }
    };

    const renderRouter = () => {
        switch (icon) {
        case "GoPencil":
            return navigate(CHOOSECATEGORY_ROUTE)
        case "IoAddCircleOutline":
            return navigate(NEWWORD_ROUTE);
        case "RxCounterClockwiseClock":
            return openModal()
        default:
            return null;
        }
    };

  return (
    <>
    <div className={styles.button} onClick={() => renderRouter()}>
      {renderIcon()}
      <div className={styles.button__text}>
        <p className={styles.title}>{title}</p>
        <p className={styles.info}>{info}</p>
      </div>
    </div>

     {isModalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modal__title}>Страница ещё не реализована</h2>
            <button className={styles.closeBtn} onClick={closeModal}>Закрыть</button>
          </div>
        </div>
      )}
      </>
  );
};

export default ChooseSwipeComponent;

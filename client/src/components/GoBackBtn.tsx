import { useNavigate } from "react-router-dom";
import styles from "../styles/closeToHomeBtn.module.css";
import { GoArrowLeft } from "react-icons/go";


const GoBackBtn = () => {

  const navigate = useNavigate();
  return (
    <button className={styles.close__btn}>
      <GoArrowLeft
        onClick={() => {
            navigate(-1)
        }}
        style={{ height: "34px", width: "34px" }}
      />
    </button>
  );
};

export default GoBackBtn;

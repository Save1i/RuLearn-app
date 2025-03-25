import { useNavigate } from "react-router-dom";
import styles from "../styles/closeToHomeBtn.module.css";
import { IoCloseOutline } from "react-icons/io5";
import { HOME_ROUTE } from "../utils/consts";

const CloseToHomeBtn = () => {
  const navigate = useNavigate();
  return (
    <button className={styles.close__btn}>
      <IoCloseOutline
        onClick={() => navigate(HOME_ROUTE)}
        style={{ height: "34px", width: "34px" }}
      />
    </button>
  );
};

export default CloseToHomeBtn;

import { useNavigate } from "react-router-dom";
import styles from "../styles/closeToHomeBtn.module.css";
import { GoArrowLeft } from "react-icons/go";
import { useContext } from "react";
import { Context } from "../context";


const GoBackBtn = () => {
  const {home} = useContext(Context)

  const navigate = useNavigate();
  return (
    <button className={styles.close__btn}>
      <GoArrowLeft
        onClick={() => {
            navigate(-1)
            home.setPage(1)
        }}
        style={{ height: "34px", width: "34px", color: "#000" }}
      />
    </button>
  );
};

export default GoBackBtn;

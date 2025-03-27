import { useNavigate } from "react-router-dom";
import styles from "../styles/closeToHomeBtn.module.css";
import { IoCloseOutline } from "react-icons/io5";
import { HOME_ROUTE } from "../utils/consts";

type ChildProps = {
  showTest: React.Dispatch<React.SetStateAction<boolean>>;
};

const CloseToHomeBtn = ({showTest}: ChildProps) => {

  const navigate = useNavigate();
  return (
    <button className={styles.close__btn}>
      <IoCloseOutline
        onClick={() => {
          showTest(false)
          setTimeout(() => {
            navigate(HOME_ROUTE)
          }, 200)
        }}
        style={{ height: "34px", width: "34px" }}
      />
    </button>
  );
};

export default CloseToHomeBtn;

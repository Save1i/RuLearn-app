import { FaCircle } from "react-icons/fa";
import styles from "../styles/dictionary.module.css"
import { WORDS_ROUTE } from "../utils/consts";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { changeLibrary } from "../http/changeLibrary";
import { Context } from "../context";

interface isProps {
    id: number;
    userId: number,
    name: string;
    choose: boolean;
}

const Dictionary = ({name, choose, id, userId}: isProps) => {
  const navigate = useNavigate()
  const { home } = useContext(Context);

  const [isChoosen, setIsChoosen] = useState<boolean>(choose)
  return (
    <div className={styles.dictionary} onClick={() => navigate(WORDS_ROUTE + "/" + id)}>
      <div className={styles.dictionary__info}>
        <FaCircle style={{color: "#D9D9D9", width: "fit-content", height: "100%"}}/>
        <p className={styles.dictionary__title}>{name}</p>
      </div>
      <div className={styles['checkbox-wrapper-46']}>
        <input className={styles['inp-cbx']} id={id.toString()} type="checkbox" checked={isChoosen}
          onClick={(e) => e.stopPropagation()}
          onChange={(e)=> {
            changeLibrary(userId, id, isChoosen, home)
            setIsChoosen(e.target.checked)
            console.log(isChoosen)
          }}/>
          <label htmlFor={id.toString()} className={styles.cbx}>
          <span>
            <svg viewBox="0 0 12 10" height="10px" width="12px">
              <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
            </svg>
          </span>
          </label>
      </div>
    </div>
  )
}

export default Dictionary

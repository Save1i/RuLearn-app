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
        <FaCircle style={{color: "#D9D9D9", width: "fit-content", height: "100%"}}/>
        <p>{name}</p>
        <input type="checkbox" checked={isChoosen} onClick={(e) => e.stopPropagation()} 
          onChange={(e)=> {
            changeLibrary(userId, id, isChoosen, home)
            setIsChoosen(e.target.checked)
            console.log(isChoosen)
          }}/>
    </div>
  )
}

export default Dictionary

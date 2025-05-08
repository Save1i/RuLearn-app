import styles from "../styles/headerNav.module.css";
import GoBackBtn from "./GoBackBtn";

interface isProps {
    name: string;    
}

const HeaderNav = ({name}: isProps) => {
    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
        
      };
      
  return (
    <div className={styles.header}>
      <div className={styles.header__inner}>
        <div className={styles.header__btn}>
          <GoBackBtn/>
        </div>
        <h1 className={styles.header__title} onClick={()=>scrollToTop()}>{name}</h1>
      </div>
    </div>
  )
}

export default HeaderNav

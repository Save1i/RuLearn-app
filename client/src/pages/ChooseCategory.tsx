import { useContext, useEffect, useState } from "react";
import { fetchLibrary } from "../http/homeAPI";
import { Context } from "../context";
import Dictionary from "../components/Dictionary";
import styles from "../styles/chooseCategory.module.css"
import { getUserId } from "../http/getUserId";
import HeaderNav from "../components/HeaderNav";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

type LibraryItem = {
    id: number;
    name: string;
    choose: boolean;
  };

const ChooseCategory = () => {
    const {home} = useContext(Context)
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState<LibraryItem[]>([]);

    const {id} = getUserId();

    useEffect(() => {
        async function loadLibrary() {
          try {
            const data = await fetchLibrary(id);
            home.setLibrary(data);

            setCategories(data);
          } catch (error) {
            console.error("Failed to load library:", error);
          } finally {
            setLoading(false); //false
          }
        }
    
        loadLibrary();
      }, [home]);

  return (
    <>
    <HeaderNav name="Выбор категорий"/>
      {loading ? 
      <div className={styles.library}>
        <Skeleton
    count={9}
    height={60}
    borderRadius={10}
    baseColor="#e5e7eb"
    highlightColor="#f5f5f5"
    duration={1.2}
    style={{marginBottom: "10px"}}
  />
      </div>
        :
      <div className={styles.library}>
          {categories.length > 0 ? (
              categories.map((dictionary) => (
              <Dictionary 
                key={dictionary.id} 
                name={dictionary.name} 
                choose={dictionary.choose}
                id={dictionary.id}
                userId={id}
                />
                
          )) 
              ) : (
                  <p>Библиотека пуста</p>
          )}
      </div>
      }

    </>
  )
}

export default ChooseCategory

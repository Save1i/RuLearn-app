import { useContext, useEffect, useState } from "react";
import { fetchLibrary } from "../http/homeAPI";
import { Context } from "../context";
import Dictionary from "../components/Dictionary";
import styles from "../styles/chooseCategory.module.css"
import { getUserId } from "../http/getUserId";
import HeaderNav from "../components/HeaderNav";

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
            setLoading(false);
          }
        }
    
        loadLibrary();
      }, [home]);

      if (loading) {
        return <div>Loading categories...</div>;
      }

  return (
    <>
    <HeaderNav name="Выбор категорий"/>
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
    </>
  )
}

export default ChooseCategory

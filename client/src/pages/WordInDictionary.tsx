import { useContext, useEffect, useState } from "react";
import { Context } from "../context";
import { fetchWords } from "../http/homeAPI";
import styles from "../styles/chooseCategory.module.css"
import { useParams } from "react-router-dom";
import Word from "../components/Word";
import HeaderNav from "../components/HeaderNav";

type WordItem = {
    id: number;
    name: string;
    word_source: string;
    word_target: string;
  };

const WordInDictionary = () => {
    const {home} = useContext(Context)
    const [words, setWords] = useState<WordItem[]>([])
    const { dictionaryId } = useParams();

    const dict = Array.isArray(home.isLibrary)
  ? home.isLibrary.find(d => d.id.toString() === dictionaryId)
  : undefined;

    const dictName = dict ? dict.name : ""; 

    useEffect(() => {
        async function loadWords() {
          try{
            const data = await fetchWords(dictionaryId)
            home.setWord(data)

            setWords(data)
        } catch(e) {
          console.log(e)
        }
    }
    loadWords()
  }, [home])
  return (
    <>
    <HeaderNav name={dictName}/>
      <div className={styles.library}>
          {words.length > 0 ? (
              words.map((word) => (
                <Word
                  key={word.id} 
                  word_source={word.word_source} 
                  word_target={word.word_target}
                />
          )) 
              ) : (
                  <p>Словарь пуст</p>
          )}
      </div>
    </>
  )
}

export default WordInDictionary

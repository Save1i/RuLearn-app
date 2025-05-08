import styles from "../styles/word.module.css"

interface isWords {
    word_source: string;
    word_target: string;
  };

const Word = ({word_source, word_target}: isWords) => {
  return (
    <div className={styles.word}>
      <p className={styles.word__title}>{word_source}</p>
      <p className={styles.word__text}>{word_target}</p>
    </div>
  )
}

export default Word

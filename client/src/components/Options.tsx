import styles from "../styles/Options.module.css"

interface Data {
    options: string[];
    el: string;
    setAnswer: (value: string) => void;
  }

const Options = ({options, el, setAnswer}: Data) => {

    const result = (selectedOption: string, correctAnswer: string) => {
        if (!setAnswer) return;
        if (selectedOption === correctAnswer) {
          setAnswer("Правильно!");
        } else {
          setAnswer("Ошибка");
        }
      };

  return (
    <div className={styles.options}>
        {options.map((opt, index) => (
      <button
        key={index}
        className={styles.options__btn}
        onClick={() => result(opt, el)}
      >
        {opt}
      </button>
    ))}
  </div>
  )
}

export default Options

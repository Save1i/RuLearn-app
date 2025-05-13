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

  const btnClass = options.length > 3 ? 'options__grid' : 'options__flex'

  return (
    <div className={styles[btnClass]}>
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

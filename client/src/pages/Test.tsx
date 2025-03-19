import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchTests } from "../http/homeAPI";
import { observer } from "mobx-react-lite";
import AudioQuestion from "./AudiQuestion";
import { checkAnswer } from "../http/checkAnswer";
import Pages from "../components/Pages";
import { Context } from "../main";

console.log(import.meta.env.VITE_API_URL);

const Test = observer(() => {
  const { taskId } = useParams();
  const { home } = useContext(Context);

  const [serverAnswer, setServerAnswer] = useState(false);

  useEffect(() => {
    fetchTests(taskId, home.isPage, 1).then((data) => {
      home.setTest(data.rows);
      home.setTotalCount(data.count);
      setServerAnswer(false);
    });
  }, [home.isPage]);

  const handleAnswer = async (
    selectedOption: string,
    correctAnswer: string,
    userId: number,
    testId: number
  ) => {
    const result = await checkAnswer(selectedOption, correctAnswer, userId, testId);
    if (result) {
      setServerAnswer(true);
    }
  };

  return (
    <div>
      {home.isTests.map((el) => (
        <div key={el.id} className="test">
          <div className="test__inner">
            <div className="question">
              <p className="question__title">{el.text_q}</p>
              <div className="question__container">
                <img width={100} height={125} src={import.meta.env.VITE_API_URL + el.img} alt="" />{" "}
                {el.audio_q ? (
                  <AudioQuestion audio_q={el.audio_q} />
                ) : (
                  <p className="question__tex">{el.text_q}</p>
                )}
              </div>
              <div className="options">
                {el.options.map((opt, index) => (
                  <button
                    key={index}
                    className="options__btn"
                    onClick={() => handleAnswer(opt, el.correct_answer, 23, el.id)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
      {serverAnswer ? <Pages /> : false}
    </div>
  );
});

export default Test;

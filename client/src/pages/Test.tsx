import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchTests } from "../http/homeAPI";
import { observer } from "mobx-react-lite";
import AudioQuestion from "./AudiQuestion";

console.log(import.meta.env.VITE_API_URL);

interface Test {
  id: number;
  taskId: number;
  name: string;
  audio_q: string;
  text_q: string;
  options: string[];
  correct_answer: string;
  img: string;
}

const Test = observer(() => {
  const { taskId } = useParams();

  const [test, setTest] = useState<Test[]>([]);

  useEffect(() => {
    fetchTests(taskId).then((data) => setTest(data.rows));
  }, []);

  return (
    <div>
      {test.map((el) => (
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
                  <button key={index} className="options__btn">
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});

export default Test;

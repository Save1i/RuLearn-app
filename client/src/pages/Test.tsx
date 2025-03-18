import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../main";
import { fetchTests } from "../http/homeAPI";
import { observer } from "mobx-react-lite";
import AudioQuestion from "./AudiQuestion";

console.log(import.meta.env.VITE_API_URL);

const Test = observer(() => {
  const { taskId } = useParams();
  const { home } = useContext(Context);

  useEffect(() => {
    fetchTests(taskId).then((data) => home.setTest(data.rows));
  }, []);

  return (
    <div>
      {home.isTests.map((test) => (
        <div key={test.id} className="test">
          <div className="test__inner">
            <div className="question">
              <p className="question__title">{test.text_q}</p>
              <div className="question__container">
                <img
                  width={100}
                  height={125}
                  src={import.meta.env.VITE_API_URL + test.img}
                  alt=""
                />{" "}
                {test.audio_q ? (
                  <AudioQuestion audio_q={test.audio_q} />
                ) : (
                  <p className="question__tex">{test.text_q}</p>
                )}
              </div>
              <div className="options">
                {test.options.map((opt, index) => (
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

import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "../main";
import { postTaskProgress } from "../http/postTaskProgress";
import { useNavigate } from "react-router-dom";
import { HOME_ROUTE } from "../utils/consts";

interface AnswersProps {
  answer: string;
  correctAnswer: string;
  userId: number;
  taskId: string | undefined;
}

const Pages: React.FC<AnswersProps> = observer(({ answer, correctAnswer, userId, taskId }) => {
  const { home } = useContext(Context);
  const pageCount = Math.ceil(home.isTotalCount / home.isLimit);

  const navigate = useNavigate();

  const completeTask = () => {
    postTaskProgress(userId, Number(taskId), home);
    navigate(HOME_ROUTE);
  };

  // Проверяем, есть ли следующая страница
  const hasNextPage = home.isPage < pageCount;

  console.log(pageCount, hasNextPage);

  const nextPage = () => {
    if (hasNextPage) {
      home.setPage(home.isPage + 1);
    }
  };

  console.log(home.isPage);

  return (
    <div>
      <p>{answer}</p>
      {answer === "Ошибка" && (
        <div className="">
          <p>Правильный ответ:</p>
          <p>{correctAnswer}</p>
        </div>
      )}

      <button onClick={hasNextPage ? nextPage : completeTask}>{home.isPage + 1}</button>
    </div>
  );
});

export default Pages;

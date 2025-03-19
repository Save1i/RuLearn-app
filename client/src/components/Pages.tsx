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

  // Проверяем, есть ли следующая страница
  const hasNextPage = home.isPage < pageCount;

  console.log(pageCount, hasNextPage);

  const nextPage = () => {
    if (hasNextPage) {
      home.setPage(home.isPage + 1);
    }
  };

  console.log(home.isPage);

  return hasNextPage ? (
    <div>
      <p>{answer}</p>
      <p>{correctAnswer}</p>
      <button onClick={nextPage}>{home.isPage + 1}</button>
    </div>
  ) : (
    <div>
      <p>{answer}</p>
      <p>{correctAnswer}</p>
      <button
        onClick={() => {
          postTaskProgress(userId, Number(taskId));
          navigate(HOME_ROUTE);
        }}
      >
        {home.isPage + 1}
      </button>
    </div>
  );
});

export default Pages;

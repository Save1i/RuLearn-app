import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "../main";

const Pages = observer(() => {
  const { home } = useContext(Context);
  const pageCount = Math.ceil(home.isTotalCount / home.isLimit);

  // Проверяем, есть ли следующая страница
  const hasNextPage = home.isPage < pageCount;

  console.log(pageCount);

  const nextPage = () => {
    if (hasNextPage) {
      home.setPage(home.isPage + 1);
    }
  };

  console.log(home.isPage);

  return hasNextPage ? <button onClick={nextPage}>{home.isPage + 1}</button> : null;
});

export default Pages;

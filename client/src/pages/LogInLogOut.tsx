import { useContext } from "react";
import { Context } from "../main";
import { LOGIN_ROUTE } from "../utils/consts";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

const LogInLogOut = observer(() => {
  const navigate = useNavigate();
  const { user } = useContext(Context);

  const logOut = () => {
    user.setIsAuth(false);
    user.setIsUser({});
    localStorage.removeItem("token");
  };
  console.log(user.isAuth);
  return (
    <div>
      {user.isAuth ? (
        <button onClick={() => logOut()}>Выйти</button>
      ) : (
        <button onClick={() => navigate(LOGIN_ROUTE)}>Войти</button>
      )}
    </div>
  );
});

export default LogInLogOut;

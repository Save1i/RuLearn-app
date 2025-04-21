import { useContext } from "react";
import { Context } from "../main";
import { LOGIN_ROUTE } from "../utils/consts";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import styles from "../styles/loginlogout.module.css"

const LogInLogOut = observer(() => {
  const navigate = useNavigate();
  const { user } = useContext(Context);

  const logOut = () => {
    user.setIsAuth(false);
    user.setIsUser({});
    localStorage.removeItem("token");
    navigate(LOGIN_ROUTE);
  };
  console.log(user.isAuth);
  return (
    <>
      {user.isAuth ? (
        <button
        className={styles.login__button}
        onClick={() => logOut()}
        >
          Выйти
        </button>
      ) : (
        <button
        className={styles.login__button}
        onClick={() => navigate(LOGIN_ROUTE)}
        >
          Войти
        </button>
      )}
    </>
  );
});

export default LogInLogOut;

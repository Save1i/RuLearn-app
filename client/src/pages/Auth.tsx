import { Link, useLocation, useNavigate } from "react-router-dom";
import { HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";
import { login, registration } from "../http/userAPI";
import { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../main";

const Auth = observer(() => {
  const navigate = useNavigate();
  const context = useContext(Context);
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!context) {
    console.error("context не найден!");
    return null;
  }

  const { user } = context;

  const click = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
        console.log(data);
      } else {
        data = await registration(email, password);
        console.log(data);
      }
      user.setIsUser(true); //user or data
      user.setIsAuth(true);
      navigate(HOME_ROUTE);
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Произошла неизвестная ошибка");
      }
    }
  };

  return (
    <div>
      <h2>{isLogin ? "Авторизация" : "Регистрация"}</h2>
      <form>
        <div>
          <label htmlFor="email">Почта</label>

          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Пароль</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button onClick={click}>{isLogin ? "Войти" : "Регистрация"}</button>
      </form>
      {isLogin ? (
        <p className="">
          Нет аккаунта? <Link to={REGISTRATION_ROUTE}>Регистрация</Link>
        </p>
      ) : (
        <p className="">
          Есть аккаунт? <Link to={LOGIN_ROUTE}>Войти</Link>
        </p>
      )}
    </div>
  );
});

export default Auth;

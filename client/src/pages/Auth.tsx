import { Link, useLocation } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";

export default function Auth() {
  const location = useLocation()
  const isLogin = location.pathname === LOGIN_ROUTE
  return (
 <div>
      <h2>{isLogin? "Авторизация" : "Регистрация"}</h2>
      <form>
        <div>
          <label htmlFor="email">Почта</label>
          <input id="email" type="email" />
        </div>
        <div>
          <label htmlFor="password">Пароль</label>
          <input id="password" type="password" />
        </div>

        <button type="submit">{isLogin ? "Войти" : "Регистрация"}</button>
      </form>
      {isLogin ? 
        <p className="">Нет аккаунта? <Link to={REGISTRATION_ROUTE}>Регистрация</Link></p>
        :
        <p className="">Есть аккаунт? <Link to={LOGIN_ROUTE}>Войти</Link></p>
      }
    </div>
  )
}

import { Link, useLocation, useNavigate } from "react-router-dom";
import { HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";
import { login, registration } from "../http/userAPI";
import { useContext, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../main";
import { fetchSections } from "../http/homeAPI";
import styles from "../styles/auth.module.css";
import authImage from "../img/auth.png";

const Auth = observer(() => {
  const navigate = useNavigate();
  const context = useContext(Context);
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleBlur = () => {
    if (!email.current) return;
    if (!validateEmail(email.current.value)) {
      setError("Введите корректный email");
    } else {
      setError("");
    }
  };

  if (!context) {
    console.error("context не найден!");
    return null;
  }

  const { user, home } = context;

  const click = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if (!email.current || !password.current || error) return console.log("Ошибка в данных");
      let data;
      if (isLogin) {
        data = await login(email.current.value, password.current.value);
        console.log(data);
      } else {
        data = await registration(email.current.value, password.current.value);
        console.log(data);
      }
      user.setIsUser(data);
      user.setIsAuth(true);

      // fetchSections
      fetchSections().then((data) => home.setSection(data));

      navigate(HOME_ROUTE);
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "response" in error) {
        const serverError = error as { response: { data?: { message?: string } } };
        console.error("Ошибка сервера:", serverError.response.data);
        alert(serverError.response.data?.message || "Ошибка при авторизации");
      } else {
        alert("Произошла неизвестная ошибка");
      }
    }
  };

  return (
    <div className={styles.auth}>
      <div className={styles.auth__inner}>
        <h2 className={styles.auth__title}>{isLogin ? "Авторизация" : "Регистрация"}</h2>
        <img src={authImage} className={styles.auth__img} alt="" />
        <form className={styles.auth__form}>
          <div className={styles.auth__inputGroup}>
            <label htmlFor="email" className={styles.auth__label}>
              Почта
            </label>
            <input
              onBlur={handleBlur}
              id="email"
              type="email"
              ref={email}
              className={`${error ? styles.auth__input_error : styles.auth__input}`}
              required
            />
          </div>
          <div className={styles.auth__inputGroup}>
            <label htmlFor="password" className={styles.auth__label}>
              Пароль
            </label>
            <input
              id="password"
              type="password"
              ref={password}
              className={styles.auth__input}
              required
            />
          </div>
          {isLogin ? (
            <p className={styles.auth__link}>
              Нет аккаунта?{" "}
              <Link className={styles.auth__swap} to={REGISTRATION_ROUTE}>
                Регистрация
              </Link>
            </p>
          ) : (
            <p className={styles.auth__link}>
              Есть аккаунт?{" "}
              <Link className={styles.auth__swap} to={LOGIN_ROUTE}>
                Войти
              </Link>
            </p>
          )}
          <button onClick={(e) => click(e)} className={styles.auth__button}>
            {isLogin ? "Войти" : "Регистрация"}
          </button>
        </form>
      </div>
    </div>
  );
});

export default Auth;

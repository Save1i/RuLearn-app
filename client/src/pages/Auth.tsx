import { Link, useLocation, useNavigate } from "react-router-dom";
import { HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";
import { login, registration } from "../http/userAPI";
import { useContext, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../context";
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

  const [formError, setFormError] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);



  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validationPassword = (password: string): boolean => {
    const goodPasword = password.length >= 8;
    return goodPasword;
  }

  const handleBlur = () => {
    const errors: { email?: string; password?: string } = {};
  
    const emailValue = email.current?.value ?? "";
    const passwordValue = password.current?.value ?? "";
  
    if (!emailValue) {
      errors.email = "Email обязателен";
      setError("Email обязателен")
    } else if (!validateEmail(emailValue)) {
      errors.email = "Введите корректный email";
      setError("Введите корректный email")
    }
  
    if (!passwordValue) {
      errors.password = "Пароль обязателен";
      setError("Пароль обязателен")
    } else if (!validationPassword(passwordValue)) {
      errors.password = "Пароль должен быть не короче 8 символов";
      setError("Введите корректный пароль")
    }
  
    setFormError(errors);
    return Object.keys(errors).length === 0;
  };

  if (!context) {
    console.error("context не найден!");
    return null;
  }

  const { user } = context;



  const click = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const emailValue = email.current?.value ?? "";
    const passwordValue = password.current?.value ?? "";
  
    try {
      if (!handleBlur()) return;
      let data;
      if (isLogin) {
        data = await login(emailValue, passwordValue);
        console.log(data);
      } else {
        data = await registration(emailValue, passwordValue);
        console.log(data);
      }
      user.setIsUser(data);
      user.setIsAuth(true);

      navigate(HOME_ROUTE);
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "response" in error) {
        const serverError = error as { response: { data?: { message?: string } } };
        console.error("Ошибка сервера:", serverError.response.data);
        alert(serverError.response.data?.message || "Ошибка при авторизации");
      } else {
        alert("Произошла неизвестная ошибка");
      }
    } finally {
      setIsLoading(false);
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
              placeholder="Почта"
              ref={email}
              className={`${error ? styles.auth__input_error : styles.auth__input}`}
              required
            />
            {formError.email && <p style={{ color: "red" }}>{formError.email}</p>}
          </div>
          <div className={styles.auth__inputGroup}>
            <label htmlFor="password" className={styles.auth__label}>
              Пароль
            </label>
            <div style={{ position: "relative" }}>
            <input
              onBlur={handleBlur}
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Пароль"
              minLength={8}
              ref={password}
              className={`${error ? styles.auth__input_error : styles.auth__input}`}
              required
            />
            <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
            style={{
              position: "absolute",
              right: 10,
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer"
            }}
            >
              {showPassword ? "🙈" : "👁"}
            </button>
            </div>
            {formError.password && <p style={{ color: "red" }}>{formError.password}</p>}
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
            {isLoading ? "Загрузка..." : isLogin ? "Войти" : "Регистрация"}
          </button>
        </form>
      </div>
    </div>
  );
});

export default Auth;

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
    navigate(LOGIN_ROUTE);
  };
  console.log(user.isAuth);
  return (
    <>
      {user.isAuth ? (
        <button
          style={{ padding: "10px 20px 10px 20px", background: "#ff6f04" }}
          onClick={() => logOut()}
        >
          Выйти
        </button>
      ) : (
        <button
          style={{
            padding: "10px 20px 10px 20px",
            background: "#ff6f04",
            borderRadius: "10px",
            fontSize: "16px",
            fontWeight: "600",
          }}
          onClick={() => navigate(LOGIN_ROUTE)}
        >
          Войти
        </button>
      )}
    </>
  );
});

export default LogInLogOut;

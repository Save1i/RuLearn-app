import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AppRouter } from "./components/AppRouter";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Context } from "./main";
import { check } from "./http/userAPI";
import { Spinner } from "react-bootstrap";

const App = observer(() => {
  const context = useContext(Context);

  if (!context) {
    console.error("context не найден!");
    return null;
  }

  const { user } = context;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    check()
      .then((data) => {
        user.setIsUser(data);
        user.setIsAuth(true);
      })
      .catch((error) => {
        console.error("Ошибка при проверке авторизации:", error.response?.data || error.message);
        user.setIsUser({});
        user.setIsAuth(false);
        localStorage.removeItem("token");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Spinner animation={"grow"} />;
  }

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;

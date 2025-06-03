import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./components/AppRouter";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Context } from "./context";
import { check } from "./http/userAPI";


const App = observer(() => {
  const {user} = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    check()
      .then((data) => {
        if(typeof data === 'object') {
          user.setIsUser(data);
          user.setIsAuth(true);
        } else {
          throw Error("error")
        }

      })
      .catch((error) => {
        console.error("Ошибка при проверке авторизации:", error.response?.data || error.message);
        user.setIsUser(undefined);
        user.setIsAuth(false);
        localStorage.removeItem("token");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
    <div className="vh-100 vw-100 d-flex justify-content-center align-items-center">
      <div className="spinner-grow" style={{width: "3rem", height: "3rem", color: "#0077b6"}} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
  </div>
    )
  }

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;

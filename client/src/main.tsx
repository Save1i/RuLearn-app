import { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import UserStore from "./store/UserStore";
import HomeStore from "./store/HomeStore";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

interface ContextProps {
  user: UserStore;
  home: HomeStore;
}

export const Context = createContext<ContextProps>({
  user: new UserStore(),
  home: new HomeStore(),
});

root.render(
  <Context.Provider
    value={{
      user: new UserStore(),
      home: new HomeStore(),
    }}
  >
    <App />
  </Context.Provider>
);

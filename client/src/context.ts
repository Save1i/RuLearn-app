import { createContext } from "react";
import UserStore from "./store/UserStore";
import HomeStore from "./store/HomeStore";

export interface ContextProps {
  user: UserStore;
  home: HomeStore;
}

export const Context = createContext<ContextProps>({
  user: new UserStore(),
  home: new HomeStore(),
});

import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './store/UserStore';
import HomeStore from './store/HomeStore';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

interface ContextProps {
  user: UserStore,
  home: HomeStore 
}

export const Context = createContext<ContextProps | null>(null);


root.render(
  <Context.Provider value={{
    user: new UserStore(),
    home: new HomeStore(),
    }}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
    </Context.Provider>

);

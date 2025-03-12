import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './store/UserStore';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

interface ContextProps {
  user: UserStore;
}

export const Context = createContext<ContextProps | null>(null);


root.render(
  <Context.Provider value={{
    user: new UserStore()}}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
    </Context.Provider>

);

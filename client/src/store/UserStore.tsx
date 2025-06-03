import { makeAutoObservable } from "mobx";

export default class UserStore {
  private _isAuth: boolean;
  private _user?: object;

  constructor() {
    this._isAuth = false;
    this._user = undefined;
    makeAutoObservable(this);
  }

  setIsAuth(bool: boolean) {
    this._isAuth = bool;
  }

  setIsUser(user?: object) {
    this._user = user;
  }

  get isAuth() {
    return this._isAuth;
  }

  get user() {
    return this._user;
  }
}

import { makeAutoObservable } from "mobx";

export default class UserStore {
  private _isAuth: boolean;
  private _user: boolean;

  constructor() {
    this._isAuth = false;
    this._user = false;
    makeAutoObservable(this);
  }

  setIsAuth(bool: boolean) {
    this._isAuth = bool;
  }

  setIsUser(user: boolean) {
    this._user = user;
  }

  get isAuth() {
    return this._isAuth;
  }

  get user() {
    return this._user;
  }
}

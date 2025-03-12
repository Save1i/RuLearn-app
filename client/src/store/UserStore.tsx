import { makeAutoObservable } from "mobx"

interface User {
    id?: number,
    email?: string,
    role?: string,
    password?: string
}

export default class UserStore {
    private _isAuth: boolean;
    private _user: User;

  constructor() {
    this._isAuth = true
    this._user = {}
    makeAutoObservable(this)
  }

  setIsAuth(bool: boolean) {
    this._isAuth = bool
  }

  setIsUser(user: object) {
    this._user = user
  }

  get isAuth() {
    return this._isAuth
  }

  get user() {
    return this._user
  }
}

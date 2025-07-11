import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";

interface User {
  email: string;
  password: string;
}


export const registration = async ({email, password}: User) => {
  const { data } = await $host.post("api/user/registration", { email, password, role: "USER" });
  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
};

export const login = async ({email, password}: User) => {
  const { data } = await $host.post("api/user/login", { email, password });

  if (!data.token) {
    throw new Error("Сервер не вернул токен");
  }
  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
};

export const check = async () => {
  const { data } = await $authHost.get("api/user/auth");
  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
};

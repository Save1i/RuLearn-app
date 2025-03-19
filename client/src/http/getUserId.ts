import { jwtDecode, JwtPayload } from "jwt-decode";

interface MyJwtPayload extends JwtPayload {
  id?: number; // `id` может отсутствовать, поэтому `?`
}

export const getUserId = (): { id: number } => {
  const data: string | null = localStorage.getItem("token");

  if (data) {
    const decoded: MyJwtPayload = jwtDecode(data);
    return { id: decoded.id ?? 0 }; // Если `id` отсутствует, вернем 0
  }

  return { id: 0 };
};

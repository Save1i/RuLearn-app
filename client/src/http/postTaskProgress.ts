import axios from "axios";
import { fetchTaskProgress } from "./homeAPI";
import HomeStore from "../store/HomeStore"; // путь к твоему стору

export const postTaskProgress = async (userId: number, taskId: number, home: HomeStore) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}api/task-progress`, {
      userId,
      taskId,
    });

    // Обновление прогресса задачи
    const data = await fetchTaskProgress(userId);
    home.setTaskProgress(data);

    console.log(response.data.message);
    return "correct!";
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Ошибка запроса:", error.response?.data || error.message);
    } else {
      console.error("Неизвестная ошибка", error);
    }
  }
};

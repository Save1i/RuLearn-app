import axios from "axios";

export const postTaskProgress = async (userId: number, taskId: number) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}api/task-progress`, {
      userId,
      taskId,
    });
    console.log(response.data.message);
    return "correct!";
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "response" in error) {
      console.error("Ошибка запроса:", error.response || error);
    } else {
      console.log("Неизвестная ошибка");
    }
  }
};

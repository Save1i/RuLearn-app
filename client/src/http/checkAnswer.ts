import axios from "axios";

export const checkAnswer = async (
  selectedOption: string,
  correctAnswer: string,
  userId: number,
  testId: number
) => {
  if (selectedOption === correctAnswer) {
    console.log("Верно!");

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}api/test-progress`, {
        userId,
        testId,
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
  } else {
    return "incorrect!";
    console.log("Неверно!");
  }
};

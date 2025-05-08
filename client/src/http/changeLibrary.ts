import axios from "axios"
import { deleteLibrary, postLibrary } from "./homeAPI"
import HomeStore from "../store/HomeStore"

export const changeLibrary = async (userId: number, dictionaryId: number, choodDelete: boolean, home: HomeStore) => {
    try {
        if(choodDelete === undefined) return

        let data;

        if(choodDelete) {
            data = await deleteLibrary(userId, dictionaryId)
        } else {
            data = await postLibrary(userId, dictionaryId)
        }
        

        home.setLibrary(data);

        console.log(data.message);
        return "correct!";
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.error("Ошибка запроса:", error.response?.data || error.message);
        } else {
          console.error("Неизвестная ошибка", error);
        }
    }
}


import instance from "../api/axios.api";
import { responseData } from "../types/gameData";


const createGame = (): Promise<responseData> => {
    return instance.post("/api/games")
}
const gameService = {createGame}
export default gameService;
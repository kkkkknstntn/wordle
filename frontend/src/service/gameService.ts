import axios from "axios";
import instance from "../api/axios.api";
import { GameDataById } from "../types/game";
import { responseData } from "../types/gameData";


const getGameById = (id : number): Promise<GameDataById> => {
    return instance.get(`/api/games/${id}`).then(res => res.data)
}
const gameService = { getGameById }
export default gameService;
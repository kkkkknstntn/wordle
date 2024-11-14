import axios from "axios";
import { GameDataById } from "../types/game";
import { responseData } from "../types/gameData";
import { axiosPublic } from "../api";


const getGameById = (id : number): Promise<GameDataById> => {
    return axiosPublic.get(`/api/games/${id}`).then(res => res.data)
}
const gameService = { getGameById }
export default gameService;
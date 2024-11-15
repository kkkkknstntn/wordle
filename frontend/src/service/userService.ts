import axios from "axios";
import { GameDataById } from "../types/game";
import { responseData } from "../types/gameData";
import { IUser } from "../types/user";


const getTopByWins = (page : number, size : number): Promise<IUser[]> => {
    const instance = axios.create({
        baseURL: 'http://v183683.hosted-by-vdsina.com:3000',
        headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json"
        },
    });
    return instance.get(`/api/users/sortedByWins?page=${page}&size=${size}`).then(res => res.data)
}

const getTopByWinLossRatio = (page : number, size : number): Promise<IUser[]> => {
    const instance = axios.create({
        baseURL: 'http://v183683.hosted-by-vdsina.com:3000',
        headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json"
        },
    });
    return instance.get(`/api/users/sortedByWinLossRatio?page=${page}&size=${size}`).then(res => res.data)
}
const userService = { getTopByWins, getTopByWinLossRatio }
export default userService;
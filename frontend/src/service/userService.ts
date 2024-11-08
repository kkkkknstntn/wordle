import axios from "axios";
import instance from "../api/axios.api";
import { GameDataById } from "../types/game";
import { responseData } from "../types/gameData";
import { IUser } from "../types/user";


const getTopByWins = (page : number, size : number): Promise<IUser[]> => {
    const instance = axios.create({
        baseURL: 'http://127.0.0.1:80',
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json"
        },
    });
    return instance.get(`/api/users/sortedByWins?page=${page}&size=${size}`).then(res => res.data)
}

const getTopByWinLossRatio = (page : number, size : number): Promise<IUser[]> => {
    const instance = axios.create({
        baseURL: 'http://127.0.0.1:80',
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json"
        },
    });
    return instance.get(`/api/users/sortedByWinLossRatio?page=${page}&size=${size}`).then(res => res.data)
}
const userService = { getTopByWins, getTopByWinLossRatio }
export default userService;
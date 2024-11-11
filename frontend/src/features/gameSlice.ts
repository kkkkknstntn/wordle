import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../api/axios.api";
import { IUser, LoginResponse, UserLogin, UserRegisterData } from "../types/user";
import Cookies from 'js-cookie';
import axios from "axios";
import { GameDataById, GameState, GameStateAndGameDataById, NewAttempt } from "../types/game";

export const createGameWithoutAuth = createAsyncThunk<GameState>( //мб надо будет поменять any
    "games/createGameWithoutAuth",
    async (_, thunkAPI) => {
        try {
            const res = await instance.post('/api/games')
            console.log('игра создалась')
            return res.data;
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err)
        }
    }
)

export const tryAgain = createAsyncThunk<GameState, NewAttempt>( //мб надо будет поменять any
    "games/tryNewAttempt",
    async (payload, thunkAPI) => {
        try {
            const instance = axios.create({
                baseURL: 'http://127.0.0.1:80',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    "Content-Type": "application/json"
                },
            });
            const res = await instance.patch('/api/games', payload)
            console.log('успешно сделана новая попытка')
            return res.data;
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err)
        }
    }
)

export const tryAgainWithoutAuth = createAsyncThunk<GameState, NewAttempt>( //мб надо будет поменять any
    "games/tryNewAttemptWithoutAuth",
    async (payload, thunkAPI) => {
        try {
            const res = await instance.patch('/api/games', payload)
            console.log('успешно сделана новая попытка')
            return res.data;
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err)
        }
    }
)

export const createGameWithAuth = createAsyncThunk<GameState>( //мб надо будет поменять any
    "games/createGameWithAuth",
    async (_, thunkAPI) => {
        const instance = axios.create({
            baseURL: 'http://127.0.0.1:80',
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                "Content-Type": "application/json"
            },
        });
        try {
            const res = await instance.post('/api/games')
            console.log('игра создалась')
            return res.data;
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err)
        }
    }
)

const initialState: GameState = {
    game_id: 0,
    guessed_word: "",
    current_try: 0,
    game_status: "",
    letter_statuses: ['','','','',''],
    isCorrectWord: true,
    isGameWithoutAuth: true
};

const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        resetState: (state) => {
            state = initialState
        },
        isGameWithoutAuth: (state, {payload}) => {
            state.isGameWithoutAuth = payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createGameWithoutAuth.fulfilled, (state, { payload }) => {
            state.game_id = payload.game_id
            state.current_try = payload.current_try
            state.game_status = payload.game_status
            state.letter_statuses = payload.letter_statuses

            console.log(state.game_id)
        })
        builder.addCase(createGameWithAuth.fulfilled, (state, { payload }) => {
            state.game_id = payload.game_id
            state.current_try = payload.current_try
            state.game_status = payload.game_status
            state.letter_statuses = payload.letter_statuses

            console.log(state.game_id)
        })

        builder.addCase(tryAgain.fulfilled, (state, { payload }) => {
            state.current_try = payload.current_try
            state.game_status = payload.game_status
            state.letter_statuses = payload.letter_statuses
            state.guessed_word = payload.guessed_word
            console.log("ЕБАТЬ ЕГО В РОТ " + state.isCorrectWord)
            state.isCorrectWord = true
        })
        builder.addCase(tryAgain.rejected, (state, { payload }) => {
            state.isCorrectWord = false
        })
        builder.addCase(tryAgain.pending, (state, { payload }) => {
            state.isCorrectWord = true
        })
        builder.addCase(tryAgainWithoutAuth.fulfilled, (state, { payload }) => {
            state.current_try = payload.current_try
            state.game_status = payload.game_status
            state.letter_statuses = payload.letter_statuses
            state.guessed_word = payload.guessed_word
            console.log("ЕБАТЬ ЕГО В РОТ " + state.isCorrectWord)
            state.isCorrectWord = true
        })
        builder.addCase(tryAgainWithoutAuth.rejected, (state, { payload }) => {
            state.isCorrectWord = false
        })
        builder.addCase(tryAgainWithoutAuth.pending, (state, { payload }) => {
            state.isCorrectWord = true
        })
    }
})
export const selectCurrentGameState = (state: { game: GameState }) => state.game;
export const { resetState, isGameWithoutAuth } = gameSlice.actions;
export default gameSlice.reducer;
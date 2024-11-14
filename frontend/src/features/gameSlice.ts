import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser, LoginResponse, UserLogin, UserRegisterData } from "../types/user";
import Cookies from 'js-cookie';
import axios from "axios";
import { GameDataById, GameState, GameStateAndGameDataById, NewAttempt } from "../types/game";
import { axiosPrivate, axiosPublic } from "../api";
import gameService from "../service/gameService";

export const createGameWithoutAuth = createAsyncThunk<GameState>( //мб надо будет поменять any
    "games/createGameWithoutAuth",
    async (_, thunkAPI) => {
        try {
            const res = await axiosPublic.post('/api/games')
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
            const res = await axiosPrivate.patch('/api/games', payload)
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
            const res = await axiosPublic.patch('/api/games', payload)
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
        try {
            const res = await axiosPrivate.post('/api/games')
            return res.data;
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err)
        }
    }
)

export const deleteGameById = createAsyncThunk<any, number>( //мб надо будет поменять any
    "games/deleteGame",
    async (payload, thunkAPI) => {
        try {
            const res = await axiosPublic.delete(`/api/games/${payload}`)
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
        resetGameState: (state) => {
            state = initialState
        },
        isGameWithoutAuth: (state, {payload}) => {
            state.isGameWithoutAuth = payload
        },

    },
    extraReducers: (builder) => {
        builder.addCase(createGameWithoutAuth.fulfilled, (state, { payload }) => {
            state.game_id = payload.game_id
            state.current_try = payload.current_try
            state.game_status = payload.game_status
            state.letter_statuses = payload.letter_statuses
        })
        builder.addCase(createGameWithAuth.fulfilled, (state, { payload }) => {
            state.game_id = payload.game_id
            state.current_try = payload.current_try
            state.game_status = payload.game_status
            state.letter_statuses = payload.letter_statuses
        })

        builder.addCase(tryAgain.fulfilled, (state, { payload }) => {
            state.current_try = payload.current_try
            state.game_status = payload.game_status
            state.letter_statuses = payload.letter_statuses
            state.guessed_word = payload.guessed_word
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
export const { resetGameState, isGameWithoutAuth } = gameSlice.actions;
export default gameSlice.reducer;
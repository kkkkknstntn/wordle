import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../api/axios.api";
import { IUser, LoginResponse, UpdateUserData, UserLogin, UserRegisterData } from "../types/user";
import Cookies from 'js-cookie';
import axios from "axios";
import { createUser, deleteUser, loginUser, updateUser } from "./userSlice";

interface AppState {
    loading: boolean,
    error: boolean,
    error_msg: string
}

const initialState: AppState = {
    loading: false,
    error: false,
    error_msg: ''
};

const appSlice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, _) => {
            state.loading = false
            state.error = false
            state.error_msg = ''
        });
        builder.addCase(loginUser.pending, (state, _) => {
            state.loading = true
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false
            state.error = true
            state.error_msg = "Неправильный логин или пароль"
        });
        builder.addCase(deleteUser.rejected, (state, action) => {
            state.loading = false
            state.error = true
            state.error_msg = action.error.message || 'unknown error'
        })
        builder.addCase(deleteUser.pending, (state, _) => {
            state.loading = true
        })
        builder.addCase(deleteUser.fulfilled, (state, _) => {
            state.loading = false
            state.error = false
            state.error_msg = ''
        })
        builder.addCase(createUser.rejected, (state, action) => {
            state.loading = false
            state.error = true
            state.error_msg = "Такой пользователь уже существует"
        })
        builder.addCase(createUser.pending, (state, _) => {
            state.loading = true
        })
        builder.addCase(createUser.fulfilled, (state, _) => {
            state.loading = false
            state.error = false
            state.error_msg = ''
        })
        builder.addCase(updateUser.rejected, (state, action) => {
            state.loading = false
            state.error = true
            state.error_msg = "Такой пользователь уже существует"
        })
        builder.addCase(updateUser.pending, (state, _) => {
            state.loading = true
        })
        builder.addCase(updateUser.fulfilled, (state, _) => {
            state.loading = false
            state.error = false
            state.error_msg = ''
        })
    }
})
export const selectAppState = (state: {app: AppState}) => state.app;
export default appSlice.reducer;
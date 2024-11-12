import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../api/axios.api";
import { IUser, LoginResponse, UpdateUserData, UserLogin, UserRegisterData } from "../types/user";
import Cookies from 'js-cookie';
import axios from "axios";

interface UserState {
    currentUser: IUser | null; // Используем IUser как тип для currentUser
    //isLoading: boolean;
    formType: string;
    isAuthenticated: boolean;
    accessToken: string | null;
    refreshToken: string | null;
    showAuthorizationForm: boolean;
}

export const createUser = createAsyncThunk<any, UserRegisterData>( //мб надо будет поменять any
    "users/createUser",
    async (payload, thunkAPI) => {
        try {
            const res = await instance.post('/api/users', payload);
            console.log("Юзер создался")
            return res.data;
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err)
        }
    }
)

export const deleteUser = createAsyncThunk<any, number>( //мб надо будет поменять any
    "users/deleteUser",
    async (payload, thunkAPI) => {
        try {
            const res = await instance.delete(`/api/users/${payload}`);
            console.log("Юзер удалился")
            return res.data;
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err)
        }
    }
)

export const loginUser = createAsyncThunk<LoginResponse, UserLogin>( //мб надо будет поменять any
    "users/loginUser",
    async (payload, thunkAPI) => {
        try {
            //const res = await instance.post('/api/users', payload);
            const login = await instance.post('/api/auth/login', payload).then(resp => resp.data)
            //console.log("Вы вошли")
            console.log(login)
            return login;
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err)
        }
    }
)

export const updateUser = createAsyncThunk<IUser, UpdateUserData>( //мб надо будет поменять any
    "users/updateUser",
    async (payload, thunkAPI) => {
        try {
            const instance = axios.create({
                baseURL: 'http://127.0.0.1:80',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    "Content-Type": "application/json"
                },
            });
            const user = await instance.patch(`/api/users/${payload.id}`, payload.userData).then(resp => resp.data)
            console.log(user)
            return user;
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err)
        }
    }
)

export const getCurrentUser = createAsyncThunk<IUser>(
    "users/getCurrentUser",
    async (_, thunkAPI) => {
        try {
            console.log("ТОКЕН - " + localStorage.getItem("accessToken"))
            const instance = axios.create({
                baseURL: 'http://127.0.0.1:80',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    "Content-Type": "application/json"
                },
            });

            const user = await instance.get('/api/users/info').then(resp => resp.data)
            // console.log("Вы вошли")
            return user;
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err)
        }
    }
)

const initialState: UserState = {
    currentUser: null,
    //isLoading: false,
    formType: "signin",
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null,
    showAuthorizationForm: (localStorage.getItem('accessToken') == undefined)
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetState: (state) => state = initialState,
        changeFormType: (state) => {
            state.formType = state.formType === "signin" ? "signup" : "signin";
            console.log("СОСТОЯНИЕ СТАЛО " + state.formType)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createUser.fulfilled, (state, {payload}) => {
            state.currentUser = payload;
            state.formType = "signin"
        });
        builder.addCase(loginUser.fulfilled, (state, {payload}) => {
            //state.isLoading = false;
            state.showAuthorizationForm = false;
            state.isAuthenticated = true
            localStorage.setItem("accessToken", payload.access_token)
            Cookies.set("refreshToken", payload.refresh_token)
            state.accessToken = payload.access_expires_at;
            state.refreshToken = payload.refresh_expires_at;
        });
        builder.addCase(loginUser.pending, (state, _) => {
            state.showAuthorizationForm = true;
            state.isAuthenticated = false
        });
        builder.addCase(loginUser.rejected, (state, _) => {
            state.showAuthorizationForm = true;
            state.isAuthenticated = false
        });
        builder.addCase(getCurrentUser.fulfilled, (state, { payload }) => {
            state.currentUser = payload
            console.log(payload)
        });
        builder.addCase(updateUser.fulfilled, (state, {payload}) => {
            state.currentUser = payload
        })
    }
})
export const selectCurrentUserState = (state: { user: UserState }) => state.user;
export const { resetState } = userSlice.actions;
export const { changeFormType } = userSlice.actions;
export default userSlice.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser, LoginResponse, UpdateUserData, UserLogin, UserRegisterData } from "../types/user";
import Cookies from 'js-cookie';
import axios from "axios";
import { axiosPrivate, axiosPublic, axiosRefresh } from "../api";


interface UserState {
    currentUser: IUser | null; // Используем IUser как тип для currentUser
    //isLoading: boolean;
    formType: string;
    isAuthenticated: boolean;
    access_token: string | null;
    refresh_token: string | null;
    showAuthorizationForm: boolean;
    access_expires_at: number;
    refresh_expires_at: number
}

export const createUser = createAsyncThunk<any, UserRegisterData>( //мб надо будет поменять any
    "users/createUser",
    async (payload, thunkAPI) => {
        try {
            const res = await axiosPublic.post('/api/users', payload);
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
            const res = await axiosPrivate.delete(`/api/users/${payload}`);
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
            //const login = await instance.post('/api/auth/login', payload).then(resp => resp.data)
            //console.log("Вы вошли") axiosPrivate
            const login = await axiosPublic.post('/api/auth/login', payload).then(resp => resp.data)
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
            // const instance = axios.create({
            //     baseURL: 'http://127.0.0.1:80',
            //     headers: {
            //         Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            //         "Content-Type": "application/json"
            //     },
            // });
            const user = await axiosPrivate.patch(`/api/users/${payload.id}`, payload.userData).then(resp => resp.data)
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
            console.log("ТОКЕН - " + localStorage.getItem("access_token"))
            const user = await axiosPrivate.get('/api/users/info').then(resp => resp.data)
            return user;
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err)
        }
    }
)

export const refresh_token = createAsyncThunk<LoginResponse>(
    "users/refresh_token",
    async (_, thunkAPI) => {
        try {
            const refresh_token = Cookies.get("refresh_token");
            //console.log("РЕФРЕШ ТОКЕН " + refresh_token)
            const response = await axiosRefresh.post('/api/auth/refresh');
            return response.data;
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err);
        }
    }
);

const initialState: UserState = {
    currentUser: null,
    formType: "signin",
    isAuthenticated: false,
    access_token: null,
    refresh_token: null,
    showAuthorizationForm: (localStorage.getItem('access_token') == undefined),
    access_expires_at: 0,
    refresh_expires_at: 0
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
            state.showAuthorizationForm = false;
            state.isAuthenticated = true
            localStorage.setItem("access_token", payload.access_token)
            Cookies.set("refresh_token", payload.refresh_token)
            state.access_token = payload.access_token;
            state.refresh_token = payload.refresh_token;
            state.access_expires_at = new Date(payload.access_expires_at).getTime()
            state.refresh_expires_at = new Date(payload.refresh_expires_at).getTime()

            // const refresh_token = state.refresh_token;
            // console.log("РЕФРЕШ ТОКЕН " + Cookies.get("refresh_token"))
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
        builder.addCase(refresh_token.fulfilled, (state, { payload }) => {
            console.log("СТАРЫЙ ТОКЕН " + localStorage.getItem("access_token"))
            localStorage.setItem("access_token", payload.access_token);
            Cookies.set("refresh_token", payload.refresh_token);
            state.access_token = payload.access_token;
            state.refresh_token = payload.refresh_token;
            state.access_expires_at = payload.access_expires_at.getTime()
            state.refresh_expires_at = payload.refresh_expires_at.getTime()

            console.log("НОВЫЙ ТОКЕН " + localStorage.getItem("access_token"))
        });
    }
})
export const selectCurrentUserState = (state: { user: UserState }) => state.user;
export const { resetState } = userSlice.actions;
export const { changeFormType } = userSlice.actions;
export default userSlice.reducer;
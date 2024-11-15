import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser, LoginResponse, UpdateUserData, UserLogin, UserRegisterData } from "../types/user";
import Cookies from 'js-cookie';
import axios from "axios";
import { axiosPrivate, axiosPublic, axiosRefresh } from "../api";


interface UserState {
    currentUser: IUser | null; // Используем IUser как тип для currentUser
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
            const login = await axiosPublic.post('/api/auth/login', payload).then(resp => resp.data)
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
            const user = await axiosPrivate.patch(`/api/users/${payload.id}`, payload.userData).then(resp => resp.data)
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
    isAuthenticated: ((localStorage.getItem('access_token') != null) && (Number(localStorage.getItem("access_expires_at")) > new Date().getTime())),
    access_token: null,
    refresh_token: null,
    showAuthorizationForm: (localStorage.getItem('access_token') == null ||  (Number(localStorage.getItem("access_expires_at")) < new Date().getTime())),
    access_expires_at: 0,
    refresh_expires_at: 0
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetUserState: (state) => {
            localStorage.removeItem('access_token');
            localStorage.removeItem('access_expires_at')
            Cookies.remove("refresh_token")
            state.currentUser = null
            state.isAuthenticated = false
            state.access_token = null
            state.refresh_token = null
            state.showAuthorizationForm = true
            state.access_expires_at = 0
            state.refresh_expires_at = 0
        },
        changeFormType: (state) => {
            state.formType = state.formType === "signin" ? "signup" : "signin";
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
            localStorage.setItem("access_expires_at", new Date(payload.access_expires_at).getTime().toString())
            state.refresh_expires_at = new Date(payload.refresh_expires_at).getTime()
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
        });
        builder.addCase(getCurrentUser.rejected, (state, { payload }) => {
            resetUserState()
        });
        builder.addCase(updateUser.fulfilled, (state, {payload}) => {
            state.currentUser = payload
        })
        builder.addCase(refresh_token.fulfilled, (state, { payload }) => {
            localStorage.setItem("access_token", payload.access_token);
            Cookies.set("refresh_token", payload.refresh_token);
            state.access_token = payload.access_token;
            state.refresh_token = payload.refresh_token;
            state.access_expires_at = payload.access_expires_at.getTime()
            state.refresh_expires_at = payload.refresh_expires_at.getTime()
        });
    }
})
export const selectCurrentUserState = (state: { user: UserState }) => state.user;
export const { resetUserState } = userSlice.actions;
export const { changeFormType } = userSlice.actions;
export default userSlice.reducer;
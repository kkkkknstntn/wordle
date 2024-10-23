import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../api/axios.api";
import { UserLogin, UserRegisterData } from "../../types/user";

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

export const loginUser = createAsyncThunk<any, UserLogin>( //мб надо будет поменять any
    "users/loginUser",
    async (payload, thunkAPI) => {
        try {
            //const res = await instance.post('/api/users', payload);
            const login = await instance.post('/api/auth/login', payload)
            console.log("Вы вошли")
            return login.data;
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err)
        }
    }
)

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: {},
        isLoading: false,
        formType: "signup",
        showForm: false
    },
    reducers: {
        toggleForm: (state, { payload }) => {
            state.showForm = payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createUser.fulfilled, (state, {payload}) => {
            state.currentUser = payload;
        });
        builder.addCase(loginUser.fulfilled, (state, {payload}) => {
            state.currentUser = payload;
        });
    }
})

export const { toggleForm } = userSlice.actions;
export default userSlice.reducer;
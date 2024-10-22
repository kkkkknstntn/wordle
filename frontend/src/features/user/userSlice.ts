import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../api/axios.api";

export const createUser = createAsyncThunk(
    "users/createUser",
    async (payload, thunkAPI) => {
        try {
            const res = await instance.post('/api/users', payload);
            return res.data;
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err)
        }
    }
)

const userSlice = createSlice({
    name: "",
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
    }
})

export const { toggleForm } = userSlice.actions;
export default userSlice.reducer;
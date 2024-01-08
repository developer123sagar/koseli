/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type User = {
    [key: string]: string;
}

const initialState: {
    message: string | null;
    loading: boolean;
} = {
    message: null,
    loading: false,
};

const url = import.meta.env.VITE_API_BASE_URL;

export const signupUser = createAsyncThunk('signup', async (formData: User) => {
    try {
        const res = await axios.post(`${url}/client/register`, formData);
        const { message } = res.data;
        return message;
    } catch (err: any) {
        throw err.response.data.message;
    }
});

const signupSlice = createSlice({
    name: "signup",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signupUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false;
                state.message = action.error.message || "An error occurred during signup";
            });
    },
});

export default signupSlice.reducer;

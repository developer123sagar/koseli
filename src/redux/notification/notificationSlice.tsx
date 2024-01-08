import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState: any = {
    loading: false,
    res: " "
}

export const pushNotification = createAsyncThunk(
    "push/notification",
    async (body:any) => {
        try {
            await axios.post(`https://fcm.googleapis.com/fcm/send`, body, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "key=AAAAlajbYn0:APA91bFQGisdttYjOAyZzO9CRvqJKQJU7ANMuyxAyYmRytpHUBBGRftCqZAuW6TU0qegIYl2W1pgWgRgiivTGd6ZqOuI9JHm2l4xtvIMjJ5jbakIU7gvWREASUfV8lxcYiJNeifKlFgb",
                },
            });
            return "Desired parties have been notified sucesfully";
        } catch (err) {
            console.log(err)
            const customError = new Error(
                "An error occurred: " + (err as Error).message
            ) as Error;
            throw customError;
        }
    }
);

const NotificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(pushNotification.pending, (state) => {
                state.loading = true;
            })
            .addCase(pushNotification.fulfilled, (state, action) => {
                state.loading = false;
                state.res = action.payload;
            })
            .addCase(pushNotification.rejected, (state) => {
                state.loading = false;
            })
    }
})


export default NotificationSlice.reducer;
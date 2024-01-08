import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { url } from "@/routes";
import axios from "axios";
import { Message } from "@/types";

const initialState: Message= {
    loading:false,
    userChat:[],
    indvChat:[],
    chatAvaliability:[]
}

export const fetchUserChat = createAsyncThunk(
  "/user/chat",
  async (id: string | null) => {
    console.log(id);
    try {
      const res = await axios.get(`${url}/chat/${id}`);
      console.log(res);
      return res.data;
    } catch (err) {
      console.log(err);
      const customError = new Error(
        "An error occurred: " + (err as Error).message
      ) as Error;
      throw customError;
    }
  }
);

export const fetchInvChat = createAsyncThunk(
  "/indv/chat",
  async (chatId: string | null) => {
    console.log("I am being called");
    try {
      const res = await axios.get(`${url}/message/${chatId}`);
      console.log(res);
      return res.data;
    } catch (err) {
      const customError = new Error(
        "An error occurred: " + (err as Error).message
      ) as Error;
      throw customError;
    }
  }
);

export const checkChatAvaliability = createAsyncThunk(
  "/find/:senderId/:recieverId",
  async ({senderId,receiverId,token}:{senderId:string,receiverId:string,token:string|null}) => {
    console.log("I am being called");
    try {
      const res = await axios.get(`${url}/chat/find/${senderId}/${receiverId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token, 
        },
      });
      console.log(res);
      return res;
    } catch (err) {
      console.log(err);
      const customError = new Error(
        "An error occurred: " + (err as Error).message
      ) as Error;
      throw customError;
    }
  }
);

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
      
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchUserChat.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchUserChat.fulfilled, (state, action) => {
          state.loading = false;
          state.userChat = action.payload;
        })
        .addCase(fetchUserChat.rejected, (state) => {
          state.loading = false;
        })
        .addCase(fetchInvChat.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchInvChat.fulfilled, (state, action) => {
          state.loading = false;
          state.indvChat = action.payload;
        })
        .addCase(fetchInvChat.rejected, (state) => {
          state.loading = false;
        })
        .addCase(checkChatAvaliability.pending, (state) => {
          state.loading = true;
        })
        .addCase(checkChatAvaliability.fulfilled, (state, action) => {
          state.loading = false;
          state.chatAvaliability = action.payload;
        })
        .addCase(checkChatAvaliability.rejected, (state) => {
          state.loading = false;
        })
    }

  });

  export default chatSlice.reducer;

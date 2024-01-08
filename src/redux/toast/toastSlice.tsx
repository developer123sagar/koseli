import { MessageType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ToastState {
  messages: MessageType[];
}

const initialState: ToastState = {
  messages: [],
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addToastMessage: (state, action: PayloadAction<MessageType>) => {
      state.messages.push(action.payload);
    },
    removeToastMessage: (state) => {
      state.messages.shift();
    },
  },
});

export const { addToastMessage, removeToastMessage } = toastSlice.actions;
export default toastSlice.reducer;

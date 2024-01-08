/* eslint-disable @typescript-eslint/no-explicit-any */
import { url } from "@/routes";
import { IPaymentInitialState, PaymentMode } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const isDeliveryformSubmitted =
  localStorage.getItem("isDeliveryFormSubmitted") === "true" || false;

const initialState: IPaymentInitialState = {
  loading: false,
  isDeliveryformSubmitted: isDeliveryformSubmitted,
  selectedPaymentMethod: "",
  error: "",
};

export const payment = createAsyncThunk(
  "payment",
  async ({
    api,
    token,
    data,
    paymentMode,
  }: {
    api: string;
    token: string;
    data?: any;
    paymentMode: PaymentMode;
  }) => {
    try {
      const res = await axios.post(`${url}/${api}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      if (paymentMode === "KHALTI") {
        if (res.status === 200) {
          window.location.href = res.data;
        }
      }
      return res.data;
    } catch (err: any) {
      throw new Error(err.response.data.message);
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setDeliveryDetails: (state) => {
      localStorage.setItem("isDeliveryFormSubmitted", String(true));
      state.isDeliveryformSubmitted = true;
    },
    setSelectedPaymentMethod: (state, action) => {
      state.selectedPaymentMethod = action.payload;
    },
    clearData: (state) => {
      state.isDeliveryformSubmitted = false;
      localStorage.removeItem("isDeliveryFormSubmitted");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(payment.pending, (state) => {
        state.loading = true;
      })
      .addCase(payment.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(payment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message!;
      });
  },
});

export default paymentSlice.reducer;
export const { setDeliveryDetails, setSelectedPaymentMethod, clearData } =
  paymentSlice.actions;

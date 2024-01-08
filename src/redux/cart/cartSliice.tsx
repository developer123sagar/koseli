import { MessageType } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

export interface IcartDatas {
  _id: string;
  activeImage: string;
  discountPercent: number;
  minQuantity: number;
  name: string;
  price: number;
  restaurant: string;
  total: number;
  description: string;
  subTitle: string;
  foodCategory: string;
  addon: {
    isRequired: boolean;
    isCheckDefault: boolean;
    quantity: number;
    _id: string;
    name: string;
    extraPrice: number;
    extra: string;
  }[];
}

interface CartState {
  cartDatas: IcartDatas[];
  loading: boolean;
  message: MessageType[];
}

// Load cart data from local storage if available
const initialCartData = localStorage.getItem("cartDatas");

const initialState: CartState = {
  cartDatas: initialCartData ? JSON.parse(initialCartData) : [],
  loading: false,
  message: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart(state, action) {
      const { _id, minQuantity, restaurant } = action.payload;

      const index = state.cartDatas.findIndex((item) => item._id === _id);

      if (
        state.cartDatas.length === 0 ||
        state.cartDatas[0].restaurant === restaurant
      ) {
        if (index === -1) {
          state.cartDatas = [...state.cartDatas, action.payload];
        } else {
          const qty = state.cartDatas[index].minQuantity;
          const qtyInc = qty + minQuantity;
          state.cartDatas[index].minQuantity = qtyInc;

          const price = state.cartDatas[index].price;
          const total = price * qtyInc;

          state.cartDatas[index].total = total;
        }

        localStorage.setItem("cartDatas", JSON.stringify(state.cartDatas));
      } else {
        state.message.push({
          id: Date.now().toString(),
          msg: "You can not order from different restaurant",
          theme: "warn",
        });
      }
    },
    removeItem(state, action) {
      const { _id } = action.payload;
      state.cartDatas = state.cartDatas.filter((item) => item._id !== _id);
      localStorage.setItem("cartDatas", JSON.stringify(state.cartDatas));
    },
    clearCart(state) {
      state.cartDatas = [];
      localStorage.removeItem("cartDatas");
    },

    incrementItem(state, action) {
      const _id = action.payload;
      const index = state.cartDatas.findIndex((item) => item._id === _id);

      if (index !== -1) {
        const qty = state.cartDatas[index].minQuantity;
        const qtyInc = qty + 1;
        state.cartDatas[index].minQuantity = qtyInc;

        const price = state.cartDatas[index].price;
        const total = price * qtyInc;

        state.cartDatas[index].total = total;

        localStorage.setItem("cartDatas", JSON.stringify(state.cartDatas));
      }
    },
    decrementItem(state, action) {
      const _id = action.payload;
      const index = state.cartDatas.findIndex((item) => item._id === _id);

      if (index !== -1) {
        const qty = state.cartDatas[index].minQuantity;
        const qtyDec = qty - 1;

        if (qtyDec >= 1) {
          state.cartDatas[index].minQuantity = qtyDec;

          const price = state.cartDatas[index].price;
          const total = price * qtyDec;

          state.cartDatas[index].total = total;

          localStorage.setItem("cartDatas", JSON.stringify(state.cartDatas));
        }
      }
    },
    removeMsg: (state) => {
      state.message.shift();
    },
  },
});

export default cartSlice.reducer;
export const {
  addCart,
  removeMsg,
  removeItem,
  clearCart,
  incrementItem,
  decrementItem,
} = cartSlice.actions;

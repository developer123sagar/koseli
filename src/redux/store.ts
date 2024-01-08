import cartReducer from "./cart/cartSliice"
import foodDetailsReducer from './foods/foodDetailSlice';
import restaurantReducer from './restaurant/restaurantSlice'
import signuReducer from './auth/signupSlice'
import signinReducer from './auth/loginSlice'
import fetchApiDataReducer from "./dashboard/fetchApiData/fetchApiDataSlice";
import paymentReducer from "./checkout-payment/paymentSlice";
import chatSlice from "./chat/chatSlice";
import orderSlice from "./order/orderSlice";
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import manageAccountSlice from "./manageAccount/manageAccountSlice";
import notificationSlice from "./notification/notificationSlice";
import toastReducer from "./toast/toastSlice";
import scheduleSlice from "./schedule/scheduleSlice";

const store = configureStore({
    reducer: {
        cart: cartReducer,
        foodDetails: foodDetailsReducer,
        signup: signuReducer,
        restaurant: restaurantReducer,
        signin: signinReducer,
        fetchDashData: fetchApiDataReducer,
        payment: paymentReducer,
        chat: chatSlice,
        order: orderSlice,
        manageAccount: manageAccountSlice,
        notification: notificationSlice,
        toast: toastReducer,
        schedule:scheduleSlice
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
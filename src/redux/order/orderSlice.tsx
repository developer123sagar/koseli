import { createSlice } from "@reduxjs/toolkit";

const initialState={
    totalOrders:0,
}


export const orderSlice=createSlice({
    name:"order",
    initialState,
    reducers:{
        changeOrderNumber:(state,action)=>{
            state.totalOrders=action.payload;
        }
    }
})

export const {changeOrderNumber} = orderSlice.actions

export default orderSlice.reducer
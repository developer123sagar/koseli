import { createSlice } from "@reduxjs/toolkit";

const initialState={
    day:"",
    time:""
}

export const scheduleSlice=createSlice({
    name:"order",
    initialState,
    reducers:{
        changeDay:(state,action)=>{
            state.day=action.payload;
        },
        changeTime:(state,action)=>{
            state.time=action.payload;
        }
    }
})

export const {changeDay, changeTime} = scheduleSlice.actions

export default scheduleSlice.reducer
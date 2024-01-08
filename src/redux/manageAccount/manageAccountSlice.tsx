import { createSlice } from "@reduxjs/toolkit";

const initialState={
    firstTime:true,
    hasPhoneNumber:false
}


export const manageAccountSlice=createSlice({
    name:"firstTime",
    initialState,
    reducers:{
        changeFirstTime:(state,action)=>{
            state.firstTime=action.payload;
        },
        changeHasPhoneNumber:(state,action)=>{
            state.hasPhoneNumber=action.payload;
        }
    }
})

export const {changeFirstTime,changeHasPhoneNumber} = manageAccountSlice.actions

export default manageAccountSlice.reducer
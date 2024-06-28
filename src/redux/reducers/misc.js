import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isProfile: false,
    isResettingPassword : false,
    secretQ:undefined,
}

const miscSlice = createSlice({
    name: "misc",
    initialState,
    reducers: {
        setIsProfile: (state, action) => {
            state.isProfile = action.payload;
        },
        setIsResettingPassword:(state, action)=>{
            state.isResettingPassword = action.payload;
        },
        setSecretQuestion:(state,action)=>{
            state.secretQ = action.payload;
        }
    }
});

export default miscSlice;
export const { 
    setIsProfile,
    setIsResettingPassword,
    setSecretQuestion
} = miscSlice.actions;

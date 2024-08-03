import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isProfile: false,
    isResettingPassword : false,
    secretQuestion: undefined,
    email: undefined,
    role: undefined
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
            state.secretQuestion = action.payload;
        },
        setEmail:(state, action)=>{
            state.email = action.payload;
        },
        setRole: (state, action) => {
            state.role = action.payload;
        }
    }
});

export default miscSlice;
export const { 
    setIsProfile,
    setIsResettingPassword,
    setSecretQuestion,
    setEmail,
    setRole
} = miscSlice.actions;
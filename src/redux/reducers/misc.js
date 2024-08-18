import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isProfile: false,
    isResettingPassword : false,
    isDropDown: false,
    isPopUp: false,
    secretQuestion: undefined,
    email: undefined,
    role: undefined,
    url: ""
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
        },
        setIsPopUp: (state, action) => {
            state.isPopUp = action.payload;
        },
        setIsDropDown: (state, action) => {
            state.isDropDown = action.payload;
        },
        setURL: (state, action) => {
            state.url = action.payload;
        }
    }
});

export default miscSlice;
export const { 
    setIsProfile,
    setIsResettingPassword,
    setSecretQuestion,
    setEmail,
    setRole,
    setIsPopUp,
    setIsDropDown,
    setURL
} = miscSlice.actions;
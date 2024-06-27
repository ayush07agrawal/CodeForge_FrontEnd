import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isProfile: false,
}

const miscSlice = createSlice({
    name: "misc",
    initialState,
    reducers: {
        setIsProfile: (state, action) => {
            state.isProfile = action.payload;
        },
        
    }
});

export default miscSlice;
export const { 
    setIsProfile,
} = miscSlice.actions;

import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    userData: {},
};

export const docSlice = createSlice({
  name: "doc",
  initialState,
  reducers: {
    addUserData: (state, action) => {
        state.userData = action.payload
    },
    // removeUserData: (state, action) => {
    //     state.userData = {}
    // }
  },
});

export const { addUserData, removeUserData } = docSlice.actions;

export default docSlice.reducer;
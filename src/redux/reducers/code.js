import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    logs: [],
    codes: [],
};

export const codeSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    GET_LOGS_SUCCESS: (state, action) => {
      const logs= action.payload;
      state.logs = logs;
    },

    GET_CODES_SUCCESS: (state, action) => {
      const codes= action.payload;
      state.codes = codes;
    },
   
  },
});

export const {
  GET_LOGS_SUCCESS,
  GET_CODES_SUCCESS
} = codeSlice.actions;

export default codeSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  // session: sessionStorage.getItem('session') ? sessionStorage.getItem('session') === 'true' : false,
  session:false,
  role: 0,
  successRegister: false,
  error_message: null,
  loading: false
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_AUTH_LOADING: (state) => {
      state.loading = true;
    },
    REMOVE_AUTH_LOADING: (state) => {
      state.loading = false;
    },
    REMOVE_ERROR_MESSAGE: (state) => {
      state.error_message = null;
    },

    LOGIN_SUCCESS: (state, action) => {
      const { session, user} = action.payload;
      sessionStorage.setItem('session', session);
      state.user = user;
      state.session = session;
      state.role = user.rol;
      state.error_message = null;
    },
    REGISTER_SUCCESS: (state, action) => {
      const { success} = action.payload;
      state.error_message = null;
      state.successRegister = success;
    },

    REFRESH_SESSION_SUCCESS: (state, action) => {
      const { session, user} = action.payload;
      sessionStorage.setItem('session', session);
      state.user = user;
      state.session = session;
      state.role = user.rol;
      state.error_message = null;
    },

    REGISTER_FAIL: (state, action) => {
      state.error_message = action.payload;
      state.session = false;

    },

    LOGIN_FAIL: (state, action) => {
      state.error_message = action.payload;
      sessionStorage.removeItem('session');
      state.session = false;
      state.user = null;
      state.role = 0;
      state.loading = false;

    },

    LOGOUT: (state) => {
      sessionStorage.removeItem('session');
      localStorage.removeItem('session');
      state.session = false;
      state.user = null;
      state.role = 0;
      state.loading = false;
      state.error_message = null;
      state.error_message = null;
    },
  },
});

export const {
  SET_AUTH_LOADING,
  REMOVE_AUTH_LOADING,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  REFRESH_SESSION_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  REMOVE_ERROR_MESSAGE
} = authSlice.actions;

export default authSlice.reducer;

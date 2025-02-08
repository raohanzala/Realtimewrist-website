import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  userData : null,
  isLoggedIn : false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, { payload }) => { 
      state.userData = {name : payload.name, email : payload.email }
      state.token = payload.token;
      state.isLoggedIn = true
    },
    logout: (state) => {
      state.userData = initialState.userData,
      state.token = initialState.token,
      state.isLoggedIn = initialState.isLoggedIn
    },
    updateUserData : (state, {payload})=> {
      state.userData = payload
    }
  },
});

export const { login, logout, updateUserData } = userSlice.actions;

export default userSlice.reducer;

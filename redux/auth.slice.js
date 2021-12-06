import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "authUser",
  initialState: { isLoggedIn: false, userName: "" },
  reducers: {
    setUserLoggedIn: (state, action) => {
      state = action.payload;
      return state;
    },
    logoutUser: (state, action) => {
      state = {
        isLoggedIn: false,
        userName: "",
      };
      return state;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { setUserLoggedIn, logoutUser } = authSlice.actions;

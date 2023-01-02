import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ACCESS_TOKEN_KEY } from "../../Components/constants/consts";
import { RegisterUserPayload } from "../Types/auth";

const initialState = {
  isLoggedIn: !!localStorage.getItem(ACCESS_TOKEN_KEY),
  userName: "",
};

const authSlice = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    registerUser: (state, action: PayloadAction<RegisterUserPayload>) => {},

    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    getUserName: (state, action: PayloadAction<undefined>) => {},
    setUserName: (state, action: PayloadAction<any>) => {
      state.userName = action.payload;
    },
    logoutUser: (state, action: PayloadAction<undefined>) => {},
  },
});
export const {
  registerUser,

  setLoggedIn,
} = authSlice.actions;
const authReducer = authSlice.reducer;

export default authReducer;
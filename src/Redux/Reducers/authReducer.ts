import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ACCESS_TOKEN_KEY } from "../../Components/constants/consts";
import {
  ActivateUserPayload,
  RegisterUserPayload,
  SendResetEmailPayload,
  SignInUserPayload,
  ResetPasswordConfirmPayload,
} from "../Types/auth";

const initialState = {
  isLoggedIn: !!localStorage.getItem(ACCESS_TOKEN_KEY),
  userName: "",
};

const authSlice = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    registerUser: (state, action: PayloadAction<RegisterUserPayload>) => {},
    activateUser: (state, action: PayloadAction<ActivateUserPayload>) => {},
    signInUser: (state, action: PayloadAction<SignInUserPayload>) => {},
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    getUserName: (state, action: PayloadAction<undefined>) => {},
    setUserName: (state, action: PayloadAction<any>) => {
      state.userName = action.payload;
    },
    logoutUser: (state, action: PayloadAction<undefined>) => {},
    sendResetEmail: (state, action: PayloadAction<SendResetEmailPayload>) => {},
    resetPasswordConfirm: (
      state,
      action: PayloadAction<ResetPasswordConfirmPayload>
    ) => {},
  },
});
export const {
  registerUser,
  sendResetEmail,
  resetPasswordConfirm,
  signInUser,
  setLoggedIn,
  activateUser,
  logoutUser,
} = authSlice.actions;
const authReducer = authSlice.reducer;

export default authReducer;

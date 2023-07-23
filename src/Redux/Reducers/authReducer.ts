import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ACCESS_TOKEN_KEY } from '../../Components/constants/consts';
import {
  ActivateUserPayload,
  RegisterHeadPayload,
  RegisterPoPayload,
  RegisterUserPayload,
  ResetPasswordConfirmPayload,
  SendResetEmailPayload,
  SignInUserPayload
} from '../Types/auth';
import { PersonalInfoData } from '../Types/profile';

type authReducerState = {
  idUser: number;
  isLoggedIn: boolean;
  userName: string;
  userInfo: PersonalInfoData | null;
};
const initialState: authReducerState = {
  isLoggedIn: !!localStorage.getItem(ACCESS_TOKEN_KEY) || !!sessionStorage.getItem(ACCESS_TOKEN_KEY),
  userName: '',
  idUser: 0,
  userInfo: null
};

const authSlice = createSlice({
  name: 'authReducer',
  initialState,
  reducers: {
    registerUser: (state, action: PayloadAction<RegisterUserPayload>) => {},
    setIdUser: (state, action: PayloadAction<number>) => {
      state.idUser = action.payload;
    },
    registerHeadInfo: (state, action: PayloadAction<RegisterHeadPayload>) => {},
    registerPoInfo: (state, action: PayloadAction<RegisterPoPayload>) => {},
    activateUser: (state, action: PayloadAction<ActivateUserPayload>) => {},
    signInUser: (state, action: PayloadAction<SignInUserPayload>) => {},
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    getUserName: (state, action: PayloadAction<undefined>) => {},
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    logoutUser: (state, action: PayloadAction<undefined>) => {},
    sendResetEmail: (state, action: PayloadAction<SendResetEmailPayload>) => {},
    resetPasswordConfirm: (state, action: PayloadAction<ResetPasswordConfirmPayload>) => {},
    getUserInfoWithId: (state, action: PayloadAction<number>) => {},
    setUserInfoWithId: (state, action: PayloadAction<PersonalInfoData>) => {
      state.userInfo = action.payload;
    }
  }
});
export const {
  registerUser,
  setIdUser,
  registerHeadInfo,
  registerPoInfo,
  sendResetEmail,
  resetPasswordConfirm,
  signInUser,
  setLoggedIn,
  activateUser,
  logoutUser,
  getUserName,
  setUserName,
  getUserInfoWithId,
  setUserInfoWithId
} = authSlice.actions;
const authReducer = authSlice.reducer;

export default authReducer;

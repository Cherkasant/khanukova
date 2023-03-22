import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ACCESS_TOKEN_KEY } from '../../Components/constants/consts'
import {
  ActivateUserPayload,
  RegisterHeadPayload,
  RegisterPoPayload,
  RegisterUserPayload,
  ResetPasswordConfirmPayload,
  SendResetEmailPayload,
  SignInUserPayload
} from '../Types/auth'

type authReducerState = {
  idUser: number
  isLoggedIn: boolean
  userName: string
}
const initialState: authReducerState = {
  isLoggedIn: !!localStorage.getItem(ACCESS_TOKEN_KEY),
  userName: '',
  idUser: 0
}

const authSlice = createSlice({
  name: 'authReducer',
  initialState,
  reducers: {
    registerUser: (state, action: PayloadAction<RegisterUserPayload>) => {},
    setIdUser: (state, action: PayloadAction<number>) => {
      state.idUser = action.payload
    },
    registerHeadInfo: (state, action: PayloadAction<RegisterHeadPayload>) => {},
    registerPoInfo: (state, action: PayloadAction<RegisterPoPayload>) => {},
    activateUser: (state, action: PayloadAction<ActivateUserPayload>) => {},
    signInUser: (state, action: PayloadAction<SignInUserPayload>) => {},
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload
    },
    getUserName: (state, action: PayloadAction<undefined>) => {},
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload
    },
    logoutUser: (state, action: PayloadAction<undefined>) => {},
    sendResetEmail: (state, action: PayloadAction<SendResetEmailPayload>) => {},
    resetPasswordConfirm: (state, action: PayloadAction<ResetPasswordConfirmPayload>) => {}
  }
})
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
  setUserName
} = authSlice.actions
const authReducer = authSlice.reducer

export default authReducer

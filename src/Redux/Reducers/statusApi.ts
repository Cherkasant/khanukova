import { createSlice } from '@reduxjs/toolkit';

type initialStateType = {
  statusRegisterUser: string;
  statusSignIn: string;
  statusRequestPassword: string;
  statusSignUpPoInfo: string;
  statusSignUpHeadInfo: string;
};

const initialState: initialStateType = {
  statusRegisterUser: '',
  statusSignIn: '',
  statusRequestPassword: '',
  statusSignUpPoInfo: '',
  statusSignUpHeadInfo: ''
};

const statusSlice = createSlice({
  name: 'statusApi',
  initialState,
  reducers: {
    setSignUpStatusUser: (state, actions) => {
      state.statusRegisterUser = actions.payload;
    },

    setSignInStatusUser: (state, actions) => {
      state.statusSignIn = actions.payload;
    },

    setStatusRequestPassword: (state, actions) => {
      state.statusRequestPassword = actions.payload;
    },
    setStatusSignUpPoInfo: (state, actions) => {
      state.statusSignUpPoInfo = actions.payload;
    },
    setStatusSignUpHeadInfo: (state, actions) => {
      state.statusSignUpHeadInfo = actions.payload;
    }
  }
});

export const {
  setSignUpStatusUser,
  setSignInStatusUser,
  setStatusRequestPassword,
  setStatusSignUpPoInfo,
  setStatusSignUpHeadInfo
} = statusSlice.actions;

export default statusSlice.reducer;

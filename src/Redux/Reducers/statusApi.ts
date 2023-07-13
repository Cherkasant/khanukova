import { createSlice } from '@reduxjs/toolkit';

type initialStateType = {
  statusRegisterUser: string;
  statusSignIn: string;
  statusRequestPassword: string;
};

const initialState: initialStateType = {
  statusRegisterUser: '',
  statusSignIn: '',
  statusRequestPassword: ''
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
    }
  }
});

export const { setSignUpStatusUser, setSignInStatusUser, setStatusRequestPassword } = statusSlice.actions;

export default statusSlice.reducer;

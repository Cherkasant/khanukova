import { RootState } from '../store';

export default {
  statusSignIn: (state: RootState) => state.statusApi.statusSignIn,
  statusRequestPass: (state: RootState) => state.statusApi.statusRequestPassword,
  statusSignUp: (state: RootState) => state.statusApi.statusRegisterUser
};

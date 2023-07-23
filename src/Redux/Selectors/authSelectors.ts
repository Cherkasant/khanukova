import { RootState } from '../store';

export default {
  getLoggedIn: (state: RootState) => state.authReducer.isLoggedIn,
  getUserId: (state: RootState) => state.authReducer.idUser,
  getUserName: (state: RootState) => state.authReducer.userName,
  getUserWithId: (state: RootState) => state.authReducer.userInfo
};

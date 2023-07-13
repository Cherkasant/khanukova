import { ApiResponse } from 'apisauce';
import { call, put } from 'redux-saga/effects';

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../../Components/constants/consts';
import { logoutUser } from '../Reducers/authReducer';
import API from '../Utils/api';

type AnyResponse = ApiResponse<any>;

export default function* callCheckingAuth(api: any, ...rest: any) {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY) || sessionStorage.getItem(ACCESS_TOKEN_KEY) || '';
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY) || sessionStorage.getItem(REFRESH_TOKEN_KEY) || '';
  const response: AnyResponse = yield call(api, accessToken, ...rest);
  if (response.status === 401) {
    const { status: accessStatus } = yield call(API.verifyToken, accessToken);
    if (accessStatus === 401) {
      const { status: refreshStatus } = yield call(API.verifyToken, refreshToken);
      if (refreshStatus === 200) {
        const { ok, data } = yield call(API.getNewAccessToken, refreshToken);
        if (ok && data) {
          const { access: newAccessToken } = data;
          localStorage.setItem(ACCESS_TOKEN_KEY, newAccessToken);
          const newResponse: AnyResponse = yield call(api, newAccessToken, ...rest);
          return newResponse;
        } else {
          yield put(logoutUser());
        }
      } else {
        yield put(logoutUser());
      }
    } else {
      return response;
    }
  } else {
    return response;
  }
  return response;
}

import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../../Components/constants/consts';
import {
  setSignInStatusUser,
  setSignUpStatusUser,
  setStatusRequestPassword,
  setStatusSignUpHeadInfo,
  setStatusSignUpPoInfo
} from '../Reducers/statusApi';

import {
  activateUser,
  getUserName,
  logoutUser,
  registerHeadInfo,
  registerPoInfo,
  registerUser,
  resetPasswordConfirm,
  sendResetEmail,
  setIdUser,
  setLoggedIn,
  setUserName,
  signInUser
} from '../Reducers/authReducer';
import {
  ActivateUserPayload,
  RegisterHeadPayload,
  RegisterPoPayload,
  RegisterUserPayload,
  ResetPasswordConfirmPayload,
  SendResetEmailPayload,
  SignInUserPayload
} from '../Types/auth';
import API from '../Utils/api';

import callCheckingAuth from './callCheckingAuth';

function* registerUserWorker(action: PayloadAction<RegisterUserPayload>) {
  yield put(setSignUpStatusUser('pending'));
  const { data: registerData, callback } = action.payload;
  const { ok, data } = yield call(API.registerUser, registerData);
  if (ok && data) {
    callback();
    yield put(setIdUser(data.id));
    yield put(setSignUpStatusUser('fullfilled'));
  } else {
    toast.error(`${data?.code[0]} code`);
    yield put(setSignUpStatusUser('regected'));
  }
}

function* registerHeadInfoWorker(action: PayloadAction<RegisterHeadPayload>) {
  yield put(setStatusSignUpHeadInfo('pending'));
  const { data: registerHeadData, callback } = action.payload;
  const { ok } = yield call(API.registerHeadInfo, registerHeadData);
  if (ok) {
    callback();
    yield put(setStatusSignUpHeadInfo('fullfilled'));
  } else {
    yield put(setStatusSignUpHeadInfo('regected'));
    toast.error('Error while registering Head info');
  }
}

function* registerPoInfoWorker(action: PayloadAction<RegisterPoPayload>) {
  yield put(setStatusSignUpPoInfo('pending'));
  const { data: registerPoData, callback } = action.payload;
  const { ok } = yield call(API.registerPoInfo, registerPoData);
  yield put(setStatusSignUpPoInfo('fullfilled'));
  if (ok) {
    callback();
  } else {
    toast.error('Error while registering PO info');
    yield put(setStatusSignUpPoInfo('regected'));
  }
}

function* sendResetEmailWorker(action: PayloadAction<SendResetEmailPayload>) {
  yield put(setStatusRequestPassword('pending'));
  const { email, callback } = action.payload;
  const { ok, data } = yield call(API.sendResetEmail, email);
  if (ok) {
    callback();
    yield put(setStatusRequestPassword('fullfilled'));
  } else {
    data ? toast.error(data[0]) : toast.error('Error while sending reset email');
    yield put(setStatusRequestPassword('regected'));
  }
}

function* resetPasswordConfirmWorker(action: PayloadAction<ResetPasswordConfirmPayload>) {
  const { data, callback } = action.payload;
  const { ok, problem } = yield call(API.resetPasswordConfirm, data);
  if (ok) {
    callback();
  } else {
    console.warn('Error while sending reset password', problem);
  }
}

function* activateUserWorker(action: PayloadAction<ActivateUserPayload>) {
  const { data: activateData, callback } = action.payload;
  const { ok, problem } = yield call(API.activateUser, activateData);
  if (ok) {
    callback();
  } else {
    console.warn('Error while activating user', problem);
  }
}

function* signInUserWorker(action: PayloadAction<SignInUserPayload>) {
  yield put(setSignInStatusUser('pending'));
  const { data: SignInUserData, callback, rememberPassword } = action.payload;
  const { ok, data } = yield call(API.signInUser, SignInUserData);
  if (ok) {
    rememberPassword
      ? localStorage.setItem(ACCESS_TOKEN_KEY, data?.access)
      : sessionStorage.setItem(ACCESS_TOKEN_KEY, data?.access);
    rememberPassword
      ? localStorage.setItem(REFRESH_TOKEN_KEY, data?.refresh)
      : sessionStorage.setItem(REFRESH_TOKEN_KEY, data?.refresh);
    yield put(setLoggedIn(true));
    callback();
    yield put(setSignInStatusUser('fullfilled'));
  } else if (data) {
    yield put(setSignInStatusUser('regected'));
    data.detail ? toast.error(data.detail) : toast.error('Error while sign in user');
  } else {
    yield put(setSignInStatusUser('regected'));
    toast.error('Error while sign in user');
  }
}

function* logOutUserWorker() {
  yield put(setLoggedIn(false));
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  sessionStorage.removeItem(REFRESH_TOKEN_KEY);
}

function* getUserNameWorker() {
  const { ok, data, problem } = yield callCheckingAuth(API.getUserName);
  if (ok && data) {
    yield put(setUserName(data.full_name));
    yield put(setIdUser(data.id));
  } else {
    console.warn('Error while fetching username: ', problem);
  }
}

export default function* authSagaWatcher() {
  yield all([
    takeLatest(registerUser, registerUserWorker),
    takeLatest(registerHeadInfo, registerHeadInfoWorker),
    takeLatest(registerPoInfo, registerPoInfoWorker),
    takeLatest(sendResetEmail, sendResetEmailWorker),
    takeLatest(resetPasswordConfirm, resetPasswordConfirmWorker),
    takeLatest(signInUser, signInUserWorker),
    takeLatest(activateUser, activateUserWorker),
    takeLatest(logoutUser, logOutUserWorker),
    takeLatest(getUserName, getUserNameWorker)
  ]);
}

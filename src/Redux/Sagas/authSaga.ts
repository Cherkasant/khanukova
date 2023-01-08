import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  activateUser,
  registerUser,
  sendResetEmail,
  setLoggedIn,
  signInUser,
} from "../Reducers/authReducer";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  ActivateUserPayload,
  RegisterUserPayload,
  SendResetEmailPayload,
  SignInUserPayload,
} from "../Types/auth";
import API from "../Utils/api";
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
} from "../../Components/constants/consts";

function* registerUserWorker(action: PayloadAction<RegisterUserPayload>) {
  const { data: registerData, callback } = action.payload;
  const { ok, problem } = yield call(API.registerUser, registerData);
  if (ok) {
    callback();
  } else {
    console.warn("Error while registering user", problem);
  }
}

function* sendResetEmailWorker(action: PayloadAction<SendResetEmailPayload>) {
  const { email, callback } = action.payload;
  const { ok, problem } = yield call(API.sendResetEmail, email);
  if (ok) {
    callback();
  } else {
    console.warn("Error while sending reset email", problem);
  }
}

function* activateUserWorker(action: PayloadAction<ActivateUserPayload>) {
  const { data: activateData, callback } = action.payload;
  const { ok, problem } = yield call(API.activateUser, activateData);
  if (ok) {
    callback();
  } else {
    console.warn("Error while activating user", problem);
  }
}

function* signInUserWorker(action: PayloadAction<SignInUserPayload>) {
  const { data: SignInUserData, callback } = action.payload;
  const { ok, problem, data } = yield call(API.signInUser, SignInUserData);
  if (ok) {
    localStorage.setItem(ACCESS_TOKEN_KEY, data?.access);
    localStorage.setItem(REFRESH_TOKEN_KEY, data?.refresh);
    yield put(setLoggedIn(true));
    callback();
  } else {
    console.warn("Error while sign in user", problem);
  }
}

export default function* authSagaWatcher() {
  yield all([
    takeLatest(registerUser, registerUserWorker),
    takeLatest(sendResetEmail, sendResetEmailWorker),
    takeLatest(signInUser, signInUserWorker),
    takeLatest(activateUser, activateUserWorker),
  ]);
}

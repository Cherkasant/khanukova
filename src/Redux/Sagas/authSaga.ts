import { all, call, takeLatest } from "redux-saga/effects";
import { registerUser, sendResetEmail } from "../Reducers/authReducer";
import { PayloadAction } from "@reduxjs/toolkit";
import { RegisterUserPayload, SendResetEmailPayload } from "../Types/auth";
import API from "../Utils/api";

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

export default function* authSagaWatcher() {
  yield all([
    takeLatest(registerUser, registerUserWorker),
    takeLatest(sendResetEmail, sendResetEmailWorker),
  ]);
}

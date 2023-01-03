import { all, call, takeLatest } from "redux-saga/effects";
import { registerUser } from "../Reducers/authReducer";
import { PayloadAction } from "@reduxjs/toolkit";
import { RegisterUserPayload } from "../Types/auth";
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

export default function* authSagaWatcher() {
  yield all([takeLatest(registerUser, registerUserWorker)]);
}

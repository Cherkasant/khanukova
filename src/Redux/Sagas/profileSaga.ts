import { all, call, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import API from "../Utils/api";
import {
  getHeadCompanyListReducer,
  getPoCompanyListReducer,
  setHeadCompanyListReducer,
  setPoCompanyListReducer,
} from "../Reducers/profileReducer";

function* getHeadCompanyListWorker(action: PayloadAction<undefined>) {
  const { ok, data, problem } = yield call(API.getHeadCompanyList);
  if (ok && data) {
    console.log(data.results[0]);
    yield put(setHeadCompanyListReducer(data.results[0]));
  } else {
    console.warn("Authentication credentials were not provided", problem);
  }
}

function* getPoCompanyListWorker(action: PayloadAction<undefined>) {
  const { ok, data, problem } = yield call(API.getPoCompanyList);

  if (ok && data) {
    yield put(setPoCompanyListReducer(data));
  } else {
    console.warn("Authentication credentials were not provided", problem);
  }
}

export default function* profileSaga() {
  yield all([
    takeLatest(getPoCompanyListReducer, getPoCompanyListWorker),
    takeLatest(getHeadCompanyListReducer, getHeadCompanyListWorker),
  ]);
}

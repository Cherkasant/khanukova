import {all, call, put, takeLatest} from "redux-saga/effects";
import {PayloadAction} from "@reduxjs/toolkit";
import API from "../Utils/api";
import {
  getECaseListReducer,
  getHeadCompanyListReducer,
  setECaseListReducer,
  setHeadCompanyListReducer,
} from "../Reducers/profileReducer";

// function* getPoCompanyListWorker(action: PayloadAction<undefined>) {
//   const { ok, data, problem } = yield call(API.getPoCompanyList);
//
//   if (ok && data) {
//     yield put(setPoCompanyListReducer(data));
//   } else {
//     console.warn("Authentication credentials were not provided", problem);
//   }
// }

function* getHeadCompanyListWorker(action: PayloadAction<undefined>) {
  const { ok, data, problem } = yield call(API.getHeadCompanyList);
  console.log(data);
  if (ok && data) {
    yield put(setHeadCompanyListReducer(data.results[0]));
  } else {
    console.warn("Authentication credentials were not provided", problem);
  }
}

function* getECaseListWorker(action: PayloadAction<undefined>) {
  const { ok, data, problem } = yield call(API.getECaseList);
  if (ok && data) {
    yield put(setECaseListReducer(data.results[0]));
  } else {
    console.warn("Authentication credentials were not provided", problem);
  }
}

export default function* profileSaga() {
  yield all([
    takeLatest(getHeadCompanyListReducer, getHeadCompanyListWorker),
    takeLatest(getECaseListReducer, getECaseListWorker),
    // takeLatest(getPoCompanyListReducer, getPoCompanyListWorker),
  ]);
}

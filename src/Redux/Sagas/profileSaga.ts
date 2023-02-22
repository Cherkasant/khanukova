import { all, call, takeLatest, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import API from "../Utils/api";
import { getHeadCompanyListReducer, setHeadCompanyListReducer, getPoCompanyListReducer, setPoCompanyListReducer } from "../Reducers/profileReducer"

function* getHeadCompanyListWorker(action: PayloadAction<undefined>) {
   const { ok, data, problem } = yield call(API.getHeadCompanyList);
   console.log(data)
   if (ok && data) {
      yield put(setHeadCompanyListReducer(data));
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
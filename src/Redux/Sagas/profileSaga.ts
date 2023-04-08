import { PayloadAction } from '@reduxjs/toolkit';
import { all, put, takeLatest } from 'redux-saga/effects';

import {
  editHeadCompanyListReducer,
  getECaseListReducer,
  getGeneratePassword,
  getHeadCompanyListReducer,
  getPersonalInfoReducer,
  setECaseListReducer,
  setGeneratePassword,
  setHeadCompanyListReducer,
  setPersonalInfoReducer
} from '../Reducers/profileReducer';
import { EditCompanyListPayload } from '../Types/profile';
import API from '../Utils/api';
import callCheckingAuth from './callCheckingAuth';

function* getHeadCompanyListWorker() {
  const { ok, data, problem } = yield callCheckingAuth(API.getHeadCompanyList);
  if (ok && data) {
    yield put(setHeadCompanyListReducer(data.results[0]));
  } else {
    console.warn('Authentication credentials were not provided', problem);
  }
}

function* getPersonalInfoListWorker() {
  const { ok, data, problem } = yield callCheckingAuth(API.getUserName);
  if (ok && data) {
    yield put(setPersonalInfoReducer(data));
  } else {
    console.warn('Authentication credentials were not provided', problem);
  }
}

function* getECaseListWorker() {
  const { ok, data, problem } = yield callCheckingAuth(API.getECaseList);
  if (ok && data) {
    yield put(setECaseListReducer(data.results[0]));
  } else {
    console.warn('Authentication credentials were not provided', problem);
  }
}

function* editHeadCompanyListWorker(action: PayloadAction<EditCompanyListPayload>) {
  const { callback, id } = action.payload;
  const { ok, problem } = yield callCheckingAuth(API.editHeadCompanyList, id);
  if (ok) {
    callback();
  } else {
    console.warn('Error editing list', problem);
  }
}

function* getGeneratePasswordWorker() {
  const { ok, data, problem } = yield callCheckingAuth(API.getGeneratePassword);
  if (ok && data) {
    yield put(setGeneratePassword(data));
  } else {
    console.warn('Error while generate password', problem);
  }
}

export default function* profileSaga() {
  yield all([
    takeLatest(getHeadCompanyListReducer, getHeadCompanyListWorker),
    takeLatest(getECaseListReducer, getECaseListWorker),
    takeLatest(editHeadCompanyListReducer, editHeadCompanyListWorker),
    takeLatest(getPersonalInfoReducer, getPersonalInfoListWorker),
    takeLatest(getGeneratePassword, getGeneratePasswordWorker)
  ]);
}

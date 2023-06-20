import { PayloadAction } from '@reduxjs/toolkit';
import { all, put, takeLatest } from 'redux-saga/effects';

import {
  editHeadCompanyListReducer,
  editPersonalInfo,
  getAllDevTeamEmployees,
  getECaseListReducer,
  getGeneratePassword,
  getHeadCompanyListReducer,
  getPersonalInfoReducer,
  setAllDevTeamEmployees,
  setECaseListReducer,
  setGeneratePassword,
  setHeadCompanyListReducer,
  setPersonalInfoReducer
} from '../Reducers/profileReducer';
import { EditCompanyListPayload, EditPersonalType } from '../Types/profile';
import API from '../Utils/api';

import callCheckingAuth from './callCheckingAuth';

function* getHeadCompanyListWorker() {
  const { ok, data, problem } = yield callCheckingAuth(API.getHeadCompanyList);
  if (ok && data) {
    yield put(setHeadCompanyListReducer(data[0]));
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
    yield put(setECaseListReducer(data[0]));
    console.log(data);
  } else {
    console.warn('Authentication credentials were not provided', problem);
  }
}

function* editHeadCompanyListWorker(action: PayloadAction<EditCompanyListPayload>) {
  const { data, callback, id } = action.payload;
  const { ok, problem } = yield callCheckingAuth(API.editHeadCompanyList, id, data);
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

function* getAllDevTeamEmployeesWorker() {
  const { ok, data, problem } = yield callCheckingAuth(API.getAllDevTeamEmployees);
  if (ok && data) {
    yield put(setAllDevTeamEmployees(data));
  } else {
    console.warn('Error while getting employees', problem);
  }
}

function* editPersonalInfoWorker(action: PayloadAction<EditPersonalType>) {
  const { data, callback } = action.payload;
  const { ok, problem } = yield callCheckingAuth(API.patchUserInfo, data);
  if (ok) {
    callback();
  } else {
    console.warn('Error editing personal info', problem);
  }
}

export default function* profileSaga() {
  yield all([
    takeLatest(getHeadCompanyListReducer, getHeadCompanyListWorker),
    takeLatest(getECaseListReducer, getECaseListWorker),
    takeLatest(editHeadCompanyListReducer, editHeadCompanyListWorker),
    takeLatest(getPersonalInfoReducer, getPersonalInfoListWorker),
    takeLatest(getGeneratePassword, getGeneratePasswordWorker),
    takeLatest(getAllDevTeamEmployees, getAllDevTeamEmployeesWorker),
    takeLatest(editPersonalInfo, editPersonalInfoWorker)
  ]);
}

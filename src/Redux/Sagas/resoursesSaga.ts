import { PayloadAction } from '@reduxjs/toolkit';
import { all, put, takeLatest } from 'redux-saga/effects';

import { ResoursesTypePayload } from '../Types/Resourses';
import {
  deleteResourses,
  editResourses,
  getResourses,
  postResourses,
  setResourses,
  setStatusResourses,
  setstatusAddResourses,
  setstatusDeleteResourses,
  setstatusEditResourses
} from '../Reducers/ResoursesReducer';

import API from '../Utils/api';

import callCheckingAuth from './callCheckingAuth';

function* getResoursesWorker(actions: PayloadAction<string>) {
  yield put(setStatusResourses('pending'));
  const { ok, data, problem } = yield callCheckingAuth(API.getResourses, actions.payload);
  if (ok && data) {
    yield put(setStatusResourses('fullfilled'));
    yield put(setResourses(data));
  } else {
    yield put(setStatusResourses('regected'));
    console.warn('Authentication credentials were not provided', problem);
  }
}

function* postResoursesWorker(actions: PayloadAction<ResoursesTypePayload>) {
  yield put(setstatusAddResourses('pending'));
  const { data: dataResourses, id } = actions.payload;
  const { ok, data, problem } = yield callCheckingAuth(API.postResourses, dataResourses, id);
  if (ok && data) {
    yield put(setstatusAddResourses('fullfilled'));
    console.log(data);
  } else {
    yield put(setstatusAddResourses('regected'));
    console.warn(problem);
  }
}

function* editResoursesWorker(actions: PayloadAction<ResoursesTypePayload>) {
  yield put(setstatusEditResourses('pending'));
  const { data: dataResourses, id, idResourses } = actions.payload;
  const { ok, data, problem } = yield callCheckingAuth(API.editResourses, dataResourses, id, idResourses);
  if (ok && data) {
    yield put(setstatusEditResourses('fullfilled'));
    console.log(data);
  } else {
    yield put(setstatusEditResourses('regected'));
    console.warn('Authentication credentials were not provided', problem);
  }
}

function* deleteResoursesWorker(actions: PayloadAction<ResoursesTypePayload>) {
  yield put(setstatusDeleteResourses('pending'));
  const { id, idResourses } = actions.payload;
  const { problem, status } = yield callCheckingAuth(API.deleteResourses, id, idResourses);
  if (status === 204) {
    yield put(setstatusDeleteResourses('fullfilled'));
  } else {
    yield put(setstatusDeleteResourses('regected'));
    console.warn('Authentication credentials were not provided', problem);
  }
}

export default function* resoursesSaga() {
  yield all([takeLatest(postResourses, postResoursesWorker)]);
  yield all([takeLatest(getResourses, getResoursesWorker)]);
  yield all([takeLatest(editResourses, editResoursesWorker)]);
  yield all([takeLatest(deleteResourses, deleteResoursesWorker)]);
}

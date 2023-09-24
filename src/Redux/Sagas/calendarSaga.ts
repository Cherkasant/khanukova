import { all, put, takeLatest } from 'redux-saga/effects';

import { PayloadAction } from '@reduxjs/toolkit';

import API from '../Utils/apiCalendar';

import { postCalendar, setCalendar } from '../Reducers/calendarReducer';

import { ProjectIdType } from '../Types/calendar';

import callCheckingAuth from './callCheckingAuth';

function* postCalendarWorker(action: PayloadAction<ProjectIdType>) {
  const { callback } = action.payload;
  const { ok, problem, data } = yield callCheckingAuth(API.createCalendar, action.payload);
  if (ok && data) {
    yield put(setCalendar(data));
    callback();
  } else {
    console.warn('Error while posting new calendar', problem);
  }
}

export default function* calendarSaga() {
  yield all([takeLatest(postCalendar, postCalendarWorker)]);
}

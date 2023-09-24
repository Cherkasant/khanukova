import { PayloadAction } from '@reduxjs/toolkit';
import { all, takeLatest } from 'redux-saga/effects';

import API from '../Utils/apiEvents';

import { postEvent } from '../Reducers/calendarReducer';

import { PostEventType } from '../Types/calendar';

import callCheckingAuth from './callCheckingAuth';

function* postEventWorker(actions: PayloadAction<PostEventType>) {
  const { calendarId, data, callback } = actions.payload;
  const { ok, problem } = yield callCheckingAuth(API.createEvent, calendarId, data);
  if (ok) {
    callback();
  } else {
    console.warn('Error while posting new event', problem);
  }
}

export default function* eventsSaga() {
  yield all([takeLatest(postEvent, postEventWorker)]);
}

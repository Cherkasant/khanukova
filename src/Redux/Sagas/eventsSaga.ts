import { PayloadAction } from '@reduxjs/toolkit';
import { all, put, takeLatest } from 'redux-saga/effects';

import API from '../Utils/apiEvents';

import { getEvents, postEvent, setEvents } from '../Reducers/calendarReducer';

import { PostEventType } from '../Types/calendar';

import callCheckingAuth from './callCheckingAuth';

const currentDate = new Date().toISOString().replace('T', ' ').substr(0, 19);

function* postEventWorker(actions: PayloadAction<PostEventType>) {
  const { calendarId, data, callback } = actions.payload;
  const { ok, problem } = yield callCheckingAuth(API.createEvent, calendarId, data);
  if (ok) {
    callback();
  } else {
    console.warn('Error while posting new event', problem);
  }
}

function* getEventsWorker(actions: PayloadAction<string>) {
  const { ok, data, problem } = yield callCheckingAuth(API.getEvents, actions.payload, currentDate);
  if (ok && data) {
    yield put(setEvents(data));
  } else {
    console.warn('Error while posting new event', problem);
  }
}

export default function* eventsSaga() {
  yield all([takeLatest(postEvent, postEventWorker), takeLatest(getEvents, getEventsWorker)]);
}

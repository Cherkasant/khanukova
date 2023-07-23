import { all, put, takeLatest } from 'redux-saga/effects';

import { PayloadAction } from '@reduxjs/toolkit';

import {
  getAllNotifications,
  getNotifyOptions,
  patchNotifyOptions,
  setAllNotifications,
  setNotifyOptions,
  startListening
} from '../Reducers/notificationReducer';

import API from '../Utils/api';

import { PatchNotifyOptionsType } from '../Types/notification';

import callCheckingAuth from './callCheckingAuth';

export const CONNECT_SOCKET = 'CONNECT_SOCKET';
export const DISCONNECT_SOCKET = 'DISCONNECT_SOCKET';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';

export const connectSocket = () => ({
  type: CONNECT_SOCKET
});

function* startListeningNotificationWorker() {
  yield put(connectSocket());
}

function* getAllNotificationsWorker() {
  const { ok, data, problem } = yield callCheckingAuth(API.getAllNotifications);
  if (ok && data) {
    yield put(setAllNotifications(data));
  } else {
    console.warn('Error while getting notifications', problem);
  }
}

function* getNotifyOptionsWorker() {
  const { ok, data, problem } = yield callCheckingAuth(API.getNotifyOptions);
  if (ok && data) {
    yield put(setNotifyOptions(data));
  } else {
    console.warn('Error while getting notify options', problem);
  }
}

function* patchNotifyOptionsWorker(actions: PayloadAction<PatchNotifyOptionsType>) {
  const { data, callback } = actions.payload;
  const { ok, problem } = yield callCheckingAuth(API.patchNotifyOptions, data);
  if (ok) {
    callback();
  } else {
    console.warn('Error while patching notify options', problem);
  }
}

export default function* notificationSaga() {
  yield all([
    takeLatest(startListening, startListeningNotificationWorker),
    takeLatest(getAllNotifications, getAllNotificationsWorker),
    takeLatest(getNotifyOptions, getNotifyOptionsWorker),
    takeLatest(patchNotifyOptions, patchNotifyOptionsWorker)
  ]);
}

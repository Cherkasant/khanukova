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

import { ACCESS_TOKEN_KEY } from '../../Components/constants/consts';

import callCheckingAuth from './callCheckingAuth';

export const socket = new WebSocket('wss://apipuzzle-be.herokuapp.com/ws/');
export const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY) || sessionStorage.getItem(ACCESS_TOKEN_KEY) || '';

function* startListeningNotificationWorker() {}

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

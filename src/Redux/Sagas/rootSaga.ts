import { all } from 'redux-saga/effects';

import authSagaWatcher from './authSaga';
import postSaga from './postSaga';
import profileSaga from './profileSaga';
import resoursesSaga from './resoursesSaga';
import commentsSaga from './commentsSaga';
import chatSaga from './chatSaga';
import notificationSaga from './notificationSaga';
import eventsSaga from './eventsSaga';

export function* rootSaga() {
  yield all([
    authSagaWatcher(),
    profileSaga(),
    postSaga(),
    resoursesSaga(),
    commentsSaga(),
    chatSaga(),
    notificationSaga(),
    eventsSaga()
  ]);
}

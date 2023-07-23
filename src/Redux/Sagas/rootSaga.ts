import { all } from 'redux-saga/effects';

import authSagaWatcher from './authSaga';
import postSaga from './postSaga';
import profileSaga from './profileSaga';
import resoursesSaga from './resoursesSaga';
import commentsSaga from './commentsSaga';
import notificationSaga from './notificationSaga';

export function* rootSaga() {
  yield all([authSagaWatcher(), profileSaga(), postSaga(), resoursesSaga(), commentsSaga(), notificationSaga()]);
}

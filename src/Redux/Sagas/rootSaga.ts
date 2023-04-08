import { all } from 'redux-saga/effects';

import authSagaWatcher from './authSaga';
import postSaga from './postSaga';
import profileSaga from './profileSaga';

export function* rootSaga() {
  yield all([authSagaWatcher(), profileSaga(), postSaga()]);
}

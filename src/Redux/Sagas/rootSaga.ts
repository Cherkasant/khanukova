import { all } from "redux-saga/effects";
import authSagaWatcher from "./authSaga";
import profileSaga from "./profileSaga";
import postSaga from "./postSaga";

export function* rootSaga() {
  yield all([authSagaWatcher(), profileSaga(), postSaga()]);
}

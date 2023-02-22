import { profile } from "console";
import { all } from "redux-saga/effects";
import authSagaWatcher from "./authSaga";
import profileSaga from "./profileSaga";

export function* rootSaga() {
  yield all([authSagaWatcher(), profileSaga()]);
}

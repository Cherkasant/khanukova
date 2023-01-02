import { all } from "redux-saga/effects";
import authSagaWatcher from "./authSaga";

export function* rootSaga() {
  yield all([authSagaWatcher()]);
}

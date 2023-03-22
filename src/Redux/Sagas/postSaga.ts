import { all, call, put, takeLatest } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'

import API from '../Utils/api'
import { getTaskCard, postTaskCard, setTaskCard } from '../Reducers/postReducer'
import { TaskType } from '../Types/tasks'

import callCheckingAuth from './callCheckingAuth'

function* postTaskCardWorker(action: PayloadAction<TaskType>) {
  const { ...task } = action.payload
  const { ok, data, problem } = yield call(API.postMilestone, task)
  if (ok && data) {
    console.log('Success')
    yield put(setTaskCard(data))
  } else {
    console.warn('Error while posting milestone', problem)
  }
}

function* getTaskCardWorker() {
  const { ok, data, problem } = yield callCheckingAuth(API.getMilestone)
  if (ok && data) {
    console.log(data)
    yield put(setTaskCard(data))
  } else {
    console.warn('Error while getting milestone', problem)
  }
}

function* postProjectTitleWorker(action: PayloadAction<string>) {
  const title = action.payload
  const { ok, problem } = yield call(API.postProjectTitle, title)
  if (ok) {
    console.log('Success posting title')
  } else {
    console.warn('Error while posting project title', problem)
  }
}

export default function* postSaga() {
  yield all([takeLatest(getTaskCard, getTaskCardWorker)])
  yield all([takeLatest(postTaskCard, postTaskCardWorker)])
  // yield all([takeLatest(setTitleTask, postProjectTitleWorker)]);
}

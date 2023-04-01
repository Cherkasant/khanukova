import { all, put, takeLatest } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'

import API from '../Utils/api'
import {
  getAllProjects,
  getSingleProject,
  getTaskCard,
  postProject,
  postTaskCard,
  setAllProjects,
  setSingleProject,
  setTaskCard
} from '../Reducers/postReducer'
import { ProjectData, TaskType } from '../Types/tasks'

import callCheckingAuth from './callCheckingAuth'

function* postTaskCardWorker(action: PayloadAction<TaskType>) {
  const { ...task } = action.payload
  const { ok, data, problem } = yield callCheckingAuth(API.postMilestone, task)
  if (ok && data) {
    console.log('Success')
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

function* postProjectTitleWorker(action: PayloadAction<ProjectData>) {
  const { ok, problem } = yield callCheckingAuth(API.postProject, action.payload)
  if (ok) {
    console.log('Success posting title')
  } else {
    console.warn('Error while posting project title', problem)
  }
}

function* getAllProjectsWorker() {
  const { ok, data, problem } = yield callCheckingAuth(API.getAllProjects)
  if (ok && data) {
    yield put(setAllProjects(data.results))
  } else {
    console.warn('Error while getting all projects', problem)
  }
}

function* getSingleProjectWorker(action: PayloadAction<number>) {
  const { ok, data, problem } = yield callCheckingAuth(API.getSingleProject, action.payload)
  if (ok && data) {
    yield put(setSingleProject(data))
  } else {
    console.warn('Error while getting all projects', problem)
  }
}

export default function* postSaga() {
  yield all([takeLatest(getTaskCard, getTaskCardWorker)])
  yield all([takeLatest(postTaskCard, postTaskCardWorker)])
  yield all([takeLatest(getAllProjects, getAllProjectsWorker)])
  yield all([takeLatest(getSingleProject, getSingleProjectWorker)])
  yield all([takeLatest(postProject, postProjectTitleWorker)])
  // yield all([takeLatest(setTitleTask, postProjectTitleWorker)]);
}

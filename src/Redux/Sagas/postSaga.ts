import { PayloadAction } from '@reduxjs/toolkit'
import { all, put, takeLatest } from 'redux-saga/effects'

import {
  getAllMilestones,
  getAllProjects,
  getAllTasks,
  getSingleProject,
  getTaskCard,
  postProject,
  postTaskCard,
  setAllMilestones,
  setAllProjects,
  setProjectId,
  setSingleProject,
  setTaskCard,
  setTitleTask
} from '../Reducers/postReducer'
import { ProjectDataPayload, TaskType } from '../Types/tasks'
import API from '../Utils/api'
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
    yield put(setTaskCard(data))
  } else {
    console.warn('Error while getting milestone', problem)
  }
}

function* postProjectTitleWorker(action: PayloadAction<ProjectDataPayload>) {
  const { data: ProjectData, callback } = action.payload
  const { ok, data, problem } = yield callCheckingAuth(API.postProject, ProjectData)
  if (ok && data) {
    yield put(setTitleTask(data.project_name))
    yield put(setProjectId(data.id))
    callback()
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

function* getAllMilestonesWorker(action: PayloadAction<number>) {
  const { ok, data, problem } = yield callCheckingAuth(API.getAllMilestones, action.payload)
  if (ok && data) {
    yield put(setAllMilestones(data.results))
  } else {
    console.warn('Error while getting all projects', problem)
  }
}

function* getAllTasksWorker(action: PayloadAction<number>) {
  const { ok, data, problem } = yield callCheckingAuth(API.getAllTasks, action.payload)
  if (ok && data) {
    console.log(data.results)
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
  yield all([takeLatest(getAllMilestones, getAllMilestonesWorker)])
  yield all([takeLatest(getAllTasks, getAllTasksWorker)])
  // yield all([takeLatest(setTitleTask, postProjectTitleWorker)]);
}

import { PayloadAction } from '@reduxjs/toolkit';
import { all, put, takeLatest } from 'redux-saga/effects';

import {
  deleteMilestone,
  getAllMilestones,
  getAllProjects,
  getSingleMilestone,
  getSingleProject,
  getTaskCard,
  postMilestoneCard,
  postProject,
  postSubTask,
  postTask,
  setAllMilestones,
  setAllProjects,
  setProjectId,
  setProjectTitle,
  setSelectedModalVisible,
  setSingleMilestone,
  setSingleProject,
  setTaskCard
} from '../Reducers/postReducer';
import { MilestoneModalType, ProjectDataPayload, SubTaskDataPayload, TaskDataPayload } from '../Types/tasks';
import API from '../Utils/api';
import callCheckingAuth from './callCheckingAuth';

function* postMilestoneCardWorker(action: PayloadAction<MilestoneModalType>) {
  const { ...task } = action.payload;
  const { ok, data, problem } = yield callCheckingAuth(API.postMilestone, task);
  if (ok && data) {
    console.log('Success');
  } else {
    console.warn('Error while posting milestone', problem);
  }
}

function* getTaskCardWorker() {
  const { ok, data, problem } = yield callCheckingAuth(API.getMilestone);
  if (ok && data) {
    yield put(setTaskCard(data));
  } else {
    console.warn('Error while getting milestone', problem);
  }
}

function* postProjectTitleWorker(action: PayloadAction<ProjectDataPayload>) {
  const { data: ProjectData, callback } = action.payload;
  const { ok, data, problem } = yield callCheckingAuth(API.postProject, ProjectData);
  if (ok && data) {
    yield put(setProjectTitle(data.project_name));
    yield put(setProjectId(data.id));
    callback();
  } else {
    console.warn('Error while posting project title', problem);
  }
}

function* getAllProjectsWorker() {
  const { ok, data, problem } = yield callCheckingAuth(API.getAllProjects);
  if (ok && data) {
    yield put(setAllProjects(data.results));
  } else {
    console.warn('Error while getting all projects', problem);
  }
}

function* getSingleProjectWorker(action: PayloadAction<number>) {
  const { ok, data, problem } = yield callCheckingAuth(API.getSingleProject, action.payload);
  if (ok && data) {
    yield put(setSingleProject(data));
  } else {
    console.warn('Error while getting single project', problem);
  }
}

function* getAllMilestonesWorker(action: PayloadAction<number>) {
  const { ok, data, problem } = yield callCheckingAuth(API.getAllMilestones, action.payload);
  if (ok && data) {
    yield put(setAllMilestones(data.results));
  } else {
    console.warn('Error while getting all projects', problem);
  }
}

function* postTaskWorker(action: PayloadAction<TaskDataPayload>) {
  const {
    data: { ...task },
    callback
  } = action.payload;
  const { ok, data, problem } = yield callCheckingAuth(API.postTask, task);
  if (ok && data) {
    callback();
  } else {
    console.warn('Error while posting milestone', problem);
  }
}

function* postSubTaskWorker(action: PayloadAction<SubTaskDataPayload>) {
  const {
    data: { ...subTask },
    callback
  } = action.payload;
  const { ok, data, problem } = yield callCheckingAuth(API.postSubTask, subTask);
  if (ok && data) {
    callback();
  } else {
    console.warn('Error while posting milestone', problem);
  }
}

function* deleteMilestoneWorker(action: PayloadAction<number>) {
  const { ok, data, problem } = yield callCheckingAuth(API.deleteMilestone, action.payload);
  if (ok && data) {
    yield put(setSelectedModalVisible(false));
  } else {
    console.warn('Error while getting all projects', problem);
  }
}

function* getSingleMilestoneWorker(action: PayloadAction<number>) {
  const { ok, data, problem } = yield callCheckingAuth(API.getSingleMilestone, action.payload);
  if (ok && data) {
    yield put(setSingleMilestone(data));
    yield put(setSelectedModalVisible(true));
  } else {
    console.warn('Error while getting single project', problem);
  }
}

export default function* postSaga() {
  yield all([
    takeLatest(getTaskCard, getTaskCardWorker),
    takeLatest(postMilestoneCard, postMilestoneCardWorker),
    takeLatest(getAllProjects, getAllProjectsWorker),
    takeLatest(getSingleProject, getSingleProjectWorker),
    takeLatest(postProject, postProjectTitleWorker),
    takeLatest(getAllMilestones, getAllMilestonesWorker),
    takeLatest(postTask, postTaskWorker),
    takeLatest(postSubTask, postSubTaskWorker),
    takeLatest(deleteMilestone, deleteMilestoneWorker),
    takeLatest(getSingleMilestone, getSingleMilestoneWorker)
  ]);
}

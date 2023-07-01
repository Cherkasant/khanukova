import { PayloadAction } from '@reduxjs/toolkit';
import { all, put, takeLatest } from 'redux-saga/effects';

import {
  addResponsible,
  deleteMilestone,
  deleteProject,
  deleteSubTask,
  deleteTask,
  getAllMilestoneDependencies,
  getAllMilestones,
  getAllProjects,
  getAllResponsible,
  getHomeScreenProjects,
  getSingleMilestone,
  getSingleProject,
  getSingleSubTask,
  getSingleTask,
  getTaskCard,
  patchMilestone,
  patchProject,
  patchSubTask,
  patchTask,
  postMilestoneCard,
  postProject,
  postSubTask,
  postTask,
  removeResponsible,
  setAllMilestoneDependencies,
  setAllMilestones,
  setAllProjects,
  setAllResponsible,
  setHomeScreenProjects,
  setModalMilestone,
  setModalSubTask,
  setModalTask,
  setProjectId,
  setProjectTitle,
  setSingleMilestone,
  setSingleProject,
  setSingleSubTask,
  setSingleTask,
  setTaskCard
} from '../Reducers/postReducer';
import {
  addResponsibleType,
  DeleteMilestoneType,
  DeleteProject,
  DependeciesMilestone,
  MilestoneDataPayload,
  PatchMilestoneType,
  PatchProjectType,
  PatchSubTaskType,
  PatchTaskType,
  ProjectDataPayload,
  removeResponsibleType,
  SubTaskDataPayload,
  TaskDataPayload
} from '../Types/tasks';
import API from '../Utils/api';

import callCheckingAuth from './callCheckingAuth';

function* postMilestoneCardWorker(action: PayloadAction<MilestoneDataPayload>) {
  const {
    data: { ...task },
    callback
  } = action.payload;
  const { ok, data, problem } = yield callCheckingAuth(API.postMilestone, task);
  if (ok && data) {
    callback();
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
    yield put(setAllMilestones(data));
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
    console.warn('Error while posting task', problem);
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
    console.warn('Error while posting subtask', problem);
  }
}

function* deleteMilestoneWorker(action: PayloadAction<DeleteMilestoneType>) {
  const { id, callback } = action.payload;
  const { ok, problem } = yield callCheckingAuth(API.deleteMilestone, id);
  if (ok) {
    callback();
  } else {
    console.warn('Error while deleting milestone', problem);
  }
}

function* getSingleMilestoneWorker(action: PayloadAction<number>) {
  const { ok, data, problem } = yield callCheckingAuth(API.getSingleMilestone, action.payload);
  if (ok && data) {
    yield put(setSingleMilestone(data));
    yield put(setModalMilestone(true));
  } else {
    console.warn('Error while getting single milestone', problem);
  }
}

function* patchMilestoneCardWorker(action: PayloadAction<PatchMilestoneType>) {
  const { id, data, callback } = action.payload;
  const { ok, problem } = yield callCheckingAuth(API.patchSingleMilestone, data, id);
  if (ok) {
    callback();
  } else {
    console.warn('Error while patching milestone', problem);
  }
}

function* getSingleTaskWorker(action: PayloadAction<number>) {
  const { ok, data, problem } = yield callCheckingAuth(API.getSingleTask, action.payload);
  if (ok && data) {
    yield put(setSingleTask(data));
    yield put(setModalTask(true));
  } else {
    console.warn('Error while getting single task', problem);
  }
}

function* patchTaskWorker(action: PayloadAction<PatchTaskType>) {
  const { id, data, callback } = action.payload;
  const { ok, problem } = yield callCheckingAuth(API.patchSingleTask, data, id);
  if (ok) {
    callback();
  } else {
    console.warn('Error while patching task', problem);
  }
}

function* deleteTaskWorker(action: PayloadAction<DeleteMilestoneType>) {
  const { id, callback } = action.payload;
  const { ok, problem } = yield callCheckingAuth(API.deleteTask, id);
  if (ok) {
    callback();
  } else {
    console.warn('Error while deleting task', problem);
  }
}

function* getSingleSubTaskWorker(action: PayloadAction<number>) {
  const { ok, data, problem } = yield callCheckingAuth(API.getSingleSubTask, action.payload);
  if (ok && data) {
    yield put(setSingleSubTask(data));
    yield put(setModalSubTask(true));
  } else {
    console.warn('Error while getting single subtask', problem);
  }
}

function* patchSubTaskWorker(action: PayloadAction<PatchSubTaskType>) {
  const { id, data, callback } = action.payload;
  const { ok, problem } = yield callCheckingAuth(API.patchSingleSubTask, data, id);
  if (ok) {
    callback();
  } else {
    console.warn('Error while patching subtask', problem);
  }
}

function* deleteSubTaskWorker(action: PayloadAction<DeleteMilestoneType>) {
  const { id, callback } = action.payload;
  const { ok, problem } = yield callCheckingAuth(API.deleteSubTask, id);
  if (ok) {
    callback();
  } else {
    console.warn('Error while deleting subtask', problem);
  }
}

function* patchProjectWorker(action: PayloadAction<PatchProjectType>) {
  const { id, data, callback } = action.payload;
  const { ok, problem } = yield callCheckingAuth(API.patchProject, data, id);
  if (ok) {
    callback();
  } else {
    console.warn('Error while patching project', problem);
  }
}

function* getAllResponsibleWorker(action: PayloadAction<number>) {
  const { ok, data, problem } = yield callCheckingAuth(API.getAllResponsible, action.payload);
  if (ok && data) {
    yield put(setAllResponsible(data));
  } else {
    console.warn('Error while getting responsible', problem);
  }
}

function* getAllMilestoneDependenciesWorker(action: PayloadAction<DependeciesMilestone>) {
  const { id, milestoneId } = action.payload;
  const { ok, data, problem } = yield callCheckingAuth(API.getAllDependencies, id, milestoneId);
  if (ok && data) {
    yield put(setAllMilestoneDependencies(data));
  } else {
    console.warn('Error while getting milestone dependencies', problem);
  }
}

function* addResponsibleWorker(action: PayloadAction<addResponsibleType>) {
  const { id, data, callback } = action.payload;
  const { ok, problem } = yield callCheckingAuth(API.addResponsible, id, data);
  if (ok) {
    callback();
  } else {
    console.warn('Error while adding responsible ', problem);
  }
}

function* removeResponsibleWorker(action: PayloadAction<removeResponsibleType>) {
  const { id, responsible_remove, callback } = action.payload;
  const { ok, problem } = yield callCheckingAuth(API.removeResponsible, id, responsible_remove);
  if (ok) {
    callback();
  } else {
    console.warn('Error while removing responsible ', problem);
  }
}

function* getAllHomeScreenProjectsWorker() {
  const { ok, data, problem } = yield callCheckingAuth(API.getHomeScreenProjects);
  if (ok && data) {
    yield put(setHomeScreenProjects(data.slice(0, 8)));
  } else {
    console.warn('Error while getting homescreen projects', problem);
  }
}

function* deleteProjectWorker(action: PayloadAction<DeleteProject>) {
  const { id, callback } = action.payload;
  const { ok, problem } = yield callCheckingAuth(API.deleteProject, id);
  if (ok) {
    callback();
  } else {
    console.warn('Error while deleting project', problem);
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
    takeLatest(getSingleMilestone, getSingleMilestoneWorker),
    takeLatest(patchMilestone, patchMilestoneCardWorker),
    takeLatest(getSingleTask, getSingleTaskWorker),
    takeLatest(patchTask, patchTaskWorker),
    takeLatest(deleteTask, deleteTaskWorker),
    takeLatest(getSingleSubTask, getSingleSubTaskWorker),
    takeLatest(patchSubTask, patchSubTaskWorker),
    takeLatest(deleteSubTask, deleteSubTaskWorker),
    takeLatest(patchProject, patchProjectWorker),
    takeLatest(getAllResponsible, getAllResponsibleWorker),
    takeLatest(getAllMilestoneDependencies, getAllMilestoneDependenciesWorker),
    takeLatest(addResponsible, addResponsibleWorker),
    takeLatest(removeResponsible, removeResponsibleWorker),
    takeLatest(getHomeScreenProjects, getAllHomeScreenProjectsWorker),
    takeLatest(deleteProject, deleteProjectWorker)
  ]);
}

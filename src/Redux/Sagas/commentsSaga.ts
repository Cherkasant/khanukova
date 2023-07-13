import { PayloadAction } from '@reduxjs/toolkit';
import { all, put, takeLatest } from 'redux-saga/effects';

import API from '../Utils/api';

import {
  deleteMilestoneComment,
  deleteSubTaskComment,
  deleteTaskComment,
  getAllMilestoneComments,
  getAllTaskComments,
  getSingleMilestoneComment,
  patchMilestoneComment,
  patchSubTaskComment,
  patchTaskComment,
  postMilestoneComment,
  setAllMilestoneComments,
  setAllTaskComments,
  setSingleMilestoneComment
} from '../Reducers/commentReducer';

import {
  DeleteMilestoneCommentType,
  DeleteSubTaskCommentType,
  DeleteTaskCommentType,
  PatchMilestoneCommentType,
  PatchSubTaskCommentType,
  PatchTaskCommentType,
  PostMilestoneCommentType,
  SingleMilestoneComment
} from '../Types/comments';

import callCheckingAuth from './callCheckingAuth';

function* getAllMilestoneCommentsWorker(actions: PayloadAction<number>) {
  const { ok, data, problem } = yield callCheckingAuth(API.getAllMilestoneComments, actions.payload);
  if (ok && data) {
    yield put(setAllMilestoneComments(data));
  } else {
    console.warn('Error while getting milestone comments', problem);
  }
}

function* getAllTaskCommentsWorker(actions: PayloadAction<number>) {
  const { ok, data, problem } = yield callCheckingAuth(API.getAllTaskComments, actions.payload);
  if (ok && data) {
    yield put(setAllTaskComments(data));
  } else {
    console.warn('Error while getting task comments', problem);
  }
}

function* postMilestoneCommentWorker(actions: PayloadAction<PostMilestoneCommentType>) {
  const { milestone } = actions.payload;
  const { ok, data, problem } = yield callCheckingAuth(API.postMilestoneComment, actions.payload);
  if (ok && data) {
    yield put(getAllMilestoneComments(milestone));
  } else {
    console.warn('Error while posting milestone comments', problem);
  }
}

function* deleteMilestoneCommentWorker(actions: PayloadAction<DeleteMilestoneCommentType>) {
  const { id, idMilestone, callback } = actions.payload;
  const { ok, problem } = yield callCheckingAuth(API.deleteComment, id, idMilestone);
  if (ok) {
    callback();
  } else {
    console.warn('Error while deleting milestone comments', problem);
  }
}

function* patchMilestoneCommentWorker(actions: PayloadAction<PatchMilestoneCommentType>) {
  const { data: comment, id, idMilestone, callback } = actions.payload;
  const { ok, data, problem } = yield callCheckingAuth(API.patchComment, comment, id, idMilestone);
  if (ok && data) {
    callback();
    console.log(data);
  } else {
    console.warn('Error while patching milestone comments', problem);
  }
}

function* getSingleMilestoneCommentWorker(actions: PayloadAction<SingleMilestoneComment>) {
  const { id, idMilestone } = actions.payload;
  const { ok, data, problem } = yield callCheckingAuth(API.getSingleMilestoneComment, idMilestone, id);
  if (ok && data) {
    yield put(setSingleMilestoneComment(data));
  } else {
    console.warn('Error while getting single milestone comment', problem);
  }
}

function* deleteTaskCommentWorker(actions: PayloadAction<DeleteTaskCommentType>) {
  const { id, idTask, callback } = actions.payload;
  const { ok, problem } = yield callCheckingAuth(API.deleteTaskComment, id, idTask);
  if (ok) {
    callback();
  } else {
    console.warn('Error while deleting task comment', problem);
  }
}

function* patchTaskCommentWorker(actions: PayloadAction<PatchTaskCommentType>) {
  const { data: comment, id, idTask, callback } = actions.payload;
  const { ok, data, problem } = yield callCheckingAuth(API.patchTaskComment, comment, id, idTask);
  if (ok && data) {
    callback();
  } else {
    console.warn('Error while patching milestone comments', problem);
  }
}

function* deleteSubTaskCommentWorker(actions: PayloadAction<DeleteSubTaskCommentType>) {
  const { id, idSubTask, callback } = actions.payload;
  const { ok, problem } = yield callCheckingAuth(API.deleteSubTaskComment, id, idSubTask);
  if (ok) {
    callback();
  } else {
    console.warn('Error while deleting subtask comment', problem);
  }
}

function* patchSubTaskCommentWorker(actions: PayloadAction<PatchSubTaskCommentType>) {
  const { data: comment, id, idSubTask, callback } = actions.payload;
  const { ok, data, problem } = yield callCheckingAuth(API.patchSubTaskComment, comment, id, idSubTask);
  if (ok && data) {
    callback();
  } else {
    console.warn('Error while patching subtask comments', problem);
  }
}

export default function* commentsSaga() {
  yield all([
    takeLatest(getAllMilestoneComments, getAllMilestoneCommentsWorker),
    takeLatest(postMilestoneComment, postMilestoneCommentWorker),
    takeLatest(deleteMilestoneComment, deleteMilestoneCommentWorker),
    takeLatest(patchMilestoneComment, patchMilestoneCommentWorker),
    takeLatest(getSingleMilestoneComment, getSingleMilestoneCommentWorker),
    takeLatest(deleteTaskComment, deleteTaskCommentWorker),
    takeLatest(patchTaskComment, patchTaskCommentWorker),
    takeLatest(deleteSubTaskComment, deleteSubTaskCommentWorker),
    takeLatest(patchSubTaskComment, patchSubTaskCommentWorker),
    takeLatest(getAllTaskComments, getAllTaskCommentsWorker)
  ]);
}

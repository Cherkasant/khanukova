import { PayloadAction } from '@reduxjs/toolkit';
import { all, put, takeLatest } from 'redux-saga/effects';

import API from '../Utils/api';

import { getAllMilestoneComments, postMilestoneComment, setAllMilestoneComments } from '../Reducers/commentReducer';

import { PostMilestoneCommentType } from '../Types/comments';

import callCheckingAuth from './callCheckingAuth';

function* getAllMilestoneCommentsWorker(actions: PayloadAction<number>) {
  const { ok, data, problem } = yield callCheckingAuth(API.getAllMilestoneComments, actions.payload);
  if (ok && data) {
    console.log(data);
    yield put(setAllMilestoneComments(data));
  } else {
    console.warn('Error while getting milestone comments', problem);
  }
}

function* postMilestoneCommentWorker(actions: PayloadAction<PostMilestoneCommentType>) {
  const { milestone } = actions.payload;
  const { ok, data, problem } = yield callCheckingAuth(API.postMilestoneComment, actions.payload);
  if (ok && data) {
    yield put(getAllMilestoneComments(milestone));
  } else {
    console.warn(problem);
  }
}

export default function* commentsSaga() {
  yield all([
    takeLatest(getAllMilestoneComments, getAllMilestoneCommentsWorker),
    takeLatest(postMilestoneComment, postMilestoneCommentWorker)
  ]);
}

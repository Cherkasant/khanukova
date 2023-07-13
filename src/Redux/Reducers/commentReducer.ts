import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  ArrayOfComments,
  CommentType,
  DeleteMilestoneCommentType,
  DeleteSubTaskCommentType,
  DeleteTaskCommentType,
  PatchMilestoneCommentType,
  PatchSubTaskCommentType,
  PatchTaskCommentType,
  PostMilestoneCommentType,
  SingleMilestoneComment,
  SingleTaskComment
} from '../Types/comments';

type CommentReducerState = {
  comments: ArrayOfComments;
  taskComments: ArrayOfComments;
  singleComment: CommentType | null;
  singleTaskComment: CommentType | null;
};
const initialState: CommentReducerState = {
  comments: [],
  taskComments: [],
  singleComment: null,
  singleTaskComment: null
};

const CommentSlice = createSlice({
  name: 'CommentReducer',
  initialState,
  reducers: {
    getAllMilestoneComments: (state, action: PayloadAction<number>) => {},
    setAllMilestoneComments: (state, action: PayloadAction<ArrayOfComments>) => {
      state.comments = action.payload;
    },
    postMilestoneComment: (state, action: PayloadAction<PostMilestoneCommentType>) => {},
    getAllTaskComments: (state, action: PayloadAction<number>) => {},
    setAllTaskComments: (state, action: PayloadAction<ArrayOfComments>) => {
      state.taskComments = action.payload;
    },
    getSingleTaskComment: (state, action: PayloadAction<SingleTaskComment>) => {},
    setSingleTaskComment: (state, action: PayloadAction<CommentType>) => {
      state.singleComment = action.payload;
    },
    patchMilestoneComment: (state, action: PayloadAction<PatchMilestoneCommentType>) => {},
    deleteMilestoneComment: (state, action: PayloadAction<DeleteMilestoneCommentType>) => {},
    getSingleMilestoneComment: (state, action: PayloadAction<SingleMilestoneComment>) => {},
    setSingleMilestoneComment: (state, action: PayloadAction<CommentType>) => {
      state.singleComment = action.payload;
    },
    deleteTaskComment: (state, action: PayloadAction<DeleteTaskCommentType>) => {},
    patchTaskComment: (state, action: PayloadAction<PatchTaskCommentType>) => {},
    deleteSubTaskComment: (state, action: PayloadAction<DeleteSubTaskCommentType>) => {},
    patchSubTaskComment: (state, action: PayloadAction<PatchSubTaskCommentType>) => {}
  }
});

export const {
  getAllMilestoneComments,
  setAllMilestoneComments,
  postMilestoneComment,
  getAllTaskComments,
  setAllTaskComments,
  patchMilestoneComment,
  deleteMilestoneComment,
  getSingleMilestoneComment,
  setSingleMilestoneComment,
  deleteTaskComment,
  patchTaskComment,
  deleteSubTaskComment,
  patchSubTaskComment
} = CommentSlice.actions;
const commentReducer = CommentSlice.reducer;

export default commentReducer;

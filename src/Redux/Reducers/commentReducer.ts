import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ArrayOfComments, PostMilestoneCommentType } from '../Types/comments';

type CommentReducerState = {
  comments: ArrayOfComments;
};
const initialState: CommentReducerState = {
  comments: []
};

const CommentSlice = createSlice({
  name: 'CommentReducer',
  initialState,
  reducers: {
    getAllMilestoneComments: (state, action: PayloadAction<number>) => {},
    setAllMilestoneComments: (state, action: PayloadAction<ArrayOfComments>) => {
      state.comments = action.payload;
    },
    postMilestoneComment: (state, action: PayloadAction<PostMilestoneCommentType>) => {}
  }
});

export const { getAllMilestoneComments, setAllMilestoneComments, postMilestoneComment } = CommentSlice.actions;
const commentReducer = CommentSlice.reducer;

export default commentReducer;

import { RootState } from '../store';

export default {
  getAllMilestoneComments: (state: RootState) => state.commentReducer.comments,
  getSingleMilestoneComment: (state: RootState) => state.commentReducer.singleComment
};

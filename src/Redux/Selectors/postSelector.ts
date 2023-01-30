import { RootState } from "../store";

export default {
  getModal: (state: RootState) =>
    state.postsReducer.isSelectedImageModalIsOpened,
  getTask: (state: RootState) => state.postsReducer.TaskForm,
  getTitleMilestone: (state: RootState) => state.postsReducer.TaskTitle,
  getFilter: (state: RootState) => state.postsReducer.isFilterVisible,
};

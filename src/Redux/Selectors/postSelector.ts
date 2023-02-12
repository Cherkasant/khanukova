import { RootState } from "../store";

export default {
  getModal: (state: RootState) =>
    state.postsReducer.isSelectedImageModalIsOpened,
  getTask: (state: RootState) => state.postsReducer.TaskForm,
  getTitleMilestone: (state: RootState) => state.postsReducer.TaskTitle,
  getFilter: (state: RootState) => state.postsReducer.isFilterVisible,
  getEcaseModal: (state: RootState) => state.postsReducer.isEcaseModalOpened,
  getRequestModal: (state: RootState) =>
    state.postsReducer.isRequestModalOpened,
  getRequestTitle: (state: RootState) => state.postsReducer.titleRequest,
};

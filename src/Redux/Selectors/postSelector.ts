import { RootState } from '../store';

export default {
  getModal: (state: RootState) => state.postsReducer.isSelectedImageModalIsOpened,
  getTask: (state: RootState) => state.postsReducer.TaskForm,
  getMilestoneTitle: (state: RootState) => state.postsReducer.TaskTitle,
  getFilter: (state: RootState) => state.postsReducer.isFilterVisible,
  getEcaseModal: (state: RootState) => state.postsReducer.isEcaseModalOpened,
  getRequestModal: (state: RootState) => state.postsReducer.isRequestModalOpened,
  getRequestTitle: (state: RootState) => state.postsReducer.titleRequest,
  getAllProjects: (state: RootState) => state.postsReducer.allProjects,
  getSingleProject: (state: RootState) => state.postsReducer.singleProject,
  getProjectId: (state: RootState) => state.postsReducer.projectId,
  getAllMilestones: (state: RootState) => state.postsReducer.allMilestones,
  getNewTaskModal: (state: RootState) => state.postsReducer.isNewTaskModalisOpened,
  getNewSubTaskModal: (state: RootState) => state.postsReducer.isNewSubTaskModalisOpened,
  getTaskTitle: (state: RootState) => state.postsReducer.TaskTitle,
  getProjectTitle: (state: RootState) => state.postsReducer.singleProjectTitle,
  getMilestoneId: (state: RootState) => state.postsReducer.milestoneId,
  getTaskId: (state: RootState) => state.postsReducer.taskId,
  getRefreshTable: (state: RootState) => state.postsReducer.refreshTable,
  getSingleMilestone: (state: RootState) => state.postsReducer.singleMilestone,
  getModalMilestone: (state: RootState) => state.postsReducer.modalMilestone,
  getSingleTask: (state: RootState) => state.postsReducer.singleTask,
  getModalTask: (state: RootState) => state.postsReducer.modalTask,
  getSingleSubTask: (state: RootState) => state.postsReducer.singleSubTask,
  getModalSubTask: (state: RootState) => state.postsReducer.modalSubTask
};

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
  ArrayOfProjectType,
  CardTaskType,
  DeleteMilestoneType,
  MilestoneDataPayload,
  MilestoneType,
  PatchMilestoneType,
  PatchSubTaskType,
  PatchTaskType,
  ProjectData,
  ProjectDataPayload,
  ProjectType,
  SubTaskDataPayload,
  SubTaskTypeTable,
  TaskDataPayload,
  TaskTypeTable,
  TaskTypeWithID
} from '../Types/tasks';

type PostReducerState = {
  isSelectedImageModalIsOpened: boolean;
  TaskForm: TaskTypeWithID | null;
  MilestoneTitle: string;
  isFilterVisible: boolean;
  isEcaseModalOpened: boolean;
  isRequestModalOpened: boolean;
  titleRequest: string;
  allProjects: ArrayOfProjectType;
  singleProject: ProjectType | null;
  projectTitle: ProjectData | null;
  projectId: number;
  allMilestones: CardTaskType | [];
  isNewTaskModalisOpened: boolean;
  isNewSubTaskModalisOpened: boolean;
  TaskTitle: string;
  singleProjectTitle: string;
  milestoneId: number;
  taskId: number;
  refreshTable: boolean;
  singleMilestone: MilestoneType | null;
  modalMilestone: boolean;
  singleTask: TaskTypeTable | null;
  modalTask: boolean;
  singleSubTask: SubTaskTypeTable | null;
  modalSubTask: boolean;
};

const initialState: PostReducerState = {
  isSelectedImageModalIsOpened: false,
  TaskForm: null,
  MilestoneTitle: '',
  isFilterVisible: false,
  isEcaseModalOpened: false,
  isRequestModalOpened: false,
  titleRequest: '',
  allProjects: [],
  singleProject: null,
  projectTitle: null,
  projectId: 0,
  allMilestones: [],
  isNewTaskModalisOpened: false,
  isNewSubTaskModalisOpened: false,
  TaskTitle: '',
  singleProjectTitle: '',
  milestoneId: 0,
  taskId: 0,
  refreshTable: false,
  singleMilestone: null,
  modalMilestone: false,
  singleTask: null,
  modalTask: false,
  singleSubTask: null,
  modalSubTask: false
};

const postsSlice = createSlice({
  name: 'postsReducer',
  initialState,
  reducers: {
    setSelectedModalVisible: (state, action: PayloadAction<boolean>) => {
      state.isSelectedImageModalIsOpened = action.payload;
    },
    setTaskModalVisible: (state, action: PayloadAction<boolean>) => {
      state.isNewTaskModalisOpened = action.payload;
    },
    setSubTaskModalVisible: (state, action: PayloadAction<boolean>) => {
      state.isNewSubTaskModalisOpened = action.payload;
    },

    postMilestoneCard: (state, action: PayloadAction<MilestoneDataPayload>) => {},
    getTaskCard: (state, action: PayloadAction<undefined>) => {},
    setTaskCard: (state, action: PayloadAction<TaskTypeWithID>) => {
      state.TaskForm = action.payload;
    },
    setProjectTitle: (state, action: PayloadAction<string>) => {
      state.singleProjectTitle = action.payload;
    },
    setMilestoneTitle: (state, action: PayloadAction<string>) => {
      state.MilestoneTitle = action.payload;
    },
    setTaskTitle: (state, action: PayloadAction<string>) => {
      state.TaskTitle = action.payload;
    },
    setFilterVisible: (state, action: PayloadAction<boolean>) => {
      state.isFilterVisible = action.payload;
    },
    setEcaseModalVisible: (state, action: PayloadAction<boolean>) => {
      state.isEcaseModalOpened = action.payload;
    },
    setRequestModalVisible: (state, action: PayloadAction<boolean>) => {
      state.isRequestModalOpened = action.payload;
    },
    setTitleRequest: (state, action: PayloadAction<string>) => {
      state.titleRequest = action.payload;
      state.isRequestModalOpened = true;
    },
    getAllProjects: (state, action: PayloadAction<undefined>) => {},
    setAllProjects: (state, action: PayloadAction<ArrayOfProjectType>) => {
      state.allProjects = action.payload;
    },
    getSingleProject: (state, action: PayloadAction<number>) => {},
    setSingleProject: (state, action: PayloadAction<ProjectType>) => {
      state.singleProject = action.payload;
    },
    postProject: (state, action: PayloadAction<ProjectDataPayload>) => {},
    setProjectId: (state, action: PayloadAction<number>) => {
      state.projectId = action.payload;
    },
    getAllMilestones: (state, action: PayloadAction<number>) => {},
    setAllMilestones: (state, action: PayloadAction<CardTaskType>) => {
      state.allMilestones = action.payload;
    },
    getAllTasks: (state, action: PayloadAction<number>) => {},
    postTask: (state, action: PayloadAction<TaskDataPayload>) => {},
    postSubTask: (state, action: PayloadAction<SubTaskDataPayload>) => {},
    setMilestoneId: (state, action: PayloadAction<number>) => {
      state.milestoneId = action.payload;
    },
    setTaskId: (state, action: PayloadAction<number>) => {
      state.taskId = action.payload;
    },
    setRefreshTable: (state, action: PayloadAction<boolean>) => {
      state.refreshTable = action.payload;
    },
    deleteMilestone: (state, action: PayloadAction<DeleteMilestoneType>) => {},
    getSingleMilestone: (state, action: PayloadAction<number>) => {},
    setSingleMilestone: (state, action: PayloadAction<MilestoneType>) => {
      state.singleMilestone = action.payload;
    },
    setModalMilestone: (state, action: PayloadAction<boolean>) => {
      state.modalMilestone = action.payload;
    },
    patchMilestone: (state, action: PayloadAction<PatchMilestoneType>) => {},
    getSingleTask: (state, action: PayloadAction<number>) => {},
    setSingleTask: (state, action: PayloadAction<TaskTypeTable>) => {
      state.singleTask = action.payload;
    },
    setModalTask: (state, action: PayloadAction<boolean>) => {
      state.modalTask = action.payload;
    },
    patchTask: (state, action: PayloadAction<PatchTaskType>) => {},
    deleteTask: (state, action: PayloadAction<DeleteMilestoneType>) => {},
    getSingleSubTask: (state, action: PayloadAction<number>) => {},
    setSingleSubTask: (state, action: PayloadAction<SubTaskTypeTable>) => {
      state.singleSubTask = action.payload;
    },
    setModalSubTask: (state, action: PayloadAction<boolean>) => {
      state.modalSubTask = action.payload;
    },
    patchSubTask: (state, action: PayloadAction<PatchSubTaskType>) => {},
    deleteSubTask: (state, action: PayloadAction<DeleteMilestoneType>) => {}
  }
});

export const {
  setSelectedModalVisible,
  postMilestoneCard,
  getTaskCard,
  setTaskCard,
  setMilestoneTitle,
  setFilterVisible,
  setEcaseModalVisible,
  setRequestModalVisible,
  setTitleRequest,
  getAllProjects,
  setAllProjects,
  getSingleProject,
  setSingleProject,
  postProject,
  setProjectId,
  getAllMilestones,
  setAllMilestones,
  getAllTasks,
  postTask,
  setTaskModalVisible,
  postSubTask,
  setSubTaskModalVisible,
  setTaskTitle,
  setProjectTitle,
  setMilestoneId,
  setTaskId,
  setRefreshTable,
  deleteMilestone,
  getSingleMilestone,
  setSingleMilestone,
  setModalMilestone,
  patchMilestone,
  getSingleTask,
  setSingleTask,
  setModalTask,
  patchTask,
  deleteTask,
  getSingleSubTask,
  setSingleSubTask,
  setModalSubTask,
  patchSubTask,
  deleteSubTask
} = postsSlice.actions;
const postsReducer = postsSlice.reducer;
export default postsReducer;

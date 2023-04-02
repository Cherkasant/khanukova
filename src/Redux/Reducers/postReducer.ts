import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ArrayOfProjectType, ProjectData, ProjectType, TaskType, TaskTypeWithID } from '../Types/tasks'

type PostReducerState = {
  isSelectedImageModalIsOpened: boolean
  TaskForm: TaskTypeWithID | null
  TaskTitle: string
  isFilterVisible: boolean
  isEcaseModalOpened: boolean
  isRequestModalOpened: boolean
  titleRequest: string
  allProjects: ArrayOfProjectType
  singleProject: ProjectType | null
  projectTitle: ProjectData | null
  projectId: number
}

const initialState: PostReducerState = {
  isSelectedImageModalIsOpened: false,
  TaskForm: null,
  TaskTitle: '',
  isFilterVisible: false,
  isEcaseModalOpened: false,
  isRequestModalOpened: false,
  titleRequest: '',
  allProjects: [],
  singleProject: null,
  projectTitle: null,
  projectId: 0
}

const postsSlice = createSlice({
  name: 'postsReducer',
  initialState,
  reducers: {
    setSelectedModalVisible: (state, action: PayloadAction<boolean>) => {
      state.isSelectedImageModalIsOpened = action.payload
    },

    postTaskCard: (state, action: PayloadAction<TaskType>) => {},
    getTaskCard: (state, action: PayloadAction<undefined>) => {},
    setTaskCard: (state, action: PayloadAction<TaskTypeWithID>) => {
      state.TaskForm = action.payload
    },
    setTitleTask: (state, action: PayloadAction<string>) => {
      state.TaskTitle = action.payload
    },
    setFilterVisible: (state, action: PayloadAction<boolean>) => {
      state.isFilterVisible = action.payload
    },
    setEcaseModalVisible: (state, action: PayloadAction<boolean>) => {
      state.isEcaseModalOpened = action.payload
    },
    setRequestModalVisible: (state, action: PayloadAction<boolean>) => {
      state.isRequestModalOpened = action.payload
    },
    setTitleRequest: (state, action: PayloadAction<string>) => {
      state.titleRequest = action.payload
      state.isRequestModalOpened = true
    },
    getAllProjects: (state, action: PayloadAction<undefined>) => {},
    setAllProjects: (state, action: PayloadAction<ArrayOfProjectType>) => {
      state.allProjects = action.payload
    },
    getSingleProject: (state, action: PayloadAction<number>) => {},
    setSingleProject: (state, action: PayloadAction<ProjectType>) => {
      state.singleProject = action.payload
    },
    postProject: (state, action: PayloadAction<ProjectData>) => {
      state.projectTitle = action.payload
    },
    setProjectId: (state, action: PayloadAction<number>) => {
      state.projectId = action.payload
    }
  }
})

export const {
  setSelectedModalVisible,
  postTaskCard,
  getTaskCard,
  setTaskCard,
  setTitleTask,
  setFilterVisible,
  setEcaseModalVisible,
  setRequestModalVisible,
  setTitleRequest,
  getAllProjects,
  setAllProjects,
  getSingleProject,
  setSingleProject,
  postProject,
  setProjectId
} = postsSlice.actions
const postsReducer = postsSlice.reducer
export default postsReducer

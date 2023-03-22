import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { TaskType, TaskTypeWithID } from '../Types/tasks'

type PostReducerState = {
  isSelectedImageModalIsOpened: boolean
  TaskForm: TaskTypeWithID | null
  TaskTitle: string
  isFilterVisible: boolean
  isEcaseModalOpened: boolean
  isRequestModalOpened: boolean
  titleRequest: string
}

const initialState: PostReducerState = {
  isSelectedImageModalIsOpened: false,
  TaskForm: null,
  TaskTitle: '',
  isFilterVisible: false,
  isEcaseModalOpened: false,
  isRequestModalOpened: false,
  titleRequest: ''
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
  setTitleRequest
} = postsSlice.actions
const postsReducer = postsSlice.reducer
export default postsReducer

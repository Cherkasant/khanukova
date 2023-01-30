import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskType } from "../Types/tasks";

type PostReducerState = {
  isSelectedImageModalIsOpened: boolean;
  TaskForm: TaskType | null;
  TaskTitle: string;
  isFilterVisible: boolean;
};

const initialState: PostReducerState = {
  isSelectedImageModalIsOpened: false,
  TaskForm: null,
  TaskTitle: "",
  isFilterVisible: false,
};

const postsSlice = createSlice({
  name: "postsReducer",
  initialState,
  reducers: {
    setSelectedModalVisible: (state, action: PayloadAction<boolean>) => {
      state.isSelectedImageModalIsOpened = action.payload;
    },
    setTaskCard: (state, action: PayloadAction<TaskType>) => {
      state.TaskForm = action.payload;
    },
    setTitleTask: (state, action: PayloadAction<string>) => {
      state.TaskTitle = action.payload;
    },
    setFilterVisible: (state, action: PayloadAction<boolean>) => {
      state.isFilterVisible = action.payload;
    },
  },
});

export const {
  setSelectedModalVisible,
  setTaskCard,
  setTitleTask,
  setFilterVisible,
} = postsSlice.actions;
const postsReducer = postsSlice.reducer;
export default postsReducer;

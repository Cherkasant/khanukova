import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskType } from "../Types/tasks";

type PostReducerState = {
  isSelectedImageModalIsOpened: boolean;
  TaskForm: TaskType | null;
  TaskTitle: string;
};

const initialState: PostReducerState = {
    isSelectedImageModalIsOpened: false,
    TaskForm: null,
    TaskTitle: "",
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

    },
});

export const {setSelectedModalVisible, setTaskCard, setTitleTask} =
    postsSlice.actions;
const postsReducer = postsSlice.reducer;
export default postsReducer;
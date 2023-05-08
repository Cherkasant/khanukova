import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ResoursesDataType, ResoursesTypePayload } from '../Types/Resourses';

type ResoursesReducerState = {
  resourses: ResoursesDataType[];
  statusResourses: string;
  statusDeleteResourses: string;
  statusEditResourses: string;
  statusAddResourses: string;
};
const initialState: ResoursesReducerState = {
  resourses: [],
  statusResourses: '',
  statusDeleteResourses: '',
  statusEditResourses: '',
  statusAddResourses: ''
};

const ResoursesSlice = createSlice({
  name: 'ResoursesReducer',
  initialState,
  reducers: {
    postResourses: (state, action: PayloadAction<ResoursesTypePayload>) => {},
    getResourses: (state, action: PayloadAction<string>) => {},
    editResourses: (state, action: PayloadAction<ResoursesTypePayload>) => {},
    deleteResourses: (state, action: PayloadAction<ResoursesTypePayload>) => {},
    setResourses: (state, action) => {
      state.resourses = action.payload;
    },
    setStatusResourses: (state, action) => {
      state.statusResourses = action.payload;
    },
    setstatusDeleteResourses: (state, action) => {
      state.statusDeleteResourses = action.payload;
    },
    setstatusEditResourses: (state, action) => {
      state.statusEditResourses = action.payload;
    },
    setstatusAddResourses: (state, action) => {
      state.statusAddResourses = action.payload;
    }
  }
});

export const {
  postResourses,
  getResourses,
  setResourses,
  editResourses,
  setStatusResourses,
  deleteResourses,
  setstatusDeleteResourses,
  setstatusEditResourses,
  setstatusAddResourses
} = ResoursesSlice.actions;
const resoursesReducer = ResoursesSlice.reducer;

export default resoursesReducer;

import { RootState } from '../store';

export default {
  getResourses: (state: RootState) => state.resoursesReducer.resourses,
  setStatusResourses: (state: RootState) => state.resoursesReducer.statusResourses,
  setstatusDeleteResourses: (state: RootState) => state.resoursesReducer.statusDeleteResourses,
  setstatusEditResourses: (state: RootState) => state.resoursesReducer.statusEditResourses,
  setstatusAddResourses: (state: RootState) => state.resoursesReducer.statusAddResourses
};

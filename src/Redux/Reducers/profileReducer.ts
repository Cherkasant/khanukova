import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ECaseListData } from '../../Components/constants/Modal/EcaseData';
import {
  ArrayOfEmployees,
  CompanyListData,
  EditCompanyListPayload,
  EditPersonalType,
  PersonalInfoData
} from '../Types/profile';

type ProfileReducerState = {
  CompanyList: CompanyListData | null;
  ECaseList: ECaseListData | null;
  PersonalInfoList: PersonalInfoData | null;
  password: string;
  employees: ArrayOfEmployees | [];
};

const initialState: ProfileReducerState = {
  CompanyList: null,
  ECaseList: null,
  PersonalInfoList: null,
  password: '',
  employees: []
};

const profileSlice = createSlice({
  name: 'profileReducer',
  initialState,
  reducers: {
    getHeadCompanyListReducer: (state, action: PayloadAction<undefined>) => {},
    setHeadCompanyListReducer: (state, action: PayloadAction<CompanyListData>) => {
      state.CompanyList = action.payload;
    },

    getPersonalInfoReducer: (state, action: PayloadAction<undefined>) => {},
    setPersonalInfoReducer: (state, action: PayloadAction<PersonalInfoData>) => {
      state.PersonalInfoList = action.payload;
    },

    getECaseListReducer: (state, action: PayloadAction<undefined>) => {},
    setECaseListReducer: (state, action: PayloadAction<ECaseListData>) => {
      state.ECaseList = action.payload;
    },

    editHeadCompanyListReducer: (state, action: PayloadAction<EditCompanyListPayload>) => {},
    getGeneratePassword: (state, action: PayloadAction<undefined>) => {},
    setGeneratePassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    getAllDevTeamEmployees: (state, action: PayloadAction<undefined>) => {},
    setAllDevTeamEmployees: (state, action: PayloadAction<ArrayOfEmployees>) => {
      state.employees = action.payload;
    },
    editPersonalInfo: (state, action: PayloadAction<EditPersonalType>) => {}
  }
});

export const {
  getHeadCompanyListReducer,
  setHeadCompanyListReducer,
  getECaseListReducer,
  setECaseListReducer,
  editHeadCompanyListReducer,
  getPersonalInfoReducer,
  setPersonalInfoReducer,
  getGeneratePassword,
  setGeneratePassword,
  getAllDevTeamEmployees,
  setAllDevTeamEmployees,
  editPersonalInfo
} = profileSlice.actions;

const profileReducer = profileSlice.reducer;
export default profileReducer;

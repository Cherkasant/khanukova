import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ECaseListData } from '../../Components/constants/Modal/EcaseData'
import { CompanyListData, EditCompanyListPayload, PersonalInfoData } from '../Types/profile'

type ProfileReducerState = {
  CompanyList: CompanyListData | null
  ECaseList: ECaseListData | null
  PersonalInfoList: PersonalInfoData | null
}

const initialState: ProfileReducerState = {
  CompanyList: null,
  ECaseList: null,
  PersonalInfoList: null
}

const profileSlice = createSlice({
  name: 'profileReducer',
  initialState,
  reducers: {
    getHeadCompanyListReducer: (state, action: PayloadAction<undefined>) => {},
    setHeadCompanyListReducer: (state, action: PayloadAction<CompanyListData>) => {
      state.CompanyList = action.payload
    },

    getPersonalInfoReducer: (state, action: PayloadAction<undefined>) => {},
    setPersonalInfoReducer: (state, action: PayloadAction<PersonalInfoData>) => {
      state.PersonalInfoList = action.payload
    },

    getECaseListReducer: (state, action: PayloadAction<undefined>) => {},
    setECaseListReducer: (state, action: PayloadAction<ECaseListData>) => {
      state.ECaseList = action.payload
    },

    editHeadCompanyListReducer: (state, action: PayloadAction<EditCompanyListPayload>) => {}
  }
})

export const {
  getHeadCompanyListReducer,
  setHeadCompanyListReducer,
  getECaseListReducer,
  setECaseListReducer,
  editHeadCompanyListReducer,
  getPersonalInfoReducer,
  setPersonalInfoReducer
} = profileSlice.actions

const profileReducer = profileSlice.reducer
export default profileReducer

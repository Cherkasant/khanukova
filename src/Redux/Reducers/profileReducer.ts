import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ECaseListData } from '../../Components/constants/Modal/EcaseData'
import { CompanyListData, EditCompanyListPayload } from '../Types/profile'

type ProfileReducerState = {
  CompanyList: CompanyListData | null
  ECaseList: ECaseListData | null
}

const initialState: ProfileReducerState = {
  CompanyList: null,
  ECaseList: null
}

const profileSlice = createSlice({
  name: 'profileReducer',
  initialState,
  reducers: {
    getHeadCompanyListReducer: (state, action: PayloadAction<undefined>) => {},
    setHeadCompanyListReducer: (state, action: PayloadAction<CompanyListData>) => {
      state.CompanyList = action.payload
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
  editHeadCompanyListReducer
} = profileSlice.actions

const profileReducer = profileSlice.reducer
export default profileReducer

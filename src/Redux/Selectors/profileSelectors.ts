import { RootState } from '../store';

export default {
  getECaseList: (state: RootState) => state.profileReducer.ECaseList,
  getCompanyList: (state: RootState) => state.profileReducer.CompanyList,
  getPersonalInfo: (state: RootState) => state.profileReducer.PersonalInfoList,
  getGeneratePassword: (state: RootState) => state.profileReducer.password,
  getAllDevTeamEmplyees: (state: RootState) => state.profileReducer.employees,
  getInfoLoader: (state: RootState) => state.profileReducer.isInfoLoading
};

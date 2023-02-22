import { RootState } from "../store";

export default {
   getCompanyList: (state: RootState) => state.profileReducer.CompanyList,
};
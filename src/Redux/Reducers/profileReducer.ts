import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CompanyListData } from "../Types/profile";

type ProfileReducerState = {
   CompanyList: CompanyListData | null;
};

const initialState: ProfileReducerState = {
   CompanyList: null,
};

const profileSlice = createSlice({
   name: "profileReducer",
   initialState,
   reducers: {
      getHeadCompanyListReducer: (state, action: PayloadAction<undefined>) => {},
      setHeadCompanyListReducer: (state, action: PayloadAction<CompanyListData>) => {state.CompanyList = action.payload;},

      getPoCompanyListReducer: (state, action: PayloadAction<undefined>) => {},
      setPoCompanyListReducer: (state, action: PayloadAction<CompanyListData>) => {state.CompanyList = action.payload;},
      },
   },
);

export const {
   getHeadCompanyListReducer,
   setHeadCompanyListReducer,
   getPoCompanyListReducer,
   setPoCompanyListReducer
} = profileSlice.actions;

const profileReducer = profileSlice.reducer;
export default profileReducer;
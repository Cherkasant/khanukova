import { RootState } from '../store';

export default {
  getMonthIndex: (state: RootState) => state.calendarReducer.monthIndex,
  getUserId: (state: RootState) => state.calendarReducer.currentCalendarTab,
  getUserName: (state: RootState) => state.calendarReducer.daySelected,
  getCurrentCalendarTab: (state: RootState) => state.calendarReducer.currentCalendarTab
};

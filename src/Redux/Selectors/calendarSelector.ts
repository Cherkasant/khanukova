import { RootState } from '../store';

export default {
  getMonthIndex: (state: RootState) => state.calendarReducer.monthIndex,
  getUserId: (state: RootState) => state.calendarReducer.currentCalendarTab,
  getUserName: (state: RootState) => state.calendarReducer.daySelected,
  getCurrentCalendarTab: (state: RootState) => state.calendarReducer.currentCalendarTab,
  getCalendar: (state: RootState) => state.calendarReducer.calendar,
  calendarModalVisble: (state: RootState) => state.calendarReducer.calendarModalVisible,
  getEvents: (state: RootState) => state.calendarReducer.events,
  isLoadingCalendar: (state: RootState) => state.calendarReducer.isLoading
};

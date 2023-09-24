import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

import { CalendarTab, CalendarType, PostEventType, ProjectIdType } from '../Types/calendar';

type CalendarReducerState = {
  monthIndex: number;
  smallCalendarMonth: number;
  daySelected: null | number;
  showEventModal: boolean;
  savedEvents: [];
  selectedEvent: null;
  labels: [];
  filteredEvents: [];
  currentCalendarTab: CalendarTab;
  calendarId: string;
  calendar: CalendarType | null;
  calendarModalVisible: boolean;
};

const initialState: CalendarReducerState = {
  monthIndex: dayjs().month(),
  smallCalendarMonth: 0,
  daySelected: null,
  showEventModal: false,
  savedEvents: [],
  selectedEvent: null,
  labels: [],
  filteredEvents: [],
  currentCalendarTab: 'month',
  calendarId: '',
  calendar: null,
  calendarModalVisible: false
};

const calendarSlice = createSlice({
  name: 'profileReducer',
  initialState,
  reducers: {
    getMonthIndexReducer: (state, action: PayloadAction<undefined>) => {},
    setMonthIndexReducer: (state, action: PayloadAction<number>) => {
      state.monthIndex = action.payload;
    },
    getSmallCalendarReduce: (state, action: PayloadAction<undefined>) => {},
    setSmallCalendarReducer: (state, action: PayloadAction<number>) => {
      state.smallCalendarMonth = action.payload;
    },
    getDaySelected: (state, action: PayloadAction<undefined>) => {},
    setDaySelected: (state, action: PayloadAction<number>) => {
      state.daySelected = action.payload;
    },
    getShowEventModalReducer: (state, action: PayloadAction<undefined>) => {},
    setShowEventModalReducer: (state, action: PayloadAction<boolean>) => {
      state.showEventModal = action.payload;
    },
    getCurrentCalendarTabReducer: (state, action: PayloadAction<undefined>) => {},
    setCurrentCalendarTabReducer: (state, action: PayloadAction<CalendarTab>) => {
      state.currentCalendarTab = action.payload;
    },
    postEvent: (state, action: PayloadAction<PostEventType>) => {},
    postCalendar: (state, action: PayloadAction<ProjectIdType>) => {},
    setCalendar: (state, action: PayloadAction<CalendarType>) => {
      state.calendar = action.payload;
    },
    setCalendarModalVisible: (state, action: PayloadAction<boolean>) => {
      state.calendarModalVisible = action.payload;
    }
  }
});

export const {
  setMonthIndexReducer,
  setSmallCalendarReducer,
  setDaySelected,
  setShowEventModalReducer,
  setCurrentCalendarTabReducer,
  postEvent,
  postCalendar,
  setCalendar,
  setCalendarModalVisible
} = calendarSlice.actions;

const calendarReducer = calendarSlice.reducer;
export default calendarReducer;

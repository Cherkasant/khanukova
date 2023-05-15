import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

import { CalendarTab } from '../Types/calendar';

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
  currentCalendarTab: 'month'
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
    }
  }
});

export const {
  setMonthIndexReducer,
  setSmallCalendarReducer,
  setDaySelected,
  setShowEventModalReducer,
  setCurrentCalendarTabReducer
} = calendarSlice.actions;

const calendarReducer = calendarSlice.reducer;
export default calendarReducer;

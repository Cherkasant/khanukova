import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ArrayOfNotificationType, NotifyOptionsType, PatchNotifyOptionsType } from '../Types/notification';

type NotificationReducerState = {
  notifications: ArrayOfNotificationType;
  notifyOptions: NotifyOptionsType | null;
  isNotificationModalIsOpened: boolean;
};
const initialState: NotificationReducerState = {
  notifications: [],
  notifyOptions: null,
  isNotificationModalIsOpened: false
};

const NotificationSlice = createSlice({
  name: 'NotificationReducer',
  initialState,
  reducers: {
    startListening: (state, action: PayloadAction<undefined>) => {},
    getAllNotifications: (state, action: PayloadAction<undefined>) => {},
    setAllNotifications: (state, action: PayloadAction<ArrayOfNotificationType>) => {
      state.notifications = action.payload;
    },
    getNotifyOptions: (state, action: PayloadAction<undefined>) => {},
    setNotifyOptions: (state, action: PayloadAction<NotifyOptionsType>) => {
      state.notifyOptions = action.payload;
    },
    patchNotifyOptions: (state, action: PayloadAction<PatchNotifyOptionsType>) => {},
    setNotificationModalVisible: (state, action: PayloadAction<boolean>) => {
      state.isNotificationModalIsOpened = action.payload;
    }
  }
});

export const {
  startListening,
  getAllNotifications,
  setAllNotifications,
  getNotifyOptions,
  setNotifyOptions,
  patchNotifyOptions,
  setNotificationModalVisible
} = NotificationSlice.actions;
const notificationReducer = NotificationSlice.reducer;

export default notificationReducer;

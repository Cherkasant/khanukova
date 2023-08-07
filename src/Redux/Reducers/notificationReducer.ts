import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  ArrayOfNotificationType,
  ArrayOfWebSocket,
  NotifyOptionsType,
  PatchNotifyOptionsType,
  WebSocketType
} from '../Types/notification';

type NotificationReducerState = {
  notifications: ArrayOfNotificationType;
  notifyOptions: NotifyOptionsType | null;
  isNotificationModalIsOpened: boolean;
  webSocketNotification: WebSocketType | null;
  webSocketArray: ArrayOfWebSocket;
  profileNotification: Array<number>;
};
const initialState: NotificationReducerState = {
  notifications: [],
  notifyOptions: null,
  isNotificationModalIsOpened: false,
  webSocketNotification: null,
  webSocketArray: [],
  profileNotification: []
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
    },
    getWebsocket: (state, action: PayloadAction<undefined>) => {},
    setNotificationFromSocket: (state, action: PayloadAction<WebSocketType>) => {
      state.webSocketNotification = action.payload;
      state.webSocketArray.push(state.webSocketNotification);
    },
    setProfileNotification: (state, action: PayloadAction<Array<number>>) => {
      state.profileNotification = action.payload;
    },
    clearNotification: (state, action: PayloadAction<undefined>) => {
      state.webSocketArray.length = 0;
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
  setNotificationModalVisible,
  getWebsocket,
  setNotificationFromSocket,
  setProfileNotification,
  clearNotification
} = NotificationSlice.actions;
const notificationReducer = NotificationSlice.reducer;

export default notificationReducer;

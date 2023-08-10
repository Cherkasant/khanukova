import { RootState } from '../store';

export default {
  getAllNotifications: (state: RootState) => state.notificationReducer.notifications,
  getNotifyOptions: (state: RootState) => state.notificationReducer.notifyOptions,
  getNotficationModalVisible: (state: RootState) => state.notificationReducer.isNotificationModalIsOpened,
  getWebSocketNotifications: (state: RootState) => state.notificationReducer.webSocketArray,
  getProfileNotifications: (state: RootState) => state.notificationReducer.profileNotification
};

import { RootState } from '../store';

export default {
  getAllNotifications: (state: RootState) => state.notificationReducer.notifications,
  getNotifyOptions: (state: RootState) => state.notificationReducer.notifyOptions,
  getNotficationModalVisible: (state: RootState) => state.notificationReducer.isNotificationModalIsOpened
};

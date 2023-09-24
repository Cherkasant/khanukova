import { useEffect, useState } from 'react';

import classNames from 'classnames';

import { useDispatch, useSelector } from 'react-redux';

import { SettingsIcon } from '../../Assets/Notification/SettingsIcon';
import Title from '../../Components/Title';
import { TabsNotifications } from '../../Components/constants/@types';
import TabsListNotifications from '../../Components/TabsListNotifications';
import CardsListNotifications from '../../Components/CardsListNotifications';

import ModalNotifications from '../../Components/Modals/ModalNotifications';

import notificationSelector from '../../Redux/Selectors/notificationSelector';

import {
  clearNotification,
  getAllNotifications,
  setNotificationModalVisible
} from '../../Redux/Reducers/notificationReducer';

import { socket } from '../../Redux/Sagas/notificationSaga';

import { getPersonalInfoReducer } from '../../Redux/Reducers/profileReducer';

import authSelectors from '../../Redux/Selectors/authSelectors';

import styles from './NotificationsPage.module.css';

const TABS_NOTIFICATION_NAMES = [
  { name: 'All', key: TabsNotifications.All },
  { name: 'Actions', key: TabsNotifications.Actions },
  { name: 'Deadlines', key: TabsNotifications.Deadlines },
  { name: 'Events', key: TabsNotifications.Events },
  { name: 'Payments', key: TabsNotifications.Payments }
];

const NotificationsPage = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(notificationSelector.getAllNotifications);
  const isNotificationModalVisible = useSelector(notificationSelector.getNotficationModalVisible);
  const isLoggedIn = useSelector(authSelectors.getLoggedIn);
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getAllNotifications());
      socket.send(JSON.stringify('Hello'));
      dispatch(clearNotification());
      dispatch(getPersonalInfoReducer());
    }
  }, [isLoggedIn]);

  const [activeTab, setActiveTab] = useState(TabsNotifications.All);

  const onTabClick = (tab: TabsNotifications) => {
    setActiveTab(tab);
  };

  const onSettingsClick = () => {
    dispatch(setNotificationModalVisible(true));
  };

  const onScreenClick = () => {
    dispatch(setNotificationModalVisible(false));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title name={'Notifications'} className={styles.title} />
        <div className={styles.icon} onClick={onSettingsClick}>
          <SettingsIcon />
        </div>
      </div>

      <TabsListNotifications activeTab={activeTab} onClickedTab={onTabClick} TabsList={TABS_NOTIFICATION_NAMES} />
      <div className={styles.blueLine}>{''}</div>

      {notifications ? (
        <div>
          <CardsListNotifications CardsListNotifications={notifications} />
        </div>
      ) : (
        <div className={styles.empty}>
          Notifications will appear here when someone mentions you, creates an event, or changes settings
        </div>
      )}

      <div
        className={classNames(styles.wrapModal, {
          [styles.showModal]: isNotificationModalVisible
        })}
        onClick={onScreenClick}>
        <ModalNotifications modal={isNotificationModalVisible} />
      </div>
    </div>
  );
};

export default NotificationsPage;

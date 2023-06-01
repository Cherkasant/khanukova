import { useState } from 'react';

import classNames from 'classnames';

import { SettingsIcon } from '../../Assets/Notification/SettingsIcon';
import Title from '../../Components/Title';
import { TabsNotifications } from '../../Components/constants/@types';
import TabsListNotifications from '../../Components/TabsListNotifications';
import CardsListNotifications from '../../Components/CardsListNotifications';

import ModalNotifications from '../../Components/Modals/ModalNotifications';

import styles from './NotificationsPage.module.css';

const TABS_NOTIFICATION_NAMES = [
  { name: 'All', key: TabsNotifications.All },
  { name: 'Actions', key: TabsNotifications.Actions },
  { name: 'Deadlines', key: TabsNotifications.Deadlines },
  { name: 'Events', key: TabsNotifications.Events },
  { name: 'Payments', key: TabsNotifications.Payments }
];

const CARD_MOCK = {
  isRequest: true,
  id: 1,
  avatar: 'string',
  userName: 'Pever Anna',
  position: 'Developer',
  email: 'anna@gmail.com',
  projectName: 'Project name, Mobile App'
};

const CARD_MOCK_TWO = {
  isRequest: false,
  id: 2,
  avatar: 'string',
  userName: 'Developer 2',
  status: 'Added attachment',
  location: 'In Task 1',
  date: '4 min ago'
};

const MOCK_CARDSLISTNOTIFICATIONS = [CARD_MOCK, CARD_MOCK, CARD_MOCK_TWO, CARD_MOCK_TWO];

const NotificationsPage = () => {
  const isNotification = true;
  const [activeTab, setActiveTab] = useState(TabsNotifications.All);

  const onTabClick = (tab: TabsNotifications) => {
    setActiveTab(tab);
  };

  const [activeModal, setActiveModal] = useState(false);
  const onSettingsClick = () => {
    setActiveModal(true);
  };

  const onScreenClick = () => {
    setActiveModal(false);
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

      {isNotification ? (
        <div>
          <CardsListNotifications CardsListNotifications={MOCK_CARDSLISTNOTIFICATIONS} />
        </div>
      ) : (
        <div className={styles.empty}>
          Notifications will appear here when someone mentions you, creates an event, or changes settings
        </div>
      )}

      <div
        className={classNames(styles.wrapModal, {
          [styles.showModal]: activeModal
        })}
        onClick={onScreenClick}>
        <ModalNotifications modal={activeModal} />
      </div>
    </div>
  );
};

export default NotificationsPage;

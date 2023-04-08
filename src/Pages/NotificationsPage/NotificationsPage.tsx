import { useState } from 'react';

import { SettingsIcon } from '../../Assets/Notification/SettingsIcon';
import Title from '../../Components/Title';
import { TabsNotifications } from '../../Components/constants/@types';
import TabsListNotifications from '../../Components/TabsListNotifications';
import CardsListNotifications from '../../Components/CardsListNotifications';

import styles from './NotificationsPage.module.css';

const TABS_NOTIFICATION_NAMES = [
  { name: 'All', key: TabsNotifications.All },
  { name: 'Actions', key: TabsNotifications.Actions },
  { name: 'Deadlines', key: TabsNotifications.Deadlines },
  { name: 'Events', key: TabsNotifications.Events },
  { name: 'Payments', key: TabsNotifications.Payments }
];

const CARD_MOCK = {
  id: 1,
  avatar: 'string',
  userName: 'Developer 1',
  status: 'Updated status',
  location: 'In Task 1',
  date: '4 min ago'
};

const CARD_MOCK_TWO = {
  id: 1,
  avatar: 'string',
  userName: 'Developer 2',
  status: 'Added attachment',
  location: 'In Task 1',
  date: '4 min ago'
};

const MOCK_CARDSLISTNOTIFICATIONS = [CARD_MOCK, CARD_MOCK, CARD_MOCK, CARD_MOCK, CARD_MOCK_TWO];

const NotificationsPage = () => {
  const isNotification = true;
  const [activeTab, setActiveTab] = useState(TabsNotifications.All);

  const onTabClick = (tab: TabsNotifications) => {
    setActiveTab(tab);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title name={'Notifications'} className={styles.title} />
        <div className={styles.icon}>
          <SettingsIcon />
        </div>
      </div>

      <TabsListNotifications activeTab={activeTab} onClickedTab={onTabClick} TabsList={TABS_NOTIFICATION_NAMES} />
      <div className={styles.blueLine}>{''}</div>

      <div>
        <CardsListNotifications CardsListNotifications={MOCK_CARDSLISTNOTIFICATIONS} />
      </div>
    </div>
  );
};

export default NotificationsPage;

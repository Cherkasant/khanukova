import { FC, useState } from 'react';

import { CardsListNotificationsType } from '../constants/@types';
import CardNotifications from '../CardNotifications';

import styles from './CardsListNotifications.module.css';

type CardsListNotificationsProps = {
  CardsListNotifications: CardsListNotificationsType | null
}

const CardsListNotifications: FC<CardsListNotificationsProps> = ({ CardsListNotifications }) => {
  const [isReading, setIsReading] = useState(false);

  const onNotificationClick = () => {
    setIsReading(!isReading);
  };

  return CardsListNotifications?.length ? (
    <div className={styles.container}>
      {CardsListNotifications.map((card, index) => {
        return <CardNotifications key={index} card={card} onClick={onNotificationClick} />;
      })}
    </div>
  ) : (
    <div className={styles.empty}>
      {'Notifications will appear here when someone mentions you, creates an event, or changes settings'}
    </div>
  );
};

export default CardsListNotifications;

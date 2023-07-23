import { FC, useState } from 'react';

import CardNotifications from '../CardNotifications';

import { ArrayOfNotificationType } from '../../Redux/Types/notification';

import styles from './CardsListNotifications.module.css';

type CardsListNotificationsProps = {
  CardsListNotifications: ArrayOfNotificationType | null;
};

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

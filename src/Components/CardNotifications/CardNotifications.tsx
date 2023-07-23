import { FC, useState } from 'react';

import classNames from 'classnames';

import { Avatar } from '../../Assets/Notification/Avatar';

import PuzzleButton, { PuzzleButtonTypes } from '../PuzzleButton';

import { NotificationType } from '../../Redux/Types/notification';

import styles from './CardNotifications.module.css';

type CardNotificationsProps = {
  card: NotificationType;
  onClick?: () => void;
  className?: string;
};
const CardNotifications: FC<CardNotificationsProps> = ({ card }) => {
  const isRequest = false;
  const [isReading, setIsReading] = useState(false);

  const onNotificationClick = () => {
    setIsReading(!isReading);
  };
  return (
    <div
      className={classNames(styles.container, {
        [styles.containerIsReading]: isReading
      })}
      onClick={onNotificationClick}>
      {isRequest ? (
        <div className={styles.containerCard}>
          <div className={styles.info}>
            <div className={styles.sectionInfo}>
              <div className={styles.avatar}>
                <Avatar />
              </div>
              <div className={styles.userName}>{card?.editor}</div>
            </div>
            <div className={styles.position}>{card?.project}</div>
            <div className={styles.email}>{card?.project}</div>
            <div className={styles.projectName}>{card?.project}</div>
          </div>

          <div className={styles.containerButtons}>
            <PuzzleButton
              btnTitle={'Reject'}
              btnType={PuzzleButtonTypes.TextButton}
              onClick={() => {}}
              btnClassName={styles.button}
            />

            <PuzzleButton
              btnTitle={'Approve'}
              btnType={PuzzleButtonTypes.TextButton}
              onClick={() => {}}
              btnClassName={styles.button}
            />
          </div>
        </div>
      ) : (
        <div className={styles.containerCard}>
          <div className={styles.info}>
            <div className={styles.sectionInfo}>
              <div className={styles.avatar}>
                <Avatar />
              </div>
              <div className={styles.userName}>{card?.editor}</div>
            </div>
            <div className={styles.status}>{card?.action}</div>
            <div className={styles.location}>{card?.project}</div>
          </div>

          <div className={styles.date}>{card?.date_created}</div>
        </div>
      )}
    </div>
  );
};

export default CardNotifications;

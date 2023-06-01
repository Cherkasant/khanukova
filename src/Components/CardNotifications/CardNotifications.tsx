import { FC, useState } from 'react';

import classNames from 'classnames';

import { CardNotificationsType } from '../constants/@types';
import { Avatar } from '../../Assets/Notification/Avatar';

import PuzzleButton, { PuzzleButtonTypes } from '../PuzzleButton';

import styles from './CardNotifications.module.css';

type CardNotificationsProps = {
  card: CardNotificationsType;
  onClick?: () => void;
  className?: string;
};
const CardNotifications: FC<CardNotificationsProps> = ({ card }) => {
  const isRequest = card.isRequest;
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
              <div className={styles.userName}>{card?.userName}</div>
            </div>
            <div className={styles.position}>{card?.position}</div>
            <div className={styles.email}>{card?.email}</div>
            <div className={styles.projectName}>{card?.projectName}</div>
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
              <div className={styles.userName}>{card?.userName}</div>
            </div>
            <div className={styles.status}>{card?.status}</div>
            <div className={styles.location}>{card?.location}</div>
          </div>

          <div className={styles.date}>{card?.date}</div>
        </div>
      )}
    </div>
  );
};

export default CardNotifications;

import { useState } from 'react';

import { Checkbox } from '@mui/material';

import { INotification, IOption, initialNotificationTypes } from '../ModalCalendar';
import DownArrowIcon from '../../../../Assets/icons/DownArrowIcon';
import UpArrowIcon from '../../../../Assets/icons/UpArrowIcon';
import { CheckedIcon } from '../../../../Assets/icons/CheckedIcon';
import { RemoveNotificationIcon } from '../../../../Assets/icons/RemoveNotificationIcon';

import styles from '../ModalCalendar.module.css';

interface NotificationBlockProps {
  notification: INotification;
  onNotificationTypeChange: (
    setOptions: React.Dispatch<React.SetStateAction<Array<IOption>>>,
    setSelectedOptions: React.Dispatch<React.SetStateAction<Array<IOption>>>,
    id: number
  ) => void;
  toggleList: (
    isOptionListVisible: boolean,
    setIsOptionListVisible: React.Dispatch<React.SetStateAction<boolean>>
  ) => void;
  onRemoveNotification: (id: number) => void;
}

const NotificationBlock: React.FC<NotificationBlockProps> = ({
  notification,
  onNotificationTypeChange,
  toggleList,
  onRemoveNotification
}) => {
  const [isNotificationTypeListVisible, setIsNotificationTypeListVisible] = useState(false);
  const [notificationTypes, setNotificationTypes] = useState(initialNotificationTypes);
  const [selectedNotificationTypes, setSelectedNotificationTypes] = useState<Array<IOption>>([
    { id: 1, name: 'Notification', isChecked: true }
  ]);
  const [isTimeUnitListVisible, setIsTimeUnitListVisible] = useState(false);
  const [selectedTimeUnit, setSelectedTimeUnit] = useState(notification.timeUnit);

  const toggleTimeUnitList = () => {
    setIsTimeUnitListVisible(!isTimeUnitListVisible);
  };

  const handleSelectTimeUnit = (timeUnit: string) => {
    setSelectedTimeUnit(timeUnit);
    toggleTimeUnitList();
  };

  return (
    <div className={styles.notification} key={notification.id}>
      <button
        className={styles.selectNotificationTypeBtn}
        onClick={() => toggleList(isNotificationTypeListVisible, setIsNotificationTypeListVisible)}>
        <span className={styles.selectedNotificationTypes}>
          {selectedNotificationTypes.map((option) => option.name).join(', ')}
        </span>
        {isNotificationTypeListVisible ? <UpArrowIcon /> : <DownArrowIcon />}
      </button>
      {isNotificationTypeListVisible && (
        <ul className={styles.notificationTypeList}>
          {notificationTypes.map((notificationType) => (
            <li key={notificationType.id}>
              <Checkbox
                checked={notificationType.isChecked}
                onChange={() =>
                  onNotificationTypeChange(setNotificationTypes, setSelectedNotificationTypes, notificationType.id)
                }
                icon={<span className={styles.checkboxIcon} />}
                checkedIcon={
                  <span className={`${styles.checkboxIcon} ${styles.checkedboxIcon}`}>
                    <CheckedIcon />
                  </span>
                }
              />
              <span className={styles.listItemName}>{notificationType.name}</span>
            </li>
          ))}
        </ul>
      )}
      <input type="text" className={styles.notificationTimeOut} defaultValue={notification.notificationTimeout} />
      <div className={styles.timeUnitBlock}>
        <button className={styles.timeUnitBtn} onClick={toggleTimeUnitList}>
          <span>{selectedTimeUnit}</span>
          {isTimeUnitListVisible ? <UpArrowIcon /> : <DownArrowIcon />}
        </button>
        {isTimeUnitListVisible && (
          <ul className={styles.timeUnitList}>
            <li onClick={() => handleSelectTimeUnit('Min')}>Min</li>
            <li onClick={() => handleSelectTimeUnit('Hours')}>Hours</li>
            <li onClick={() => handleSelectTimeUnit('Days')}>Days</li>
            <li onClick={() => handleSelectTimeUnit('Weeks')}>Weeks</li>
          </ul>
        )}
      </div>
      <button className={styles.removeNotificationBtn} onClick={() => onRemoveNotification(notification.id)}>
        <RemoveNotificationIcon />
      </button>
    </div>
  );
};

export default NotificationBlock;

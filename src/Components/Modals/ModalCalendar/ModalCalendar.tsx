import React, { useEffect, useRef, useState } from 'react';

import { SlotInfo } from 'react-big-calendar';
import { Checkbox, IconButton, Modal } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

import { useDispatch } from 'react-redux';

import { EditTitleIcon } from '../../../Assets/icons/EditTitleIcon';
import PuzzleButton, { PuzzleButtonTypes } from '../../PuzzleButton';
import SmallCalendar from '../../SmallCalendar/SmallCalendar';
import { CheckedIcon } from '../../../Assets/icons/CheckedIcon';
import DownArrowIcon from '../../../Assets/icons/DownArrowIcon';
import UpArrowIcon from '../../../Assets/icons/UpArrowIcon';
import AddDocIcon from '../../../Assets/icons/AddDocIcon';
import { AddNotificationIcon } from '../../../Assets/icons/AddNotificationIcon';

import { postEvent } from '../../../Redux/Reducers/calendarReducer';

import styles from './ModalCalendar.module.css';
import EventTime from './EventTime/EventTime';
import NotificationBlock from './NotificationBlock/NotificationBlock';

interface ModalCalendarProps {
  selectedSlot: SlotInfo;
  onClose: () => void;
  onAddEvent: (title: string) => void;
  isClosed: boolean;
}

export interface IOption {
  id: number;
  name: string;
  isChecked: boolean;
}

export interface INotification {
  id: number;
  notificationType: IOption;
  notificationTimeout: string;
  timeUnit: string;
}

const initialMembers: Array<IOption> = [
  { id: 1, name: 'Dev 1', isChecked: false },
  { id: 2, name: 'Dev 2', isChecked: false },
  { id: 3, name: 'Dev 3', isChecked: false },
  { id: 4, name: 'Dev 4', isChecked: false },
  { id: 5, name: 'Dev 5', isChecked: false }
];

export const initialNotificationTypes: Array<IOption> = [
  { id: 1, name: 'Notification', isChecked: true },
  { id: 2, name: 'Email', isChecked: false }
];

const initialNotifications: Array<INotification> = [
  {
    id: Date.now(),
    notificationType: initialNotificationTypes[0],
    notificationTimeout: '30',
    timeUnit: 'Min'
  }
];

const ModalCalendar = ({ selectedSlot, onClose, onAddEvent, isClosed }: ModalCalendarProps) => {
  const dispatch = useDispatch();

  const [eventTitle, setEventTitle] = useState('Title new event');
  const [isEditable, setIsEditable] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [repeatEveryWeek, setRepeatEveryWeek] = useState(false);
  const [repeatEveryDay, setRepeatEveryDay] = useState(false);
  const [isEventInfo, setIsEventInfo] = useState(true);
  const [isMemberListVisible, setIsMemberListVisible] = useState(false);
  const [members, setMembers] = useState(initialMembers);
  const [selectedMembers, setSelectedMembers] = useState<Array<IOption>>([]);
  const [notifications, setNotifications] = useState<Array<INotification>>(initialNotifications);
  const [description, setDescription] = useState('');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEventTitle(event.target.value);
  };

  function padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }

  function formatDate(date: Date) {
    return (
      [date.getFullYear(), padTo2Digits(date.getMonth() + 1), padTo2Digits(date.getDate())].join('-') +
      ' ' +
      [padTo2Digits(date.getHours()), padTo2Digits(date.getMinutes()), padTo2Digits(date.getSeconds())].join(':')
    );
  }

  const addEvent = () => {
    onAddEvent(eventTitle);
    const formattedStart = formatDate(selectedSlot.start).toString();
    const formattedEnd = formatDate(selectedSlot.start).toString();
    dispatch(
      postEvent({
        calendarId: 'p4iqrab23kupukrlg2rrhvahgs@group.calendar.google.com',
        data: { summary: '2', description: description, start: formattedStart, end: formattedEnd },
        callback: () => {}
      })
    );
  };

  const handleEditTitle = () => {
    setIsEditable(true);
  };

  useEffect(() => {
    if (isEditable && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditable]);

  const handleInputBlur = () => {
    setIsEditable(false);
  };

  const handleRepeatEveryWeekChange = () => {
    setRepeatEveryWeek(!repeatEveryWeek);
  };

  const handleRepeatEveryDayChange = () => {
    setRepeatEveryDay(!repeatEveryDay);
  };

  const showEventInfo = () => {
    setIsEventInfo(true);
  };

  const showCalendar = () => {
    setIsEventInfo(false);
  };

  const toggleList = (
    isOptionListVisible: boolean,
    setIsOptionListVisible: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setIsOptionListVisible(!isOptionListVisible);
  };

  const handleCheckboxChange = (
    setOptions: React.Dispatch<React.SetStateAction<Array<IOption>>>,
    setSelectedOptions: React.Dispatch<React.SetStateAction<Array<IOption>>>,
    id: number
  ) => {
    setOptions((prevOptions) =>
      prevOptions.map((option) => {
        if (option.id === id) {
          const updatedOption = { ...option, isChecked: !option.isChecked };
          if (updatedOption.isChecked) {
            setSelectedOptions((prevSelected) => [...prevSelected, updatedOption]);
          } else {
            setSelectedOptions((prevSelected) => prevSelected.filter((selectedOption) => selectedOption.id !== id));
          }
          return updatedOption;
        }
        return option;
      })
    );
  };

  const getSelectedOptionNames = (selectedOptions: Array<IOption>) => {
    return selectedOptions.map((option) => option.name).join(', ');
  };

  const addNotification = () => {
    const newNotification = {
      id: Date.now(),
      notificationType: initialNotificationTypes[0],
      notificationTimeout: '30',
      timeUnit: 'Min'
    };
    setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
  };

  const removeNotification = (idToRemove: number) => {
    setNotifications((prevNotifications) => prevNotifications.filter((notification) => notification.id !== idToRemove));
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  return (
    <Modal open={true} onClose={onClose}>
      <div className={`${styles.modalContainer} ${isClosed ? styles.closed : styles.opened}`}>
        <div className={styles.closeModal}>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className={styles.eventTitle}>
          {isEditable ? (
            <input
              ref={inputRef}
              type="text"
              value={eventTitle}
              onChange={handleTitleChange}
              onBlur={handleInputBlur}
            />
          ) : (
            <div className={styles.editableTitle}>
              {eventTitle}
              <IconButton onClick={handleEditTitle} className={styles.editTitle}>
                <EditTitleIcon />
              </IconButton>
            </div>
          )}
        </div>
        <EventTime />
        <div className={styles.checkboxContainer}>
          <Checkbox
            checked={repeatEveryWeek}
            onChange={handleRepeatEveryWeekChange}
            className={styles.checkbox}
            icon={<span className={styles.checkboxIcon} />}
            checkedIcon={
              <span className={`${styles.checkboxIcon} ${styles.checkedboxIcon}`}>
                <CheckedIcon />
              </span>
            }
          />
          <span className={styles.checkboxLabel}>Repeat every week</span>
          <Checkbox
            checked={repeatEveryDay}
            onChange={handleRepeatEveryDayChange}
            className={styles.checkbox}
            icon={<span className={styles.checkboxIcon} />}
            checkedIcon={
              <span className={`${styles.checkboxIcon} ${styles.checkedboxIcon}`}>
                <CheckedIcon />
              </span>
            }
          />
          <span className={styles.checkboxLabel}>Repeat every day</span>
        </div>
        <button className={`${styles.selectBtn} ${isEventInfo ? styles.activeView : ''}`} onClick={showEventInfo}>
          Event information
        </button>
        <button className={`${styles.selectBtn} ${!isEventInfo ? styles.activeView : ''}`} onClick={showCalendar}>
          Take the time
        </button>
        {isEventInfo ? (
          <div className={styles.eventInfo}>
            <div className={styles.createdBy}>Created by</div>
            <h3 className={styles.infoTitle}>Select members</h3>
            <div className={styles.selectMembers}>
              <button
                className={styles.selectMembersBtn}
                onClick={() => toggleList(isMemberListVisible, setIsMemberListVisible)}>
                {selectedMembers.length > 0 ? (
                  <span className={styles.selected}>{getSelectedOptionNames(selectedMembers)}</span>
                ) : (
                  <span className={styles.notSelected}>Select members</span>
                )}
                {isMemberListVisible ? <UpArrowIcon /> : <DownArrowIcon />}
              </button>
              {isMemberListVisible && (
                <ul className={styles.membersList}>
                  {members.map((member) => (
                    <li key={member.id}>
                      <Checkbox
                        checked={member.isChecked}
                        onChange={() => handleCheckboxChange(setMembers, setSelectedMembers, member.id)}
                        icon={<span className={styles.checkboxIcon} />}
                        checkedIcon={
                          <span className={`${styles.checkboxIcon} ${styles.checkedboxIcon}`}>
                            <CheckedIcon />
                          </span>
                        }
                      />
                      <span className={styles.listItemName}>{member.name}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <h3 className={styles.infoTitle}>Notification</h3>
            {notifications.map((notification) => (
              <NotificationBlock
                key={notification.id}
                notification={notification}
                toggleList={toggleList}
                onNotificationTypeChange={handleCheckboxChange}
                onRemoveNotification={(id) => removeNotification(id)}
              />
            ))}
            <button className={styles.addNotificationBlockBtn} onClick={addNotification}>
              <AddNotificationIcon /> Add notification
            </button>
            <h3 className={styles.infoTitle}>Description</h3>
            <textarea
              className={styles.descriptionTextarea}
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Add a description"
            />
            <div className={styles.attachmentBlock}>
              <h3 className={`${styles.infoTitle} ${styles.titleWithoutMargin}`}>Attachment</h3>
              <AddDocIcon />
            </div>
            <div className={styles.buttonsContainer}>
              <PuzzleButton
                btnTitle={'Cancel'}
                btnType={PuzzleButtonTypes.TextButton}
                btnClassName={styles.cancelBtn}
                onClick={onClose}
              />
              <PuzzleButton
                btnTitle={'Save'}
                btnType={PuzzleButtonTypes.TextButton}
                btnClassName={styles.saveBtn}
                onClick={addEvent}
              />
            </div>
          </div>
        ) : (
          <SmallCalendar />
        )}
      </div>
    </Modal>
  );
};

export default ModalCalendar;

import React, { useEffect, useRef, useState } from 'react';

import { SlotInfo } from 'react-big-calendar';
import { Modal, IconButton, Checkbox } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { EditTitleIcon } from '../../../Assets/icons/EditTitleIcon';
import PuzzleButton, { PuzzleButtonTypes } from '../../PuzzleButton';
import SmallCalendar from '../../SmallCalendar/SmallCalendar';
import { CheckedIcon } from '../../../Assets/icons/CheckedIcon';
import DownArrowIcon from '../../../Assets/icons/DownArrowIcon';
import UpArrowIcon from '../../../Assets/icons/UpArrowIcon';

import styles from './ModalCalendar.module.css';
import EventTime from './EventTime/EventTime';

interface ModalCalendarProps {
  selectedSlot: SlotInfo;
  onClose: () => void;
  onAddEvent: (title: string) => void;
  isClosed: boolean;
}

type MemberType = {
  id: number;
  name: string;
  isChecked: boolean;
};

const initialMembers: Array<MemberType> = [
  { id: 1, name: 'Dev 1', isChecked: false },
  { id: 2, name: 'Dev 2', isChecked: false },
  { id: 3, name: 'Dev 3', isChecked: false },
  { id: 4, name: 'Dev 4', isChecked: false },
  { id: 5, name: 'Dev 5', isChecked: false }
];

const ModalCalendar = ({ selectedSlot, onClose, onAddEvent, isClosed }: ModalCalendarProps) => {
  const [eventTitle, setEventTitle] = useState('Title new event');
  const [isEditable, setIsEditable] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [repeatEveryWeek, setRepeatEveryWeek] = useState(false);
  const [repeatEveryDay, setRepeatEveryDay] = useState(false);
  const [isEventInfo, setIsEventInfo] = useState(true);
  const [isMemberListVisible, setIsMemberListVisible] = useState(false);
  const [members, setMembers] = useState(initialMembers);
  const [selectedMembers, setSelectedMembers] = useState<Array<MemberType>>([]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEventTitle(event.target.value);
  };

  const addEvent = () => {
    onAddEvent(eventTitle);
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

  const toggleMemberList = () => {
    setIsMemberListVisible(!isMemberListVisible);
  };

  const handleMemberCheckboxChange = (memberId: number) => {
    setMembers((prevMembers) =>
      prevMembers.map((member) => {
        if (member.id === memberId) {
          const updatedMember = { ...member, isChecked: !member.isChecked };
          if (updatedMember.isChecked) {
            setSelectedMembers((prevSelected) => [...prevSelected, updatedMember]);
          } else {
            setSelectedMembers((prevSelected) =>
              prevSelected.filter((selectedMember) => selectedMember.id !== memberId)
            );
          }
          return updatedMember;
        }
        return member;
      })
    );
  };

  const getSelectedMemberNames = () => {
    return selectedMembers.map((member) => member.name).join(', ');
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
        <EventTime start={selectedSlot.start} end={selectedSlot.end} />
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
          <>
            <div className={styles.createdBy}>Created by</div>
            <div className={styles.selectMembers}>Select members</div>
            <button className={styles.selectMembersBtn} onClick={toggleMemberList}>
              <span>{selectedMembers.length > 0 ? getSelectedMemberNames() : 'Select members'}</span>
              {isMemberListVisible ? <UpArrowIcon /> : <DownArrowIcon />}
            </button>
            {isMemberListVisible && (
              <div className={styles.membersList}>
                {members.map((member) => (
                  <div key={member.id} className={styles.member}>
                    <Checkbox
                      checked={member.isChecked}
                      onChange={() => handleMemberCheckboxChange(member.id)}
                      className={styles.memberCheckbox}
                      icon={<span className={styles.checkboxIcon} />}
                      checkedIcon={
                        <span className={`${styles.checkboxIcon} ${styles.checkedboxIcon}`}>
                          <CheckedIcon />
                        </span>
                      }
                    />
                    <span className={styles.memberName}>{member.name}</span>
                  </div>
                ))}
              </div>
            )}
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
          </>
        ) : (
          <SmallCalendar />
        )}
      </div>
    </Modal>
  );
};

export default ModalCalendar;

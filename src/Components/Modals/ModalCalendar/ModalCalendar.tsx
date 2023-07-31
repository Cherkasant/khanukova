import React, { useEffect, useRef, useState } from 'react';

import { SlotInfo } from 'react-big-calendar';
import { Modal, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { EditTitleIcon } from '../../../Assets/icons/EditTitleIcon';
import PuzzleButton, { PuzzleButtonTypes } from '../../PuzzleButton';
import SmallCalendar from '../../SmallCalendar/SmallCalendar';

import styles from './ModalCalendar.module.css';
import EventTime from './EventTime/EventTime';

interface ModalCalendarProps {
  selectedSlot: SlotInfo;
  onClose: () => void;
  onAddEvent: (title: string) => void;
}

const ModalCalendar = ({ selectedSlot, onClose, onAddEvent }: ModalCalendarProps) => {
  const [eventTitle, setEventTitle] = useState('Title new event');
  const [isEditable, setIsEditable] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

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

  return (
    <Modal open={true} onClose={onClose}>
      <div className={`${styles.modalContainer} ${selectedSlot ? styles.opened : styles.closed}`}>
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
        <SmallCalendar />
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
    </Modal>
  );
};

export default ModalCalendar;

import moment from 'moment';
import DatePicker, { ReactDatePickerCustomHeaderProps } from 'react-datepicker';
import { IconButton } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { SlotInfo } from 'react-big-calendar';

import UpArrowIcon from '../../../../Assets/icons/UpArrowIcon';
import DownArrowIcon from '../../../../Assets/icons/DownArrowIcon';
import slotSelectors from '../../../../Redux/Selectors/slotSelectors';
import { setSelectedSlot } from '../../../../Redux/Reducers/slotReducer';

import 'react-datepicker/dist/react-datepicker.css';
import styles from './EventTime.module.css';

const EventTime = () => {
  const selectedSlot = useSelector(slotSelectors.getSelectedSlot);
  const dispatch = useDispatch();

  const start = selectedSlot!.start;
  const end = selectedSlot!.end;

  const formatTime = (date: Date, format: string) => {
    return moment(date).format(format);
  };

  const startDate = formatTime(start, 'YYYY, MMM D');
  const endDate = formatTime(end, 'YYYY, MMM D');
  const startTime = formatTime(start, moment(start).minutes() === 0 ? 'h A' : 'h:mm A');
  const endTime = formatTime(end, moment(end).minutes() === 0 ? 'h A' : 'h:mm A');

  const handleStartDateChange = (newDate: Date) => {
    if (selectedSlot) {
      const newSlotInfo: SlotInfo = { ...selectedSlot, start: newDate };
      if (newDate > newSlotInfo.end) {
        newSlotInfo.end = moment(newDate).add(1, 'day').toDate();
      }
      if (moment(newDate).isSame(newSlotInfo.end, 'day') && moment(newDate).isSame(newSlotInfo.end, 'minute')) {
        newSlotInfo.end = moment(newDate).add(30, 'minutes').toDate();
      }
      dispatch(setSelectedSlot(newSlotInfo));
    }
  };

  const handleStartTimeChange = (newTime: Date) => {
    if (selectedSlot) {
      const newSlotInfo: SlotInfo = { ...selectedSlot, start: newTime };
      if (newTime > newSlotInfo.end) {
        newSlotInfo.end = moment(newTime).add(30, 'minutes').toDate();
      }
      if (moment(newTime).isSame(newSlotInfo.end, 'minute')) {
        newSlotInfo.end = moment(newTime).add(30, 'minutes').toDate();
      }
      dispatch(setSelectedSlot(newSlotInfo));
    }
  };

  const handleEndTimeChange = (newTime: Date) => {
    if (selectedSlot) {
      const newSlotInfo: SlotInfo = { ...selectedSlot, end: newTime };
      if (newTime < newSlotInfo.start) {
        newSlotInfo.start = moment(newTime).subtract(30, 'minutes').toDate();
      }
      if (moment(newTime).isSame(newSlotInfo.start, 'minute')) {
        newSlotInfo.start = moment(newTime).subtract(30, 'minutes').toDate();
      }
      dispatch(setSelectedSlot(newSlotInfo));
    }
  };

  const handleEndDateChange = (newDate: Date) => {
    if (selectedSlot) {
      const newSlotInfo: SlotInfo = { ...selectedSlot, end: newDate };
      if (newDate < newSlotInfo.start) {
        newSlotInfo.start = moment(newDate).subtract(1, 'day').toDate();
      }
      if (moment(newDate).isSame(newSlotInfo.start, 'day') && moment(newDate).isSame(newSlotInfo.start, 'minute')) {
        newSlotInfo.start = moment(newDate).subtract(30, 'minutes').toDate();
      }
      dispatch(setSelectedSlot(newSlotInfo));
    }
  };

  const CustomHeader = ({ date, decreaseMonth, increaseMonth }: ReactDatePickerCustomHeaderProps) => {
    const formattedDate = moment(date).format('MMM YYYY');

    return (
      <div className={styles.customHeader}>
        <div>{formattedDate}</div>
        <div className={styles.changeMonth}>
          <IconButton onClick={decreaseMonth}>
            <UpArrowIcon />
          </IconButton>
          <IconButton onClick={increaseMonth}>
            <DownArrowIcon />
          </IconButton>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.eventTime}>
      <div className={styles.datePickerContainer}>
        <DatePicker
          selected={start}
          onChange={handleStartDateChange}
          customInput={<span className={styles.timeItem}>{startDate}</span>}
          renderCustomHeader={CustomHeader}
        />
      </div>
      <div className={styles.datePickerContainer}>
        <DatePicker
          showTimeSelect
          selected={start}
          onChange={handleStartTimeChange}
          customInput={<span className={styles.timeItem}>{startTime}</span>}
          showTimeSelectOnly
        />
      </div>
      <div className={styles.datePickerContainer}>
        <DatePicker
          showTimeSelect
          selected={end}
          onChange={handleEndTimeChange}
          customInput={<span className={styles.timeItem}>{endTime}</span>}
          showTimeSelectOnly
        />
      </div>
      {startDate !== endDate && (
        <div className={styles.datePickerContainer}>
          <DatePicker
            selected={end}
            onChange={handleEndDateChange}
            customInput={<span className={styles.timeItem}>{endDate}</span>}
            renderCustomHeader={CustomHeader}
          />
        </div>
      )}
    </div>
  );
};

export default EventTime;

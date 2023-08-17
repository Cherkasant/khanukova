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
      const adjustedEndDate = moment(newDate).isAfter(end) ? moment(newDate).add(1, 'day').toDate() : end;
      const newSlotInfo: SlotInfo = { ...selectedSlot, start: newDate, end: adjustedEndDate };
      dispatch(setSelectedSlot(newSlotInfo));
    }
  };

  const handleEndDateChange = (newDate: Date) => {
    if (selectedSlot) {
      const adjustedStartDate = moment(newDate).isBefore(start) ? moment(newDate).subtract(1, 'day').toDate() : start;
      const newSlotInfo: SlotInfo = { ...selectedSlot, start: adjustedStartDate, end: newDate };
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
          onChange={handleStartDateChange}
          customInput={<span className={styles.timeItem}>{startDate}</span>}
          renderCustomHeader={CustomHeader}
        />
      </div>
      <span className={styles.timeItem}>{startTime}</span>
      <span className={styles.timeItem}>{endTime}</span>
      {startDate !== endDate && (
        <div className={styles.datePickerContainer}>
          <DatePicker
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

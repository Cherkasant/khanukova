import moment from 'moment';
import DatePicker, { ReactDatePickerCustomHeaderProps } from 'react-datepicker';
import { IconButton } from '@mui/material';

import UpArrowIcon from '../../../../Assets/icons/UpArrowIcon';
import DownArrowIcon from '../../../../Assets/icons/DownArrowIcon';

import 'react-datepicker/dist/react-datepicker.css';
import styles from './EventTime.module.css';

interface EventTimeProps {
  start: Date;
  end: Date;
}

const EventTime = ({ start, end }: EventTimeProps) => {
  const formatTime = (date: Date, format: string) => {
    return moment(date).format(format);
  };

  const startDate = formatTime(start, 'YYYY, MMM D');
  const endDate = formatTime(end, 'YYYY, MMM D');
  const startTime = formatTime(start, moment(start).minutes() === 0 ? 'h A' : 'h:mm A');
  const endTime = formatTime(end, moment(end).minutes() === 0 ? 'h A' : 'h:mm A');

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
          onChange={(date) => {}}
          customInput={<span className={styles.timeItem}>{startDate}</span>}
          renderCustomHeader={CustomHeader}
        />
      </div>
      <span className={styles.timeItem}>{startTime}</span>
      <span className={styles.timeItem}>{endTime}</span>
      {startDate !== endDate && (
        <div className={styles.datePickerContainer}>
          <DatePicker
            onChange={(date) => {}}
            customInput={<span className={styles.timeItem}>{endDate}</span>}
            renderCustomHeader={CustomHeader}
          />
        </div>
      )}
    </div>
  );
};

export default EventTime;

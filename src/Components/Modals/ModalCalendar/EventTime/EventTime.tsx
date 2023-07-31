import moment from 'moment';

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

  return (
    <div className={styles.eventTime}>
      <span className={styles.timeItem}>{startDate}</span>
      <span className={styles.timeItem}>{startTime}</span>
      <span className={styles.timeItem}>{endTime}</span>
      {startDate !== endDate && <span className={styles.timeItem}>{endDate}</span>}
    </div>
  );
};

export default EventTime;

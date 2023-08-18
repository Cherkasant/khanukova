import moment from 'moment';

import styles from './SmallCalendarCustomHeader.module.css';

interface SmallCalendarCustomHeaderProps {
  date: Date;
}

const SmallCalendarCustomHeader = ({ date }: SmallCalendarCustomHeaderProps) => {
  const dayOfWeek = moment(date).format('ddd');
  const dayOfMonth = moment(date).format('MMM D');

  return (
    <>
      <div className={styles.weekDay}>{dayOfWeek}</div>
      <div className={styles.dayOfMonth}>{dayOfMonth}</div>
    </>
  );
};

export default SmallCalendarCustomHeader;

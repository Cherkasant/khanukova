import moment from 'moment';

import styles from './CustomHeader.module.css';

interface CustomHeaderProps {
  date: Date;
}

const CustomHeader = ({ date }: CustomHeaderProps) => {
  const dayOfWeek = moment(date).format('dddd');
  const dayOfMonth = moment(date).format('MMM D');

  return (
    <>
      <div className={styles.weekDay}>{dayOfWeek}</div>
      <div className={styles.dayOfMonth}>{dayOfMonth}</div>
    </>
  );
};

export default CustomHeader;

import dayjs from 'dayjs';

import DayCell from '../DayCell/DayCell';

import styles from './Month.module.css';

interface IProps {
  month: dayjs.Dayjs[][];
}

const Month = (props: IProps) => {
  const { month } = props;

  return (
    <div className={styles.container}>
      <div className={styles.daysNameContainer}>
        {month[0].map((days, i) => {
          return (
            <div className={styles.daysName} key={i}>
              {days.format('ddd').toUpperCase()}
            </div>
          );
        })}
      </div>
      {month.map((row, i) => {
        return (
          <div key={i} className={styles.days}>
            {row.map((day, i) => {
              return <DayCell key={i} day={day} />;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Month;

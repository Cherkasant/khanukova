import dayjs from 'dayjs';
import cn from 'classnames';

import { getIsCurrentDay } from '../utils/utils';

import styles from './DayCell.module.css';
interface IProps {
  day: dayjs.Dayjs;
}

const DayCell = (props: IProps) => {
  const { day } = props;
  const isCurrentDay = getIsCurrentDay(day);

  return (
    <div className={styles.container}>
      <span
        className={cn(styles.number, {
          [styles.currentDay]: isCurrentDay
        })}>
        {day.format('DD')}
      </span>
    </div>
  );
};

export default DayCell;

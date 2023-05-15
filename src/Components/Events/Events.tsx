import { Calendar } from './Calendar/Calendar';

import styles from './Events.module.css';

import { CalendarHeader } from './CalendarHeader/CalendarHeader';

const Events = () => {
  return (
    <div className={styles.container}>
      <CalendarHeader />
      <Calendar />
    </div>
  );
};

export default Events;

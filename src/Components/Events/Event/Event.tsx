import moment from 'moment';
import { EventProps } from 'react-big-calendar';

import styles from './Event.module.css';

const Event = ({ event }: EventProps) => {
  const timeFormat = moment(event.start).minutes() === 0 ? 'hA' : 'h:mmA';

  return (
    <>
      <span className={styles.eventDot} />
      {moment(event.start).format(timeFormat)} <strong>{event.title}</strong>
    </>
  );
};

export default Event;

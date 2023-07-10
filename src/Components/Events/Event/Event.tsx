import moment from 'moment';
import { EventProps } from 'react-big-calendar';

import styles from './Event.module.css';

const Event = ({ event }: EventProps) => (
  <>
    <span className={styles.eventDot} />
    {moment(event.start).format('hA')} <strong>{event.title}</strong>
  </>
);

export default Event;

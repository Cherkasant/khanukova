import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

import CustomToolbar from './CustomToolbar/CustomToolbar';
import styles from './Events.module.css';

const localizer = momentLocalizer(moment);
moment.updateLocale('en', { week: { dow: 0 } });

const events = [
  {
    title: 'An important event',
    start: new Date(2023, 6, 15, 10, 0),
    end: new Date(2023, 6, 15, 12, 0)
  },
  {
    title: 'Another event',
    start: new Date(2023, 6, 17, 14, 30),
    end: new Date(2023, 6, 17, 16, 30)
  }
];

const Events = () => {
  return (
    <div className={styles.container}>
      <Calendar
        className={styles.calendar}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        components={{
          toolbar: CustomToolbar
        }}
        formats={{
          dateFormat: 'D'
        }}
      />
    </div>
  );
};

export default Events;

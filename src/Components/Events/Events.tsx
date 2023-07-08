import { Calendar, EventProps, View, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { useState } from 'react';

import styles from './Events.module.css';
import CustomToolbar from './CustomToolbar/CustomToolbar';
import Event from './Event/Event';

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
    start: new Date(2023, 6, 17, 14, 0),
    end: new Date(2023, 6, 17, 16, 0)
  }
];

const CustomHeader = ({ date }: any) => {
  const dayOfWeek = moment(date).format('dddd');
  const dayOfMonth = moment(date).format('MMM D');

  return (
    <>
      <div className={styles.weekDay}>{dayOfWeek}</div>
      <div className={styles.dayOfMonth}>{dayOfMonth}</div>
    </>
  );
};

const Events = () => {
  const [activeView, setActiveView] = useState<View>('month');

  const handleViewChange = (view: View) => {
    setActiveView(view);
  };
  return (
    <div className={styles.container}>
      <Calendar
        className={styles.calendar}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        components={{
          toolbar: (props) => <CustomToolbar activeView={activeView} {...props} />,
          event: Event,
          week: {
            header: CustomHeader
          }
        }}
        onView={(view: View) => handleViewChange(view)}
        formats={{
          dateFormat: 'D',
          dayFormat: 'dddd MMM D',
          timeGutterFormat: 'h a'
        }}
      />
    </div>
  );
};

export default Events;

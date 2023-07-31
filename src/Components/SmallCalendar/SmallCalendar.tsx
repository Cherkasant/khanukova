import { useEffect, useState } from 'react';
import { Calendar, View, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

import CustomHeader from '../Events/CustomHeader/CustomHeader';

import styles from './SmallCalendar.module.css';

import SmallCalendarToolbar from './SmallCalendarToolbar/SmallCalendarToolbar';

const localizer = momentLocalizer(moment);

const SmallCalendar = () => {
  const [activeView, setActiveView] = useState<View>('week');

  useEffect(() => {
    moment.updateLocale('en', { week: { dow: 0 } });
  }, []);

  const handleViewChange = (view: View) => {
    setActiveView(view);
  };

  return (
    <Calendar
      className={styles.smallCalendar}
      localizer={localizer}
      startAccessor="start"
      endAccessor="end"
      components={{
        toolbar: (props) => <SmallCalendarToolbar activeView={activeView} {...props} />,
        week: {
          header: CustomHeader
        }
      }}
      onView={handleViewChange}
      formats={{
        dateFormat: 'D',
        dayFormat: 'dddd MMM D',
        timeGutterFormat: 'h a'
      }}
    />
  );
};

export default SmallCalendar;

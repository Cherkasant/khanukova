import { Calendar, DateLocalizer, SlotInfo, View, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { useState } from 'react';

import styles from './Events.module.css';
import CustomToolbar from './CustomToolbar/CustomToolbar';
import CustomHeader from './CustomHeader/CustomHeader';
import Event from './Event/Event';
import EventSearch from './EventSearch/EventSearch';

const localizer = momentLocalizer(moment);
moment.updateLocale('en', { week: { dow: 0 } });

export interface IEvent {
  title: string;
  start: Date;
  end: Date;
}

const initialEvents: Array<IEvent> = [
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

const Events = () => {
  const [activeView, setActiveView] = useState<View>('month');
  const [events, setEvents] = useState<Array<IEvent>>(initialEvents);

  const handleViewChange = (view: View) => {
    setActiveView(view);
  };

  const handleSlotSelect = (slotInfo: SlotInfo) => {
    const title = window.prompt('Enter event title:');
    if (title) {
      const newEvent = {
        title,
        start: slotInfo.start,
        end: slotInfo.end
      };
      const updatedEvents = [...events, newEvent];
      setEvents(updatedEvents);
    }
  };

  return (
    <div className={styles.container}>
      <EventSearch events={events} />
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
        onView={handleViewChange}
        formats={{
          dateFormat: 'D',
          dayFormat: 'dddd MMM D',
          timeGutterFormat: 'h a'
        }}
        selectable={true}
        onSelectSlot={handleSlotSelect}
      />
    </div>
  );
};

export default Events;

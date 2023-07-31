import { useEffect, useState } from 'react';
import { Calendar, SlotInfo, View, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

import ModalCalendar from '../Modals/ModalCalendar/ModalCalendar';

import styles from './Events.module.css';
import CustomToolbar from './CustomToolbar/CustomToolbar';
import CustomHeader from './CustomHeader/CustomHeader';
import Event from './Event/Event';
import EventSearch from './EventSearch/EventSearch';

const localizer = momentLocalizer(moment);

export interface IEvent {
  title: string;
  start: Date;
  end: Date;
}

const initialEvents: Array<IEvent> = [
  {
    title: 'An important event',
    start: new Date(2023, 6, 24, 10, 0),
    end: new Date(2023, 6, 24, 12, 0)
  },
  {
    title: 'Another event',
    start: new Date(2023, 6, 24, 14, 0),
    end: new Date(2023, 6, 24, 15, 0)
  },
  {
    title: 'Another event',
    start: new Date(2023, 6, 24, 16, 0),
    end: new Date(2023, 6, 24, 17, 0)
  }
];

const Events = () => {
  const [activeView, setActiveView] = useState<View>('month');
  const [events, setEvents] = useState<Array<IEvent>>(initialEvents);
  const [selectedSlot, setSelectedSlot] = useState<SlotInfo | null>(null);

  useEffect(() => {
    moment.updateLocale('en', { week: { dow: 0 } });
  }, []);

  const handleViewChange = (view: View) => {
    setActiveView(view);
  };

  const handleSlotSelect = (slotInfo: SlotInfo) => {
    setSelectedSlot(slotInfo);
  };

  const handleModalClose = () => {
    setSelectedSlot(null);
  };

  const addEvent = (title: string) => {
    if (selectedSlot && title) {
      const newEvent: IEvent = {
        title,
        start: selectedSlot.start,
        end: selectedSlot.end
      };
      const updatedEvents = [...events, newEvent];
      setEvents(updatedEvents);
      setSelectedSlot(null);
    }
  };

  return (
    <>
      {selectedSlot && <ModalCalendar selectedSlot={selectedSlot} onClose={handleModalClose} onAddEvent={addEvent} />}
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
    </>
  );
};

export default Events;

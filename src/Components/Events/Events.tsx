import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer, SlotInfo, View } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import classNames from 'classnames';

import ModalCalendar from '../Modals/ModalCalendar/ModalCalendar';
import { setSelectedSlot } from '../../Redux/Reducers/slotReducer';
import slotSelectors from '../../Redux/Selectors/slotSelectors';

import calendarSelector from '../../Redux/Selectors/calendarSelector';

import { setCalendarModalVisible } from '../../Redux/Reducers/calendarReducer';

import styles from './Events.module.css';
import CustomToolbar from './CustomToolbar/CustomToolbar';
import CustomHeader from './CustomHeader/CustomHeader';
import Event from './Event/Event';
import EventSearch from './EventSearch/EventSearch';
import EventModal from './EventModal';

const localizer = momentLocalizer(moment);

export interface IEvent {
  title: string;
  start: Date;
  end: Date;
}

const initialEvents: Array<IEvent> = [
  {
    title: 'An important event',
    start: new Date(2023, 7, 9, 10, 0),
    end: new Date(2023, 7, 9, 12, 0)
  },
  {
    title: 'Another event',
    start: new Date(2023, 7, 9, 14, 0),
    end: new Date(2023, 7, 9, 15, 0)
  },
  {
    title: 'Another event',
    start: new Date(2023, 7, 9, 16, 0),
    end: new Date(2023, 7, 9, 17, 0)
  }
];

const Events = () => {
  const [activeView, setActiveView] = useState<View>('month');
  const [events, setEvents] = useState<Array<IEvent>>(initialEvents);
  const [isModalClosed, setIsModalClosed] = useState(true);

  const calendar = useSelector(calendarSelector.getCalendar);
  const selectedSlot = useSelector(slotSelectors.getSelectedSlot);
  const isVisible = useSelector(calendarSelector.calendarModalVisble);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!calendar?.id) {
      dispatch(setCalendarModalVisible(true));
    }
  }, [dispatch, calendar]);

  useEffect(() => {
    moment.updateLocale('en', { week: { dow: 0 } });
  }, []);

  const handleViewChange = (view: View) => {
    setActiveView(view);
  };

  const handleSlotSelect = (slotInfo: SlotInfo) => {
    setTimeout(() => dispatch(setSelectedSlot(slotInfo)), 1);
    setIsModalClosed(false);
  };

  const handleModalClose = () => {
    setIsModalClosed(true);
    setTimeout(() => dispatch(setSelectedSlot(null)), 300);
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
      dispatch(setSelectedSlot(null));
    }
  };

  const onScreenClick = () => {
    dispatch(setCalendarModalVisible(false));
  };

  return (
    <>
      {selectedSlot && (
        <ModalCalendar
          selectedSlot={selectedSlot}
          onClose={handleModalClose}
          onAddEvent={addEvent}
          isClosed={isModalClosed}
        />
      )}
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
        <div
          className={classNames(styles.wrapModal, {
            [styles.showModal]: isVisible
          })}
          onClick={onScreenClick}>
          <EventModal modal={isVisible} />
        </div>
      </div>
    </>
  );
};

export default Events;

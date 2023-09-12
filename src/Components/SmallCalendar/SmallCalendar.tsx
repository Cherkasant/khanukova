import { useEffect, useState } from 'react';
import { Calendar, View, momentLocalizer, SlotInfo } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import { setSelectedSlot } from '../../Redux/Reducers/slotReducer';
import slotSelectors from '../../Redux/Selectors/slotSelectors';

import SmallCalendarCustomHeader from './SmallCalendarCustomHeader/SmallCalendarCustomHeader';

import styles from './SmallCalendar.module.css';

import SmallCalendarToolbar from './SmallCalendarToolbar/SmallCalendarToolbar';

const localizer = momentLocalizer(moment);

const SmallCalendar = () => {
  const [activeView, setActiveView] = useState<View>('week');

  const selectedSlot = useSelector(slotSelectors.getSelectedSlot);

  const dispatch = useDispatch();

  useEffect(() => {
    moment.updateLocale('en', { week: { dow: 0 } });
  }, []);

  const handleViewChange = (view: View) => {
    setActiveView(view);
  };

  const handleSlotSelect = (slotInfo: SlotInfo) => {
    dispatch(setSelectedSlot(slotInfo));
  };

  return (
    <Calendar
      className={styles.smallCalendar}
      localizer={localizer}
      startAccessor="start"
      endAccessor="end"
      defaultDate={selectedSlot?.start}
      components={{
        toolbar: (props) => <SmallCalendarToolbar activeView={activeView} {...props} />,
        week: {
          header: SmallCalendarCustomHeader
        }
      }}
      slotPropGetter={(date) => {
        if (selectedSlot && date >= selectedSlot.start && date < selectedSlot.end) {
          return {
            style: {
              backgroundColor: '#D9E1F0'
            }
          };
        }
        return {};
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
  );
};

export default SmallCalendar;

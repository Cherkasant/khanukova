import { useSelector } from 'react-redux';

import Month from '../Month/Month';
import calendarSelector from '../../../Redux/Selectors/calendarSelector';
import Week from '../Week/Week';
import { getMonth } from '../utils/utils';

import styles from './Calendar.module.css';

export const Calendar = () => {
  const monthIndex = useSelector(calendarSelector.getMonthIndex);
  const activeTab = useSelector(calendarSelector.getCurrentCalendarTab);

  return (
    <div>
      {activeTab === 'month' && <Month month={getMonth(monthIndex)} />}
      {activeTab === 'week' && <Week />}
    </div>
  );
};

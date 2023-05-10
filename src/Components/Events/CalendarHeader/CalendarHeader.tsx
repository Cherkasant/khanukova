import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';

import calendarSelector from '../../../Redux/Selectors/calendarSelector';
import { setCurrentCalendarTabReducer, setMonthIndexReducer } from '../../../Redux/Reducers/calendarReducer';
import { CalendarTab } from '../../../Redux/Types/calendar';

export const CalendarHeader = () => {
  const dispatch = useDispatch();
  const monthIndex = useSelector(calendarSelector.getMonthIndex);
  const currentDayFormat = `${dayjs().format('dddd')}, ${dayjs().format('MMM')} ${dayjs().format('D')}`;
  const setPreviousMonth = () => {
    dispatch(setMonthIndexReducer(monthIndex - 1));
  };

  const setCurrentMonth = () => {
    dispatch(setMonthIndexReducer(dayjs().month()));
  };
  const setNexttMonth = () => {
    dispatch(setMonthIndexReducer(monthIndex + 1));
  };

  const setActiveTab = (value: CalendarTab) => {
    dispatch(setCurrentCalendarTabReducer(value));
  };

  return (
    <div>
      <header>
        <input type="text" />
        <button onClick={setCurrentMonth}>today</button>
        <button onClick={setPreviousMonth}>prev</button>
        <button onClick={setNexttMonth}>next</button>
        <button onClick={() => setActiveTab('month')}>month</button>
        <button onClick={() => setActiveTab('week')}>week</button>
        <button onClick={() => setActiveTab('day')}>day</button>
        <div>{currentDayFormat}</div>
      </header>
    </div>
  );
};

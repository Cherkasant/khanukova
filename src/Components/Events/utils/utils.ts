import dayjs from 'dayjs';

const ROWS = 6;
const COLUMNS = 7;
export function getMonth(month: number = dayjs().month()) {
  const year = dayjs().year();
  const firstDayOfMonth = dayjs(new Date(year, month, 1)).day();

  let currentMonthCount = 0 - firstDayOfMonth;

  const daysMatrix = new Array(ROWS).fill([]).map((elem) => {
    return new Array(COLUMNS).fill(null).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, month, currentMonthCount));
    });
  });

  return daysMatrix;
}

export function getWeek(day: number = dayjs().day()) {
  const year = dayjs().year();
  const month = dayjs().month();
  const currentDay = day;

  const currentDate = dayjs().date();
  const currentWeek = 0 - currentDay;

  let firstDateOfWeek = currentDate + currentWeek - 1;

  const daysMatrix = new Array(7).fill([]).map((elem) => {
    firstDateOfWeek++;
    return dayjs(new Date(year, month, firstDateOfWeek));
  });
  return daysMatrix;
}
export function getIsCurrentDay(day: dayjs.Dayjs) {
  return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY');
}

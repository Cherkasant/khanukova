import { create } from 'apisauce';

const API = create({ baseURL: 'https://chat.agiledreamers.com/' });

const createCalendar = (token: string, projectId: string) => {
  return API.post('/calendars/', projectId, {
    headers: {
      Authorization: `bearer ${token}`
    }
  });
};

const getCalendar = (token: string, calendarId: string) => {
  return API.get(
    `/calendars/${calendarId}/`,
    {},
    {
      headers: {
        Authorization: `bearer ${token}`
      }
    }
  );
};

export default {
  createCalendar,
  getCalendar
};

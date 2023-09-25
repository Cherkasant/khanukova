import { create } from 'apisauce';

import { EventDataType } from '../Types/calendar';

const API = create({ baseURL: 'https://chat.agiledreamers.com/' });

const createEvent = (token: string, calendarId: string, eventData: EventDataType) => {
  return API.post(`/calendars/${calendarId}/events/`, eventData, {
    headers: {
      Authorization: `bearer ${token}`
    }
  });
};

const getEvents = (token: string, calendarId: string, timeMin: string) => {
  return API.get(
    `/calendars/${calendarId}/events/?time_min=${timeMin}`,
    {},
    {
      headers: {
        Authorization: `bearer ${token}`
      }
    }
  );
};

const getSingleEvent = (token: string, calendarId: string, eventId: string) => {
  return API.get(
    `/calendars/${calendarId}/events/${eventId}`,
    {},
    {
      headers: {
        Authorization: `bearer ${token}`
      }
    }
  );
};
const changeSingleEvent = (token: string, calendarId: string, eventId: string, eventData: EventDataType) => {
  return API.get(`/calendars/${calendarId}/events/${eventId}`, eventData, {
    headers: {
      Authorization: `bearer ${token}`
    }
  });
};

export default {
  createEvent,
  getEvents,
  getSingleEvent,
  changeSingleEvent
};

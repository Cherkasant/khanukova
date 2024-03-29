export type CalendarTab = 'month' | 'week' | 'day';

export type PostEventType = {
  calendarId: string;
  data: EventDataType;
  callback: () => void;
};

export type EventDataType = {
  title?: string;
  summary: string;
  description: string;
  start: string;
  end: string;
};
export type CalendarType = {
  id: string;
  summary: string;
};
export type ProjectIdType = {
  summary: string;
  callback: () => void;
};
export type EventsType = Array<EventDataType>;

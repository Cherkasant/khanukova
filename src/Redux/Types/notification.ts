export type NotificationType = {
  id: number;
  date_created: string;
  action: string;
  editor: number;
  project: number;
  milestone: number | null;
  task: number | null;
  sub_task: number | null;
};

export type ArrayOfNotificationType = Array<NotificationType>;

export type NotifyOptionsType = {
  id: number;
  actions: string;
  deadline: string;
  events: string;
  payments: string;
  client_requests: string;
  chat: string;
};

export type PatchNotifyOptionsType = {
  data: NotifyOptionsType;
  callback: () => void;
};

export type NotificationType = {
  id: number;
  receiving_time: string;
  action: string;
  editor: editorNotificationType | null;
  project: number;
  milestone: milestoneNotificationType | null;
  task: number | null;
  sub_task: number | null;
};

export type milestoneNotificationType = {
  milestone_name: string;
};
export type editorNotificationType = {
  full_name: string;
  account_photo: string;
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
export type WebSocketType = {
  type: string;
  payload: PayloadWebSocket;
};
export type PayloadWebSocket = {
  milestone_id: number;
  editor: string;
  action: string;
  project: number;
};
export type ArrayOfWebSocket = Array<WebSocketType>;

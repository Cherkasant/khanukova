export type AllChatData = {
  creator_id: number;
  date_create: string;
  date_deleted: string;
  id: number;
  is_active: boolean;
  title: string;
};

export type AllChat = {
  page_size: number;
  page_num: number;
};

export type AllChatFilter = {
  clients_industry: string;
  software_stack: string;
  industry_choice: string;
};

export type CreateChat = {
  title: string;
};

export type AllMessagesChat = {
  id: number;
  page_size: number;
  cursor: number;
};

export type AllMessagesChatPayload = {
  data: AllMessagesChat;
  isOwervrite: boolean;
};

export type AllMessagesData = {
  text: string;
  date_create: string;
  date_changed: string;
  date_deleted: string;
  id: number;
  is_active: boolean;
  user_id: number;
};

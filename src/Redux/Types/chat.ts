export type AllChatData = {
  creator_id: number;
  date_create: string;
  date_deleted: string;
  id: number;
  is_active: boolean;
  title: string;
};

export type AllChatDataFilter = {
  HeadCompany: AllChatDataFilterHead;
};

type AllChatDataFilterHead = {
  client_industry: string;
  contact_marketing: string;
  id: number;
  industry_choice: string;
  logo: string;
  owner_id: number;
  software_stack: string;
};

export type AllChat = {
  page_size: number;
  page_num: number;
};

export type AllChatPayload = {
  data: AllChat;
  isOwervrite: boolean;
};

export type AllChatFilter = {
  clients_industry: string;
  software_stack: string;
  industry_choice: string;
};

export type CreateChat = {
  title: string;
  logo: any;
};

export type AllMessagesChat = {
  id: number;
  page_size: number;
  cursor: number;
};

export type AllMessagesChatPayload = {
  data: AllMessagesChat;
  isOwervrite: boolean;
  isMessage?: boolean;
};

export type AllMessagesData = {
  text: string;
  date_create: string;
  date_changed: string;
  date_deleted: string;
  id: number;
  is_active: boolean;
  user_id: number;
  account_photo: string;
  full_name: string;
  nickname: string;
};

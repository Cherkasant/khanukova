import { create } from 'apisauce';

import { AllChat, AllChatFilter, AllMessagesChat, CreateChat } from '../Types/chat';
const API = create({ baseURL: 'https://chat.agiledreamers.com' });

const getAllChat = (token: string, data: AllChat) => {
  const { page_size, page_num } = data;
  return API.get(
    '/chat/all-chats',
    { page_size, page_num },
    {
      headers: {
        Authorization: `bearer ${token}`
      }
    }
  );
};

const getAllChatFilter = (token: string, data: AllChatFilter) => {
  const { clients_industry, software_stack, industry_choice } = data;
  return API.get(
    '/chat/chat-filter',
    { clients_industry, software_stack, industry_choice },
    {
      headers: {
        Authorization: `bearer ${token}`
      }
    }
  );
};

const getChat = (token: string, id: number) => {
  return API.get(
    `/chat/${id}`,
    {},
    {
      headers: {
        Authorization: `bearer ${token}`
      }
    }
  );
};

const createChat = (token: string, data: CreateChat) => {
  return API.post('/chat/', data, {
    headers: {
      Authorization: `bearer ${token}`
    }
  });
};

const getMessagesChat = (token: string, data: AllMessagesChat) => {
  const { id, page_size, cursor } = data;
  return API.get(
    `/message/message-show/${id}`,
    { page_size, cursor },
    {
      headers: {
        Authorization: `bearer ${token}`
      }
    }
  );
};

const addUserChat = (token: string, chat_id: number, user_id: number) => {
  const user_idd = [91];
  return API.post(
    `/chat/add/${40}`,
    { all_users_id: user_idd },
    {
      headers: {
        Authorization: `bearer ${token}`
      }
    }
  );
};

export default {
  getAllChat,
  getChat,
  createChat,
  getMessagesChat,
  getAllChatFilter,
  addUserChat
};

import { create } from 'apisauce';

import { AllChatFilter, AllMessagesChat, CreateChat } from '../Types/chat';
const API = create({ baseURL: 'https://agile-dreamers-chat-be.herokuapp.com' });

const getAllChat = (token: string, page_size: number, page_num: number) => {
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
  return API.get(
    '/chat/chat-filter',
    { data },
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
  return API.post(
    `/chat/add/${40}/${3}`,
    {},
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

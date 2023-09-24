import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
  AllChat,
  AllChatData,
  AllChatDataFilter,
  AllChatFilter,
  AllChatPayload,
  AllMessagesChatPayload,
  AllMessagesData,
  CreateChat
} from '../Types/chat';

type initialStateType = {
  allChats: AllChatData[];
  chat: AllChatData | undefined;
  messagesChat: AllMessagesData[];
  messagesChatRender: AllMessagesData[];
  allChatsFilter: AllChatDataFilter[];
  qauntityAllChat: number;
  qauntityAllMessages: number;
  checkFilterChats: boolean;
};

const initialState: initialStateType = {
  allChats: [],
  chat: undefined,
  messagesChat: [],
  messagesChatRender: [],
  allChatsFilter: [],
  qauntityAllChat: 0,
  qauntityAllMessages: 0,
  checkFilterChats: false
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    getAllChat: (state, actions: PayloadAction<AllChatPayload>) => {},
    setAllChat: (state, actions) => {
      const { data, isOwervrite } = actions.payload;
      if (isOwervrite) {
        state.allChats = [...state.allChats, ...data];
      } else {
        state.allChats = data;
      }
    },
    getChat: (state, actions: PayloadAction<number>) => {},
    setChat: (state, actions) => {
      state.chat = actions.payload;
    },
    getAllChatFilter: (state, actions: PayloadAction<AllChatFilter>) => {},
    setAllChatFilter: (state, actions) => {
      state.allChatsFilter = actions.payload;
    },
    getMessagesChat: (state, actions: PayloadAction<AllMessagesChatPayload>) => {},
    setMessagesChat: (state, actions) => {
      const { isOwervrite, data, isMessage } = actions.payload;
      if (isOwervrite) {
        state.messagesChat = [...state.messagesChat, ...data];
      } else if (isMessage) {
        state.messagesChat = [...data, ...state.messagesChat];
      } else {
        state.messagesChat = data;
      }
    },
    createChat: (state, actions: PayloadAction<CreateChat>) => {},
    addNewUserChat: (state, actions: PayloadAction<{ chat_id: number; user_id: number }>) => {},
    setQauntityAllChat: (state, actions) => {
      state.qauntityAllChat = actions.payload;
    },
    setQauntityAllMessages: (state, actions) => {
      state.qauntityAllMessages = actions.payload;
    },
    setCheckFilterChats: (state, actions) => {
      state.checkFilterChats = actions.payload;
    }
  }
});

export const {
  getAllChat,
  setAllChat,
  getChat,
  setChat,
  createChat,
  getMessagesChat,
  setMessagesChat,
  getAllChatFilter,
  setAllChatFilter,
  addNewUserChat,
  setQauntityAllChat,
  setQauntityAllMessages,
  setCheckFilterChats
} = chatSlice.actions;

export default chatSlice.reducer;

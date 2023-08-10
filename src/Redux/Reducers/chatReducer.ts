import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
  AllChat,
  AllChatData,
  AllChatFilter,
  AllMessagesChatPayload,
  AllMessagesData,
  CreateChat
} from '../Types/chat';

type initialStateType = {
  allChats: AllChatData[];
  chat: AllChatData | undefined;
  messagesChat: AllMessagesData[];
  messagesChatRender: AllMessagesData[];
  allChatsFilter: AllChatData[];
  qauntityAllChat: number;
  qauntityAllMessages: number;
};

const initialState: initialStateType = {
  allChats: [],
  chat: undefined,
  messagesChat: [],
  messagesChatRender: [],
  allChatsFilter: [],
  qauntityAllChat: 0,
  qauntityAllMessages: 0
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    getAllChat: (state, actions: PayloadAction<AllChat>) => {},
    setAllChat: (state, actions) => {
      state.allChats = [...state.allChats, ...actions.payload];
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
      const { isOwervrite, data } = actions.payload;
      if (isOwervrite) {
        state.messagesChat = [...state.messagesChat, ...data];
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
  setQauntityAllMessages
} = chatSlice.actions;

export default chatSlice.reducer;

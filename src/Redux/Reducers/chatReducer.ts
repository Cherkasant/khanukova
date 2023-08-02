import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { AllChat, AllChatData, AllChatFilter, AllMessagesChat, AllMessagesData, CreateChat } from '../Types/chat';

type initialStateType = {
  allChats: AllChatData[];
  chat: AllChatData | undefined;
  messagesChat: AllMessagesData[];
  allChatsFilter: AllChatData[];
  isChangeChat: boolean;
};

const initialState: initialStateType = {
  allChats: [],
  chat: undefined,
  messagesChat: [],
  allChatsFilter: [],
  isChangeChat: false
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    getAllChat: (state, actions: PayloadAction<AllChat>) => {},
    setAllChat: (state, actions) => {
      state.allChats = actions.payload;
    },
    getChat: (state, actions: PayloadAction<number>) => {},
    setChat: (state, actions) => {
      state.chat = actions.payload;
    },
    getAllChatFilter: (state, actions: PayloadAction<AllChatFilter>) => {},
    setAllChatFilter: (state, actions) => {
      state.allChatsFilter = actions.payload;
    },
    getMessagesChat: (state, actions: PayloadAction<AllMessagesChat>) => {},
    setMessagesChat: (state, actions) => {
      if (state.isChangeChat) {
        console.log('true');
        state.messagesChat = actions.payload;
        state.isChangeChat = false;
      } else {
        console.log('false');
        state.messagesChat = [...state.messagesChat, actions.payload];
      }
    },
    createChat: (state, actions: PayloadAction<CreateChat>) => {},
    addNewUserChat: (state, actions: PayloadAction<{ chat_id: number; user_id: number }>) => {},
    setIsChangeChat: (state, actions) => {
      state.isChangeChat = actions.payload;
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
  setIsChangeChat
} = chatSlice.actions;

export default chatSlice.reducer;

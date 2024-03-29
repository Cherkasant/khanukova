import { RootState } from '../store';

export default {
  getAllChats: (state: RootState) => state.chatReducer.allChats,
  getAllChatsFilter: (state: RootState) => state.chatReducer.allChatsFilter,
  getChats: (state: RootState) => state.chatReducer.chat,
  getMessages: (state: RootState) => state.chatReducer.messagesChat,
  getQauntityAllChat: (state: RootState) => state.chatReducer.qauntityAllChat,
  getQauntityAllMessages: (state: RootState) => state.chatReducer.qauntityAllMessages,
  checkFilterChats: (state: RootState) => state.chatReducer.checkFilterChats
};

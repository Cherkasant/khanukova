import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { toast } from 'react-toastify';

import { AllChat, AllChatFilter, AllMessagesChat, CreateChat } from '../Types/chat';

import API_CHAT from '../Utils/apiChat';
import {
  addNewUserChat,
  createChat,
  getAllChat,
  getAllChatFilter,
  getChat,
  getMessagesChat,
  setAllChat,
  setAllChatFilter,
  setChat,
  setMessagesChat
} from '../Reducers/chatReducer';

import callCheckingAuth from './callCheckingAuth';

function* getAllChatWorker(action: PayloadAction<AllChat>) {
  const { page_size, page_num } = action.payload;
  const { ok, data } = yield callCheckingAuth(API_CHAT.getAllChat, page_size, page_num);
  if (ok && data) {
    yield put(setAllChat(data));
    console.log(data);
  } else {
    console.log(data);
  }
}

function* getAllChatFilterWorker(action: PayloadAction<AllChatFilter>) {
  const { ok, data } = yield callCheckingAuth(API_CHAT.getAllChatFilter, action.payload);
  if (ok && data) {
    yield put(setAllChatFilter(data));
  } else {
    console.log(data);
  }
}

function* getChatWorker(action: PayloadAction<number>) {
  const { ok, data } = yield callCheckingAuth(API_CHAT.getChat, action.payload);
  if (ok && data) {
    yield put(setChat(data));
  } else {
    console.log(data);
  }
}

function* getMessagesChatWorker(action: PayloadAction<AllMessagesChat>) {
  const { ok, data } = yield callCheckingAuth(API_CHAT.getMessagesChat, action.payload);
  if (ok && data) {
    yield put(setMessagesChat(data));
  } else {
    console.log(data);
  }
}

function* createChatWorker(action: PayloadAction<CreateChat>) {
  const { ok, data } = yield callCheckingAuth(API_CHAT.createChat, action.payload);
  console.log(data);
}

function* addNewUserChatWorker(action: PayloadAction<{ chat_id: number; user_id: number }>) {
  const { ok, data } = yield callCheckingAuth(API_CHAT.addUserChat, action.payload);
  console.log(data);
}

export default function* authSagaWatcher() {
  yield all([takeLatest(getAllChat, getAllChatWorker)]);
  yield all([takeLatest(getAllChatFilter, getAllChatFilterWorker)]);
  yield all([takeLatest(createChat, createChatWorker)]);
  yield all([takeLatest(getMessagesChat, getMessagesChatWorker)]);
  yield all([takeLatest(getChat, getChatWorker)]);
  yield all([takeLatest(addNewUserChat, addNewUserChatWorker)]);
}

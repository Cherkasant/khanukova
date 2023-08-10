import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';

import chatSelectors from '../../../Redux/Selectors/chatSelectors';
import authSelectors from '../../../Redux/Selectors/authSelectors';
import { getMessagesChat, setMessagesChat } from '../../../Redux/Reducers/chatReducer';
import { ACCESS_TOKEN_KEY } from '../../constants/consts';
import { socket } from '../../../Pages/Chats/Chats';

import styles from './AllMessagesPanel.module.css';

type AllMessagesPanelType = {
  chatId: number;
  cursor: number;
  conectSoket: (id: number) => void;
  isOwervriteMessages: boolean;
  setIsOwervriteMessages: React.Dispatch<React.SetStateAction<boolean>>;
  setCursor: React.Dispatch<React.SetStateAction<number>>;
};

const AllMessagesPanel: React.FC<AllMessagesPanelType> = ({
  chatId,
  cursor,
  conectSoket,
  isOwervriteMessages,
  setIsOwervriteMessages,
  setCursor
}) => {
  const dispatch = useDispatch();
  const refMessages = useRef<HTMLDivElement>(null);
  const qauntityAllMessages = useSelector(chatSelectors.getQauntityAllMessages);
  const messages = useSelector(chatSelectors.getMessages);
  const userId = useSelector(authSelectors.getUserId);
  const token = localStorage.getItem(ACCESS_TOKEN_KEY) || sessionStorage.getItem(ACCESS_TOKEN_KEY) || '';

  const onScroll = () => {
    setIsOwervriteMessages(true);
    setCursor(cursor + 30);
  };

  const hasMore = () => {
    return messages.length < qauntityAllMessages;
  };

  useEffect(() => {
    if (isOwervriteMessages) {
      dispatch(getMessagesChat({ data: { id: chatId, page_size: 30, cursor }, isOwervrite: true }));
    }
    conectSoket(chatId);
    socket.onopen = () => socket.send(token);
    socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      const text = data.text;
      const userId = Number(data.user_id);
      dispatch(setMessagesChat({ data: [{ text, user_id: userId }], isOwervrite: false, isMessage: true }));
    });
  }, [cursor, chatId]);

  useEffect(() => {
    if (!isOwervriteMessages) {
      refMessages.current?.scrollTo(0, 99999);
    }
  }, [messages]);

  return (
    <div ref={refMessages} id="scrollableDiv" className={classNames(styles.chatsMain)}>
      <InfiniteScroll
        style={{ display: 'flex', flexDirection: 'column-reverse' }}
        pullDownToRefreshThreshold={500}
        inverse={true}
        next={onScroll}
        hasMore={hasMore()}
        loader={''}
        dataLength={messages.length}
        scrollableTarget="scrollableDiv">
        {messages.map((value, index) => (
          <div
            key={index}
            className={classNames(styles.message, {
              [styles.messageMe]: userId === value.user_id
            })}>
            {value.text}
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default AllMessagesPanel;

import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';

import chatSelectors from '../../../Redux/Selectors/chatSelectors';
import authSelectors from '../../../Redux/Selectors/authSelectors';
import { getMessagesChat, setMessagesChat } from '../../../Redux/Reducers/chatReducer';
import { ACCESS_TOKEN_KEY } from '../../constants/consts';
import { socket } from '../../../Pages/Chats/Chats';
import InputChat from '../InputChat';
import PuzzleButton, { PuzzleButtonTypes } from '../../PuzzleButton';
import { ModalDeclined } from '../ModalChat/ModalDeclined';
import ModalChat from '../ModalChat';
import { Role } from '../../constants/@types';
import profileSelectors from '../../../Redux/Selectors/profileSelectors';
import { mocMessages } from '../messages';

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
  const [messagesValue, setMessages] = useState('');
  const [approve, setApprove] = useState(false);
  const qauntityAllMessages = useSelector(chatSelectors.getQauntityAllMessages);
  const personalInfoList = useSelector(profileSelectors.getPersonalInfo);
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

  const onSendMessage = (messages: string) => {
    if (!messagesValue) {
      return;
    }
    socket.send(messages);
    setMessages('');
    refMessages.current?.scrollTo(0, 99999);
  };

  const onSubmitEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      onSendMessage(messagesValue);
    }
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
      const account_photo = data.account_photo;
      const full_name = data.username;
      dispatch(
        setMessagesChat({
          data: [{ text, user_id: userId, full_name, account_photo }],
          isOwervrite: false,
          isMessage: true
        })
      );
    });
    return () => {
      socket.removeEventListener('close', () => {});
      socket.close();
    };
  }, [cursor, chatId]);

  useEffect(() => {
    if (!isOwervriteMessages) {
      refMessages.current?.scrollTo(0, 99999);
    }
  }, [messages]);

  return (
    <>
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
              key={value.id}
              className={classNames(styles.wrapMessages, { [styles.wrapMessagesMe]: userId === value.user_id })}>
              {value?.account_photo ? (
                <div className={styles.avatar}>
                  <img
                    className={styles.avatarPhoto}
                    src="https://www.vokrug.tv/pic/person/e/e/5/4/ee54d6e76295bf9d955c93fdd9e2285a.jpeg"
                    alt="avatar"
                  />
                </div>
              ) : (
                <div className={styles.avatar}>{value?.full_name ? value?.full_name[0].toLocaleUpperCase() : null}</div>
              )}
              <div
                key={index}
                className={classNames(styles.message, {
                  [styles.messageMe]: userId === value.user_id
                })}>
                {value.text}
              </div>
            </div>
          ))}
          {personalInfoList?.role[0] === Role.Head ? (
            <div className={styles.innerBtn}>
              <button onClick={() => setApprove(true)}>Approve</button>
              <button onClick={() => setApprove(false)}>Decline</button>
            </div>
          ) : null}
        </InfiniteScroll>
        {personalInfoList?.role[0] === Role.PO ? (
          !messages.length ? (
            <ModalChat onSendMessages={() => onSendMessage(mocMessages)} />
          ) : null
        ) : null}
        {personalInfoList?.role[0] === Role.PO ? (
          approve ? (
            <ModalDeclined onClose={() => setApprove(false)} />
          ) : null
        ) : null}
      </div>
      <div className={styles.chatsFooter} onKeyUp={(e) => onSubmitEnter(e)}>
        <InputChat disabled={!chatId} setMessages={setMessages} messagesValue={messagesValue} />
        <PuzzleButton
          disabled={!chatId}
          onClick={() => onSendMessage(messagesValue)}
          btnTitle={'Send'}
          btnType={PuzzleButtonTypes.TextButton}
        />
      </div>
    </>
  );
};

export default AllMessagesPanel;

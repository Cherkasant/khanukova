import { useState } from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import Input from '../../Components/Input';
import PuzzleButton, { PuzzleButtonTypes } from '../../Components/PuzzleButton';
import { SearchIcon } from '../../Assets/icons/SearchIcon';
import UserChat from '../../Components/UserChat/UserChat';
import Quote from '../../Assets/Chat/Quote';
import More from '../../Assets/Chat/More';
import profileSelectors from '../../Redux/Selectors/profileSelectors';
import { Role } from '../../Components/constants/@types';
import { addNewUserChat, createChat, getChat, getMessagesChat } from '../../Redux/Reducers/chatReducer';
import chatSelectors from '../../Redux/Selectors/chatSelectors';
import FilterChat from '../../Components/Chats/FilterChat';
import ModalChat from '../../Components/Chats/ModalChat';
import { ModalDeclined } from '../../Components/Chats/ModalChat/ModalDeclined';

import AllChatsPanel from '../../Components/Chats/AllChatsPanel';
import AllMessagesPanel from '../../Components/Chats/AllMessagesPanel';

import styles from './Chats.module.css';

export let socket: WebSocket;
const conectSoket = (id: number) => {
  socket = new WebSocket(`wss://chat.agiledreamers.com/websocket/ws/${id}`);
};

const Chats = () => {
  const dispatch = useDispatch();
  const [isOwervriteMessages, setIsOwervriteMessages] = useState(false);
  const [chatId, setChatId] = useState(1);
  const [inputSearch, setInputSearch] = useState('');
  const [cursor, setCursor] = useState(1);

  const chat = useSelector(chatSelectors.getChats);
  const personalInfoList = useSelector(profileSelectors.getPersonalInfo);

  const onChange = (value: string) => {
    setInputSearch(value);
  };

  const clickUserChatHandler = (id: number) => {
    dispatch(getMessagesChat({ data: { id, page_size: 30, cursor: 1 }, isOwervrite: false }));
    dispatch(getChat(id));
    setChatId(id);
    setIsOwervriteMessages(false);
    setCursor(1);
  };

  const createChatHandler = () => {
    const fd = new FormData();
    dispatch(
      createChat({
        title: 'test chat_new2',
        logo: fd
      })
    );
  };

  const addNewUserHandler = () => {
    dispatch(
      addNewUserChat({
        chat_id: 40,
        user_id: 58
      })
    );
  };

  return (
    <div className={styles.wrapChats}>
      <div
        className={classNames(styles.panelChats, {
          [styles.panelChatsNoHead]: personalInfoList?.role[0] !== Role.PO
        })}>
        <h3
          onClick={addNewUserHandler}
          className={classNames(styles.title, { [styles.titleNotHead]: personalInfoList?.role[0] !== Role.PO })}>
          {'Chats'}
        </h3>
        {personalInfoList?.role[0] === Role.PO ? <FilterChat /> : null}
        <div className={styles.searchContainer}>
          <div className={styles.icon}>
            <SearchIcon />
          </div>
          <Input value={inputSearch} onChange={onChange} placeholder={'Seacrh'} className={styles.searchInput} />
        </div>
        <AllChatsPanel chatId={chatId} clickUserChatHandler={(id: number) => clickUserChatHandler(id)} />
      </div>
      <div className={styles.chats}>
        {chatId ? (
          <div className={styles.chatsHeader}>
            <UserChat name={chat?.title ? `${chat?.title}` : ''} team={'CAPIX'} className={styles.userChat} />
            <div className={styles.chatsPanel}>
              {personalInfoList?.role[0] === Role.PO ? (
                <>
                  <div className={styles.quote}>
                    <Quote /> {'Request a quote'}
                  </div>
                  <PuzzleButton
                    disabled={!chatId}
                    btnClassName={styles.btn}
                    btnTitle={'Launch a project'}
                    btnType={PuzzleButtonTypes.TextButton}
                  />
                </>
              ) : null}
              <PuzzleButton
                disabled={!chatId}
                btnClassName={styles.btn}
                btnTitle={'Create a Meeting'}
                btnType={PuzzleButtonTypes.TextButton}
              />
              <More className={styles.more} />
            </div>
          </div>
        ) : null}
        {chatId ? (
          <AllMessagesPanel
            chatId={chatId}
            conectSoket={conectSoket}
            isOwervriteMessages={isOwervriteMessages}
            setIsOwervriteMessages={setIsOwervriteMessages}
            cursor={cursor}
            setCursor={setCursor}
          />
        ) : (
          <div className={styles.noChat}>Choose a chat</div>
        )}
      </div>
      <div style={{ color: 'red' }} onClick={createChatHandler}>
        кликни
      </div>
    </div>
  );
};

export default Chats;

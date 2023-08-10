import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import Input from '../../Components/Input';
import InputChat from '../../Components/Chats/InputChat';
import PuzzleButton, { PuzzleButtonTypes } from '../../Components/PuzzleButton';
import { SearchIcon } from '../../Assets/icons/SearchIcon';
import UserChat from '../../Components/UserChat/UserChat';
import Quote from '../../Assets/Chat/Quote';
import More from '../../Assets/Chat/More';
import profileSelectors from '../../Redux/Selectors/profileSelectors';
import { Role } from '../../Components/constants/@types';
import {
  addNewUserChat,
  createChat,
  getAllChatFilter,
  getChat,
  getMessagesChat
} from '../../Redux/Reducers/chatReducer';
import chatSelectors from '../../Redux/Selectors/chatSelectors';
import FilterChat from '../../Components/Chats/FilterChat';

import AllChatsPanel from '../../Components/Chats/AllChatsPanel';
import AllMessagesPanel from '../../Components/Chats/AllMessagesPanel';

import styles from './Chats.module.css';

export let socket: WebSocket;

const conectSoket = (id: number) => {
  socket = new WebSocket(`wss://agile-dreamers-chat-be.herokuapp.com/websocket/ws/${id}`);
};

const Chats = () => {
  const dispatch = useDispatch();
  const [isOwervriteMessages, setIsOwervriteMessages] = useState(false);
  const [chatId, setChatId] = useState(0);
  const [messagesValue, setMessages] = useState('');
  const [inputSearch, setInputSearch] = useState('');
  const [industry, setIndustry] = useState('');
  const [language, setLanguage] = useState('');
  const [company, setCompany] = useState('');
  const [cursor, setCursor] = useState(1);

  const chat = useSelector(chatSelectors.getChats);
  const personalInfoList = useSelector(profileSelectors.getPersonalInfo);

  const onChange = (value: string) => {
    setInputSearch(value);
  };

  const onSendMessage = () => {
    if (!messagesValue) {
      return;
    }
    socket.send(messagesValue);
    setMessages('');
  };

  const createChatHandler = () => {
    dispatch(
      createChat({
        title: '40'
      })
    );
  };

  const addNewUserHandler = () => {
    dispatch(
      addNewUserChat({
        chat_id: 40,
        user_id: 3
      })
    );
  };

  const clickUserChatHandler = (id: number) => {
    dispatch(getMessagesChat({ data: { id, page_size: 30, cursor: 1 }, isOwervrite: false }));
    dispatch(getChat(id));
    setChatId(id);
    setIsOwervriteMessages(false);
    setCursor(1);
  };

  const onSubmitEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      onSendMessage();
    }
  };

  useEffect(() => {
    if (personalInfoList?.role[0] === Role.PO) {
      dispatch(getAllChatFilter({ clients_industry: industry, software_stack: language, industry_choice: company }));
    }
  }, [industry, language, company]);

  return (
    <div className={styles.wrapChats}>
      <div
        className={classNames(styles.panelChats, {
          [styles.panelChatsNoHead]: personalInfoList?.role[0] !== Role.PO
        })}>
        <h3 className={classNames(styles.title, { [styles.titleNotHead]: personalInfoList?.role[0] !== Role.PO })}>
          {'Chats'}
        </h3>
        {personalInfoList?.role[0] === Role.PO ? (
          <FilterChat
            industry={industry}
            language={language}
            company={company}
            setIndustry={setIndustry}
            setLanguage={setLanguage}
            setCompany={setCompany}
          />
        ) : null}
        <div className={styles.searchContainer}>
          <div className={styles.icon}>
            <SearchIcon />
          </div>
          <Input value={inputSearch} onChange={onChange} placeholder={'Seacrh'} className={styles.searchInput} />
        </div>
        <AllChatsPanel chatId={chatId} clickUserChatHandler={(id: number) => clickUserChatHandler(id)} />
      </div>
      <div className={styles.chats}>
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
        <AllMessagesPanel
          chatId={chatId}
          conectSoket={conectSoket}
          isOwervriteMessages={isOwervriteMessages}
          setIsOwervriteMessages={setIsOwervriteMessages}
          cursor={cursor}
          setCursor={setCursor}
        />
        <div className={styles.chatsFooter} onKeyUp={(e) => onSubmitEnter(e)}>
          <InputChat disabled={!chatId} setMessages={setMessages} messagesValue={messagesValue} />
          <PuzzleButton
            disabled={!chatId}
            onClick={onSendMessage}
            btnTitle={'Send'}
            btnType={PuzzleButtonTypes.TextButton}
          />
        </div>
      </div>
      <div onClick={createChatHandler} style={{ color: 'red' }}>
        Кликни
      </div>
    </div>
  );
};

export default Chats;

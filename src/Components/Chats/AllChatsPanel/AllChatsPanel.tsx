import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from 'react';

import chatSelectors from '../../../Redux/Selectors/chatSelectors';
import profileSelectors from '../../../Redux/Selectors/profileSelectors';
import { Role } from '../../constants/@types';
import UserChat from '../../UserChat';
import { getAllChat } from '../../../Redux/Reducers/chatReducer';

import styles from './AllChatsPanel.module.css';

type AllChatsPanelType = {
  chatId: number;
  clickUserChatHandler: (id: number) => void;
};

const AllChatsPanel: React.FC<AllChatsPanelType> = ({ chatId, clickUserChatHandler }) => {
  const dispatch = useDispatch();
  const [isOwervrite, setIsOwervrite] = useState(false);
  const allChats = useSelector(chatSelectors.getAllChats);
  const qauntityAllChat = useSelector(chatSelectors.getQauntityAllChat);
  const personalInfoList = useSelector(profileSelectors.getPersonalInfo);
  const [page, setPage] = useState(1);

  const onScroll = () => {
    setPage(page + 1);
    setIsOwervrite(true);
  };

  const hasMore = () => {
    return allChats.length < qauntityAllChat;
  };

  useEffect(() => {
    dispatch(getAllChat({ data: { page_size: 10, page_num: page }, isOwervrite }));
  }, [page]);
  return (
    <div className={styles.panelChatsInner}>
      <div
        id="parentScrollDiv"
        className={classNames(styles.panelChatsUsers, {
          [styles.panelChatsUsersNoHead]: personalInfoList?.role[0] !== Role.PO
        })}>
        <InfiniteScroll
          next={onScroll}
          hasMore={hasMore()}
          loader={''}
          dataLength={allChats.length}
          scrollableTarget="parentScrollDiv">
          {allChats.map((value, index) => (
            <UserChat
              key={index}
              onClick={() => clickUserChatHandler(value.id)}
              name={value.title}
              team={''}
              className={classNames(styles.wrapUserChat, {
                [styles.active]: value.id === chatId,
                [styles.activeTitle]: value.id === chatId
              })}
            />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default AllChatsPanel;

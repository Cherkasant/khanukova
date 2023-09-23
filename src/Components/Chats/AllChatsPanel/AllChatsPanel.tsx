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
  const allChatsFilters = useSelector(chatSelectors.getAllChatsFilter);
  const qauntityAllChat = useSelector(chatSelectors.getQauntityAllChat);
  const personalInfoList = useSelector(profileSelectors.getPersonalInfo);
  const checkFilterChats = useSelector(chatSelectors.checkFilterChats);
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
        {!checkFilterChats ? (
          <InfiniteScroll
            next={onScroll}
            hasMore={hasMore()}
            loader={''}
            dataLength={allChats.length}
            scrollableTarget="parentScrollDiv">
            {allChats.map((value) => (
              <UserChat
                key={value.id}
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
        ) : (
          <div>
            {allChatsFilters.map((value) => (
              <UserChat
                key={value.HeadCompany.id}
                onClick={() => clickUserChatHandler(value.HeadCompany.id)}
                name={value.HeadCompany.client_industry}
                team={value.HeadCompany.contact_marketing}
                className={classNames(styles.wrapUserChat, {
                  [styles.active]: value.HeadCompany.id === chatId,
                  [styles.activeTitle]: value.HeadCompany.id === chatId
                })}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllChatsPanel;

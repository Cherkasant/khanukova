import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from 'react';

import chatSelectors from '../../../Redux/Selectors/chatSelectors';
import profileSelectors from '../../../Redux/Selectors/profileSelectors';
import { Role } from '../../../Components/constants/@types';
import UserChat from '../../../Components/UserChat';
import { getAllChat } from '../../../Redux/Reducers/chatReducer';

import styles from './AllChatsPanel.module.css';

type AllChatsPanelType = {
  chatId: number;
  clickUserChatHandler: (id: number) => void;
};

const AllChatsPanel: React.FC<AllChatsPanelType> = ({ chatId, clickUserChatHandler }) => {
  const dispatch = useDispatch();
  const allChats = useSelector(chatSelectors.getAllChats);
  const personalInfoList = useSelector(profileSelectors.getPersonalInfo);
  const [page, setPage] = useState(1);

  const onScroll = () => {
    setPage(page + 1);
  };

  // const hasMore = () => {
  //   if (valueCategories === 2 || cardsArray.length === 0 || searchValue) {
  //     return false;
  //   } else {
  //     return cardsArray.length < totalCaunt;
  //   }
  // };

  useEffect(() => {
    dispatch(getAllChat({ page_size: 10, page_num: 1 }));
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
          hasMore={true}
          loader={<div>Loading...</div>}
          dataLength={allChats.length}
          scrollableTarget="parentScrollDiv">
          pul
          {allChats.map((value) => (
            <UserChat
              onClick={() => clickUserChatHandler(value.id)}
              key={value.id}
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

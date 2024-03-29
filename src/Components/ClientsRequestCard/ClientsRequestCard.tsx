import { FC } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { CommentIcon } from '../../Assets/icons/CommentIcon';
import { FilesIcon } from '../../Assets/icons/FilesIcon';
import { PinnedIcon } from '../../Assets/icons/PinnedIcon';
import { EcaseIcon } from '../../Assets/icons/EcaseIcon';
import { setEcaseHeadModalVisible, setEcaseModalVisible, setTitleRequest } from '../../Redux/Reducers/postReducer';

import profileSelectors from '../../Redux/Selectors/profileSelectors';

import { Role } from '../constants/@types';

import styles from './ClientsRequestCard.module.css';

type ClientsRequestCardProps = {
  nameOfArray: string;
  disabled?: boolean;
  openedArray: Array<{
    title: string;
    priority: string | null;
  }>;
};

const ClientsRequestCard: FC<ClientsRequestCardProps> = ({ openedArray, nameOfArray }) => {
  const dispatch = useDispatch();
  const personalInfoList = useSelector(profileSelectors.getPersonalInfo);
  const isHead = personalInfoList?.role[0] === Role.Head;
  const isPO = personalInfoList?.role[0] === Role.PO;
  const onPinnedIconClick = () => {
    if (isHead) {
      dispatch(setEcaseHeadModalVisible(true));
    }
    if (isPO) {
      dispatch(setEcaseModalVisible(true));
    }
  };
  const onPinnedIconRequestClick = (title: string) => () => {
    dispatch(setTitleRequest(title));
  };
  return (
    <>
      <div className={styles.name}>{nameOfArray}</div>
      <div className={styles.cardsContainer}>
        {openedArray.map((card) => {
          return (
            <div className={styles.container} key={card.title}>
              <div
                className={styles.title}
                onClick={card.title === 'E-case details' ? onPinnedIconClick : onPinnedIconRequestClick(card.title)}>
                {card?.title}
              </div>
              <div className={styles.iconContainer}>
                <div className={styles.topBox}>{card?.priority === null ? <EcaseIcon /> : card.priority}</div>
                <div className={styles.bottomIcons}>
                  <div className={styles.commentContainer}>
                    <CommentIcon />
                    <div className={styles.commentNumber}>{'0'}</div>
                  </div>
                  <div className={styles.filesContainer}>
                    <FilesIcon />
                    <div className={styles.filesNumber}>{'0'}</div>
                  </div>
                  <div
                    className={styles.pinnedIcon}
                    onClick={
                      card.title === 'E-case details' ? onPinnedIconClick : onPinnedIconRequestClick(card.title)
                    }>
                    <PinnedIcon />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ClientsRequestCard;

import React, { FC, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router';

import { EditProjectIcon } from '../../Assets/ProjectPage/EditProjectIcon';
import { CardType, Role } from '../constants/@types';

import { DeleteProjectIcon } from '../../Assets/ProfilePage/DeleteProjectIcon';
import { PauseProjectIcon } from '../../Assets/ProfilePage/PauseProjectIcon';

import profileSelectors from '../../Redux/Selectors/profileSelectors';

import { setCloseProjectModal } from '../../Redux/Reducers/postReducer';

import styles from './Card.module.css';

type CardProps = {
  card: CardType;
  edit?: boolean;
};
const ClOSEBUTTON_LIST = [
  { value: 'Pause', label: 'Pause', icon: <DeleteProjectIcon /> },
  { value: 'Delete', label: 'Delete', icon: <PauseProjectIcon /> }
];

const Card: FC<CardProps> = ({ card, edit }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const personalInfoList = useSelector(profileSelectors.getPersonalInfo);
  const isHead = personalInfoList?.role[0] === Role.Head;
  const [showClose, setShowClose] = useState(false);
  const [onOpenDropdown, setOnOpenDropdown] = useState(false);
  const onEditProjectClick = () => {
    setShowClose(!showClose);
  };
  const onCloseProjectClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setOnOpenDropdown(!onOpenDropdown);
  };
  const onDeleteClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    dispatch(setCloseProjectModal(true));
    setShowClose(false);
  };

  const { id, project_name, payments, deadline, progress } = card;
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div
          className={styles.title}
          onClick={() => {
            navigate(`/project/${id}`);
          }}>
          {project_name}
        </div>
        {isHead ? (
          <div className={styles.iconEdit} onClick={onEditProjectClick}>
            <EditProjectIcon />
            {showClose && isHead ? (
              <div className={styles.buttonContainer}>
                <div className={styles.dropdown_container}>
                  <div className={styles.btnProject} onClick={onCloseProjectClick}>
                    {'Close a project'}
                  </div>

                  <div className={styles.dropdown_menu}>
                    {ClOSEBUTTON_LIST.map((el) => (
                      <div key={el.value} className={styles.dropdown_item} onClick={onDeleteClick}>
                        {el.icon}
                        {el.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
      <div className={styles.projectContainer}>
        <div className={styles.task}>
          <div className={styles.taskName}>Tasks</div>
          <div className={styles.taskProgress}>{progress}</div>
        </div>
        <div className={styles.task}>
          <div className={styles.taskName}>Deadline</div>
          <div className={styles.taskProgress}>{deadline}</div>
        </div>
        <div className={styles.task}>
          <div className={styles.taskName}>Budget</div>
          <div className={styles.taskProgress}>{''}</div>
        </div>
        <div className={styles.task}>
          <div className={styles.taskName}>Paid</div>
          <div className={styles.taskProgress}>{payments}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;

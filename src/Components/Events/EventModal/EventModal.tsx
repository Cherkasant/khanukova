import React, { FC } from 'react';
import classNames from 'classnames';

import { useDispatch, useSelector } from 'react-redux';

import styles from '../EventModal/EventModal.module.css';
import PuzzleButton, { PuzzleButtonTypes } from '../../PuzzleButton';
import { postCalendar, setCalendarModalVisible } from '../../../Redux/Reducers/calendarReducer';
import postSelector from '../../../Redux/Selectors/postSelector';

type EventModalProps = {
  modal: boolean;
};

const EventModal: FC<EventModalProps> = ({ modal }) => {
  const singleProject = useSelector(postSelector.getSingleProject);
  const dispatch = useDispatch();

  const onCloseModal = () => {
    dispatch(setCalendarModalVisible(false));
  };

  const onCreateOnEventClick = () => {
    if (singleProject) {
      dispatch(
        postCalendar({
          summary: singleProject.id.toString(),
          callback: onCloseModal
        })
      );
    }
  };

  return (
    <div
      className={classNames(styles.wrap, { [styles.activeModal]: modal })}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
      <div className={styles.container}>
        <div className={styles.contentBlock}>
          <div className={styles.description}>{'No one on the project has created any events yet'}</div>
          <div className={styles.buttonsContainer}>
            <div className={styles.question}>{'Would you like to create an event?'}</div>
            <div className={styles.btnContainer}>
              <PuzzleButton
                btnTitle={'Create an event'}
                btnType={PuzzleButtonTypes.TextButton}
                btnClassName={styles.eventBtn}
                onClick={onCreateOnEventClick}
              />
              <PuzzleButton
                btnTitle={'I get it'}
                btnType={PuzzleButtonTypes.TextButton}
                btnClassName={styles.getBtn}
                onClick={onCloseModal}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;

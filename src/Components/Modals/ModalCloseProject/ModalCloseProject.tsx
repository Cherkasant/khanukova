import classNames from 'classnames';
import React, { FC } from 'react';

import { useDispatch } from 'react-redux';

import PuzzleButton, { PuzzleButtonTypes } from '../../PuzzleButton';

import { setCloseProjectModal } from '../../../Redux/Reducers/postReducer';

import styles from './ModalCloseProject.module.css';

type ModalCloseProjectProps = {
  modal: boolean;
};

const ModalCloseProject: FC<ModalCloseProjectProps> = ({ modal }) => {
  const dispatch = useDispatch();
  const onCancelClick = () => {
    dispatch(setCloseProjectModal(false));
  };
  return (
    <div
      className={classNames(styles.wrap, { [styles.activeModal]: modal })}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
      <div className={styles.container}>
        <div className={styles.description}>
          <div className={styles.bold}>{'Close the project'}</div>
          <div className={styles.text}>{'Are you sure you want to close Mobile App project?'}</div>
        </div>
        <div className={styles.buttonsContainer}>
          <PuzzleButton
            btnTitle={'Cancel'}
            btnType={PuzzleButtonTypes.TextButton}
            btnClassName={styles.cancelBtn}
            onClick={onCancelClick}
          />
          <PuzzleButton btnTitle={'Close'} btnType={PuzzleButtonTypes.TextButton} btnClassName={styles.saveBtn} />
        </div>
      </div>
    </div>
  );
};

export default ModalCloseProject;

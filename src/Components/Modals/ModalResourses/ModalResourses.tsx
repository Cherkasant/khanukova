import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';

import classNames from 'classnames';

import PuzzleButton, { PuzzleButtonTypes } from '../../PuzzleButton';

import { CloseModalIcon } from '../../../Assets/icons/CloseModalIcon';
import { editResourses, postResourses } from '../../../Redux/Reducers/ResoursesReducer';

import styles from './ModalResourses.module.css';

type ModalResoursesProps = {
  btnAddNewRef: React.RefObject<HTMLDivElement>;
  btnEditRef: React.RefObject<HTMLDivElement>;
  data?: any;
  modal: boolean;
  editClick: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  setEditClick: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalResourses: React.FC<ModalResoursesProps> = ({
  data,
  modal,
  editClick,
  setModal,
  setEditClick,
  btnAddNewRef,
  btnEditRef
}) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const modalRef = useRef<HTMLDivElement>(null);
  const [positionsValue, setPositionsValue] = useState('');
  const [projectHoursValue, setProjectHoursValue] = useState('');
  const [rateHourValue, setRateHourValue] = useState('');
  const closeModal = () => {
    setPositionsValue('');
    setProjectHoursValue('');
    setRateHourValue('');
  };
  const saveResoursesHandler = () => {
    id &&
      dispatch(
        postResourses({
          data: { position: positionsValue, time: Number(projectHoursValue), rate: Number(rateHourValue) },
          id
        })
      );
    setModal(false);
    closeModal();
  };

  const editResoursesHandler = () => {
    id &&
      dispatch(
        editResourses({
          data: { position: positionsValue, time: Number(projectHoursValue), rate: Number(rateHourValue) },
          id,
          idResourses: data.id
        })
      );
    setEditClick(false);
    setModal(false);
    closeModal();
  };

  useEffect(() => {
    if (editClick) {
      setPositionsValue(data.position);
      setProjectHoursValue(data.time);
      setRateHourValue(data.rate);
    } else {
      setPositionsValue('');
      setProjectHoursValue('');
      setRateHourValue('');
    }
  }, [editClick]);

  useEffect(() => {
    const eventModal = (e: MouseEvent) => {
      const _e = e as MouseEvent & {
        target: HTMLElement;
      };
      if (
        !modalRef.current?.contains(_e.target) &&
        !btnAddNewRef.current?.contains(_e.target) &&
        !btnEditRef.current?.contains(_e.target)
      ) {
        setModal(false);
        setEditClick(false);
        closeModal();
      }
    };
    document.body.addEventListener('click', eventModal);
    return () => {
      document.body.removeEventListener('click', eventModal);
    };
  }, []);
  return (
    <div ref={modalRef} className={classNames(styles.wrap, { [styles.activeModal]: modal })}>
      <div className={styles.items}>
        <div className={styles.item}>
          <div className={styles.title}>Positions</div>
          <input
            value={positionsValue}
            type="text"
            className={styles.input}
            onChange={(e) => setPositionsValue(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <div className={styles.title}>Project involment-hours,h</div>
          <input
            min="1"
            value={projectHoursValue}
            type="number"
            className={styles.input}
            onChange={(e) => setProjectHoursValue(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <div className={styles.title}>Rate per hour, h</div>
          <input
            max="999999"
            min="1"
            value={rateHourValue}
            type="number"
            className={styles.input}
            onChange={(e) => setRateHourValue(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <div className={styles.title}>Budget</div>
          <input
            disabled
            value={projectHoursValue && rateHourValue ? +projectHoursValue * +rateHourValue : ''}
            type="string"
            className={classNames(styles.input, { [styles.disabled]: true })}
          />
        </div>
      </div>
      <div className={styles.buttonsContainer}>
        <PuzzleButton
          btnTitle={'Cancel'}
          btnType={PuzzleButtonTypes.TextButton}
          btnClassName={styles.cancelBtn}
          onClick={() => {
            setEditClick(false);
            setModal(false);
            closeModal();
          }}
        />
        <PuzzleButton
          btnTitle={'Save'}
          btnType={PuzzleButtonTypes.TextButton}
          btnClassName={styles.saveBtn}
          onClick={editClick ? editResoursesHandler : saveResoursesHandler}
        />
      </div>
      <div
        className={styles.icon}
        onClick={() => {
          setModal(false);
          setEditClick(false);
          closeModal();
        }}>
        <CloseModalIcon />
      </div>
    </div>
  );
};

export default ModalResourses;

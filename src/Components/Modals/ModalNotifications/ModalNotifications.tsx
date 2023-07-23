import classNames from 'classnames';
import React, { FC, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Checkbox from '../../Checkbox';

import styles from '../ModalNotifications/ModalNotifications.module.css';
import PuzzleButton, { PuzzleButtonTypes } from '../../PuzzleButton';
import notificationSelector from '../../../Redux/Selectors/notificationSelector';
import { Role } from '../../constants/@types';
import profileSelectors from '../../../Redux/Selectors/profileSelectors';
import {
  getNotifyOptions,
  patchNotifyOptions,
  setNotificationModalVisible
} from '../../../Redux/Reducers/notificationReducer';

type ModalNotificationsProps = {
  modal: boolean;
};

const ModalNotifications: FC<ModalNotificationsProps> = ({ modal }) => {
  const dispatch = useDispatch();
  const notifyOptions = useSelector(notificationSelector.getNotifyOptions);
  useEffect(() => {
    dispatch(getNotifyOptions());
  }, [dispatch]);

  const personalInfoList = useSelector(profileSelectors.getPersonalInfo);
  const isHead = personalInfoList?.role[0] === Role.Head;

  const [actions, setActions] = useState(true);
  const [deadline, setDeadline] = useState(true);
  const [events, setEvents] = useState(true);
  const [payments, setPayments] = useState(true);
  const [clientsRequest, setClientRequest] = useState(true);
  const [chat, setChat] = useState(true);
  const handleChangeAction = () => {
    setActions(!actions);
  };
  const handleChangeDeadline = () => {
    setDeadline(!deadline);
  };
  const handleChangeEvent = () => {
    setEvents(!events);
  };
  const handleChangePayments = () => {
    setPayments(!payments);
  };
  const handleChangeClientRequest = () => {
    setClientRequest(!clientsRequest);
  };
  const handleChangeChat = () => {
    setChat(!chat);
  };

  const onSaveClick = () => {
    if (notifyOptions) {
      dispatch(
        patchNotifyOptions({
          data: {
            id: notifyOptions.id,
            actions: actions ? 'actions' : '',
            deadline: deadline ? 'deadline' : '',
            events: events ? 'events' : '',
            payments: payments ? 'payments' : '',
            client_requests: '',
            chat: ''
          },
          callback: () => {
            dispatch(getNotifyOptions());
            dispatch(setNotificationModalVisible(false));
          }
        })
      );
    }
  };

  return (
    <div
      className={classNames(styles.wrap, { [styles.activeModal]: modal })}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
      <div className={styles.container}>
        <div className={styles.containerTitle}>
          <div className={styles.title}>Notifications options</div>
          <div className={styles.subTitle}>Choose trigger for your notifications</div>
        </div>

        <div className={styles.containerCategory}>
          <div className={styles.categories}>
            <div className={styles.category}>
              <div className={styles.checkbox}>
                <Checkbox isChecked={actions} handleChange={handleChangeAction} label={''} />
              </div>
              <div className={styles.options}>
                <div className={styles.name}>{'Actions'}</div>
                <div className={styles.description}>{'Some description about this option'}</div>
              </div>
            </div>
          </div>
          <div className={styles.categories}>
            <div className={styles.category}>
              <div className={styles.checkbox}>
                <Checkbox isChecked={deadline} handleChange={handleChangeDeadline} label={''} />
              </div>
              <div className={styles.options}>
                <div className={styles.name}>{'Deadline'}</div>
                <div className={styles.description}>{'Some description about this option'}</div>
              </div>
            </div>
          </div>
          <div className={styles.categories}>
            <div className={styles.category}>
              <div className={styles.checkbox}>
                <Checkbox isChecked={events} handleChange={handleChangeEvent} label={''} />
              </div>
              <div className={styles.options}>
                <div className={styles.name}>{'Events'}</div>
                <div className={styles.description}>{'Some description about this option'}</div>
              </div>
            </div>
          </div>
          <div className={styles.categories}>
            {isHead ? (
              <div className={styles.category}>
                <div className={styles.checkbox}>
                  <Checkbox isChecked={payments} handleChange={handleChangePayments} label={''} />
                </div>
                <div className={styles.options}>
                  <div className={styles.name}>{'Payments'}</div>
                  <div className={styles.description}>{'Some description about this option'}</div>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className={styles.containerSettings}>
          <div className={styles.setting}>
            <Checkbox
              isChecked={clientsRequest}
              handleChange={handleChangeClientRequest}
              label={'Email notifications'}
            />
          </div>
          <div className={styles.setting}>
            <Checkbox isChecked={chat} handleChange={handleChangeChat} label={'In-account notifications'} />
          </div>
        </div>

        <div className={styles.buttons}>
          <PuzzleButton
            btnTitle={'Save'}
            btnType={PuzzleButtonTypes.TextButton}
            onClick={onSaveClick}
            btnClassName={styles.buttonSave}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalNotifications;

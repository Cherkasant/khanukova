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

  const initialState = {
    actions: true,
    deadline: true,
    events: true,
    payments: true,
    email: true,
    chat: true,
    request: true
  };
  const [inputs, setInputs] = useState(initialState);

  const checkboxChangeHandler = (inputIdentifier: string, value: boolean) => {
    setInputs((prev) => {
      return { ...prev, [inputIdentifier]: value };
    });
  };

  const onSaveClick = () => {
    if (notifyOptions) {
      dispatch(
        patchNotifyOptions({
          data: {
            id: notifyOptions.id,
            actions: inputs.actions ? 'actions' : '',
            deadline: inputs.deadline ? 'deadline' : '',
            events: inputs.events ? 'events' : '',
            payments: inputs.payments ? 'payments' : '',
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
                <Checkbox
                  isChecked={inputs.actions}
                  handleChange={() => checkboxChangeHandler('actions', !inputs.actions)}
                  label={''}
                />
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
                <Checkbox
                  isChecked={inputs.deadline}
                  handleChange={() => checkboxChangeHandler('deadline', !inputs.deadline)}
                  label={''}
                />
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
                <Checkbox
                  isChecked={inputs.events}
                  handleChange={() => checkboxChangeHandler('events', !inputs.events)}
                  label={''}
                />
              </div>
              <div className={styles.options}>
                <div className={styles.name}>{'Events'}</div>
                <div className={styles.description}>{'Some description about this option'}</div>
              </div>
            </div>
          </div>
          {isHead ? (
            <div className={styles.categories}>
              <div className={styles.category}>
                <div className={styles.checkbox}>
                  <Checkbox
                    isChecked={inputs.payments}
                    handleChange={() => checkboxChangeHandler('payments', !inputs.payments)}
                    label={''}
                  />
                </div>
                <div className={styles.options}>
                  <div className={styles.name}>{'Payments'}</div>
                  <div className={styles.description}>{'Some description about this option'}</div>
                </div>
              </div>
            </div>
          ) : null}
          <div className={styles.categories}>
            <div className={styles.category}>
              <div className={styles.checkbox}>
                <Checkbox
                  isChecked={inputs.request}
                  handleChange={() => checkboxChangeHandler('request', !inputs.request)}
                  label={''}
                />
              </div>
              <div className={styles.options}>
                <div className={styles.name}>{'Clients request'}</div>
                <div className={styles.description}>{'Some description about this option'}</div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.containerSettings}>
          <div className={styles.setting}>
            <Checkbox
              isChecked={inputs.email}
              handleChange={() => checkboxChangeHandler('email', !inputs.email)}
              label={'Email notifications'}
            />
          </div>
          <div className={styles.setting}>
            <Checkbox
              isChecked={inputs.chat}
              handleChange={() => checkboxChangeHandler('chat', !inputs.chat)}
              label={'In-account notifications'}
            />
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
